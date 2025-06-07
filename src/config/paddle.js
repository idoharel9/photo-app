// Paddle configuration
export const PADDLE_VENDOR_ID = 'YOUR_VENDOR_ID'; // Replace with your Paddle vendor ID
export const PADDLE_ENVIRONMENT = 'sandbox'; // Change to 'production' for live environment

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  basic: {
    id: 'BASIC_PLAN_ID', // Replace with your Paddle plan ID
    name: 'Basic',
    price: 29,
    features: [
      'Up to 100 photos per month',
      'Basic QR code generation',
      'Cloud storage for 30 days',
      'Email support'
    ]
  },
  professional: {
    id: 'PRO_PLAN_ID', // Replace with your Paddle plan ID
    name: 'Professional',
    price: 79,
    features: [
      'Up to 500 photos per month',
      'Advanced QR code customization',
      'Cloud storage for 90 days',
      'Priority support',
      'Custom branding'
    ]
  },
  enterprise: {
    id: 'ENTERPRISE_PLAN_ID', // Replace with your Paddle plan ID
    name: 'Enterprise',
    price: 199,
    features: [
      'Unlimited photos',
      'Full QR code customization',
      'Permanent cloud storage',
      '24/7 support',
      'Custom branding',
      'API access'
    ]
  }
}; 