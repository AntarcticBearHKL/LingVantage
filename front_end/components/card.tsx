import React from 'react';

interface CardProps {
  message?: string;
}

const Card = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4">
      <p className="text-gray-600">这是一个简单的 Next.js 组件</p>
    </div>
  );
};

export default Card;