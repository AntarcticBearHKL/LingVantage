import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SpeechState {
  speechText: string;  // 定义语音文本的类型
  speechProcess: boolean;  // 定义语音处理状态的类型
}

const initialState: SpeechState = {
  speechText: 'None',  // 初始状态为空字符串
  speechProcess: false,  // 初始状态为false
};

export const speechSlice = createSlice({
  name: 'speech',  // slice 的名称
  initialState,    // 初始状态
  reducers: {
    setSpeechText: (state, action: PayloadAction<string>) => {
      state.speechText = action.payload;
    },
    setSpeechProcess: (state, action: PayloadAction<boolean>) => {
      state.speechProcess = action.payload;
    },
  },
});

export const { setSpeechText, setSpeechProcess } = speechSlice.actions;