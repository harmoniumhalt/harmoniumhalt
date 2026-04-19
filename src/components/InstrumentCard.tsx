import React from 'react';

interface InstrumentCardProps {
  name: string;
  icon: string;
  url: string;
  onClick?: () => void;
}

const InstrumentCard: React.FC<InstrumentCardProps> = ({ name, icon, url, onClick }) => {
  return (
    <div 
      className="instrument-card cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6 text-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-slate-600 mb-4">Interactive online instrument with authentic sound</p>
        <button className="text-primary-600 font-medium hover:text-primary-800 transition">
          Play Now
        </button>
      </div>
    </div>
  );
};

export default InstrumentCard;