import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SpeechState {
  speechText: string;  // 定义语音文本的类型
}

const initialState: SpeechState = {
  speechText: 'None',  // 初始状态为空字符串
};

export const speechSlice = createSlice({
  name: 'speech',  // slice 的名称
  initialState,    // 初始状态
  reducers: {
    // 定义更新文本的 action
    setSpeechText: (state, action: PayloadAction<string>) => {
      state.speechText = action.payload;
    },
  },
});

export const { setSpeechText } = speechSlice.actions;