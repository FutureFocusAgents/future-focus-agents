#!/usr/bin/env python3
"""
Create TraceAgent Stripe products and pricing tiers.
Requires: STRIPE_API_KEY environment variable
"""
import os
import json
import stripe

stripe.api_key = ""STRIPE_API_KEY_REDACTED""

def create_products():
    """Create Stripe products for TraceAgent pricing tiers."""
    
    products = [
        {
            "name": "TraceAgent Pilot",
            "description": "Validate TraceAgent on a single commodity with 100 suppliers.",
            "price": 500000,  # $5,000 in cents
            "recurring": False,
            "metadata": {
                "tier": "pilot",
                "suppliers": "100",
                "commodities": "1",
            }
        },
        {
            "name": "TraceAgent Professional",
            "description": "Full autonomous compliance for mid-market importers.",
            "price": 2500000,  # $25,000 in cents
            "recurring": True,
            "interval": "year",
            "metadata": {
                "tier": "professional",
                "suppliers": "1000",
                "commodities": "7",
            }
        },
        {
            "name": "TraceAgent Enterprise",
            "description": "Unlimited scale with dedicated agent team and white-glove onboarding.",
            "price": 5000000,  # $50,000 in cents
            "recurring": True,
            "interval": "year",
            "metadata": {
                "tier": "enterprise",
                "suppliers": "unlimited",
                "commodities": "7",
            }
        },
    ]
    
    results = []
    
    for product_data in products:
        try:
            # Create product
            product = stripe.Product.create(
                name=product_data["name"],
                description=product_data["description"],
                metadata=product_data["metadata"],
                type="service",
            )
            
            # Create price
            price_params = {
                "product": product.id,
                "unit_amount": product_data["price"],
                "currency": "usd",
            }
            
            if product_data["recurring"]:
                price_params["recurring"] = {
                    "interval": product_data.get("interval", "month"),
                    "usage_type": "licensed",
                }
            
            price = stripe.Price.create(**price_params)
            
            result = {
                "tier": product_data["metadata"]["tier"],
                "product_id": product.id,
                "price_id": price.id,
                "amount": f"${product_data['price'] / 100:.2f}",
                "recurring": product_data["recurring"],
                "stripe_link": f"https://dashboard.stripe.com/products/{product.id}"
            }
            results.append(result)
            print(f"✓ Created {product_data['name']}")
            print(f"  Product ID: {product.id}")
            print(f"  Price ID: {price.id}")
            print()
            
        except stripe.error.StripeError as e:
            print(f"✗ Error creating {product_data['name']}: {e}")
            results.append({
                "tier": product_data["metadata"]["tier"],
                "error": str(e)
            })
    
    return results

if __name__ == "__main__":
    print("=" * 60)
    print("TraceAgent Stripe Product Creation")
    print("=" * 60)
    print()
    
    results = create_products()
    
    # Save results
    with open("/home/ubuntu/output/traceagent/stripe_products.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print("=" * 60)
    print("Results saved to stripe_products.json")
    print("=" * 60)
