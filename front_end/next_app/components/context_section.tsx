"use client";

import { useRouter } from "next/navigation"; // 导入 useRouter
import { ReactMediaRecorder } from "react-media-recorder";

const ContextSection = () => {
  const router = useRouter(); // 初始化 useRouter

  const handleButtonClick = () => {
    router.push("/context"); // 跳转到 context_analysis 页面
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* 标题 */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        这是一个标题
      </h1>

      {/* 大段文字 */}
      <p className="text-lg text-gray-600 mb-8 max-w-2xl text-center">
        这里是一大段文字内容。它可以包含多行文字，用于描述某些信息或提供详细的说明。
        Tailwind CSS 提供了强大的样式工具，使得布局和设计变得非常简单。
        你可以根据需要调整文字内容和样式。
      </p>

      <ReactMediaRecorder
      video
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
          <p>{status}</p>
          <button 
            onClick={startRecording}>
              Start Recording
          </button>
          <button 
            onClick={stopRecording}>
              Stop Recording
          </button>
          <video 
            className="w-full h-[10%] flex flex-col items-center justify-center bg-gray-100 p-6"
            src={mediaBlobUrl} controls autoPlay loop 
          />
        </div>
      )}
      />

      {/* 大号按钮 */}
      <button 
        className="px-8 py-4 bg-blue-500 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        onClick={handleButtonClick} // 添加点击事件
        >
        点击按钮
      </button>
    </div>
  );
};

export default ContextSection;