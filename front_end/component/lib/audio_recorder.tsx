import { useState, useRef } from 'react';

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioFormat, setAudioFormat] = useState<string>('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // 获取支持的 MIME 类型和文件扩展名
  const getSupportedAudioFormat = () => {
    const formats = [
      { mimeType: 'audio/webm', extension: 'webm' },
      { mimeType: 'audio/mp4', extension: 'mp4' },
      { mimeType: 'audio/ogg', extension: 'ogg' },
      { mimeType: 'audio/wav', extension: 'wav' },
      { mimeType: 'audio/aac', extension: 'aac' }
    ];

    // 寻找第一个支持的格式
    for (const format of formats) {
      if (MediaRecorder.isTypeSupported(format.mimeType)) {
        return format;
      }
    }

    // 默认格式
    return { mimeType: '', extension: 'webm' };
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      // 添加 iOS Safari 所需的约束
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
          channelCount: 1
        }
      });

      // 检测支持的音频格式
      const { mimeType, extension } = getSupportedAudioFormat();
      setAudioFormat(extension);
      
      const recorderOptions: MediaRecorderOptions = {
        audioBitsPerSecond: 128000
      };
      
      // 仅当有支持的 mimeType 时添加
      if (mimeType) {
        recorderOptions.mimeType = mimeType;
      }
      
      mediaRecorderRef.current = new MediaRecorder(stream, recorderOptions);
      
      // 设置较小的时间片，提高兼容性
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        try {
          if (chunksRef.current.length > 0) {
            const actualMimeType = mediaRecorderRef.current?.mimeType || mimeType || 'audio/webm';
            const blob = new Blob(chunksRef.current, { type: actualMimeType });
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
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setIsRecording(false);
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
    return new Promise<Blob | null>((resolve) => {
      if (mediaRecorderRef.current && isRecording) {
        try {
          setIsRecording(false);
          
          mediaRecorderRef.current.onstop = () => {
            try {
              if (chunksRef.current.length > 0) {
                const actualMimeType = mediaRecorderRef.current?.mimeType || 'audio/webm';
                const blob = new Blob(chunksRef.current, { type: actualMimeType });
                setAudioBlob(blob); // 更新状态
                resolve(blob);      // 直接返回 blob
              } else {
                console.warn('No audio data chunks were collected during recording');
                resolve(null);
              }
              chunksRef.current = [];
            } catch (error) {
              console.error('Error creating audio blob:', error);
              resolve(null);
            }
          };
          
          mediaRecorderRef.current.stop();
          mediaRecorderRef.current.stream.getTracks().forEach(track => {
            track.stop();
            track.enabled = false;
          });
        } catch (error) {
          console.error('Error stopping recording:', error);
          setIsRecording(false);
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  };

  return {
    isRecording,
    audioBlob,
    audioFormat,
    startRecording,
    stopRecording
  };
};
