"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper';
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Navigation } from "swiper/modules";
import Image from "next/image";
import { FC, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideData {
  id: number;
  imageUrl: string;
}

const  ImageSlider: FC = () => {
  const slides: SlideData[] = [
    { id: 1, imageUrl: "/images/product/product-05.png" },
    { id: 2, imageUrl: "/images/product/product-06.png" },
    { id: 3, imageUrl: "/images/product/product-07.png" },
    { id: 4, imageUrl: "/images/product/product-08.png" },
    { id: 5, imageUrl: "/images/product/product-09.png" },
  ];

  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto relative">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Navigation]}
          className="mySwiper"
          style={{
            width: '500px',
            height: '400px',
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper as SwiperType;
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={slide.imageUrl}
                  alt={`Slide ${slide.id}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full bg-white p-2 rounded-full shadow-md"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full bg-white p-2 rounded-full shadow-md"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;