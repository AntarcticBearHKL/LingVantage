"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";

import ContextSection from "./context_section";

const FullPageSlider = () => {
  const [currentPage, setCurrentPage] = useState(0);

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
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          transform: `translateX(-${currentPage * 100}vw)`,
          transition: "transform 0.5s ease",
          width: `${pages.length * 100}vw`,
        }}
      >
        {pages.map((page) => (
          <div key={page.id} className="min-h-screen w-screen">
            {page.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullPageSlider;