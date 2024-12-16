'use client';
import React from 'react';
import { FiUserCheck, FiShield, FiSmartphone } from 'react-icons/fi';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
const Features = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem className="text-white">
          <div className="p-1 ">
            <div className="flex flex-col gap-2 rounded-lg ">
              <div className="flex justify-start gap-2 items-center">
                <FiUserCheck strokeWidth={3} size={22} />
                <h3 className="font-semibold">Accessepilty</h3>
              </div>
              <p className="md:text-md text-sm">
                Flowify is designed with user accessibility in mind, offering an
                intuitive and user-friendly interface that caters to a wide
                range of user needs. Whether you're a beginner or a pro, Flowify
                adapts to your workflow seamlessly.
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="text-white">
          <div className="p-1">
            <div className="flex flex-col gap-2 rounded-lg ">
              <div className="flex justify-start gap-2 items-center">
                <FiShield strokeWidth={3} size={22} />
                <h3 className="font-semibold">Security</h3>
              </div>
              <p className="md:text-md text-sm">
                Your data is safe with Flowify. By integrating robust
                authentication protocols, including secure login options with
                Google, we ensure full data protection and peace of mind.
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="text-white">
          <div className="p-1">
            <div className="flex flex-col gap-2 rounded-lg ">
              <div className="flex justify-start gap-2 items-center">
                <FiSmartphone strokeWidth={3} size={22} />
                <h3 className="font-semibold">Responsiveness</h3>
              </div>
              <p className="md:text-md text-sm">
                Enjoy a smooth experience on any device. Flowify is optimized
                for responsiveness, ensuring seamless functionality on desktops,
                tablets, and smartphones.
              </p>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default Features;
