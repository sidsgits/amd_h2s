import React from 'react';

export default function Hero() {
  return (
    <section style={{ position: 'relative', padding: '4rem 0 2rem', textAlign: 'center', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="animate-fade-in-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', animation: 'pulse-glow 2s infinite' }}></span>
          Powered by Google Gemini AI
        </div>
        
        <h1 className="animate-fade-in-up" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
          Eat Smarter with{' '}
          <span className="gradient-text" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI-Powered</span>{' '}
          Food Guidance
        </h1>
        
        <p className="animate-fade-in-up" style={{ fontSize: '1.125rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7, animationDelay: '0.1s' }}>
          Tell us how you feel, what time it is, and your goals — NutriSmart will
          recommend the perfect meals tailored just for you.
        </p>
        
        <div className="animate-fade-in-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '1.5rem', padding: '1rem 2rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.5rem', animationDelay: '0.2s' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🧠</span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Context-Aware</span>
          </div>
          <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.08)' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ fontSize: '1.5rem' }}>⚡</span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Instant Results</span>
          </div>
          <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.08)' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🎯</span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Personalized</span>
          </div>
        </div>
      </div>
      
      {/* Background glow effect */}
      <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}></div>
    </section>
  );
}
