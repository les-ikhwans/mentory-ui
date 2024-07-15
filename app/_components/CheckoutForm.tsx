// components/CheckoutForm.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement, CardElementProps, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import axios from 'axios';

interface CheckoutFormProps {
  bookingData: {
    service: string;
    date: Date;
    time: string;
    client?: string | null; 
  };
  handleBookingSuccess: (paymentIntentId: string) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ bookingData, handleBookingSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [succeeded, setSucceeded] = useState<boolean>(false);

  useEffect(() => {
    axios.post('http://localhost:5000/create-payment-intent', { amount: 5000 }) // Amount in cents
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => console.error('Error creating payment intent', err));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      handleBookingSuccess(payload.paymentIntent.id);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" />
      <button disabled={processing || succeeded} id="submit">
        {processing ? 'Processing...' : 'Pay now'}
      </button>
      {error && <div className="card-error">{error}</div>}
      {succeeded && <p>Payment succeeded!</p>}
    </form>
  );
};

export default CheckoutForm;
