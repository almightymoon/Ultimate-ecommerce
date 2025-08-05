# PayPal Integration Setup Guide

## Overview
This guide will help you set up PayPal integration for the Ultimate E-Commerce checkout system.

## Prerequisites
- PayPal Developer Account
- PayPal Business Account (for production)

## Setup Steps

### 1. Create PayPal Developer Account
1. Go to [PayPal Developer Portal](https://developer.paypal.com/)
2. Sign up for a developer account
3. Navigate to the Dashboard

### 2. Create PayPal App
1. In the Developer Dashboard, go to "My Apps & Credentials"
2. Click "Create App"
3. Choose "Business" app type
4. Give your app a name (e.g., "Ultimate E-Commerce")
5. Click "Create App"

### 3. Get Client ID
1. After creating the app, you'll see your Client ID
2. Copy the Client ID for both Sandbox and Live environments
3. Keep these secure - they're your app credentials

### 4. Configure Environment Variables
Create a `.env.local` file in your project root and add:

```env
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here

# For development (Sandbox)
# NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_sandbox_client_id

# For production (Live)
# NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_live_client_id
```

### 5. Test the Integration
1. Start your development server: `npm run dev`
2. Add items to cart
3. Go to checkout
4. Test PayPal payment flow

## PayPal Button Features

### Current Implementation
- **Payment Method**: PayPal only (can be extended for credit cards)
- **Currency**: USD
- **Intent**: Capture (immediate payment)
- **Shipping**: No shipping preference (handled separately)

### Customization Options
You can modify the PayPal button configuration in `src/components/PayPalButton.tsx`:

```javascript
const initialOptions = {
  'client-id': paypalClientId,
  currency: 'USD',           // Change currency
  intent: 'capture',         // 'capture' or 'authorize'
  'disable-funding': 'credit,card', // Disable specific funding sources
};
```

## Security Considerations

### Environment Variables
- Never commit your PayPal Client ID to version control
- Use different Client IDs for development and production
- Keep your Client Secret secure (server-side only)

### Production Checklist
- [ ] Use Live PayPal Client ID
- [ ] Test with real PayPal accounts
- [ ] Implement proper error handling
- [ ] Add order validation
- [ ] Set up webhook notifications (optional)

## Troubleshooting

### Common Issues

1. **PayPal Button Not Loading**
   - Check if Client ID is correct
   - Verify environment variable is set
   - Check browser console for errors

2. **Payment Fails**
   - Ensure you're using correct PayPal account
   - Check if account has sufficient funds
   - Verify currency settings

3. **Order Not Created**
   - Check API route `/api/orders`
   - Verify database connection
   - Check server logs

### Debug Mode
Enable debug logging by adding to your `.env.local`:

```env
NEXT_PUBLIC_PAYPAL_DEBUG=true
```

## API Endpoints

### Orders API
- **POST** `/api/orders` - Create new order
- **GET** `/api/orders` - Fetch orders (with optional userId filter)

### Order Structure
```javascript
{
  orderId: "ORD-1234567890-ABC123",
  userId: "user_id_or_guest",
  items: [...],
  shipping: {...},
  payment: {
    method: "paypal",
    transactionId: "paypal_transaction_id",
    amount: 99.99,
    currency: "USD",
    status: "completed"
  },
  totals: {...},
  status: "pending",
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

## Support

For PayPal-specific issues:
- [PayPal Developer Documentation](https://developer.paypal.com/docs/)
- [PayPal Support](https://www.paypal.com/support/)

For application issues:
- Check the application logs
- Review the browser console
- Verify all environment variables are set correctly 