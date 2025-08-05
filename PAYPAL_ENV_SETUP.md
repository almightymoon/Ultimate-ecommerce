# PayPal Environment Variables Setup

## Required Environment Variables

Add these to your `.env.local` file:

```env
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here

# For Development (Sandbox)
# NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_sandbox_client_id
# PAYPAL_CLIENT_SECRET=your_sandbox_client_secret

# For Production (Live)
# NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_live_client_id
# PAYPAL_CLIENT_SECRET=your_live_client_secret
```

## How to Get Your PayPal Credentials

1. **Go to PayPal Developer Portal**: https://developer.paypal.com/
2. **Sign in** with your PayPal account
3. **Navigate to "My Apps & Credentials"**
4. **Create a new app** or use an existing one
5. **Copy the Client ID and Client Secret**

## Security Notes

- ✅ `NEXT_PUBLIC_PAYPAL_CLIENT_ID` - Safe to expose (used in frontend)
- 🔒 `PAYPAL_CLIENT_SECRET` - Keep secret (used only in server-side API routes)
- Never commit these values to version control
- Use different credentials for development and production

## Testing

1. Start your development server: `npm run dev`
2. Add items to cart
3. Go to checkout
4. Test PayPal payment flow
5. Check the browser console and server logs for any errors

## API Endpoints

The integration uses these server-side API routes:
- `POST /api/paypal/create-order` - Creates PayPal order
- `POST /api/paypal/capture-order` - Captures payment
- `POST /api/orders` - Creates order in your database

## Troubleshooting

If you get errors:
1. Check that both environment variables are set
2. Verify your PayPal credentials are correct
3. Ensure you're using the right environment (sandbox vs live)
4. Check the browser console and server logs for detailed error messages 