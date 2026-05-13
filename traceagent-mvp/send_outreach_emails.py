#!/usr/bin/env python3
"""
TraceAgent Outreach Email Campaign via Resend API
Sends personalized EUDR compliance emails to target companies
"""

import json
import requests
from datetime import datetime
from typing import List, Dict

# Resend API configuration
RESEND_API_KEY = ""RESEND_API_KEY_REDACTED""
RESEND_API_URL = "https://api.resend.com/emails"
SEND_FROM = "hello@thefuturefocus.net"
SEND_FROM_NAME = "TraceAgent — Future Focus Agents"

# Target companies
TARGETS = [
    # Germany — Coffee
    {"name": "Neumann Kaffee Gruppe", "email": "info@nkg.net", "country": "Germany", "commodity": "Coffee"},
    {"name": "J.J. Darboven", "email": "contact@darboven.de", "country": "Germany", "commodity": "Coffee"},
    {"name": "Bela Coffee", "email": "info@bela.de", "country": "Germany", "commodity": "Coffee"},
    {"name": "Dallmayr", "email": "info@dallmayr.de", "country": "Germany", "commodity": "Coffee"},
    {"name": "Cafe Imports Berlin", "email": "hello@cafeimports.de", "country": "Germany", "commodity": "Coffee"},
    {"name": "Rösterei Taunusstein", "email": "info@roesterei-taunusstein.de", "country": "Germany", "commodity": "Coffee"},
    
    # France — Cocoa
    {"name": "Valrhona", "email": "contact@valrhona.com", "country": "France", "commodity": "Cocoa"},
    {"name": "Mathez", "email": "info@mathez.fr", "country": "France", "commodity": "Cocoa"},
    {"name": "Schaal Chocolatier", "email": "contact@schaal-chocolatier.com", "country": "France", "commodity": "Cocoa"},
    {"name": "RICHART", "email": "contact@richart.com", "country": "France", "commodity": "Cocoa"},
    {"name": "Atelier du Confiseur", "email": "info@atelierduconfiseur.fr", "country": "France", "commodity": "Cocoa"},
    {"name": "Barry Callebaut France", "email": "contact@barry-callebaut.fr", "country": "France", "commodity": "Cocoa"},
    
    # Netherlands — Timber
    {"name": "J. Mulder Houtimport", "email": "info@mulderhoutimport.nl", "country": "Netherlands", "commodity": "Timber"},
    {"name": "Van den Berg Hardhout", "email": "info@vandenberghardhout.com", "country": "Netherlands", "commodity": "Timber"},
    {"name": "Rollé Wood Supplies", "email": "contact@rolle-wood.nl", "country": "Netherlands", "commodity": "Timber"},
    {"name": "Gevers Leuven Hout", "email": "info@geversleuvenhout.nl", "country": "Netherlands", "commodity": "Timber"},
    {"name": "XLWOOD B.V.", "email": "contact@xlwood.nl", "country": "Netherlands", "commodity": "Timber"},
    {"name": "Timberhub Netherlands", "email": "info@timberhub.nl", "country": "Netherlands", "commodity": "Timber"},
    
    # UK — Leather & Rubber
    {"name": "A&A Crack & Sons", "email": "info@aacrack.com", "country": "UK", "commodity": "Leather"},
    {"name": "Yarwood Leather", "email": "contact@yarwoodleather.com", "country": "UK", "commodity": "Leather"},
    {"name": "Thomas Ware & Sons", "email": "info@thomasware.co.uk", "country": "UK", "commodity": "Leather"},
    {"name": "Abbey England", "email": "contact@abbeyengland.com", "country": "UK", "commodity": "Leather"},
    {"name": "Dunlop Sports", "email": "contact@dunlopsports.com", "country": "UK", "commodity": "Rubber"},
    {"name": "Michelin UK", "email": "contact@michelin.co.uk", "country": "UK", "commodity": "Rubber"},
    {"name": "Trelleborg Sealing Solutions", "email": "contact@trelleborg.com", "country": "UK", "commodity": "Rubber"},
]


