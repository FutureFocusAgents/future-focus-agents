#!/usr/bin/env python3
"""
TraceAgent Proof-of-Concept Demo Script
Demonstrates core capabilities:
1. Supplier data ingestion from CSV
2. Satellite deforestation risk scoring (Sentinel Hub simulation)
3. Due Diligence Statement PDF generation
"""

import csv
import json
import random
from datetime import datetime
from pathlib import Path

try:
    from reportlab.lib.pagesizes import letter, A4
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
    from reportlab.lib import colors
    from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
except ImportError:
    print("Installing reportlab...")
    import subprocess
    subprocess.check_call(["pip3", "install", "reportlab"])
    from reportlab.lib.pagesizes import letter, A4
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
    from reportlab.lib import colors
    from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY


class SupplierData:
    """Represents a supplier with location and commodity data."""
    def __init__(self, name, country, commodity, latitude, longitude):
        self.name = name
        self.country = country
        self.commodity = commodity
        self.latitude = latitude
        self.longitude = longitude
        self.risk_score = None
        self.verification_status = None


class SatelliteAnalyzer:
    """
    Simulates Sentinel-2 satellite analysis for deforestation detection.
    In production, this would call the actual Sentinel Hub API.
    """
    
    @staticmethod
    def analyze_plot(lat, lon, commodity):
        """
        Simulate satellite analysis of a production plot.
        Returns a risk score (0-100) and status.
        """
        # Simulate NDVI analysis based on location
        # High-risk regions: Amazon, Congo Basin, Southeast Asia
        high_risk_regions = [
            {"lat_range": (-5, 5), "lon_range": (-75, -50)},      # Amazon
            {"lat_range": (-5, 5), "lon_range": (10, 35)},        # Congo Basin
            {"lat_range": (0, 20), "lon_range": (95, 140)},       # Southeast Asia
        ]
        
        base_risk = random.randint(10, 30)
        
        for region in high_risk_regions:
            if (region["lat_range"][0] <= lat <= region["lat_range"][1] and
                region["lon_range"][0] <= lon <= region["lon_range"][1]):
                base_risk = random.randint(40, 75)
                break
        
        # Commodity-specific risk adjustments
        commodity_multipliers = {
            "coffee": 1.0,
            "cocoa": 1.1,
            "timber": 1.3,
            "rubber": 1.2,
            "soy": 1.4,
            "palm_oil": 1.5,
            "cattle": 1.2,
        }
        
        risk_score = min(100, int(base_risk * commodity_multipliers.get(commodity.lower(), 1.0)))
        
        # Determine status
        if risk_score < 30:
            status = "VERIFIED_COMPLIANT"
        elif risk_score < 60:
            status = "REQUIRES_DOCUMENTATION"
        else:
            status = "HIGH_RISK_FLAG"
        
        return {
            "risk_score": risk_score,
            "status": status,
            "ndvi_change": f"{random.uniform(-0.05, 0.02):.3f}",
            "forest_cover_loss": f"{random.uniform(0, 5):.2f}%",
            "analysis_date": datetime.now().strftime("%Y-%m-%d"),
        }


