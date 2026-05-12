# SignalStream — Stripe Payment Links

## Live Payment Links

| Tier | Price | Payment Link | Product ID | Price ID |
|------|-------|--------------|------------|----------|
| Starter | $2000/month | [https://buy.stripe.com/14AdR8grMdWGbOzeF09sk0s](https://buy.stripe.com/14AdR8grMdWGbOzeF09sk0s) | `prod_UVMVNldm7MF68i` | `price_1TWLmgA8lMahzRTMQwvzo5uZ` |
| Growth | $4000/month | [https://buy.stripe.com/00wdR8a3o2dY8Cn54q9sk0t](https://buy.stripe.com/00wdR8a3o2dY8Cn54q9sk0t) | `prod_UVMVXoLl8oTJof` | `price_1TWLmnA8lMahzRTM4Luf6wCU` |
| Enterprise | $8000/month | [https://buy.stripe.com/eVqbJ0grMg4O7yjaoK9sk0u](https://buy.stripe.com/eVqbJ0grMg4O7yjaoK9sk0u) | `prod_UVMVATqdcMK5rt` | `price_1TWLmtA8lMahzRTMPSmP7mZq` |

---

## Integration Notes

- These are live Stripe payment links for recurring monthly subscriptions
- Customers can manage their subscription via the Stripe customer portal
- Webhook events should be configured for `checkout.session.completed` and `customer.subscription.updated`
