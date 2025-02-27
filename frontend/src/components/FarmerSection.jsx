import { useEffect, useState } from "react";
import { getAllFarmers } from "../services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const FarmerSection = () => {
    const [farmers, setFarmers] = useState([]);

    useEffect(() => {
        const fetchFarmers = async () => {
            const data = await getAllFarmers();
            setFarmers(data);
        };
        fetchFarmers();
    }, []);

    return (
        <section className="relative w-full h-[500px]">
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="w-full h-full"
            >
                {farmers.map((farmer) => (
                    <SwiperSlide key={farmer._id} className="relative w-full h-[500px]">
                        {/* Background image with a dark overlay using linear-gradient */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${farmer.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }}
                        />
                        {/* Centered text over the image */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
                            <h2 className="text-3xl font-bold">{farmer.name}</h2>
                            <p className="text-lg mt-2 w-3/4">{farmer.story}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default FarmerSection;
