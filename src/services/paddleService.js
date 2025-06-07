import { PADDLE_VENDOR_ID, PADDLE_ENVIRONMENT } from '../config/paddle';

class PaddleService {
  constructor() {
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    // Load Paddle script
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/paddle.js';
    script.async = true;
    document.body.appendChild(script);

    await new Promise((resolve) => {
      script.onload = resolve;
    });

    // Initialize Paddle
    window.Paddle.Setup({
      vendor: PADDLE_VENDOR_ID,
      eventCallback: this.handlePaddleEvent.bind(this)
    });

    this.initialized = true;
  }

  async openCheckout(planId, userData) {
    await this.initialize();

    const checkoutOptions = {
      product: planId,
      email: userData.email,
      successCallback: (data) => {
        // Handle successful checkout
        this.handleCheckoutSuccess(data, userData);
      },
      closeCallback: () => {
        // Handle checkout closed
        console.log('Checkout closed');
      }
    };

    window.Paddle.Checkout.open(checkoutOptions);
  }

  async handleCheckoutSuccess(data, userData) {
    try {
      // Verify the webhook with your backend
      const response = await fetch('/api/verify-paddle-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paddleData: data,
          userData: userData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify subscription');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error handling checkout success:', error);
      throw error;
    }
  }

  handlePaddleEvent(event) {
    // Handle Paddle events (webhook notifications)
    switch (event.event) {
      case 'Subscription.Created':
        this.handleSubscriptionCreated(event);
        break;
      case 'Subscription.Updated':
        this.handleSubscriptionUpdated(event);
        break;
      case 'Subscription.Cancelled':
        this.handleSubscriptionCancelled(event);
        break;
      default:
        console.log('Unhandled Paddle event:', event);
    }
  }

  async handleSubscriptionCreated(event) {
    // Update user's subscription status in your database
    try {
      await fetch('/api/update-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: event,
          status: 'active'
        }),
      });
    } catch (error) {
      console.error('Error handling subscription created:', error);
    }
  }

  async handleSubscriptionUpdated(event) {
    // Update subscription details in your database
    try {
      await fetch('/api/update-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: event,
          status: 'active'
        }),
      });
    } catch (error) {
      console.error('Error handling subscription updated:', error);
    }
  }

  async handleSubscriptionCancelled(event) {
    // Update subscription status in your database
    try {
      await fetch('/api/update-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: event,
          status: 'cancelled'
        }),
      });
    } catch (error) {
      console.error('Error handling subscription cancelled:', error);
    }
  }
}

export const paddleService = new PaddleService(); 