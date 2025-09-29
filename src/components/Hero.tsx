"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Hero = () => {
  return (
    <div id="hero" className="relative w-full h-[calc(100vh-4rem)]">
      <Swiper
        className="w-full h-full"
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <SwiperSlide key={item} className="relative w-full h-full">
            <Image
              src="https://deenfashionbd.com/public/storage/images/slider/0rXWDqaCBN0DY1t9uYO0F9JfCCah5zoONEeRlxWB.jpg"
              alt={`Hero ${item}`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={100}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.7;
          width: 12px;
          height: 12px;
          margin: 0 8px !important;
        }
        .swiper-pagination-bullet-active {
          background: #fff !important;
          opacity: 1;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          --swiper-navigation-size: 30px;
          padding: 0 20px;
        }
      `}</style>
    </div>
  );
};

export default Hero;
