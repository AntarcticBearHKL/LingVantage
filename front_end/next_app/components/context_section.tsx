"use client";

import { useRouter } from "next/navigation"; // 导入 useRouter
import { useState } from 'react';
import { useAudioRecorder } from "./audio_recorder"; // 导入自定义的音频录制器

const ContextSection = () => {
  const router = useRouter(); // 初始化 useRouter
  const { isRecording, audioBlob, startRecording, stopRecording } = useAudioRecorder();
  const [isUploading, setIsUploading] = useState(false);

  const handleMouseDown = () => {
    startRecording();
  };

  const handleMouseUp = async () => {
    await stopRecording();
    // 等待 audioBlob 更新
    setTimeout(async () => {
      if (!audioBlob) return;
      await handleUpload();
    }, 100);
  };

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
      alert(data.text);

    } catch (error) {
      console.error('Error uploading audio:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        这是一个标题
      </h1>

      <p className="text-lg text-gray-600 mb-8 max-w-2xl text-center">
        按住按钮开始录音，松开按钮自动上传
      </p>

      <div className="flex flex-col items-center gap-4">
        <button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} 
          className={`px-6 py-3 rounded-lg font-semibold ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition`}
        >
          {isRecording ? '录音中...' : '按住录音'}
        </button>

        {isUploading && (
          <div className="text-gray-600">
            上传中...
          </div>
        )}
      </div>
    </div>
  );
};

export default ContextSection;