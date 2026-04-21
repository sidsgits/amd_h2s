import React, { useState, useEffect } from 'react';
import { getRecommendations } from '../services/gemini';

export default function SmartAssistant({ apiKey, contextData, onLogMeal }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!contextData) return;
    if (!apiKey) return setError('Please provide a Gemini API key first.');

    const fetchRecommendations = async () => {
      setLoading(true); setError('');
      try { setData(await getRecommendations(apiKey, contextData)); } 
      catch (err) { setError(err.message); } 
      finally { setLoading(false); }
    };
    fetchRecommendations();
  }, [contextData, apiKey]);

  if (!contextData && !loading && !data) return <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Fill out your context to get macro-optimized meals.</div>;
  if (loading) return <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#22c55e' }}>Analyzing macros & building meals...</div>;
  if (error) return <div className="glass-card" style={{ padding: '2rem', border: '1px solid #ef4444' }}>⚠️ {error}</div>;

  if (data) {
    return (
      <div className="animate-fade-in-up">
        <div className="glass-card" style={{ padding: '1rem', marginBottom: '1rem', borderLeft: '4px solid #22c55e' }}>
          <p style={{ fontStyle: 'italic', color: '#e2e8f0', margin: 0 }}>"{data.greeting}"</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {data.recommendations?.map((meal, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, color: 'white' }}>{meal.emoji} {meal.name}</h3>
                <span style={{ color: '#4ade80', fontWeight: 'bold' }}>{meal.macros?.calories} kcal</span>
              </div>
              
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem' }}>{meal.description}</p>
              
              {/* Cronometer Macro Pills */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.75rem' }}>
                <span style={{ padding: '0.25rem 0.5rem', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', borderRadius: '4px' }}>P: {meal.macros?.protein}g</span>
                <span style={{ padding: '0.25rem 0.5rem', background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', borderRadius: '4px' }}>C: {meal.macros?.carbs}g</span>
                <span style={{ padding: '0.25rem 0.5rem', background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', borderRadius: '4px' }}>F: {meal.macros?.fat}g</span>
              </div>

              <button className="btn-secondary" style={{ width: '100%', padding: '0.75rem' }} onClick={() => onLogMeal(meal)}>
                + Add to Daily Diary
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}
