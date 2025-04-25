import { useState, useRef } from 'react';

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      // 添加 iOS Safari 所需的约束
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          // iOS Safari 需要这些具体参数
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
          channelCount: 1
        }
      });

      // 检查浏览器支持的 MIME 类型
      const mimeType = [
        'audio/webm',
        'audio/mp4',
        'audio/aac',
        'audio/ogg'
      ].find(type => MediaRecorder.isTypeSupported(type)) || 'audio/webm';

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 128000
      });
      
      // 设置较小的时间片，提高兼容性
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        try {
          if (chunksRef.current.length > 0) {
            const blob = new Blob(chunksRef.current, { type: mimeType });
            setAudioBlob(blob);
          } else {
            console.warn('No audio data chunks were collected during recording');
          }
          chunksRef.current = [];
        } catch (error) {
          console.error('Error creating audio blob:', error);
        }
      };

      // 每秒收集一次数据，避免内存问题
      mediaRecorderRef.current.start(1000);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      // 添加更详细的错误处理
      if (error instanceof DOMException) {
        if (error.name === 'NotAllowedError') {
          alert('请允许访问麦克风权限');
        } else if (error.name === 'NotFoundError') {
          alert('未找到录音设备');
        } else {
          alert('录音初始化失败，请检查设备权限');
        }
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        // 确保所有轨道都被正确停止
        mediaRecorderRef.current.stream.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    }
  };

  return {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording
  };
};
