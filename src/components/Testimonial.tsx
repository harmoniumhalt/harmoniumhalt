import React from 'react';

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, role, content }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center mb-4">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
        <div className="ml-4">
          <h4 className="font-bold text-lg">{name}</h4>
          <p className="text-slate-600">{role}</p>
        </div>
      </div>
      <p className="text-slate-700 italic">"{content}"</p>
      <div className="flex mt-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;