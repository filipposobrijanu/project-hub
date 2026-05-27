import { auth } from "@/lib/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactForm from "./ContactForm";

export default async function ContactPage() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[90vh] mt-5 mb-5 px-3 md:px-4 animate-fade-in-up overflow-hidden">
      {/* Title */}
      <div className="text-center mb-3 mb-md-4 px-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Contact Us
        </h1>
        <p className="text-white-50 mt-2 text-sm md:text-base">
          Do you have a question or suggestion? Send us a message and we will
          respond immediately.
        </p>
      </div>

      {/* Contact Form & Info */}
      <div
        className="row g-4 justify-content-center w-100 m-0"
        style={{ maxWidth: "1000px" }}
      >
        {/* Contact Form Container */}
        <div className="col-lg-7 col-md-10 col-12 px-0 px-md-3">
          <div className="glass-card p-4 p-md-5 h-100 text-start rounded-5">
            <h3 className="text-white mb-4 d-flex align-items-center gap-2 text-xl md:text-2xl font-semibold">
              Send us a message
            </h3>

            {/* Inject the Client Form here */}
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
