import Stripe from 'stripe';

function createStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return new Proxy({} as Stripe, {
      get(_, prop) {
        if (prop === 'then') return undefined;
        return () => {
          throw new Error('STRIPE_SECRET_KEY is not set. Configure it in your environment variables.');
        };
      },
    });
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, { typescript: true });
}

export const stripe = createStripe();
