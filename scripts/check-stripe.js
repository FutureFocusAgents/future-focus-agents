/**
 * check-stripe.js
 * Daily automation: Check Stripe for new payments in the last 24 hours
 * and log them to Supabase database.
 * 
 * Runs via GitHub Actions on a daily schedule.
 */

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

async function fetchStripePayments() {
    const oneDayAgo = Math.floor(Date.now() / 1000) - 86400;
    
    const response = await fetch(
        `https://api.stripe.com/v1/charges?created[gte]=${oneDayAgo}&limit=100`,
        {
            headers: {
                'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
            },
        }
    );
    
    if (!response.ok) {
        throw new Error(`Stripe API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data || [];
}

async function logToSupabase(payments) {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
        console.log('Supabase not configured, logging to console only.');
        return;
    }
    
    for (const payment of payments) {
        const record = {
            stripe_charge_id: payment.id,
            amount: payment.amount / 100,
            currency: payment.currency,
            customer_email: payment.billing_details?.email || payment.receipt_email || 'unknown',
            customer_name: payment.billing_details?.name || 'unknown',
            product_description: payment.description || 'N/A',
            status: payment.status,
            created_at: new Date(payment.created * 1000).toISOString(),
            logged_at: new Date().toISOString(),
        };
        
        const response = await fetch(`${SUPABASE_URL}/rest/v1/revenue_tracking`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates',
            },
            body: JSON.stringify(record),
        });
        
        if (!response.ok) {
            console.error(`Failed to log payment ${payment.id}:`, await response.text());
        } else {
            console.log(`Logged payment: ${payment.id} — $${record.amount} from ${record.customer_email}`);
        }
    }
}

async function sendDailySummary(payments) {
    if (!RESEND_API_KEY) {
        console.log('Resend not configured, skipping email summary.');
        return;
    }
    
    const totalRevenue = payments
        .filter(p => p.status === 'succeeded')
        .reduce((sum, p) => sum + p.amount / 100, 0);
    
    const successCount = payments.filter(p => p.status === 'succeeded').length;
    
    const emailBody = `
        <h2>Daily Stripe Payment Summary</h2>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p><strong>New Payments:</strong> ${successCount}</p>
        <p><strong>Total Revenue (24h):</strong> $${totalRevenue.toFixed(2)}</p>
        <hr>
        <h3>Payment Details</h3>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
            <tr style="background: #f3f4f6;">
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
            </tr>
            ${payments.map(p => `
                <tr>
                    <td>${p.billing_details?.email || p.receipt_email || 'N/A'}</td>
                    <td>$${(p.amount / 100).toFixed(2)}</td>
                    <td>${p.status}</td>
                    <td>${new Date(p.created * 1000).toLocaleString()}</td>
                </tr>
            `).join('')}
        </table>
        <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            Automated report from Future Focus Agents — GitHub Actions
        </p>
    `;
    
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: 'Future Focus Agents <onboarding@resend.dev>',
            to: ['futurefocusagents@gmail.com'],
            subject: `Daily Revenue: $${totalRevenue.toFixed(2)} (${successCount} payments)`,
            html: emailBody,
        }),
    });
    
    if (response.ok) {
        console.log('Daily summary email sent successfully.');
    } else {
        console.error('Failed to send email:', await response.text());
    }
}

async function main() {
    console.log('=== Stripe Daily Payment Check ===');
    console.log(`Running at: ${new Date().toISOString()}`);
    
    try {
        const payments = await fetchStripePayments();
        console.log(`Found ${payments.length} payments in the last 24 hours.`);
        
        if (payments.length === 0) {
            console.log('No new payments. Sending summary anyway.');
            await sendDailySummary([]);
            return;
        }
        
        // Log to Supabase
        await logToSupabase(payments);
        
        // Send daily email summary
        await sendDailySummary(payments);
        
        console.log('Daily check complete.');
    } catch (error) {
        console.error('Error during daily check:', error.message);
        process.exit(1);
    }
}

main();
