import React from "react";

export const Header = () => {
  return (
    <section className="bg-white ">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-green-900 ">
            Bringing Nature Closer to You
          </h2>
          <p className="mb-4">
            At Nearby Nursery, we are passionate about connecting you with the
            beauty of nature. Whether you're looking for vibrant flowers,
            healthy plants, or expert gardening advice, we offer a wide range of
            products and services to help your garden thrive. Small enough to
            provide personalized care, but large enough to offer everything you
            need for a lush, green space.
          </p>
          <p>
            We are your go-to destination for top-quality plants, gardening
            essentials, and professional guidance. Let us help you create your
            perfect garden with expert tips, hand-picked plants, and everything
            you need to grow your green oasis.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src="https://plus.unsplash.com/premium_photo-1679428401832-37cc21a5647d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhbnQlMjBudXJzZXJ5fGVufDB8fDB8fHww"
            alt="office content 1"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src="https://5.imimg.com/data5/SELLER/Default/2023/2/GS/OX/FK/12780455/whatsapp-image-2023-02-03-at-10-41-38-am-500x500.jpeg"
            alt="office content 2"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
