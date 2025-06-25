import React, { useEffect, useState } from 'react';
import { getFeedback } from '../api/feedback';

function FeedbackDashboard() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [sort, setSort] = useState('desc');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchFeedback();
    // eslint-disable-next-line
  }, [sort, filter]);

  const fetchFeedback = async () => {
    try {
      const params = {};
      if (filter) params.category = filter;
      params.order=sort;
      const data = await getFeedback(params);
      setFeedbackList(data.data);
    } catch (err) {
      setFeedbackList([]);
    }
  };

  return (
    <div className="dashboard">
      <h2>Feedback Dashboard</h2>
      <div className="dashboard-controls">
        <label>
          Filter by Category:
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="suggestion">Suggestion</option>
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
          </select>
        </label>
        <label>
          Sort by Date:
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </label>
      </div>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Category</th>
            <th>Feedback</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.length === 0 ? (
            <tr>
              <td colSpan="5">No feedback found.</td>
            </tr>
          ) : (
            feedbackList.map((fb, idx) => (
              <tr key={idx}>
                <td>{fb.name}</td>
                <td>{fb.email}</td>
                <td>{fb.category || 'N/A'}</td>
                <td>{fb.feedback}</td>
                <td>{new Date(fb.createdAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FeedbackDashboard;