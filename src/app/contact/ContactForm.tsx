"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { submitContactForm } from "./actions";

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // The Rules
    if (!name || name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!subject || subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters.";
    }

    if (!message || message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrors({});
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsPending(false);
      return;
    }

    const result = await submitContactForm(formData);

    if (result.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      setErrors({ form: "Something went wrong. Please try again." });
    }

    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {success && (
        <div className="alert alert-success py-2 rounded-4 mb-4 text-sm">
          Message sent successfully! We will get back to you soon.
        </div>
      )}

      {errors.form && (
        <div className="alert alert-danger py-2 rounded-4 mb-4 text-sm">
          {errors.form}
        </div>
      )}

      <div className="mb-3">
        <label className="text-white-50 small mb-1 d-block">Full name *</label>
        <input
          type="text"
          name="name"
          className={`w-100 input-glass rounded-5 px-3 px-md-4 py-2 py-md-2 ${errors.name ? "border border-danger" : ""}`}
          placeholder="George Papadopoulos"
        />
        {errors.name && (
          <span className="text-danger small mt-1 d-block pl-2">
            {errors.name}
          </span>
        )}
      </div>

      <div className="mb-3">
        <label className="text-white-50 small mb-1 d-block">Email *</label>
        <input
          type="email"
          name="email"
          className={`w-100 input-glass rounded-5 px-3 px-md-4 py-2 py-md-2 ${errors.email ? "border border-danger" : ""}`}
          placeholder="g.papadopoulos@email.com"
        />
        {errors.email && (
          <span className="text-danger small mt-1 d-block pl-2">
            {errors.email}
          </span>
        )}
      </div>

      <div className="mb-3">
        <label className="text-white-50 small mb-1 d-block">Subject *</label>
        <input
          type="text"
          name="subject"
          className={`w-100 input-glass rounded-5 px-3 px-md-4 py-2 py-md-2 ${errors.subject ? "border border-danger" : ""}`}
          placeholder="Message subject"
        />
        {errors.subject && (
          <span className="text-danger small mt-1 d-block pl-2">
            {errors.subject}
          </span>
        )}
      </div>

      <div className="mb-4">
        <label className="text-white-50 small mb-1 d-block">Message *</label>
        <textarea
          name="message"
          rows={5}
          className={`w-100 input-glass rounded-5 px-3 px-md-4 py-2 py-md-2 ${errors.message ? "border border-danger" : ""}`}
          placeholder="Write your message here..."
        ></textarea>
        {errors.message && (
          <span className="text-danger small mt-1 d-block pl-2">
            {errors.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn-glass rounded-5 px-4 py-2 d-flex align-items-center justify-content-center gap-2  w-100"
      >
        <Send size={16} /> {isPending ? "SENDING..." : "SEND MESSAGE"}
      </button>
    </form>
  );
}