def generate_email_body(company: Dict) -> tuple:
    """Generate personalized email subject and body."""
    
    subject = f"Your EUDR Deadline is 231 Days Away — Autonomous Compliance Solution"
    
    body = f"""Dear {company['name']} Team,

Your supply chain has 231 days until the EU Deforestation Regulation (EUDR) enforcement on December 30, 2026.

If you import {company['commodity']} into the EU, you must prove every production plot is deforestation-free — with GPS-level precision. Non-compliance = 4% of total EU turnover in fines.

Most companies have hundreds or thousands of suppliers across dozens of countries. Collecting GPS coordinates, verifying satellite imagery, and filing Due Diligence Statements manually is operationally impossible at scale.

**Introducing TraceAgent — The First Autonomous EUDR Compliance Engine**

TraceAgent is not a dashboard. It's an AI agent that:

1. **Chases your suppliers 24/7** — Autonomously contacts every supplier via email, WhatsApp, and portal integrations to collect GPS coordinates and chain-of-custody documents (in any language).

2. **Verifies via satellite** — Cross-references each GPS coordinate against Sentinel-2 satellite imagery to detect forest cover loss since December 31, 2020.

3. **Files your DDS autonomously** — Compiles and submits your Due Diligence Statement directly to the EU Information System. You receive a compliance certificate and full audit trail.

**Why TraceAgent?**
- 48-hour onboarding — Upload your supplier list. We start working immediately.
- No manual work — The agent does the entire workflow end-to-end.
- Costs less than the fine — Pilot: $5,000 (100 suppliers). Professional: $25,000/year (1,000 suppliers, all commodities).

**Your Next Step:**
Let's verify your first 100 suppliers within 48 hours. No commitment. No risk.

Schedule a 15-minute demo: https://traceagent.thefuturefocus.net
Or reply to this email to discuss your supply chain specifics.

Your compliance deadline is December 30, 2026. Every day you wait is a day closer to enforcement without a solution.

Best regards,

TraceAgent Team
Future Focus Agents
hello@thefuturefocus.net
https://traceagent.thefuturefocus.net"""
    
    return subject, body


def send_email(company: Dict) -> Dict:
    """Send email via Resend API."""
    
    subject, body = generate_email_body(company)
    
    payload = {
        "from": f"{SEND_FROM_NAME} <{SEND_FROM}>",
        "to": company["email"],
        "subject": subject,
        "text": body,
        "reply_to": SEND_FROM,
    }
    
    headers = {
        "Authorization": f"Bearer {RESEND_API_KEY}",
        "Content-Type": "application/json",
    }
    
    try:
        response = requests.post(RESEND_API_URL, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        
        result = response.json()
        return {
            "company": company["name"],
            "email": company["email"],
            "commodity": company["commodity"],
            "status": "sent",
            "message_id": result.get("id"),
            "timestamp": datetime.now().isoformat(),
        }
    except requests.exceptions.RequestException as e:
        return {
            "company": company["name"],
            "email": company["email"],
            "commodity": company["commodity"],
            "status": "failed",
            "error": str(e),
            "timestamp": datetime.now().isoformat(),
        }


def main():
    """Send outreach emails to all target companies."""
    
    print("=" * 70)
    print("TraceAgent Outreach Email Campaign")
    print("=" * 70)
    print()
    print(f"Sending {len(TARGETS)} personalized emails via Resend API...")
    print()
    
    results = []
    sent_count = 0
    failed_count = 0
    
    for i, company in enumerate(TARGETS, 1):
        print(f"[{i}/{len(TARGETS)}] Sending to {company['name']}...", end=" ")
        
        result = send_email(company)
        results.append(result)
        
        if result["status"] == "sent":
            print(f"✓ Sent (ID: {result['message_id'][:8]}...)")
            sent_count += 1
        else:
            print(f"✗ Failed: {result['error']}")
            failed_count += 1
    
    print()
    print("=" * 70)
    print("Campaign Results")
    print("=" * 70)
    print(f"Total Sent: {sent_count}/{len(TARGETS)}")
    print(f"Failed: {failed_count}/{len(TARGETS)}")
    print(f"Success Rate: {sent_count/len(TARGETS)*100:.1f}%")
    print()
    
    # Save results
    log_file = "/home/ubuntu/output/traceagent/outreach_log.json"
    with open(log_file, "w") as f:
        json.dump({
            "campaign_date": datetime.now().isoformat(),
            "total_targets": len(TARGETS),
            "sent": sent_count,
            "failed": failed_count,
            "results": results,
        }, f, indent=2)
    
    print(f"Campaign log saved to: {log_file}")
    print()


if __name__ == "__main__":
    main()
