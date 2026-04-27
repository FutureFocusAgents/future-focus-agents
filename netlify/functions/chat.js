// Netlify serverless function: AI Chat Demo
// Uses OpenAI API to power the interactive practice automation demo

exports.handler = async function(event) {
  // CORS headers
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
    const { message } = JSON.parse(event.body);
    
    if (!message || message.trim().length === 0) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Message is required' }) };
    }

    // Rate limiting: limit message length
    if (message.length > 500) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Message too long' }) };
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'API not configured' }) };
    }

    const systemPrompt = `You are a practice automation demo assistant for Future Focus Agents, a company that provides automated workflows and smart integrations for dental and healthcare practices in the Denver metro area and Colorado.

Your role is to demonstrate how practice automation works by explaining specific automation workflows in response to visitor questions. You are NOT a chatbot — you are demonstrating what the automation DOES.

Key automations to explain:
1. Missed-Call Text-Back: When a call goes unanswered, the system automatically sends an SMS to the caller within seconds with a friendly message and a booking link. Works 24/7.
2. Smart Appointment Reminders: Multi-touch SMS and email reminders sent at optimal intervals (7 days, 2 days, 2 hours before). Patients confirm with one tap.
3. Automated Review Requests: After a visit, patients receive a timed review request. Happy patients are directed to Google. Concerns are routed privately to the practice first.
4. Patient Recall Campaigns: Automated multi-step outreach to patients overdue for hygiene, treatment, or follow-ups. Sequences run over weeks to re-engage lapsed patients.
5. Insurance & Billing Workflows: Automated verification follow-ups, payment reminders, and billing notifications.

Important guidelines:
- Focus on AUTOMATION, INTEGRATION, and WORKFLOWS — never call yourself a chatbot
- Be specific about what happens step-by-step in each workflow
- Keep responses concise (2-4 sentences max)
- Mention that these connect to existing tools (phone system, PMS, Google Business Profile)
- End responses with a subtle nudge toward learning more or getting started
- Be professional and knowledgeable, not salesy
- If asked about pricing, mention the $47 guide, $29/mo starter, and $99/mo pro plans
- If asked something unrelated to practice automation, politely redirect`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4.1-nano',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 250,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenAI API error:', response.status, errText);
      return { 
        statusCode: 500, 
        headers, 
        body: JSON.stringify({ reply: 'Our demo is experiencing high demand right now. Please try again in a moment, or scroll down to learn more about our automation workflows.' }) 
      };
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'I can help you understand how practice automation works. Try asking about missed calls, appointment reminders, or review requests!';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply })
    };

  } catch (error) {
    console.error('Chat function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ reply: 'Something went wrong with the demo. Please try again or scroll down to explore our automation solutions.' })
    };
  }
};
