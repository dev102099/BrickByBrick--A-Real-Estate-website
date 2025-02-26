import { useEffect, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HotelIcon from "@mui/icons-material/Hotel";
import BathroomIcon from "@mui/icons-material/Bathroom";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import WeekendIcon from "@mui/icons-material/Weekend";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
import Spinner from "../components/Spinner";
function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [listings, setListings] = useState({ images: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contact, setContact] = useState(false);
  const [formatedPrice, setFormatedPrice] = useState(null);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/getListing/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          console.log(data.message);
          return;
        }
        setFormatedPrice(data.regularPrice.toLocaleString("en-IN"));
        setListings(data);

        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchListings();
  }, []);

  return (
    <main>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <Swiper navigation>
            {listings.images.map((image) => (
              <SwiperSlide key={image}>
                <div
                  className="h-[550px] rounded-lg"
                  style={{
                    background: `url(${image}) center`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center mb-6">
            <div className="w-250 flex flex-col justify-center">
              <div>
                <p className="font-semibold text-2xl m-5">
                  <span className="text-blue-300">{listings.name}-</span>

                  {listings.type === "rent" ? (
                    <span className="text-gray-400">
                      {` ${getSymbolFromCurrency("INR")} ${formatedPrice}`} /
                      Month
                    </span>
                  ) : (
                    <span className="">{` ${getSymbolFromCurrency(
                      "INR"
                    )}${formatedPrice}`}</span>
                  )}
                </p>
                <p className="ml-3.5 flex items-center">
                  <LocationOnIcon fontSize="small" color="success" />{" "}
                  <span className=" font-semibold">{listings.address}</span>
                </p>
              </div>
              <div className="mt-3 gap-3">
                <span className="bg-red-800 text-white p-2 pr-10 pl-10 rounded-md ml-3.5">
                  To {listings.type}
                </span>
                {listings.offer === true ? (
                  <span className="text-white bg-green-800 p-2 pl-10 pr-10 rounded-md ml-3">
                    {getSymbolFromCurrency("INR")}
                    {+listings.regularPrice - +listings.discountedPrice}{" "}
                    Discount
                  </span>
                ) : null}
              </div>
              <p className="ml-3.5 mt-3">
                <b>Description:</b> {listings.description}
              </p>

              <div className="flex flex-wrap mt-2">
                <div className="flex gap-1 items-center ml-3.5">
                  <span>
                    <HotelIcon color="success" fontSize="small"></HotelIcon>
                  </span>
                  <span className="font-semibold text-green-700 text-sm mt-1">
                    {listings.bedrooms} {listings.bedrooms > 1 ? "Beds" : "Bed"}
                  </span>
                </div>

                <div className="flex gap-1 items-center ml-3.5">
                  <span>
                    <BathroomIcon
                      color="success"
                      fontSize="small"
                    ></BathroomIcon>
                  </span>
                  <span className="font-semibold text-green-700 text-sm mt-1">
                    {listings.bathrooms}{" "}
                    {listings.bathrooms > 1 ? "Baths" : "Bath"}
                  </span>
                </div>

                <div className="flex gap-1 items-center ml-3.5">
                  <span>
                    <LocalParkingIcon
                      color="success"
                      background="success"
                      fontSize="small"
                    ></LocalParkingIcon>
                  </span>
                  <span className="font-semibold text-green-700 text-sm mt-1">
                    {listings.parking ? "With Parking" : "No Parking"}
                  </span>
                </div>

                <div className="flex gap-1 items-center ml-3.5">
                  <span>
                    <WeekendIcon
                      color="success"
                      background="success"
                      fontSize="small"
                    ></WeekendIcon>
                  </span>
                  <span className="font-semibold text-green-700 text-sm mt-1">
                    {listings.furnished ? " Furnished" : "Not Furnished"}
                  </span>
                </div>
              </div>
              {currentUser && currentUser._id === listings.userRef ? null : (
                <div className="flex justify-center mt-8 mb-8">
                  {contact ? (
                    <Contact listing={listings} />
                  ) : (
                    <button
                      onClick={() => setContact(!contact)}
                      className="bg-blue-950 text-white p-3 w-full rounded-lg hover:opacity-90 cursor-pointer"
                    >
                      CONTACT LANDLORD
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Listing;
