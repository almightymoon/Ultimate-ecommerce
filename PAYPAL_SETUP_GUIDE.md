# PayPal Setup Guide - Simple Version

## Quick Setup (Client-Side Only)

For now, you only need **one environment variable** to get PayPal working:

### 1. Add to your `.env.local` file:

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
```

### 2. How to get your PayPal Client ID:

1. Go to [PayPal Developer Portal](https://developer.paypal.com/)
2. Sign in with your PayPal account
3. Go to "My Apps & Credentials"
4. Create a new app or use an existing one
5. Copy the **Client ID** (not the secret)

### 3. For Testing (Sandbox):
- Use your **Sandbox Client ID**
- Test with PayPal sandbox accounts

### 4. For Production (Live):
- Use your **Live Client ID**
- Real PayPal accounts will work

## Current Implementation

The PayPal integration now works with:
- ✅ **Client-side only** - No server-side API needed
- ✅ **Just Client ID** - No secret required
- ✅ **Simple setup** - One environment variable
- ✅ **Secure** - PayPal handles all payment processing

## Testing

1. Add the Client ID to your `.env.local`
2. Restart your development server
3. Go to checkout page
4. Click PayPal button
5. Complete test payment

## Troubleshooting

If you still get errors:
1. Make sure your Client ID is correct
2. Check that you're using the right environment (sandbox vs live)
3. Verify your PayPal app is active
4. Check the browser console for detailed errors

## Next Steps

Once this basic setup works, you can:
1. Add server-side integration for better security
2. Add `PAYPAL_CLIENT_SECRET` for server-side API calls
3. Implement webhook handling
4. Add order tracking and management 