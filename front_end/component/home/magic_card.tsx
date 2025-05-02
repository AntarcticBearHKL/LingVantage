"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux'
import { useState } from 'react';

import { BLABIT_API } from "@/component/const/const";

import { useAudioRecorder } from "@/component/lib/audio_recorder";
import { setSpeechText } from '@/component/store/reducer/speech'
import { Spin } from 'antd';

// 定义参数接口
interface MagicCardProps {
  card_info: {
    main_color: string;
    bg_image: string;
    title_line_one: string;
    title_line_two: string;
    description: string;
    button: string;
    api_url: string;
  };
}

export default function MagicCard({ card_info }: MagicCardProps) {

  const router = useRouter();
  const {isRecording, startRecording, stopRecording, audioFormat} = useAudioRecorder();
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const dispatch = useDispatch()

  const handler_record = async () => {
    if (isRecording) {
      setIsProcessing(true);

      const recordedBlob = await stopRecording();
      
      if (!recordedBlob) {
        setIsProcessing(false);
        return;
      }
    
      await handler_upload(recordedBlob);
      
      setIsProcessing(false);

    } else {
      startRecording();
    }
  };

  const handler_upload = async (blob: Blob) => {
    setIsUploading(true);

    const formData = new FormData();

    const filename = `recording.${audioFormat || 'webm'}`;
    formData.append('audio', blob, filename);

    console.log(`Uploading audio file with name: ${filename}`);

    const response = await fetch(BLABIT_API + '/transcribe', {
      method: 'POST',
      body: formData,
    });

    console.log(response.json);

    const data = await response.json();
    dispatch(setSpeechText(data.text));
    router.push(card_info.api_url);
    setIsUploading(false);

  };
  
  return (
    <div className='w-dvw h-dvh'
      style={{ 
        backgroundColor: card_info.main_color 
      }}
    >
      {/* 全屏加载动画 */}
      {isUploading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(183,198,175,0.8)] z-50">
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

      {/* 背景图片 */}
      <div className='absolute flex flex-col w-dvw h-dvh'>
        <div className="grow-7">
          <img 
            className="object-contain shadow-md rounded-lg"
            src={card_info.bg_image}
            alt=""
          />
        </div>

        <div className="grow-3"></div>
      </div>

      {/* 文字层 */}
      <div className='absolute flex flex-col w-dvw h-dvh font-Rubik'>
        <div className="grow-13"></div>

        <div className="grow-1 text-start align-middle text-3xl text-[rgb(50,50,50)] font-bold px-2">
          {card_info.title_line_one}
        </div>

        <div className="grow-3 w-full text-center align-middle font-bold text-5xl">
          {card_info.title_line_two}
        </div>

        <div className="grow-55"></div>

        <div className="grow-20 flex flex-col bg-white/25 backdrop-blur-xl backdrop-filter backdrop-saturate-150 rounded-2xl px-3 py-3">

          <div className="grow-50 font-light text-lg">
            {card_info.description}
          </div>

          <div className="grow-10"></div>

          <button className='grow-30 w-full bg-black text-center align-middle text-xl'
            onClick={handler_record}
            disabled={isProcessing}
            style={{ color: card_info.main_color }}
          >
            {isProcessing ? 'PROCESSING...' : isRecording ? 'STOP RECORDING' : card_info.button}
          </button>

          <div className="grow-20"></div>
        </div>

      </div>
    </div>
  );
}