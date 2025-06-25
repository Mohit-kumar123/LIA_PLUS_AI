import React, { useState } from 'react';
import { submitFeedback } from '../api/feedback';

const initialState = {
  name: '',
  email: '',
  feedback: '',
  category: 'suggestion',
};

function FeedbackForm() {
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitFeedback(form);
      setMessage('Feedback submitted successfully!');
      setForm(initialState);
    } catch (err) {
      setMessage('Error submitting feedback.');
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>
      <label>
        Name:
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Category:
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="suggestion">Suggestion</option>
          <option value="bug">Bug Report</option>
          <option value="feature">Feature Request</option>
        </select>
      </label>
      <label>
        Feedback:
        <textarea name="feedback" value={form.feedback} onChange={handleChange} required />
      </label>
      <button type="submit">Submit</button>
      {message && <div className="message">{message}</div>}
    </form>
  );
}

export default FeedbackForm;