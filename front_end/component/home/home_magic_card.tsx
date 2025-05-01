"use client";

// 定义参数接口
interface MagicCardProps {
  card_info: {
    main_color: string;
    bg_image: string;
    title_line_one: string;
    title_line_two: string;
    description: string;
    button: string;
  };
}

export default function MagicCard({ card_info }: MagicCardProps) {
  
  return (
    <div className={`w-dvw h-dvh bg-[${card_info.main_color}]`}>
      {/* 背景 */}
      <div className='absolute flex flex-col w-dvw h-dvh'>
        <div className="grow-7">
          <img 
            className="object-contain shadow-md rounded-lg"
            src={card_info.bg_image}
            alt=""
          />
        </div>

        <div className="grow-3"></div>
      </div>

      {/* 文字层 */}
      <div className='absolute flex flex-col w-dvw h-dvh font-jaini'>
        <div className="grow-13"></div>

        <div className="grow-3 text-start align-middle text-2xl px-5">
          {card_info.title_line_one}
        </div>

        <div className="grow-3 w-full text-center align-middle text-5xl">
          {card_info.title_line_two}
        </div>

        <div className="grow-55"></div>

        <div className="grow-20 flex flex-col bg-white/25 backdrop-blur-xl backdrop-filter backdrop-saturate-150 rounded-2xl px-3 py-3">

          <div className="grow-50 text-xl">
            {card_info.description}
          </div>

          <div className="grow-10"></div>

          <button className={`grow-30 w-full bg-black text-[${card_info.main_color}] text-center align-middle text-xl`}
            //onClick={handleButtonClick}
            //disabled={isProcessing}
          >
            {card_info.button}
          </button>

          <div className="grow-20"></div>
        </div>

      </div>
    </div>
  );
}