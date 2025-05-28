import React from 'react';
import '../styles/FeatureCard.css';

function FeatureCard({ title, description, icon, color }) {
  return (
    <div className="feature-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="feature-icon" style={{ backgroundColor: `${color}22` }}>
        <span className="icon" style={{ color: color }}>
         
          {icon}
        </span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;