import React from 'react';
import { Card } from 'react-bootstrap';

interface StatsCardProps {
  title: string;
  value: string;
  icon: string;
  color: 'success' | 'primary' | 'info' | 'warning' | 'danger';
  subtitle?: string;
  change?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  color, 
  subtitle, 
  change 
}) => {
  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-success';
    if (change.startsWith('-')) return 'text-danger';
    return 'text-muted';
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="card-title mb-2 text-muted small">{title}</p>
            <h3 className={`mb-0 text-${color}`}>{value}</h3>
            {subtitle && (
              <p className="small text-muted mb-0">{subtitle}</p>
            )}
            {change && (
              <p className={`small mb-0 ${getChangeColor(change)}`}>
                {change} vs mes anterior
              </p>
            )}
          </div>
          <div style={{ fontSize: '2.5rem' }} className="opacity-75">
            {icon}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatsCard;