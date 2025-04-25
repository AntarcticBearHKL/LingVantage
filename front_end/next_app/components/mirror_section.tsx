"use client";

import { useRouter } from "next/navigation"; // 导入 useRouter
import { useState } from 'react';
import { useAudioRecorder } from "./audio_recorder"; // 导入自定义的音频录制器
import { setSpeechText } from '@/store/slices/speechSlice'
import { RootState } from '../store'; // 导入 Redux store 的类型

import { useDispatch, useSelector } from 'react-redux'

const MirrorSection = () => {
  const router = useRouter(); // 初始化 useRouter
  const { isRecording, audioBlob, startRecording, stopRecording } = useAudioRecorder();
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);  // 添加处理状态

  const dispatch = useDispatch()

  const handleButtonClick = async () => {
    if (isRecording) {
      setIsProcessing(true);  // 开始处理时设置状态
      await stopRecording();
      // 等待 audioBlob 更新
      setTimeout(async () => {
        if (!audioBlob) {
          setIsProcessing(false);  // 如果没有音频数据，重置状态
          return;
        }
        await handleUpload();
        setIsProcessing(false);  // 处理完成后重置状态
      }, 100);
    } else {
      startRecording();
    }
  };

  const handleUpload = async () => {
    if (!audioBlob) return;

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
      router.push('/mirror'); // 上传成功后跳转到结果页面

    } catch (error) {
      console.error('Error uploading audio:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen w-full p-6"
      style={{ backgroundColor: 'rgb(167, 184, 208)', width: '100%' }}
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        The Mother Tongue Mirror
      </h1>

      <p className="text-lg text-gray-600 mb-8 max-w-2xl text-center">
        Transform your native thoughts into elegant expressions, like watching a butterfly emerge from its chrysalis. Each translation comes adorned with crystalline clarity, while key phrases sparkle with detailed explanations - illuminating your path to understanding like stars in the night sky.
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

export default MirrorSection;