/**
 * revenue-report.js
 * Weekly automation: Generate a comprehensive revenue report from Stripe data
 * and email it to the business owner.
 * 
 * Runs via GitHub Actions every Monday at 8am UTC.
 */

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

async function fetchStripeData(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `https://api.stripe.com/v1/${endpoint}${queryString ? '?' + queryString : ''}`;
    
    const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${STRIPE_SECRET_KEY}` },
    });
    
    if (!response.ok) {
        throw new Error(`Stripe API error: ${response.status}`);
    }
    
    return await response.json();
}

async function getWeeklyCharges() {
    const oneWeekAgo = Math.floor(Date.now() / 1000) - (7 * 86400);
    return await fetchStripeData('charges', {
        'created[gte]': oneWeekAgo,
        'limit': 100,
    });
}

async function getActiveSubscriptions() {
    return await fetchStripeData('subscriptions', {
        'status': 'active',
        'limit': 100,
    });
}

async function getBalance() {
    return await fetchStripeData('balance');
}

async function logReportToSupabase(reportData) {
    if (!SUPABASE_URL || !SUPABASE_KEY) return;
    
    await fetch(`${SUPABASE_URL}/rest/v1/revenue_tracking`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            stripe_charge_id: `weekly_report_${new Date().toISOString().split('T')[0]}`,
            amount: reportData.totalRevenue,
            currency: 'usd',
            customer_email: 'report@internal',
            customer_name: 'Weekly Revenue Report',
            product_description: JSON.stringify(reportData),
            status: 'report',
            created_at: new Date().toISOString(),
            logged_at: new Date().toISOString(),
        }),
    });
}

function formatCurrency(cents) {
    return `$${(cents / 100).toFixed(2)}`;
}

async function main() {
    console.log('=== Weekly Revenue Report ===');
    console.log(`Generating report for week ending: ${new Date().toISOString()}`);
    
    if (!STRIPE_SECRET_KEY) {
        console.error('STRIPE_SECRET_KEY not set. Exiting.');
        process.exit(1);
    }
    
    try {
        // Fetch all data
        const [chargesData, subscriptionsData, balanceData] = await Promise.all([
            getWeeklyCharges(),
            getActiveSubscriptions(),
            getBalance(),
        ]);
        
        const charges = chargesData.data || [];
        const subscriptions = subscriptionsData.data || [];
        const balance = balanceData.available || [];
        
        // Calculate metrics
        const successfulCharges = charges.filter(c => c.status === 'succeeded');
        const totalRevenue = successfulCharges.reduce((sum, c) => sum + c.amount, 0);
        const failedCharges = charges.filter(c => c.status === 'failed');
        const refunds = charges.filter(c => c.refunded);
        
        // MRR calculation
        const mrr = subscriptions.reduce((sum, s) => {
            const item = s.items?.data?.[0];
            if (!item) return sum;
            const price = item.price;
            if (price.recurring?.interval === 'month') return sum + price.unit_amount;
            if (price.recurring?.interval === 'year') return sum + Math.round(price.unit_amount / 12);
            return sum;
        }, 0);
        
        // Product breakdown
        const productBreakdown = {};
        for (const charge of successfulCharges) {
            const desc = charge.description || 'Other';
            if (!productBreakdown[desc]) {
                productBreakdown[desc] = { count: 0, revenue: 0 };
            }
            productBreakdown[desc].count++;
            productBreakdown[desc].revenue += charge.amount;
        }
        
        // Available balance
        const availableBalance = balance.reduce((sum, b) => sum + b.amount, 0);
        
        const reportData = {
            totalRevenue: totalRevenue / 100,
            chargeCount: successfulCharges.length,
            failedCount: failedCharges.length,
            refundCount: refunds.length,
            mrr: mrr / 100,
            arr: (mrr * 12) / 100,
            activeSubscriptions: subscriptions.length,
            availableBalance: availableBalance / 100,
        };
        
        // Log to Supabase
        await logReportToSupabase(reportData);
        
        // Build email
        const weekStart = new Date(Date.now() - 7 * 86400 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const weekEnd = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        const productRows = Object.entries(productBreakdown).map(([name, data]) => `
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${name}</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${data.count}</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatCurrency(data.revenue)}</td>
            </tr>
        `).join('');
        
        const emailHtml = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #1e3a8a, #1e40af); padding: 24px; border-radius: 12px 12px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 22px;">Weekly Revenue Report</h1>
                    <p style="color: #93c5fd; margin: 4px 0 0; font-size: 14px;">${weekStart} — ${weekEnd}</p>
                </div>
                
                <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: 0;">
                    <!-- Key Metrics -->
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                        <tr>
                            <td style="padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; text-align: center; width: 50%;">
                                <div style="font-size: 28px; font-weight: 800; color: #111827;">${formatCurrency(totalRevenue)}</div>
                                <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Weekly Revenue</div>
                            </td>
                            <td style="width: 12px;"></td>
                            <td style="padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; text-align: center; width: 50%;">
                                <div style="font-size: 28px; font-weight: 800; color: #111827;">${formatCurrency(mrr)}</div>
                                <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Monthly Recurring Revenue</div>
                            </td>
                        </tr>
                    </table>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                        <tr>
                            <td style="padding: 12px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; text-align: center; width: 25%;">
                                <div style="font-size: 20px; font-weight: 700; color: #111827;">${successfulCharges.length}</div>
                                <div style="font-size: 11px; color: #6b7280;">Payments</div>
                            </td>
                            <td style="width: 8px;"></td>
                            <td style="padding: 12px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; text-align: center; width: 25%;">
                                <div style="font-size: 20px; font-weight: 700; color: #111827;">${subscriptions.length}</div>
                                <div style="font-size: 11px; color: #6b7280;">Active Subs</div>
                            </td>
                            <td style="width: 8px;"></td>
                            <td style="padding: 12px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; text-align: center; width: 25%;">
                                <div style="font-size: 20px; font-weight: 700; color: #059669;">${formatCurrency(mrr * 12)}</div>
                                <div style="font-size: 11px; color: #6b7280;">ARR</div>
                            </td>
                            <td style="width: 8px;"></td>
                            <td style="padding: 12px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; text-align: center; width: 25%;">
                                <div style="font-size: 20px; font-weight: 700; color: #111827;">${formatCurrency(availableBalance)}</div>
                                <div style="font-size: 11px; color: #6b7280;">Balance</div>
                            </td>
                        </tr>
                    </table>
                    
                    <!-- Product Breakdown -->
                    ${Object.keys(productBreakdown).length > 0 ? `
                        <h3 style="font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 8px;">Revenue by Product</h3>
                        <table style="width: 100%; border-collapse: collapse; background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                            <tr style="background: #f3f4f6;">
                                <th style="padding: 8px; text-align: left; font-size: 12px; color: #6b7280;">Product</th>
                                <th style="padding: 8px; text-align: center; font-size: 12px; color: #6b7280;">Sales</th>
                                <th style="padding: 8px; text-align: right; font-size: 12px; color: #6b7280;">Revenue</th>
                            </tr>
                            ${productRows}
                        </table>
                    ` : '<p style="color: #6b7280; font-size: 14px;">No product-level data available this week.</p>'}
                    
                    ${failedCharges.length > 0 ? `
                        <p style="color: #dc2626; font-size: 13px; margin-top: 16px;">
                            &#9888; ${failedCharges.length} failed charge(s) this week. Check Stripe dashboard for details.
                        </p>
                    ` : ''}
                </div>
                
                <div style="padding: 16px; text-align: center; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 12px 12px; background: white;">
                    <a href="https://dashboard.stripe.com" style="color: #2563eb; font-size: 13px; font-weight: 600; text-decoration: none;">View Full Stripe Dashboard &rarr;</a>
                    <p style="color: #9ca3af; font-size: 11px; margin-top: 8px;">Automated report from Future Focus Agents</p>
                </div>
            </div>
        `;
        
        // Send email
        if (RESEND_API_KEY) {
            const emailResponse = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: 'Future Focus Agents <onboarding@resend.dev>',
                    to: ['futurefocusagents@gmail.com'],
                    subject: `Weekly Report: ${formatCurrency(totalRevenue)} revenue | ${subscriptions.length} active subs | ${formatCurrency(mrr)} MRR`,
                    html: emailHtml,
                }),
            });
            
            if (emailResponse.ok) {
                console.log('Weekly report email sent successfully.');
            } else {
                console.error('Failed to send report:', await emailResponse.text());
            }
        }
        
        // Console summary
        console.log('\n--- Report Summary ---');
        console.log(`Weekly Revenue: ${formatCurrency(totalRevenue)}`);
        console.log(`Successful Payments: ${successfulCharges.length}`);
        console.log(`Failed Payments: ${failedCharges.length}`);
        console.log(`Active Subscriptions: ${subscriptions.length}`);
        console.log(`MRR: ${formatCurrency(mrr)}`);
        console.log(`ARR: ${formatCurrency(mrr * 12)}`);
        console.log(`Available Balance: ${formatCurrency(availableBalance)}`);
        console.log('--- End Report ---\n');
        
    } catch (error) {
        console.error('Error generating report:', error.message);
        process.exit(1);
    }
}

main();
