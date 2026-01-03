import React, { useState } from "react";
import axios from "axios";
import "./ContactForm.css";

function ContactForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/contacts", formData);
      setFormData({ name: "", email: "", phone: "", message: "" });
      onSuccess();
    } catch (err) {
      setErrors({ submit: "Submission failed" });
    }
    setLoading(false);
  };

  const isValid =
    Object.keys(errors).length === 0 &&
    formData.name &&
    formData.email &&
    formData.phone;

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add Contact</h2>

      <input
        className={`form-input ${errors.name ? "error" : ""}`}
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      {errors.name && <p className="error-message">{errors.name}</p>}

      <input
        className={`form-input ${errors.email ? "error" : ""}`}
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {errors.email && <p className="error-message">{errors.email}</p>}

      <input
        className={`form-input ${errors.phone ? "error" : ""}`}
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      {errors.phone && <p className="error-message">{errors.phone}</p>}

      <textarea
        className="form-textarea"
        placeholder="Message (optional)"
        rows="4"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />

      <button
        type="submit"
        disabled={!isValid || loading}
        className={`submit-btn ${!isValid || loading ? "disabled" : ""}`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {errors.submit && <p className="submit-error">{errors.submit}</p>}
    </form>
  );
}

export default ContactForm;
