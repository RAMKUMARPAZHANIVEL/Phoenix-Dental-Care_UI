"use client";

import { useState } from "react";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    "preferred-date": "",
  });

  function validate() {
    const e = {};
    if (!fields.name.trim() || fields.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!fields.phone.trim() || !/^\d{10,}$/.test(fields.phone.replace(/\s/g, "")))
      e.phone = "Please enter a valid phone number (at least 10 digits).";
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = "Please enter a valid email address.";
    if (!fields.message.trim() || fields.message.trim().length < 10)
      e.message = "Please describe your query or treatment interest (at least 10 characters).";
    if (fields["preferred-date"]) {
      const chosen = new Date(fields["preferred-date"]);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosen < today) e["preferred-date"] = "Please select today or a future date.";
    }
    return e;
  }

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus("submitting");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...fields }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">Message Received!</h3>
        <p className="text-green-700">
          Thank you! We&apos;ve received your message and will contact you shortly to confirm your appointment.
        </p>
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200"
    }`;

  return (
    <form
      name="contact"
      method="POST"
      // data-netlify="true"
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
    >
      <input type="hidden" name="form-name" value="contact" />

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-required="true"
          aria-describedby={errors.name ? "name-error" : undefined}
          value={fields.name}
          onChange={handleChange}
          disabled={status === "submitting"}
          className={inputClass("name")}
          placeholder="Your full name"
        />
        {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          aria-required="true"
          aria-describedby={errors.phone ? "phone-error" : undefined}
          value={fields.phone}
          onChange={handleChange}
          disabled={status === "submitting"}
          className={inputClass("phone")}
          placeholder="+91 XXXXX XXXXX"
        />
        {errors.phone && <p id="phone-error" className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          aria-describedby={errors.email ? "email-error" : undefined}
          value={fields.email}
          onChange={handleChange}
          disabled={status === "submitting"}
          className={inputClass("email")}
          placeholder="your@email.com"
        />
        {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message / Treatment Interest <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          aria-required="true"
          aria-describedby={errors.message ? "message-error" : undefined}
          value={fields.message}
          onChange={handleChange}
          disabled={status === "submitting"}
          className={inputClass("message")}
          placeholder="Tell us about your dental concern or the treatment you're interested in..."
        />
        {errors.message && <p id="message-error" className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      <div>
        <label htmlFor="preferred-date" className="block text-sm font-medium mb-1">
          Preferred Appointment Date <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="preferred-date"
          name="preferred-date"
          type="date"
          aria-describedby={errors["preferred-date"] ? "date-error" : undefined}
          value={fields["preferred-date"]}
          onChange={handleChange}
          disabled={status === "submitting"}
          className={inputClass("preferred-date")}
        />
        {errors["preferred-date"] && (
          <p id="date-error" className="text-red-500 text-xs mt-1">{errors["preferred-date"]}</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl p-3">
          Something went wrong. Please try again or call us directly at +91 90032 26380.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-primary text-white px-8 py-3 rounded-xl shadow hover:scale-105 transition font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
