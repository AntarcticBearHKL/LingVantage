"use client"

import { useState, useRef } from "react";

import { Carousel, Drawer, Dropdown, message } from "antd";
import type { MenuProps } from "antd";
import type { CarouselRef } from "antd/es/carousel";

import MagicCard from "@/component/home/home_magic_card";

import * as CardInfo from "@/component/const/card_info";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const carouselRef = useRef<CarouselRef>(null);

  const pages = [
    { id: 0, content: <MagicCard card_info={CardInfo.card_info_context}/> },
    { id: 1, content: <MagicCard card_info={CardInfo.card_info_enchanter}/> },
    { id: 2, content: <MagicCard card_info={CardInfo.card_info_mirror}/> },
  ];

  const menu_items: MenuProps["items"] = [
    { key: "en", label: "English", },
    { key: "hi", label: "Hindi (dev)", disabled: true },
    { key: "zh", label: "中文 (dev)", disabled: true },
    { key: "ja", label: "日本語 (dev)", disabled: true },
    { key: "ko", label: "한국어 (dev)", disabled: true },
    { key: "vi", label: "Tiếng Việt (dev)", disabled: true },
  ];

  const handleSwipe = (direction: string) => {
    if (direction === "LEFT") {
      carouselRef.current?.next();
    } else if (direction === "RIGHT") {
      carouselRef.current?.prev();
    }
  };

  const handle_side_click = (direction: string, event: React.MouseEvent) => {
    handleSwipe(direction);
  };

  const handle_carousel_oob = (current: number, next: number) => {
    // Only show messages when trying to navigate beyond the first or last page
    if (current === 0 && next === 0) {
      messageApi.warning("This page, gently turned, marks the beginning of our journey.");
    } else if (current === pages.length - 1 && next === pages.length - 1) {
      messageApi.loading("More magical cards are being crafted — stay tuned for the wonder ahead!");
    }
  };

  return (
    <div className="fixed flex flex-col h-dvh w-dvw bg-black">


      {/* 上方提醒 */}
      {contextHolder}


      {/* 顶部栏目 */}
      <div className="fixed top-0 left-0 h-[10%] w-dvw flex justify-between items-center px-5 py-4 z-10">
        {/* 语言选择下拉菜单 */}
        <div>
          <Dropdown 
            menu={{ items: menu_items }} 
            placement="bottomLeft"
          >
            <div className="backdrop-blur-md bg-white/20 text-white rounded-full cursor-pointer shadow-sm px-4 py-2 ">
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


      {/* 左侧点击区域 */}
      <div className="fixed left-0 top-0 w-1/4 h-dvh z-5"
        onClick={(e) => handle_side_click("RIGHT", e)}
        style={{ opacity: 0 }}
      ></div>
      

      {/* 右侧点击区域 */}
      <div className="fixed right-0 top-0 w-1/4 h-dvh z-5"
        onClick={(e) => handle_side_click("LEFT", e)}
        style={{ opacity: 0 }}
      ></div>


      {/* 页面内容部分 */}
      <Carousel 
        ref={carouselRef}
        dots={false}
        infinite={false}
        beforeChange={handle_carousel_oob}
        className="w-dvw h-dvh overflow-hidden"
        effect="scrollx"
        draggable={true}
      >
        {pages.map((page) => (
          <div key={page.id} className="w-dvw h-dvh">
            {page.content}
          </div>
        ))}
      </Carousel>


      {/* 登录抽屉 */}
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
}