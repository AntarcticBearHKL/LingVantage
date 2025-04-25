"use client";

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'; // 导入 Redux store 的类型
import { useEffect } from 'react';


const ContextAnalysis = () => {
  const someData = useSelector((state: RootState) => state.speech.speechText); // 从 Redux store 中获取数据

  const dispatch = useDispatch()

  useEffect(() => {
    const sendDataToServer = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/context?message=${encodeURIComponent(someData)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log('Server response:', data);
      } catch (error) {
        console.error('Error sending data:', error);
      }
    };

    if (someData) {
      sendDataToServer();
    }
  }, [someData]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">
        {someData}
      </h1>
    </div>
  );
};

export default ContextAnalysis;