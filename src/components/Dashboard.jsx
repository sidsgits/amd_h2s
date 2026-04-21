import React from 'react';

export default function Dashboard({ streak, totalLogged }) {
  return (
    <div className="glass-card animate-fade-in-up" style={{ padding: '2rem', marginBottom: '3rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#4ade80', textShadow: '0 0 20px rgba(74, 222, 128, 0.3)' }}>🔥 {streak}</div>
        <div style={{ fontSize: '0.875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Day Streak</div>
      </div>
      
      <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.1)' }}></div>
      
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#06b6d4', textShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}>🥗 {totalLogged}</div>
        <div style={{ fontSize: '0.875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Meals Logged</div>
      </div>
      
      <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.1)' }}></div>
      
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>
          {totalLogged >= 5 ? '🏆 Pro' : '🌱 Starter'}
        </div>
        <div style={{ fontSize: '0.875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Level</div>
      </div>
    </div>
  );
}
