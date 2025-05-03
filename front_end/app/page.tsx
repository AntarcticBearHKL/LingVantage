"use client"

import { useState, useRef, useEffect } from "react";

import { Drawer, Dropdown, message } from "antd";
import type { MenuProps } from "antd";

// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import MagicCard from "@/component/home/magic_card";

import * as CardInfo from "@/component/const/card_info";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const swiperRef = useRef<SwiperType | null>(null);


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

  const handleSlideChangeAttempt = (direction: string) => {
    if (direction === "RIGHT" && swiperRef.current?.isBeginning) {
      messageApi.warning("This page, gently turned, marks the beginning of our journey.");
      return false;
    } else if (direction === "LEFT" && swiperRef.current?.isEnd) {
      messageApi.loading("More magical cards are being crafted — stay tuned for the wonder ahead!");
      return false;
    }
    return true;
  };

  const handleSwipe = (direction: string) => {
    if (handleSlideChangeAttempt(direction) && swiperRef.current) {
      if (direction === "LEFT") {
        swiperRef.current.slideNext();
      } else if (direction === "RIGHT") {
        swiperRef.current.slidePrev();
      }
    }
  };

  const handle_side_click = (direction: string) => {
    handleSwipe(direction);
  };

  const handle_carousel_oob = (swiper: SwiperType) => {
    // No longer showing messages just for being at boundaries
  };

  return (
    <div className="fixed flex flex-col h-dvh w-dvw select-none overscroll-none overflow-hidden">


      {/* 上方提醒 */}
      {contextHolder}


      {/* 顶部栏目 */}
      <div className="fixed top-0 left-0 h-[10%] w-dvw flex justify-between items-center px-5 py-4 z-10">

        {/* 语言选择下拉菜单 */}
        <Dropdown 
          menu={{ items: menu_items }} 
          placement="bottomLeft"
        >
          <div className="backdrop-blur-md bg-white/20 text-white rounded-full cursor-pointer shadow-sm px-4 py-2 ">
            Language 🌐
          </div>
        </Dropdown>

        {/* 设置按钮 */}  
        <div className="px-4 py-2 backdrop-blur-md bg-white/20 text-white rounded-full cursor-pointer shadow-sm"
          onClick={() => setDrawerOpen(true)} 
        >
          <span>⚙️</span>
        </div>

      </div>


      {/* 左侧点击区域 */}
      <div className="fixed left-0 top-0 w-1/4 h-dvh z-5"
        onClick={() => handle_side_click("RIGHT")}
        style={{ opacity: 0 }}
      >
      </div>
      

      {/* 右侧点击区域 */}
      <div className="fixed right-0 top-0 w-1/4 h-dvh z-5"
        onClick={() => handle_side_click("LEFT")}
        style={{ opacity: 0 }}
      >
      </div>

      {/* 页面内容部分 - 使用 Swiper */}
      <Swiper
        modules={[Navigation, EffectFade]}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onReachBeginning={(swiper) => handle_carousel_oob(swiper)}
        onReachEnd={(swiper) => handle_carousel_oob(swiper)}
        className="w-dvw h-dvh overflow-hidden"
        effect="slide"
        slidesPerView={1}
        threshold={5}
        resistance={true}
        resistanceRatio={0.85}
      >
        {pages.map((page) => (
          <SwiperSlide key={page.id}>
            <div className="w-dvw h-dvh overscroll-none">
              {page.content}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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