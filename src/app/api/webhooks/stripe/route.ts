import { prisma } from "@/lib/prisma";
import { stripe } from "../../../../lib/stripe";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, { status: 400 });
  }
  // Διαχείριση events
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const userId = session.metadata?.userId;
      if (!userId) break;
      // Upsert subscription
      await prisma.subscription.upsert({
        where: { userId },
        update: {
          stripeCustomerId: session.customer as string,
          stripePriceId: session.line_items?.data[0]?.price?.id || "",
          stripeSubscriptionId: session.subscription as string,
          status: "ACTIVE",
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // προσεγγιστικά
        },
        create: {
          userId,
          stripeCustomerId: session.customer as string,
          stripePriceId: session.line_items?.data[0]?.price?.id || "",
          stripeSubscriptionId: session.subscription as string,
          status: "ACTIVE",
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
      break;
    case "invoice.payment_failed":
      // handle
      break;
  }
  return new Response(null, { status: 200 });
}
