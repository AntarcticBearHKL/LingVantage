import { useState, useRef } from 'react';

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

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

      // 直接使用 MP4 格式，不考虑其他格式
      const mimeType = 'audio/mp4';
      
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
                const blob = new Blob(chunksRef.current, { 
                  type: mediaRecorderRef.current?.mimeType || 'audio/webm' 
                });
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
    startRecording,
    stopRecording
  };
};
