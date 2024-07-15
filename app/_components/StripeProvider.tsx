// components/StripeProvider.tsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PIELWG3sFUL55M04ujSwGq95haTwoyhKsyqcP1FmvjXwiDJ3KFT7AAVQU9pGfZBOgbjMZIXr7UpLD1AMKlnOjgx00rdrw8G82');

const StripeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
