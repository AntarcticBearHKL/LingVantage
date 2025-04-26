"use client";

import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useAudioRecorder } from "./audio_recorder";
import { setSpeechText } from '@/store/slices/speechSlice'
import { Spin } from 'antd';
import { useDispatch } from 'react-redux'

const MirrorSection = () => {
  const router = useRouter();
  const { isRecording, audioBlob, startRecording, stopRecording } = useAudioRecorder();
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useDispatch()

  const handleButtonClick = async () => {
    if (isRecording) {
      setIsProcessing(true);
      await stopRecording();
      // 等待 audioBlob 更新
      setTimeout(async () => {
        if (!audioBlob) {
          setIsProcessing(false);
          return;
        }
        await handleUpload();
        setIsProcessing(false);
      }, 100);
    } else {
      startRecording();
    }
  };

  const handleUpload = async () => {
    if (!audioBlob){
      console.warn('No audio blob available for upload');
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const response = await fetch('https://blabit.xyz/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      
      dispatch(setSpeechText(data.text));
      router.push('/mirror');

    } catch (error) {
      console.error('Error uploading audio:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-[rgb(167,184,208)] p-0 relative"
    >
      {/* 全屏加载动画 */}
      {isUploading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(167,184,208,0.8)] z-50">
          <Spin 
            size="large" 
            tip="Processing..." 
            style={{ 
              color: '#8B4513',
            }} 
            fullscreen 
          />
        </div>
      )}

      {/* 内容容器 - 添加最大宽度并居中 */}
      <div className="w-full max-w-[800px] mx-auto relative h-full min-h-screen">
        {/* 图片层 - 使用绝对定位作为背景 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70 z-0 w-4/5">
          <div className="w-full">
            <img
              src="/images/3.jpg"
              alt="Context Whisperer Logo"
              className="rounded-lg shadow-md object-cover w-full h-auto"
            />
          </div>
        </div>

        {/* 重新排版的文字层 */}
        <div className="absolute z-10 flex flex-col h-full w-full px-8">
          {/* The Context */}
          <div className="h-[13%] flex items-end pt-8 pl-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-600">
              Mother Tongue 
            </h1>
          </div>
          
          {/* Whisperer - 接下来10%, 居中 */}
          <div className="h-[5%] flex justify-center items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800">
              Mirror
            </h1>
          </div>
          
          {/* 添加填充器空间 */}
          <div className="h-[40%]"></div>
          
          {/* 主题文字容器 - 只保留文字部分 */}
          <div className="h-[35%] w-full flex flex-col relative">
            {/* 玻璃效果背景 */}
            <span className="absolute inset-0 bg-white/25 backdrop-blur-xl backdrop-filter backdrop-saturate-150 rounded-lg z-0"></span>
            
            <div className="flex flex-col h-full p-6 z-10 relative">
              {/* 主题文字部分 */}
              <div className="flex items-center w-full h-full">
                <p className="text-base sm:text-xl md:text-2xl text-gray-800 w-full text-justify">
                Transform your native thoughts into elegant expressions, like watching a butterfly emerge from its chrysalis. Each translation comes adorned with crystalline clarity, while key phrases sparkle with detailed explanations - illuminating your path to understanding like stars in the night sky.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 悬浮按钮 - 固定在屏幕底部中央 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
        <button
          onClick={handleButtonClick}
          disabled={isProcessing}
          className={`px-6 py-3 text-lg sm:text-xl md:text-2xl rounded-lg font-semibold select-none w-full shadow-lg flex items-center justify-center bg-black hover:bg-gray-800 text-[rgb(223,247,3)] transition-colors ${
            isProcessing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isProcessing ? 'PROCESSING...' : isRecording ? 'STOP RECORDING' : 'SET THE CONTEXT FOR ME'}
        </button>
      </div>
    </div>
  );
};

export default MirrorSection;