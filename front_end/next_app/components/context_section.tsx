"use client";

import { useRouter } from "next/navigation"; // 导入 useRouter
import { useState } from 'react';
import { useAudioRecorder } from "./audio_recorder"; // 导入自定义的音频录制器

const ContextSection = () => {
  const router = useRouter(); // 初始化 useRouter

  const { isRecording, audioBlob, startRecording, stopRecording } = useAudioRecorder();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!audioBlob) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const response = await fetch('http://127.0.0.1:5000/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      alert(data); // 显示转录结果

    } catch (error) {
      console.error('Error uploading audio:', error);
    } finally {
      setIsUploading(false);
    }
  };

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

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-6 py-3 rounded-lg font-semibold ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition`}
        >
          {isRecording ? '停止录音' : '开始录音'}
        </button>

        {audioBlob && (
          <div className="flex flex-col items-center gap-4">
            <audio src={URL.createObjectURL(audioBlob)} controls />
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-50"
            >
              {isUploading ? '上传中...' : '上传录音'}
            </button>
          </div>
        )}
      </div>

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