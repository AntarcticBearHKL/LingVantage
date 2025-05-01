import { configureStore } from '@reduxjs/toolkit';
import { speechSlice } from './reducer/speech';

export const store = configureStore({
  reducer: {
    speech: speechSlice.reducer,  // 注册 speech reducer
  },
});

// 导出类型定义，用于 TypeScript 类型检查
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;