/**
 * send-followups.js
 * Daily automation: Check for leads that haven't responded and send follow-up emails.
 * Uses Supabase for lead tracking and Resend for email delivery.
 * 
 * Runs via GitHub Actions on a daily schedule.
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const FOLLOW_UP_TEMPLATES = [
    {
        days_after: 1,
        subject: 'Quick follow-up — your practice automation assessment',
        body: (name, practice) => `
            <p>Hi ${name},</p>
            <p>I wanted to follow up on your inquiry about practice automation for ${practice || 'your practice'}.</p>
            <p>Most practices we work with are losing $5,000–$15,000/month to missed calls, no-shows, and manual processes that could be automated. The good news: these are completely fixable.</p>
            <p>Would you have 15 minutes this week for a quick call? I can walk you through exactly which automations would have the biggest impact for your specific situation.</p>
            <p>Best,<br>Erik<br>Future Focus Agents</p>
        `,
    },
    {
        days_after: 3,
        subject: 'The #1 revenue leak in dental practices (and how to fix it)',
        body: (name, practice) => `
            <p>Hi ${name},</p>
            <p>Did you know the average dental practice misses 23% of inbound calls during business hours? And only 12% of those callers leave a voicemail.</p>
            <p>That means for every 100 calls your practice receives, roughly 20 potential patients are calling your competitor instead.</p>
            <p>Our missed-call text-back system catches those calls and automatically sends a text within seconds. Practices using it recover an average of 35% of those missed calls — that's real patients and real revenue.</p>
            <p>It starts at just $29/month and typically pays for itself within the first 48 hours.</p>
            <p><a href="https://buy.stripe.com/fZueVc0sO5qacSD1Se9sk0i">Start your automation here</a> or reply to this email with any questions.</p>
            <p>Best,<br>Erik<br>Future Focus Agents</p>
        `,
    },
    {
        days_after: 7,
        subject: 'Last thought on automation for your practice',
        body: (name, practice) => `
            <p>Hi ${name},</p>
            <p>I know you're busy running ${practice || 'your practice'}, so I'll keep this brief.</p>
            <p>If you're still thinking about automation, here's what I'd recommend: start with our $47 guide. It covers the 5 highest-impact automations for dental practices with step-by-step implementation instructions. No commitment, no subscription.</p>
            <p><a href="https://buy.stripe.com/4gMcN4a3ocSC05R2Wi9sk0h">Get the 5 AI Automations Guide ($47)</a></p>
            <p>And if you ever want to chat about a done-for-you setup, I'm always here.</p>
            <p>Best,<br>Erik<br>Future Focus Agents</p>
        `,
    },
];

async function getLeadsNeedingFollowUp() {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
        console.log('Supabase not configured. Cannot fetch leads.');
        return [];
    }
    
    // Get leads that are status = 'new' or 'contacted' and haven't been followed up recently
    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/leads?status=in.(new,contacted,follow_up)&select=*`,
        {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
            },
        }
    );
    
    if (!response.ok) {
        console.error('Failed to fetch leads:', await response.text());
        return [];
    }
    
    return await response.json();
}

async function getOutreachLog(leadId) {
    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/outreach_log?lead_id=eq.${leadId}&select=*&order=sent_at.desc`,
        {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
            },
        }
    );
    
    if (!response.ok) return [];
    return await response.json();
}

async function sendEmail(to, subject, html) {
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: 'Erik at Future Focus <onboarding@resend.dev>',
            to: [to],
            subject: subject,
            html: html,
        }),
    });
    
    return response.ok;
}

async function logOutreach(leadId, email, templateIndex, status) {
    if (!SUPABASE_URL || !SUPABASE_KEY) return;
    
    await fetch(`${SUPABASE_URL}/rest/v1/outreach_log`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lead_id: leadId,
            email: email,
            type: 'follow_up_email',
            template_index: templateIndex,
            status: status,
            sent_at: new Date().toISOString(),
        }),
    });
}

async function updateLeadStatus(leadId, status) {
    if (!SUPABASE_URL || !SUPABASE_KEY) return;
    
    await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${leadId}`, {
        method: 'PATCH',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status: status,
            updated_at: new Date().toISOString(),
        }),
    });
}

async function main() {
    console.log('=== Daily Lead Follow-Up ===');
    console.log(`Running at: ${new Date().toISOString()}`);
    
    if (!RESEND_API_KEY) {
        console.error('RESEND_API_KEY not set. Exiting.');
        process.exit(1);
    }
    
    try {
        const leads = await getLeadsNeedingFollowUp();
        console.log(`Found ${leads.length} leads to check.`);
        
        let emailsSent = 0;
        
        for (const lead of leads) {
            const outreachHistory = await getOutreachLog(lead.id);
            const followUpsSent = outreachHistory.filter(o => o.type === 'follow_up_email').length;
            
            // Determine which template to use
            if (followUpsSent >= FOLLOW_UP_TEMPLATES.length) {
                console.log(`Lead ${lead.email}: All follow-ups sent. Marking as nurture.`);
                await updateLeadStatus(lead.id, 'nurture');
                continue;
            }
            
            const template = FOLLOW_UP_TEMPLATES[followUpsSent];
            const leadCreated = new Date(lead.created_at);
            const daysSinceCreated = Math.floor((Date.now() - leadCreated.getTime()) / (1000 * 60 * 60 * 24));
            
            // Check if enough days have passed for this follow-up
            if (daysSinceCreated < template.days_after) {
                console.log(`Lead ${lead.email}: Not yet time for follow-up #${followUpsSent + 1} (day ${daysSinceCreated}/${template.days_after}).`);
                continue;
            }
            
            // Check if we already sent a follow-up today
            const lastOutreach = outreachHistory[0];
            if (lastOutreach) {
                const hoursSinceLastOutreach = (Date.now() - new Date(lastOutreach.sent_at).getTime()) / (1000 * 60 * 60);
                if (hoursSinceLastOutreach < 20) {
                    console.log(`Lead ${lead.email}: Already contacted within 20 hours. Skipping.`);
                    continue;
                }
            }
            
            // Send the follow-up
            const name = lead.name || 'there';
            const practice = lead.practice_name || '';
            const subject = template.subject;
            const html = template.body(name, practice);
            
            const success = await sendEmail(lead.email, subject, html);
            
            if (success) {
                console.log(`Sent follow-up #${followUpsSent + 1} to ${lead.email}`);
                await logOutreach(lead.id, lead.email, followUpsSent, 'sent');
                await updateLeadStatus(lead.id, 'follow_up');
                emailsSent++;
            } else {
                console.error(`Failed to send to ${lead.email}`);
                await logOutreach(lead.id, lead.email, followUpsSent, 'failed');
            }
            
            // Rate limiting: wait 1 second between emails
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        console.log(`\nFollow-up complete. Sent ${emailsSent} emails.`);
    } catch (error) {
        console.error('Error during follow-up:', error.message);
        process.exit(1);
    }
}

main();
