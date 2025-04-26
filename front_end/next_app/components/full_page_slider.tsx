"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Drawer, Dropdown } from "antd";
import type { MenuProps } from "antd";

import ContextSection from "./context_section";
import EnchanterSection from "./enchanter_section";
import MirrorSection from "./mirror_section";

const FullPageSlider = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    if (direction === "LEFT" && currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "RIGHT" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
  });

  return (
    <div
      {...handlers}
      style={{ display: "flex", width: "100vw", height: "100dvh", overflow: "hidden", position: "relative", }}
    >
      {/* 顶部栏目 */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-center px-5 py-4 z-10">
        {/* 语言选择下拉菜单 */}
        <div>
          <Dropdown menu={{ items }} placement="bottomLeft">
            <div className="px-4 py-2 bg-black/50 text-white rounded-full cursor-pointer">
              Language 🌐
            </div>
          </Dropdown>
        </div>

        {/* 设置按钮 */}  
        <div 
          onClick={() => setDrawerOpen(true)} 
          className="px-4 py-2 bg-black/50 text-white rounded-full cursor-pointer"
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

        {/* 左右按钮 - 移到屏幕底部 */}
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          <button
            onClick={() => handleSwipe("RIGHT")}
            disabled={currentPage === 0}
            className={`px-4 py-2 bg-black/50 text-white border-white rounded-full ${
              currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            ← Prev
          </button>

          <button
            onClick={() => handleSwipe("LEFT")}
            disabled={currentPage === pages.length - 1}
            className={`px-4 py-2 bg-black/50 text-white border-white rounded-full ${
              currentPage === pages.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            Next →
          </button>
        </div>

      <Drawer
        placement="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        height={300}
        closeIcon={false}
        maskClosable={true}
      >
        <h3>Login</h3>
        <p>Your may input your openai api later</p>
      </Drawer>

    </div>
  );
};

export default FullPageSlider;