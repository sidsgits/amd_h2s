import React, { useState } from 'react';

export default function ContextForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    mood: '',
    timeOfDay: '',
    goal: '',
    restrictions: '',
    query: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputStyle = {
    width: '100%', 
    padding: '0.75rem', 
    borderRadius: '0.5rem', 
    background: 'rgba(255,255,255,0.05)', 
    color: 'white', 
    border: '1px solid rgba(255,255,255,0.1)',
    fontFamily: 'inherit'
  };

  const labelStyle = {
    display: 'block', 
    marginBottom: '0.5rem', 
    fontSize: '0.875rem', 
    color: '#94a3b8'
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>How are you feeling?</label>
        <select name="mood" value={formData.mood} onChange={handleChange} style={inputStyle}>
          <option value="" style={{ color: 'black' }}>Select Mood...</option>
          <option value="tired" style={{ color: 'black' }}>Tired / Low Energy</option>
          <option value="stressed" style={{ color: 'black' }}>Stressed / Anxious</option>
          <option value="energetic" style={{ color: 'black' }}>Energetic / Active</option>
          <option value="hungry" style={{ color: 'black' }}>Starving / Hangry</option>
          <option value="sick" style={{ color: 'black' }}>Under the weather</option>
        </select>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Time of Day</label>
        <select name="timeOfDay" value={formData.timeOfDay} onChange={handleChange} style={inputStyle}>
          <option value="" style={{ color: 'black' }}>Select Time...</option>
          <option value="breakfast" style={{ color: 'black' }}>Morning / Breakfast</option>
          <option value="lunch" style={{ color: 'black' }}>Mid-day / Lunch</option>
          <option value="dinner" style={{ color: 'black' }}>Evening / Dinner</option>
          <option value="late-night snack" style={{ color: 'black' }}>Late Night Snack</option>
          <option value="pre-workout" style={{ color: 'black' }}>Pre-workout</option>
          <option value="post-workout" style={{ color: 'black' }}>Post-workout</option>
        </select>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Primary Goal</label>
        <select name="goal" value={formData.goal} onChange={handleChange} style={inputStyle}>
          <option value="" style={{ color: 'black' }}>Select Goal...</option>
          <option value="weight loss" style={{ color: 'black' }}>Weight Loss</option>
          <option value="muscle gain" style={{ color: 'black' }}>Muscle Gain / Protein</option>
          <option value="energy boost" style={{ color: 'black' }}>Energy Boost</option>
          <option value="brain focus" style={{ color: 'black' }}>Mental Focus</option>
          <option value="just healthy" style={{ color: 'black' }}>Just want to eat healthy</option>
        </select>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Dietary Restrictions</label>
        <input 
          type="text" 
          name="restrictions" 
          placeholder="e.g. Vegan, Gluten-free, Nut allergy..." 
          value={formData.restrictions} 
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
        Get Smart Recommendations
      </button>
    </form>
  );
}
