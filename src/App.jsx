import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ContextForm from './components/ContextForm';
import SmartAssistant from './components/SmartAssistant';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [contextData, setContextData] = useState(null);
  
  const [streak, setStreak] = useState(0);
  const [totalLogged, setTotalLogged] = useState(0);
  const [mealHistory, setMealHistory] = useState([]);

  useEffect(() => {
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    const storedKey = localStorage.getItem('gemini_api_key');
    if (envKey) { setApiKey(envKey); setShowApiModal(false); }
    else if (storedKey) { setApiKey(storedKey); }
    else { setShowApiModal(true); }

    setStreak(parseInt(localStorage.getItem('nutrismart_streak') || '1'));
    setTotalLogged(parseInt(localStorage.getItem('nutrismart_total') || '0'));
    setMealHistory(JSON.parse(localStorage.getItem('nutrismart_history') || '[]'));
  }, []);

  const handleSaveApiKey = (key) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    setShowApiModal(false);
  };

  const handleFormSubmit = (data) => {
    setContextData(data);
    setTimeout(() => document.getElementById('assistant-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleLogMeal = (meal) => {
    const newTotal = totalLogged + 1;
    setTotalLogged(newTotal);
    localStorage.setItem('nutrismart_total', newTotal.toString());
    
    if (newTotal === 1 || newTotal % 3 === 0) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('nutrismart_streak', newStreak.toString());
    }

    // Save full meal to history array
    const newHistory = [
      { name: meal.name, emoji: meal.emoji, calories: meal.calories, date: new Date().toLocaleString() },
      ...mealHistory
    ];
    setMealHistory(newHistory);
    localStorage.setItem('nutrismart_history', JSON.stringify(newHistory));
    
    // Show quick visual feedback instead of an alert
    setShowHistoryModal(true);
  };

  return (
    <div className="app">
      <Header onOpenApiKeyModal={() => setShowApiModal(true)} onOpenHistory={() => setShowHistoryModal(true)} />
      
      <main>
        <Hero />
        <section className="container">
          <Dashboard streak={streak} totalLogged={totalLogged} />
          <div className="app__grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', paddingBottom: '4rem' }}>
            <div className="app__form-wrapper">
              <h2 style={{ marginBottom: '1.5rem' }}>Tell us your context</h2>
              <ContextForm onSubmit={handleFormSubmit} />
            </div>
            <div className="app__assistant-wrapper" id="assistant-section">
              <h2 style={{ marginBottom: '1.5rem' }}>Your AI Nutritionist</h2>
              <SmartAssistant apiKey={apiKey} contextData={contextData} onLogMeal={handleLogMeal} />
            </div>
          </div>
        </section>
      </main>

      {/* API Key Modal */}
      {showApiModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal glass-card" style={{ padding: '2rem', maxWidth: '400px', width: '100%' }}>
            <h2 style={{ marginBottom: '1rem' }}>Enter Gemini API Key</h2>
            <input type="password" placeholder="AIzaSy..." id="api-key-input" defaultValue={apiKey} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '1.5rem' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-primary" onClick={() => handleSaveApiKey(document.getElementById('api-key-input').value)}>Save & Continue</button>
            </div>
          </div>
        </div>
      )}

      {/* Meal History Log Modal */}
      {showHistoryModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={(e) => e.target === e.currentTarget && setShowHistoryModal(false)}>
          <div className="modal glass-card" style={{ padding: '2rem', maxWidth: '600px', width: '100%', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2>📋 Your Meal Log</h2>
              <button onClick={() => setShowHistoryModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>
            
            {mealHistory.length === 0 ? (
              <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>You haven't logged any meals yet. Ask the AI for a recommendation!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {mealHistory.map((meal, idx) => (
                  <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: 0, color: '#f1f5f9' }}>{meal.emoji} {meal.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{meal.date}</span>
                    </div>
                    <span style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '0.875rem' }}>{meal.calories}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
