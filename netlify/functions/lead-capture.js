// Netlify serverless function: Lead Capture
// 1. Adds contact to GoHighLevel (GHL) via API
// 2. Sends welcome email via Resend
// 3. Returns success/error to the frontend

exports.handler = async function(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { name, practice, email, phone, challenge, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !practice) {
      return { 
        statusCode: 400, 
        headers, 
        body: JSON.stringify({ error: 'Name, email, and practice name are required.' }) 
      };
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { 
        statusCode: 400, 
        headers, 
        body: JSON.stringify({ error: 'Please provide a valid email address.' }) 
      };
    }

    const GHL_API_KEY = process.env.GHL_API_KEY || 'pit-a8597a26-216a-4561-a2d4-c511c5e55522';
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'LsVRH3Vc5pielPi99u54';
    const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_4bkFztuC_NW6tay3bMFYbkBm16Hv3k8Ru';

    // ===== 1. ADD CONTACT TO GHL =====
    let ghlSuccess = false;
    try {
      const ghlPayload = {
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || '',
        email: email,
        phone: phone || '',
        companyName: practice,
        locationId: GHL_LOCATION_ID,
        source: 'Website Lead Form',
        tags: ['website-lead', 'automation-assessment'],
        customFields: []
      };

      // Add challenge as a custom field note
      if (challenge) {
        ghlPayload.tags.push('challenge-' + challenge);
      }

      const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + GHL_API_KEY,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        },
        body: JSON.stringify(ghlPayload)
      });

      if (ghlResponse.ok) {
        ghlSuccess = true;
        console.log('GHL contact created successfully');
      } else {
        const ghlError = await ghlResponse.text();
        console.error('GHL API error:', ghlResponse.status, ghlError);
      }
    } catch (ghlErr) {
      console.error('GHL request failed:', ghlErr.message);
    }

    // ===== 2. SEND WELCOME EMAIL VIA RESEND =====
    let emailSuccess = false;
    try {
      const firstName = name.split(' ')[0];
      const challengeLabels = {
        'missed-calls': 'Missed calls / lost patients',
        'no-shows': 'High no-show rates',
        'reviews': 'Not enough online reviews',
        'recall': 'Lapsed patients not returning',
        'staff-burnout': 'Staff overwhelmed with manual tasks',
        'billing': 'Billing and insurance follow-ups',
        'all': 'All of the above'
      };
      const challengeText = challengeLabels[challenge] || 'Not specified';

      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:white;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:32px;text-align:center;">
        <h1 style="color:white;font-size:24px;font-weight:800;margin:0;">Future<span style="color:#93c5fd;">Focus</span></h1>
        <p style="color:#bfdbfe;font-size:14px;margin:8px 0 0;">Practice Automation That Works While You Sleep</p>
      </div>
      
      <!-- Body -->
      <div style="padding:32px;">
        <h2 style="color:#1e293b;font-size:20px;font-weight:700;margin:0 0 16px;">Welcome, ${firstName}!</h2>
        
        <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 16px;">
          Thank you for reaching out about automation for <strong>${practice}</strong>. We received your information and our team will be reviewing your practice's needs within the next 24 hours.
        </p>

        <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 24px;">
          You mentioned your biggest challenge is: <strong>${challengeText}</strong>. That's one of the most common issues we help practices solve with automated workflows.
        </p>

        <!-- CTA: $47 Guide -->
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:24px;margin:0 0 24px;text-align:center;">
          <h3 style="color:#1e3a8a;font-size:16px;font-weight:700;margin:0 0 8px;">Want to get started right away?</h3>
          <p style="color:#475569;font-size:14px;line-height:1.5;margin:0 0 16px;">
            Our <strong>5 Automations Guide ($47)</strong> gives you step-by-step instructions to implement the 5 highest-impact automations for your practice today.
          </p>
          <a href="https://buy.stripe.com/4gMcN4a3ocSC05R2Wi9sk0h" style="display:inline-block;background:#2563eb;color:white;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:700;font-size:14px;">
            Get the Guide &rarr;
          </a>
        </div>

        <!-- Free Consultation -->
        <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;padding:24px;margin:0 0 24px;">
          <h3 style="color:#047857;font-size:16px;font-weight:700;margin:0 0 8px;">Your Free Consultation</h3>
          <p style="color:#475569;font-size:14px;line-height:1.5;margin:0;">
            We'll reach out within 24 hours to schedule a free automation assessment for ${practice}. We'll show you exactly which workflows will have the biggest impact on your revenue &mdash; no obligation, no pressure.
          </p>
        </div>

        <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 8px;">
          In the meantime, here are some resources that might help:
        </p>
        <ul style="color:#475569;font-size:14px;line-height:1.8;margin:0 0 24px;padding-left:20px;">
          <li><a href="https://future-focus-agents.netlify.app/blog/reduce-missed-appointments-dental-practices" style="color:#2563eb;">How to Reduce Missed Appointments in Dental Practices</a></li>
          <li><a href="https://future-focus-agents.netlify.app/blog/dental-billing-automation-guide" style="color:#2563eb;">Dental Billing Automation Guide</a></li>
          <li><a href="https://future-focus-agents.netlify.app/blog/ai-automation-dental-offices" style="color:#2563eb;">Automation for Dental Offices: A Complete Guide</a></li>
        </ul>

        <p style="color:#475569;font-size:15px;line-height:1.6;margin:0;">
          Looking forward to helping ${practice} recover revenue and free up your staff.
        </p>
        <p style="color:#1e293b;font-size:15px;font-weight:600;margin:16px 0 0;">
          &mdash; The Future Focus Team
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f8fafc;padding:24px;text-align:center;border-top:1px solid #e2e8f0;">
        <p style="color:#94a3b8;font-size:12px;margin:0;">
          Future Focus Agents &middot; Littleton, Colorado<br>
          <a href="https://future-focus-agents.netlify.app" style="color:#64748b;">future-focus-agents.netlify.app</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;

      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + RESEND_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Future Focus Agents <practiceiq@thefuturefocus.net>',
          to: [email],
          subject: `Welcome, ${firstName}! Your automation assessment is on the way`,
          html: emailHtml
        })
      });

      if (resendResponse.ok) {
        emailSuccess = true;
        console.log('Welcome email sent successfully');
      } else {
        const resendError = await resendResponse.text();
        console.error('Resend API error:', resendResponse.status, resendError);
      }
    } catch (emailErr) {
      console.error('Resend request failed:', emailErr.message);
    }

    // ===== 3. SEND INTERNAL NOTIFICATION =====
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + RESEND_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Future Focus Agents <practiceiq@thefuturefocus.net>',
          to: ['futurefocusagents@gmail.com'],
          subject: `New Lead: ${name} from ${practice}`,
          html: `
            <h2>New Lead from Website</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Practice:</strong> ${practice}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Challenge:</strong> ${challenge || 'Not specified'}</p>
            <p><strong>Message:</strong> ${message || 'None'}</p>
            <p><strong>GHL Added:</strong> ${ghlSuccess ? 'Yes' : 'No'}</p>
            <p><strong>Welcome Email:</strong> ${emailSuccess ? 'Sent' : 'Failed'}</p>
            <hr>
            <p><em>Submitted at ${new Date().toISOString()}</em></p>
          `
        })
      });
    } catch (notifErr) {
      console.error('Internal notification failed:', notifErr.message);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Thank you! We will be in touch within 24 hours.',
        ghl: ghlSuccess,
        email: emailSuccess
      })
    };

  } catch (error) {
    console.error('Lead capture error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Something went wrong. Please try again.' })
    };
  }
};