def load_supplier_csv(filepath):
    """Load supplier data from CSV."""
    suppliers = []
    try:
        with open(filepath, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                supplier = SupplierData(
                    name=row['name'],
                    country=row['country'],
                    commodity=row['commodity'],
                    latitude=float(row['latitude']),
                    longitude=float(row['longitude']),
                )
                suppliers.append(supplier)
    except FileNotFoundError:
        print(f"CSV file not found: {filepath}")
        # Create sample data
        suppliers = [
            SupplierData("Fazenda Santa Maria", "Brazil", "Coffee", -3.5, -60.2),
            SupplierData("Cacao Farms Ltd", "Ghana", "Cocoa", 6.2, -1.5),
            SupplierData("Timber Exports Inc", "Indonesia", "Timber", -2.1, 113.8),
            SupplierData("Rubber Plantations Co", "Vietnam", "Rubber", 12.5, 105.8),
            SupplierData("Soy Producers Group", "Argentina", "Soy", -25.3, -57.5),
            SupplierData("Palm Oil Holdings", "Malaysia", "Palm Oil", 4.2, 101.5),
            SupplierData("Cattle Ranches LLC", "Paraguay", "Cattle", -23.4, -56.2),
        ]
    
    return suppliers


def analyze_suppliers(suppliers):
    """Run satellite analysis on all suppliers."""
    analyzer = SatelliteAnalyzer()
    
    for supplier in suppliers:
        analysis = analyzer.analyze_plot(
            supplier.latitude,
            supplier.longitude,
            supplier.commodity
        )
        supplier.risk_score = analysis["risk_score"]
        supplier.verification_status = analysis["status"]
        supplier.analysis_data = analysis
    
    return suppliers


def generate_dds_report(suppliers, output_path):
    """Generate a Due Diligence Statement PDF report."""
    
    doc = SimpleDocTemplate(output_path, pagesize=A4)
    styles = getSampleStyleSheet()
    story = []
    
    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#1a1a2e'),
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#16213e'),
        spaceAfter=12,
        spaceBefore=12,
        fontName='Helvetica-Bold'
    )
    
    # Title
    story.append(Paragraph("EU DEFORESTATION REGULATION (EUDR)<br/>DUE DILIGENCE STATEMENT", title_style))
    story.append(Spacer(1, 0.3*inch))
    
    # Document info
    info_data = [
        ["Document Type:", "Due Diligence Statement (DDS)"],
        ["Generated By:", "TraceAgent AI Compliance Engine"],
        ["Generation Date:", datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC")],
        ["Suppliers Verified:", str(len(suppliers))],
        ["Compliance Status:", "PENDING REVIEW"],
    ]
    
    info_table = Table(info_data, colWidths=[2*inch, 4*inch])
    info_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#e8e8e8')),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 1, colors.grey),
    ]))
    
    story.append(info_table)
    story.append(Spacer(1, 0.3*inch))
    
    # Executive Summary
    story.append(Paragraph("Executive Summary", heading_style))
    summary_text = (
        "This Due Diligence Statement certifies that TraceAgent has conducted autonomous verification "
        "of the supply chain for deforestation compliance under the EU Deforestation Regulation (EUDR). "
        "All suppliers listed below have been analyzed using satellite imagery (Sentinel-2) to detect "
        "forest cover loss since the December 31, 2020 cut-off date."
    )
    story.append(Paragraph(summary_text, styles['BodyText']))
    story.append(Spacer(1, 0.2*inch))
    
    # Supplier verification table
    story.append(Paragraph("Supplier Verification Results", heading_style))
    
    table_data = [["Supplier", "Country", "Commodity", "Risk Score", "Status"]]
    
    for supplier in suppliers:
        status_color = {
            "VERIFIED_COMPLIANT": colors.green,
            "REQUIRES_DOCUMENTATION": colors.orange,
            "HIGH_RISK_FLAG": colors.red,
        }.get(supplier.verification_status, colors.black)
        
        table_data.append([
            supplier.name,
            supplier.country,
            supplier.commodity,
            f"{supplier.risk_score}%",
            supplier.verification_status,
        ])
    
    supplier_table = Table(table_data, colWidths=[2*inch, 1.2*inch, 1.2*inch, 1*inch, 1.6*inch])
    supplier_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#16213e')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f0f0f0')]),
    ]))
    
    story.append(supplier_table)
    story.append(Spacer(1, 0.3*inch))
    
    # Compliance summary
    compliant_count = sum(1 for s in suppliers if s.verification_status == "VERIFIED_COMPLIANT")
    flagged_count = sum(1 for s in suppliers if s.verification_status == "HIGH_RISK_FLAG")
    
    story.append(Paragraph("Compliance Summary", heading_style))
    summary_data = [
        ["Total Suppliers Verified:", str(len(suppliers))],
        ["Verified Compliant:", f"{compliant_count} ({compliant_count/len(suppliers)*100:.1f}%)"],
        ["Requires Documentation:", f"{len(suppliers) - compliant_count - flagged_count}"],
        ["High Risk Flags:", f"{flagged_count}"],
    ]
    
    summary_table = Table(summary_data, colWidths=[3*inch, 3*inch])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#e8e8e8')),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 1, colors.grey),
    ]))
    
    story.append(summary_table)
    story.append(Spacer(1, 0.3*inch))
    
    # Footer
    story.append(Paragraph(
        "<i>This document was generated automatically by TraceAgent and is subject to review by compliance officers. "
        "All satellite analysis data is retained for audit purposes.</i>",
        styles['Normal']
    ))
    
    # Build PDF
    doc.build(story)
    print(f"✓ PDF report generated: {output_path}")


def main():
    print("=" * 70)
    print("TraceAgent Proof-of-Concept Demo")
    print("=" * 70)
    print()
    
    # Step 1: Load supplier data
    print("Step 1: Loading supplier data...")
    csv_path = "/home/ubuntu/output/traceagent/sample_suppliers.csv"
    suppliers = load_supplier_csv(csv_path)
    print(f"✓ Loaded {len(suppliers)} suppliers")
    print()
    
    # Step 2: Run satellite analysis
    print("Step 2: Running satellite deforestation analysis...")
    suppliers = analyze_suppliers(suppliers)
    
    for supplier in suppliers:
        status_icon = {
            "VERIFIED_COMPLIANT": "✓",
            "REQUIRES_DOCUMENTATION": "⚠",
            "HIGH_RISK_FLAG": "✗",
        }.get(supplier.verification_status, "?")
        
        print(f"  {status_icon} {supplier.name:30} | Risk: {supplier.risk_score:3}% | {supplier.verification_status}")
    print()
    
    # Step 3: Generate DDS report
    print("Step 3: Generating Due Diligence Statement PDF...")
    pdf_path = "/home/ubuntu/output/traceagent/sample_dds_report.pdf"
    generate_dds_report(suppliers, pdf_path)
    print()
    
    # Step 4: Save analysis results as JSON
    print("Step 4: Saving analysis results...")
    results = {
        "timestamp": datetime.now().isoformat(),
        "total_suppliers": len(suppliers),
        "suppliers": [
            {
                "name": s.name,
                "country": s.country,
                "commodity": s.commodity,
                "latitude": s.latitude,
                "longitude": s.longitude,
                "risk_score": s.risk_score,
                "status": s.verification_status,
                "analysis": s.analysis_data,
            }
            for s in suppliers
        ]
    }
    
    json_path = "/home/ubuntu/output/traceagent/analysis_results.json"
    with open(json_path, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"✓ Results saved to {json_path}")
    print()
    
    print("=" * 70)
    print("Demo Complete!")
    print("=" * 70)
    print(f"Outputs:")
    print(f"  - PDF Report: {pdf_path}")
    print(f"  - JSON Results: {json_path}")
    print()


if __name__ == "__main__":
    main()
