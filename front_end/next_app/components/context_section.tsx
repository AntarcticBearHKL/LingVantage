"use client";

import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useAudioRecorder } from "./audio_recorder";
import { setSpeechText } from '@/store/slices/speechSlice'

import { useDispatch } from 'react-redux'

const ContextSection = () => {
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
      router.push('/context');

    } catch (error) {
      console.error('Error uploading audio:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-[rgb(183,198,175)] p-6 relative"
    >
      {/* 内容容器 - 添加最大宽度并居中 */}
      <div className="w-full max-w-[800px] mx-auto relative h-full min-h-screen">
        {/* 图片层 - 使用绝对定位作为背景 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70 z-0 w-4/5">
          <div className="w-full">
            <img
              src="/images/1.jpg"
              alt="Context Whisperer Logo"
              className="rounded-lg shadow-md object-cover w-full h-auto"
            />
          </div>
        </div>

        {/* 重新排版的文字层 */}
        <div className="absolute z-10 flex flex-col h-full w-full px-8">
          {/* The Context */}
          <div className="h-[13%] flex items-end pt-8 pl-8">
            <h1 className="text-4xl font-bold text-gray-600">
              The Context
            </h1>
          </div>
          
          {/* Whisperer - 接下来10%, 居中 */}
          <div className="h-[5%] flex justify-center items-center">
            <h1 className="text-6xl font-bold text-gray-800">
              Whisperer
            </h1>
          </div>
          
          {/* 添加填充器空间 */}
          <div className="h-[40%]"></div>
          
          {/* 合并的主题文字和按钮容器 - 占据30%高度 */}
          <div className="h-[40%] w-full flex flex-col justify-between relative">
            {/* 玻璃效果背景 */}
            <span className="absolute inset-0 bg-white/25 backdrop-blur-xl backdrop-filter backdrop-saturate-150 rounded-lg z-0"></span>
            
            <div className="flex flex-col h-full p-6 z-10 relative">
              {/* 主题文字部分 */}
              <div className="flex items-start w-full h-[50%]">
                <p className="text-2xl text-gray-800 w-full text-justify">
                  Like a gentle breeze carrying the first words of spring, our context generator crafts the perfect opening lines for your conversations. It weaves together phrases and translations, helping you step confidently into any dialogue, as naturally as dawn breaks over the horizon.
                </p>
              </div>
              
              {/* 占位空间 - 5%高度 */}
              <div className="h-[24%]"></div>
              
              {/* 按钮部分 */}
              <div className="flex justify-center w-full h-[15%]">
                <button
                  onClick={handleButtonClick}
                  disabled={isProcessing}
                  className={`px-6 py-3 text-2xl rounded-lg font-semibold select-none w-full max-w-md flex items-center justify-center ${
                    isRecording 
                      ? 'bg-black hover:bg-gray-800' 
                      : 'bg-black hover:bg-gray-800'
                  } text-[rgb(223,247,3)] transition ${
                    isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? 'PROCESSING...' : isRecording ? 'STOP RECORDING' : 'SET THE CONTEXT FOR ME'}
                </button>

                {isUploading && (
                  <div className="text-gray-600 mt-2">
                    LOADING...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextSection;