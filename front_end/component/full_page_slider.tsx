"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Drawer, Dropdown, message } from "antd";
import type { MenuProps } from "antd";

import ContextSection from "./context_section";
import EnchanterSection from "./enchanter_section";
import MirrorSection from "./mirror_section";

// Add CSS classes for non-selectable text
const noSelectStyles = {
  WebkitUserSelect: "none" as const,
  MozUserSelect: "none" as const,
  msUserSelect: "none" as const,
  userSelect: "none" as const,
};

const FullPageSlider = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const items: MenuProps["items"] = [
    { key: "en", label: "English", },
    { key: "hi", label: "Hindi (dev)", disabled: true },
    { key: "zh", label: "中文 (dev)", disabled: true },
    { key: "ja", label: "日本語 (dev)", disabled: true },
    { key: "ko", label: "한국어 (dev)", disabled: true },
    { key: "vi", label: "Tiếng Việt (dev)", disabled: true },
  ];

  const pages = [
    { id: 0, content: <ContextSection /> },
    { id: 1, content: <EnchanterSection /> },
    { id: 2, content: <MirrorSection /> },
  ];

  const handleSwipe = (direction:string) => {
    if (direction === "LEFT") {
      // 向左滑动，前进到下一页
      if (currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      } else {
        // 已经是最后一页，显示提示
        messageApi.loading("More magical cards are being crafted — stay tuned for the wonder ahead!");
      }
    } else if (direction === "RIGHT") {
      // 向右滑动，回到上一页
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else {
        // 已经是第一页，显示提示
        messageApi.warning("This page, gently turned, marks the beginning of our journey.");
      }
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
  });

  // 处理屏幕左右区域的点击事件
  const handleSideClick = (direction: string, event: React.MouseEvent) => {
    handleSwipe(direction);
  };

  return (
    <div
      {...handlers}
      style={{ 
        display: "flex", 
        width: "100vw", 
        height: "100dvh", 
        overflow: "hidden", 
        position: "relative",
        padding: 0, // Added explicit padding: 0
        margin: 0, // Also adding margin: 0 for good measure
        ...noSelectStyles // Apply the non-selectable styles here
      }}
    >
      {contextHolder}
      {/* 左侧点击区域 */}
      <div 
        className="fixed left-0 top-0 w-1/4 h-full z-[5]"
        onClick={(e) => handleSideClick("RIGHT", e)}
        style={{ opacity: 0 }}
      />
      
      {/* 右侧点击区域 */}
      <div 
        className="fixed right-0 top-0 w-1/4 h-full z-[5]"
        onClick={(e) => handleSideClick("LEFT", e)}
        style={{ opacity: 0 }}
      />

      {/* 背景图片 */}
      
      {/* 顶部栏目 */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-center px-5 py-4 z-10">
        {/* 语言选择下拉菜单 */}
        <div>
          <Dropdown menu={{ items }} placement="bottomLeft">
            <div className="px-4 py-2 backdrop-blur-md bg-white/20 text-white rounded-full cursor-pointer shadow-sm">
              Language 🌐
            </div>
          </Dropdown>
        </div>

        {/* 设置按钮 */}  
        <div 
          onClick={() => setDrawerOpen(true)} 
          className="px-4 py-2 backdrop-blur-md bg-white/20 text-white rounded-full cursor-pointer shadow-sm"
        >
          <span>⚙️</span>
        </div>
      </div>

      {/* 页面内容部分 */}
      <div
        style={{ display: "flex", transform: `translateX(-${currentPage * 100}vw)`, transition: "transform 0.5s ease", width: `${pages.length * 100}vw`, }} 
      >
        {pages.map((page) => (
          <div key={page.id} className="min-h-screen w-screen">
            {page.content}
          </div>
        ))}
      </div>

      <Drawer
        placement="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        height={300}
        closeIcon={false}
        maskClosable={true}
        styles={{
          body: {
            padding: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
          },
          content: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
          },
          wrapper: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <h3 className="text-lg font-semibold">Login</h3>
        <p>Your may input your openai api later (dev)</p>
      </Drawer>

    </div>
  );
};

export default FullPageSlider;