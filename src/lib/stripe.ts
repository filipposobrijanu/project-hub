import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10", // μπορείς να βάλεις και νεότερη έκδοση αν το Stripe Dashboard δείχνει άλλη
  typescript: true,
});
