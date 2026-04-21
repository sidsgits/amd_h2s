import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ContextForm from './components/ContextForm';
import SmartAssistant from './components/SmartAssistant';
import { analyzeCustomFood } from './services/gemini';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  const [contextData, setContextData] = useState(null);
  const [mealHistory, setMealHistory] = useState([]);
  
  const [customFood, setCustomFood] = useState('');
  const [isLoggingCustom, setIsLoggingCustom] = useState(false);

  useEffect(() => {
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    const storedKey = localStorage.getItem('gemini_api_key');
    if (envKey) { setApiKey(envKey); setShowApiModal(false); }
    else if (storedKey) { setApiKey(storedKey); }
    else { setShowApiModal(true); }

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
    const newHistory = [
      { 
        name: meal.name, 
        emoji: meal.emoji, 
        calories: meal.macros?.calories || 0, 
        macros: meal.macros,
        date: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      },
      ...mealHistory
    ];
    setMealHistory(newHistory);
    localStorage.setItem('nutrismart_history', JSON.stringify(newHistory));
  };

  const handleQuickLog = async (e) => {
    e.preventDefault();
    if (!customFood || !apiKey) return;
    setIsLoggingCustom(true);
    const result = await analyzeCustomFood(apiKey, customFood);
    handleLogMeal(result);
    setCustomFood('');
    setIsLoggingCustom(false);
  };

  return (
    <div className="app">
      <Header onOpenApiKeyModal={() => setShowApiModal(true)} onOpenHistory={() => {}} />
      
      <main>
        <Hero />
        <section className="container">
          
          <Dashboard mealHistory={mealHistory} />

          <div className="glass-card animate-fade-in-up" style={{ padding: '2rem', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ margin: 0 }}>📔 Today's Diary</h2>
              
              <form onSubmit={handleQuickLog} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
                <input 
                  type="text" 
                  placeholder="e.g. 2 slices of pizza..." 
                  value={customFood}
                  onChange={(e) => setCustomFood(e.target.value)}
                  style={{ flex: 1, padding: '0.5rem 1rem', borderRadius: '2rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                  disabled={isLoggingCustom}
                />
                <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '2rem' }} disabled={isLoggingCustom}>
                  {isLoggingCustom ? '⏳' : '+ AI Log'}
                </button>
              </form>
            </div>

            {mealHistory.length === 0 ? (
              <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>Your diary is empty. Search a food above or ask the AI Nutritionist!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {mealHistory.map((meal, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{meal.emoji}</span>
                      <div>
                        <h4 style={{ margin: 0, color: 'white' }}>{meal.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{meal.date}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', textAlign: 'right' }}>
                      <div style={{ color: '#60a5fa', fontSize: '0.875rem' }}>{meal.macros?.protein || 0}g P</div>
                      <div style={{ color: '#4ade80', fontSize: '0.875rem' }}>{meal.macros?.carbs || 0}g C</div>
                      <div style={{ color: '#fbbf24', fontSize: '0.875rem' }}>{meal.macros?.fat || 0}g F</div>
                      <div style={{ color: 'white', fontWeight: 'bold', width: '80px' }}>{meal.calories} kcal</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

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
    </div>
  );
}
