"use client";

import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useAudioRecorder } from "./audio_recorder";
import { setSpeechText } from '@/component/store/reducer/speech'
import { Spin } from 'antd';
import { useDispatch } from 'react-redux'
import { BLABIT_API } from "@/component/const/const";

const EnchanterSection = () => {
  const router = useRouter();
  const { isRecording, startRecording, stopRecording } = useAudioRecorder();
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useDispatch()

  const handleButtonClick = async () => {
    if (isRecording) {
      setIsProcessing(true);
      try {
        // 直接从 stopRecording 获取 blob
        const recordedBlob = await stopRecording();
        
        if (!recordedBlob) {
          console.warn('No audio blob available after recording stopped');
          setIsProcessing(false);
          return;
        }
        
        // 使用直接获取的 blob 进行上传，不依赖组件状态
        await handleUploadWithBlob(recordedBlob);
      } catch (error) {
        console.error('Recording error:', error);
      } finally {
        setIsProcessing(false);
      }
    } else {
      startRecording();
    }
  };

  // 新增一个函数，直接使用传入的 blob
  const handleUploadWithBlob = async (blob: Blob) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('audio', blob, 'recording.webm');

      const response = await fetch(BLABIT_API + '/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      
      dispatch(setSpeechText(data.text));
      router.push('/english_enchanter');
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
          <div className="h-[25%]"></div>
          
          {/* 新的结构：文字和按钮在同一个容器中 */}
          <div className="h-[57%] w-full flex flex-col relative">
            {/* 玻璃效果背景 */}
            <span className="absolute inset-0 bg-white/25 backdrop-blur-xl backdrop-filter backdrop-saturate-150 rounded-lg z-0"></span>
            
            <div className="flex flex-col h-full p-6 pt-8 z-10 relative">
              {/* 主题文字部分 - 占据容器的65% */}
              <div className="flex-1 min-h-0 mb-8 flex items-center">
                <p className="text-base sm:text-xl md:text-2xl text-gray-800 w-full text-justify">
                  Your words are precious gems that deserve to shine their brightest. Let us polish them to perfection, revealing their true native brilliance. Grammar, vocabulary, and structure blend together in harmony, as we craft expressions that flow as smoothly as a mountain stream.
                </p>
              </div>
              
              {/* 按钮部分 - 占据容器的30% */}
              <div className="h-[30%] min-h-[60px] flex items-center justify-center px-4">
                <button
                  onClick={handleButtonClick}
                  disabled={isProcessing}
                  className={`px-6 py-3 text-lg sm:text-xl md:text-2xl rounded-lg font-semibold select-none w-full shadow-lg flex items-center justify-center bg-black hover:bg-gray-800 text-[rgb(181,180,162)] transition-colors ${
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