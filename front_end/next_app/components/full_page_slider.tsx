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
      style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden", position: "relative", }}
    >
      <div className="flex flex-row">
        <div style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          display: "flex",
          gap: "10px",
          zIndex: 1000,
        }}>

          <button
            onClick={() => handleSwipe("RIGHT")}
            disabled={currentPage === 0}
            style={{
              padding: "8px 16px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              border: "2px solid #fff",
              borderRadius: "20px",
              cursor: currentPage === 0 ? "not-allowed" : "pointer",
              opacity: currentPage === 0 ? 0.5 : 1,
            }}
          >
            ← 上一页
          </button>

          <button
            onClick={() => handleSwipe("LEFT")}
            disabled={currentPage === pages.length - 1}
            style={{
              padding: "8px 16px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              border: "2px solid #fff",
              borderRadius: "20px",
              cursor: currentPage === pages.length - 1 ? "not-allowed" : "pointer",
              opacity: currentPage === pages.length - 1 ? 0.5 : 1,
            }}
          >
            下一页 →
          </button>
        </div>

        <Dropdown menu={{ items }} placement="bottomLeft">
          <div
            style={{
              position: "fixed",
              top: "20px",
              left: "300px",
              padding: "8px 16px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              border: "2px solid #fff",
              borderRadius: "20px",
              cursor: "pointer",
              zIndex: 1000,
            }}
          >
            Language 🌐
          </div>
        </Dropdown>

        <div
          onClick={() => setDrawerOpen(true)}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid #fff",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            cursor: "pointer",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <span style={{ color: "#fff" }}>⚙️</span>
        </div>

      </div>


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
      >
        <h3>Login</h3>
        <p>这里可以放置你的抽屉内容</p>
      </Drawer>

    </div>
  );
};

export default FullPageSlider;