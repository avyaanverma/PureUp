import { useEffect, useState, useRef } from "react";
import { getAllFarmers } from "../services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const FarmerSection = () => {
    const [farmers, setFarmers] = useState([]);
    const swiperRef = useRef(null); // Reference for Swiper instance

    useEffect(() => {
        const fetchFarmers = async () => {
            const data = await getAllFarmers();
            setFarmers(data);
        };
        fetchFarmers();
    }, []);

    return (
        <section className="relative w-full h-[500px]">
                            <button 
                                className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md z-10"
                                onClick={() => swiperRef.current?.slidePrev()}
                            >
                                ❮ Prev
                            </button>
                            <button 
                                className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md z-10"
                                onClick={() => swiperRef.current?.slideNext()}
                            >
                                Next ❯
                            </button>
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                slidesPerView={1}
                slidesPerGroup={1}
                className="w-full h-full"
                onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance
            >
                {farmers.map((farmer, index) => (
                    <SwiperSlide key={index} className="relative w-full h-fullj">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${farmer.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }}
                        />
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
                            <h2 className="text-3xl font-bold">{farmer.name}</h2>
                            <p className="text-lg mt-2 w-3/4">{farmer.story}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Buttons */}
        </section>
    );
};

export default FarmerSection;
