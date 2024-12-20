const express = require('express');
const stripe = require('stripe')(
  'sk_test_51QXlMIAhtcniSr7W2mS987DvagfXGgRK99MvULZZcp4lsWtoOTE7AaEFAOmvCDSsL5n0XtHDc3iWUlyQrn0BynT000TCPrRqWr'
);
const app = express();

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: 'https://snazzy-mermaid-8908fa.netlify.app/success',
    cancel_url: 'https://snazzy-mermaid-8908fa.netlify.app/cancel',
  });

  res.json({ sessionId: session.id });
});

app.listen(3000, () => console.log('Server running on port 3000'));
