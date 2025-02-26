import React, { useEffect, useState } from "react";
import "../App.css";
import ListingCard from "../components/ListingCard";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

function Home() {
  SwiperCore.use([Navigation]);
  const [offerListing, setOfferListing] = useState();
  const [sellListing, setSellListing] = useState();
  const [rentListing, setRentListing] = useState();
  const [imageArray, setImage] = useState([
    "https://images.unsplash.com/photo-1622015663319-e97e697503ee?q=80&w=3177&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1628744448839-a475cc0e90c3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ]);

  useEffect(() => {
    const offerFetch = async () => {
      try {
        const res = await fetch(
          "/api/listing/get?offer=true&limit=4&sort=createdAt"
        );
        const data = await res.json();
        setOfferListing(data);
        sellFetch();
      } catch (error) {
        console.log(error);
      }
    };

    const sellFetch = async () => {
      try {
        const res = await fetch(
          "/api/listing/get?type=sell&limit=4&sort=createdAt"
        );
        const data = await res.json();
        setSellListing(data);
        rentFetch();
      } catch (error) {
        console.log(error);
      }
    };

    const rentFetch = async () => {
      try {
        const res = await fetch(
          "/api/listing/get?type=rent&limit=4&sort=createdAt"
        );
        const data = await res.json();
        setRentListing(data);
      } catch (error) {
        console.log(error);
      }
    };

    offerFetch();
  }, []);

  return (
    <div>
      {/* top */}

      <div className="flex flex-col bg-container mb-5 gap-2 p-20 py-40">
        <h1 className="text-2xl font-display lg:text-5xl ">
          "Your <span className="text-red-800">journey</span> home begins here –
          where every listing is a{" "}
          <span className="text-red-800">possibility</span>
          <br />, and every door leads to a new{" "}
          <span className="text-red-800">beginning</span>."
        </h1>
        <div>
          At <span className="text-red-700">Brick</span>
          <span>By</span>
          <span className="text-red-700">Brick</span>, we turn dreams into
          addresses—one home at a time.
          <br />
          Whether you're buying, selling, or investing, we build your future,
          brick by brick.
        </div>
      </div>

      {/* swiper */}

      <Swiper
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Navigation]}
      >
        {imageArray.map((id, index) => (
          <SwiperSlide key={index}>
            <img src={id} className="h-150 w-full" alt="" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom */}

      <div className="bg-subtle-white pt-40">
        <div className="px-10">
          <h1 className="font-semibold font-garamond text-subtle-gray text-2xl">
            Recent Offers:
          </h1>
          <div className="flex gap-5 mt-5">
            {offerListing &&
              offerListing.map((offer) => <ListingCard listings={offer} />)}
          </div>
        </div>

        <div className="px-10">
          <h1 className="font-semibold font-garamond text-subtle-gray mt-20 text-2xl">
            Recent Places For Sale:
          </h1>
          <div className="flex gap-5 mt-5">
            {sellListing &&
              sellListing.map((offer) => <ListingCard listings={offer} />)}
          </div>
        </div>

        <div className="px-10">
          <h1 className="font-semibold font-garamond text-subtle-gray mt-20 text-2xl">
            Recent Places For Rent:
          </h1>
          <div className="flex gap-5 mt-5">
            {rentListing &&
              rentListing.map((offer) => <ListingCard listings={offer} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
