import React from 'react';

export default function Header({ onOpenApiKeyModal, onOpenHistory }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10, 15, 26, 0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>
          <span style={{ fontSize: '1.5rem', borderRadius: '50%' }}>🥗</span>
          <span>Nutri<span className="gradient-text" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Smart</span></span>
        </a>
        
        {/* Actions */}
        <nav style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn-secondary" 
            onClick={onOpenHistory} 
            style={{ fontSize: '0.75rem', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span>📋</span> View Log
          </button>
          
          <button 
            className="btn-secondary" 
            onClick={onOpenApiKeyModal} 
            style={{ fontSize: '0.75rem', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span>🔑</span> API Key
          </button>
        </nav>
      </div>
    </header>
  );
}
