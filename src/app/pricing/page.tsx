import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Check, Crown, Zap, Shield, HelpCircle } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreditCards from "@/components/CreditCards/CreditCards";

export default async function PricingPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[100vh] mt-5 mb-5 px-3 md:px-4 animate-fade-in-up overflow-hidden">
      {/* Title */}
      <div className="text-center mb-4 md:mb-5 px-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Simple, transparent pricing
        </h1>
        <p className="text-white-50 mt-2 text-sm md:text-base">
          Unlock unlimited projects and premium support.
        </p>
      </div>

      {/* Pricing Cards */}
      <div
        className="row g-4 justify-content-center w-100 m-0"
        style={{ maxWidth: "900px" }}
      >
        {/* Free Plan */}
        <div className="col-lg-6 col-md-12 px-0 px-md-2">
          <div className="glass-card threed-card-shit p-4 p-md-5 h-100 d-flex flex-column justify-content-between text-center rounded-5">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
                Free
              </h2>
              <p className="fs-3 md:fs-4 font-bold text-white mb-4">€0</p>
              <ul className="list-unstyled space-y-3 text-white-50 text-start d-inline-block">
                <li className="d-flex align-items-center gap-2 mb-2 text-sm md:text-base">
                  <Check className="text-white-50" size={18} /> Up to 3 projects
                </li>
                <li className="d-flex align-items-center gap-2 mb-2 text-sm md:text-base">
                  <Check className="text-white-50" size={18} /> Basic task
                  management
                </li>
                <li className="d-flex align-items-center gap-2 mb-2 text-sm md:text-base">
                  <Check className="text-white-50" size={18} /> 1 user
                </li>
              </ul>
            </div>
            <button
              disabled
              className="btn-glass rounded-5 px-4 py-2 w-100 opacity-50 mt-4"
            >
              CURRENT PROGRAM
            </button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="col-lg-6 col-md-12 px-0 px-md-2 mt-4 mt-lg-0">
          <div className="glass-card p-4 threed-card-shit p-md-5 h-100 d-flex flex-column justify-content-between text-center position-relative overflow-hidden rounded-5">
            {/* Pro badge */}
            <span
              className="badge position-absolute top-0 end-0 m-3 rounded-4 py-2 px-3 d-inline-flex align-items-center gap-1"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Crown size={14} className="text-white" /> PRO
            </span>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
                Pro
              </h2>
              <p className="fs-3 md:fs-4 font-bold text-white mb-4">
                €9
                <span className="fs-6 md:fs-5 text-white-50 fw-normal">
                  /month
                </span>
              </p>
              <ul className="list-unstyled space-y-3 text-white-50 text-start d-inline-block">
                <li className="d-flex align-items-center gap-2 mb-2 text-sm md:text-base">
                  <Check className="text-white" size={18} /> Unlimited projects
                </li>
                <li className="d-flex align-items-center gap-2 mb-2 text-sm md:text-base">
                  <Check className="text-white" size={18} /> Advanced task
                  filters
                </li>
                <li className="d-flex align-items-center gap-2 mb-2 text-sm md:text-base">
                  <Check className="text-white" size={18} /> Unlimited users
                </li>
                <li className="d-flex align-items-center gap-2 mb-2 text-sm md:text-base">
                  <Check className="text-white" size={18} /> Priority support
                </li>
              </ul>
            </div>
            <form
              action={async () => {
                "use server";
                const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
                const stripeSession = await stripe.checkout.sessions.create({
                  line_items: [
                    { price: process.env.STRIPE_PRICE_ID!, quantity: 1 },
                  ],
                  mode: "subscription",
                  success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
                  cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
                  customer_email: session.user!.email!,
                  metadata: { userId: session.user!.id },
                });
                redirect(stripeSession.url!);
              }}
            >
              <button
                type="submit"
                className="btn-glass rounded-5 px-4 py-2 w-100 align-items-center justify-content-center mt-4 fw-bold"
              >
                REGISTER NOW
              </button>
              <div className="mt-3">
                <CreditCards />
              </div>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-5 mt-md-5 w-100 px-0" style={{ maxWidth: "900px" }}>
          <h4 className="text-white mt-3 mb-4 text-center text-xl md:text-2xl font-bold">
            Frequently asked questions
          </h4>
          <div className="row g-3 m-0">
            {[
              {
                q: "Can I change plans?",
                a: "Yes, you can upgrade or downgrade at any time.",
              },
              {
                q: "How is payment made?",
                a: "Through Stripe, securely. We accept all cards.",
              },
              {
                q: "Is there a free trial?",
                a: "The Free plan is free forever. You can use it as much as you want.",
              },
              {
                q: "Can I cancel the subscription?",
                a: "Yes, anytime. Your subscription will remain active until the end of the cycle.",
              },
            ].map((faq, idx) => (
              <div className="col-md-6 px-2" key={idx}>
                {/* Added h-100 to make all boxes exact same height */}
                <div className="glass-card p-3 p-md-4 text-start h-100 rounded-5">
                  <div className="d-flex gap-3 align-items-start">
                    {/* Balanced sizing with shrink-0 configuration */}
                    <HelpCircle
                      className="text-white-50 mt-1 shrink-0"
                      size={20}
                    />
                    <div>
                      <h5 className="text-white text-sm md:text-base mb-1 font-semibold">
                        {faq.q}
                      </h5>
                      <p className="text-white-50 text-xs md:text-sm mb-0 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
