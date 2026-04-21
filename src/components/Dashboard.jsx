import React, { useState, useEffect } from 'react';

export default function Dashboard({ mealHistory }) {
  const [water, setWater] = useState(0);

  useEffect(() => {
    setWater(parseInt(localStorage.getItem('nutrismart_water') || '0'));
  }, []);

  const handleAddWater = () => {
    const newWater = water + 1;
    setWater(newWater);
    localStorage.setItem('nutrismart_water', newWater.toString());
  };

  const totals = mealHistory.reduce((acc, meal) => {
    return {
      calories: acc.calories + (meal.macros?.calories || 0),
      protein: acc.protein + (meal.macros?.protein || 0),
      carbs: acc.carbs + (meal.macros?.carbs || 0),
      fat: acc.fat + (meal.macros?.fat || 0),
    };
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const goals = { calories: 2000, protein: 150, carbs: 200, fat: 65 };
  const getPercentage = (current, goal) => Math.min((current / goal) * 100, 100);

  const MacroBar = ({ label, current, goal, color }) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem', color: '#94a3b8' }}>
        <span>{label}</span>
        <span>{current}g / {goal}g</span>
      </div>
      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${getPercentage(current, goal)}%`, height: '100%', background: color, transition: 'width 0.5s ease-out' }}></div>
      </div>
    </div>
  );

  return (
    <div className="glass-card animate-fade-in-up" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📊</span> Daily Macro Targets
          </h3>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <MacroBar label="Protein" current={totals.protein} goal={goals.protein} color="#3b82f6" />
            <MacroBar label="Carbs" current={totals.carbs} goal={goals.carbs} color="#22c55e" />
            <MacroBar label="Fat" current={totals.fat} goal={goals.fat} color="#f59e0b" />
          </div>
        </div>

        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '150px' }}>
          <div>
            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80' }}>{totals.calories}</span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>/ {goals.calories} kcal Consumed</span>
          </div>
          
          {/* Water Tracker */}
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#60a5fa' }}>💧 {water}</span>
              <span style={{ display: 'block', fontSize: '0.65rem', color: '#94a3b8' }}>Glasses Logged</span>
            </div>
            <button onClick={handleAddWater} style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          </div>
        </div>

      </div>
    </div>
  );
}
