"use client";


import React from 'react';
import { useRouter } from "next/navigation";

const Card = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-6 m-4">
      <p className="text-gray-600">这是一个简单的 Next.js 组件</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => 
          router.push("/test_page")
        }
      >
        zheli是一个按钮
      </button>
    </div>
  );
};

export default Card;