import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51QXlMIAhtcniSr7WrarafcYoAY7ydO54fztoIxhHM92c407cWdvdjO4qXYu7xQf1lwNPRxazQ6EbhL2AnK8e2zNi00XQu4qPW0'
);

const StripeCheckout = () => {
  const handleCheckout = async (priceId: string) => {
    const stripe = await stripePromise;
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });
    const { sessionId } = await response.json();
    stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <div>
      <h1>Subscribe</h1>
      <button onClick={() => handleCheckout('price_1QXldyAhtcniSr7WOeFSHXtb')}>
        Subscribe to Free Plan
      </button>
      <button onClick={() => handleCheckout('price_1QXnGQAhtcniSr7WubLNKVsD')}>
        Subscribe to Premium Plan
      </button>
    </div>
  );
};

export default StripeCheckout;
