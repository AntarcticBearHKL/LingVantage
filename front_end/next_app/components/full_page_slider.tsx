"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Drawer } from "antd";

import ContextSection from "./context_section";

const FullPageSlider = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pages = [
    { id: 0, content: <ContextSection /> },
    { id: 1, content: <ContextSection /> },
    { id: 2, content: <ContextSection /> },
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