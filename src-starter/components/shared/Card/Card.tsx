import React from 'react';
import './Card.css';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, onClick, className }) => (
  <div className={`card ${className || ''}`} onClick={onClick}>
    {title && <h3 className="card-title">{title}</h3>}
    <div className="card-content">{children}</div>
  </div>
);
