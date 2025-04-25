'use client';  // 声明这是客户端组件

import { Provider } from 'react-redux';
import { store } from './index';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}