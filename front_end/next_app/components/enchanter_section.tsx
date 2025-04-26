"use client";

import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useAudioRecorder } from "./audio_recorder";
import { setSpeechText } from '@/store/slices/speechSlice'
import { Spin } from 'antd';
import { useDispatch } from 'react-redux'

const EnchanterSection = () => {
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

      const response = await fetch('https://blabit.xyz:5000/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      
      dispatch(setSpeechText(data.text));
      router.push('/enchanter');

    } catch (error) {
      console.error('Error uploading audio:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-[rgb(181,180,162)] p-0 relative"
    >
      {/* 全屏加载动画 */}
      {isUploading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(181,180,162,0.8)] z-50">
          <Spin 
            size="large" 
            tip="Processing..." 
            style={{ 
              color: '#8B4513',
            }} 
          />
        </div>
      )}
      
      {/* 内容容器 - 添加最大宽度并居中 */}
      <div className="w-full max-w-[800px] mx-auto relative h-full min-h-screen">
        {/* 图片层 - 使用绝对定位作为背景 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70 z-0 w-4/5">
          <div className="w-full">
            <img
              src="/images/2.jpg"
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
              English Enhancement 
            </h1>
          </div>
          
          {/* Whisperer - 接下来10%, 居中 */}
          <div className="h-[5%] flex justify-center items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800">
              Enchanter
            </h1>
          </div>
          
          {/* 添加填充器空间 */}
          <div className="h-[40%]"></div>
          
           {/* 合并的主题文字和按钮容器 - 占据30%高度 */}
           <div className="h-[35%] w-full flex flex-col justify-between relative">
            {/* 玻璃效果背景 */}
            <span className="absolute inset-0 bg-white/25 backdrop-blur-xl backdrop-filter backdrop-saturate-150 rounded-lg z-0"></span>
            
            <div className="flex flex-col h-full p-6 z-10 relative justify-between">
              {/* 主题文字部分 - 移到顶部 */}
              <div className="flex items-start w-full">
                <p className="text-base sm:text-xl md:text-2xl text-gray-800 w-full text-justify">
                Your words are precious gems that deserve to shine their brightest. Let us polish them to perfection, revealing their true native brilliance. Grammar, vocabulary, and structure blend together in harmony, as we craft expressions that flow as smoothly as a mountain stream.
                </p>
              </div>
              
              {/* 按钮部分 - 移到底部 */}
              <div className="flex justify-center w-full">
                <button
                  onClick={handleButtonClick}
                  disabled={isProcessing}
                  className={`px-6 py-3 text-lg sm:text-xl md:text-2xl rounded-lg font-semibold select-none w-full max-w-md flex items-center justify-center ${
                    isRecording 
                      ? 'bg-black hover:bg-gray-800' 
                      : 'bg-black hover:bg-gray-800'
                  } text-[rgb(223,247,3)] transition ${
                    isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? 'PROCESSING...' : isRecording ? 'STOP RECORDING' : 'SET THE CONTEXT FOR ME'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnchanterSection;