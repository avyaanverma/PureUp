import p_img1 from './p_img1.jpg'
import p_img2 from './p_img2.jpg'
import p_img3 from './p_img3.jpg'
import p_img4 from './p_img4.jpg'
import p_img5 from './p_img5.jpg'
import p_img6 from './p_img6.jpg'
import p_img7 from './p_img7.png'
import p_img8 from './p_img8.png'
import p_img9 from './p_img9.png'
import p_img10 from './p_img10.png'
import p_img11 from './p_img11.png'
import p_img12 from './p_img12.png'
import p_img13 from './p_img13.png'
import p_img14 from './p_img14.png'
import p_img15 from './p_img15.png'

import logo from './logo.png'
import hero_img from './hero_img.png'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'

export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon
}

export const products = [
    {
        _id: "aaaaa",
        name: "Organic Potting Soil Mix",
        description: "A lightweight, nutrient-rich soil mix ideal for all types of indoor and outdoor plants, promoting healthy growth and strong roots.",
        price: 100,
        image: [p_img1],
        category: "Soil",
        subCategory: "Loamy",
        sizes: ["5kg", "10kg", "20kg"],
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "aaaab",
        name: "Snake Plant",
        description: "A hardy, air-purifying plant with long, upright green leaves, perfect for home and office environments.",
        price: 200,
        image: [p_img2],
        category: "Plant",
        subCategory: "Sandy",
        sizes: ["Small", "Medium", "Large"],
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "aaaac",
        name: "Basil Seeds Pack",
        description: "Fresh basil seeds for home gardening. Grow your own organic herbs easily.",
        price: 220,
        image: [p_img3],
        category: "Seeds",
        subCategory: "Loamy",
        sizes: ["50g", "100g", "250g"],
        date: 1716234545448,
        bestseller: true
    },
    {
        _id: "aaaad",
        name: "Aloe Vera Plant",
        description: "A succulent plant known for its medicinal properties, requiring minimal care and thriving in sunny conditions.",
        price: 110,
        image: [p_img4],
        category: "Plant",
        subCategory: "Sandy",
        sizes: ["Small", "Medium", "Large"],
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "aaaae",
        name: "Cactus Mix Soil",
        description: "A special blend of fast-draining soil designed for cacti and succulents, preventing root rot and ensuring optimal plant health.",
        price: 130,
        image: [p_img5],
        category: "Soil",
        subCategory: "Sandy",
        sizes: ["5kg", "10kg", "20kg"],
        date: 1716622345448,
        bestseller: true
    },
    {
        _id: "aaaaf",
        name: "Ceramic Plant Pot Set",
        description: "A set of beautifully designed ceramic pots perfect for indoor and outdoor plants, adding elegance to any space.",
        price: 140,
        image: [p_img6],
        category: "Accessories",
        subCategory: "Clay",
        sizes: ["Small", "Medium", "Large"],
        date: 1716623423448,
        bestseller: true
    },
    {
        _id: "aaaag",
        name: "Adjustable Watering Can",
        description: "A durable watering can with an adjustable spout for precise watering of plants.",
        price: 190,
        image: [p_img7],
        category: "Accessories",
        subCategory: "Sandy",
        sizes: ["1L", "2L", "5L"],
        date: 1716621542448,
        bestseller: false
    },
    {
        _id: "aaaah",
        name: "Handheld Pruning Shears",
        description: "High-quality pruning shears for trimming and maintaining healthy plant growth.",
        price: 140,
        image: [p_img8],
        category: "Accessories",
        subCategory: "Clay",
        sizes: ["Small", "Medium", "Large"],
        date: 1716622345448,
        bestseller: false
    },
    {
        _id: "aaaai",
        name: "Organic Fertilizer Mix",
        description: "A nutrient-rich organic fertilizer to enhance plant growth and soil quality.",
        price: 100,
        image: [p_img9],
        category: "Fertilizers",
        subCategory: "Loamy",
        sizes: ["1kg", "5kg", "10kg"],
        date: 1716621235448,
        bestseller: false
    },
    {
        _id: "aaaaj",
        name: "Plant Support Trellis",
        description: "A strong and durable trellis to provide support for climbing plants and vines.",
        price: 110,
        image: [p_img10],
        category: "Accessories",
        subCategory: "Clay",
        sizes: ["Small", "Medium", "Large"],
        date: 1716622235448,
        bestseller: false
    },
    {
        _id: "aaaak",
        name: "Garden Tool Set",
        description: "A complete set of gardening tools including trowel, rake, and weeder for easy plant care.",
        price: 120,
        image: [p_img11],
        category: "Accessories",
        subCategory: "Sandy",
        sizes: ["Basic", "Advanced"],
        date: 1716623345448,
        bestseller: false
    },
    {
        _id: "aaaal",
        name: "Self-Watering Plant Pot",
        description: "A smart self-watering plant pot designed to provide consistent moisture to your plants.",
        price: 150,
        image: [p_img12],
        category: "Accessories",
        subCategory: "Clay",
        sizes: ["Small", "Medium", "Large"],
        date: 1716624445448,
        bestseller: false
    },
    {
        _id: "aaaam",
        name: "Compost Bin for Home Gardening",
        description: "An easy-to-use compost bin to turn kitchen waste into nutrient-rich compost for plants.",
        price: 130,
        image: [p_img13],
        category: "Fertilizers",
        subCategory: "Loamy",
        sizes: ["Small", "Medium", "Large"],
        date: 1716625545448,
        bestseller: false
    }
    ,
    {
        _id: "aaaan",
        name: "Plant Stand for Indoor Plants",
        description: "A stylish plant stand to display your indoor plants and add a touch of elegance to your home decor.",
        price: 160,
        image: [p_img14],
        category: "Plant",
        subCategory: "Sandy",
        sizes: ["Small", "Medium", "Large"],
        date: 1716626645448,
        bestseller: false
    },
    {
        _id: "aaaao",
        name: "Vase Stand for Indoor Plants",
        description: "A stylish vase stand to display your indoor plants and add a touch of elegance to your home decor.",
        price: 140,
        image: [p_img15],
        category: "Plant",
        subCategory: "Loamy",
        sizes: ["Small", "Medium", "Large"],
        date: 1716627745448,
        bestseller: false
    }

]