"use client";

import { useRouter } from "next/navigation"; // 导入 useRouter
import { useState } from 'react';
import { useAudioRecorder } from "./audio_recorder"; // 导入自定义的音频录制器
import { setSpeechText } from '@/store/slices/speechSlice'

import { useDispatch, useSelector } from 'react-redux'

const ContextSection = () => {
  const router = useRouter(); // 初始化 useRouter
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
      
      dispatch(setSpeechText(data.text)); // 更新 Redux store 中的文本
      router.push('/context'); // 上传成功后跳转到结果页面

    } catch (error) {
      console.error('Error uploading audio:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6"
      style={{ backgroundColor: 'rgb(183, 198, 175)' }}
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        The Context Whisperer
      </h1>

      <p className="text-lg text-gray-600 mb-8 max-w-2xl text-center">
        Like a gentle breeze carrying the first words of spring, our context generator crafts the perfect opening lines for your conversations. It weaves together phrases and translations, helping you step confidently into any dialogue, as naturally as dawn breaks over the horizon.
      </p>

      <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
        <button
          onClick={handleButtonClick}
          disabled={isProcessing}
          className={`px-6 py-3 rounded-lg font-semibold select-none w-full ${
            isRecording 
              ? 'bg-black hover:bg-gray-800' 
              : 'bg-black hover:bg-gray-800'
          } text-[rgb(223,247,3)] transition ${
            isProcessing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isProcessing ? 'PROCESSING...' : isRecording ? 'STOP RECORDING' : 'START RECORDING'}
        </button>

        {isUploading && (
          <div className="text-gray-600">
            LOADING...
          </div>
        )}
      </div>
    </div>
  );
};

export default ContextSection;