import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import getSymbolFromCurrency from "currency-symbol-map";
import HotelIcon from "@mui/icons-material/Hotel";
import BathroomIcon from "@mui/icons-material/Bathroom";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import WeekendIcon from "@mui/icons-material/Weekend";
import { Link } from "react-router-dom";
import { colors } from "@mui/material";
function ListingCard({ listings }) {
  const formattedPrice = listings.regularPrice.toLocaleString("en-IN");
  return (
    <Link to={`/listing/${listings._id}`}>
      <div className="shadow-2xl h-90 rounded-b-md w-60 md:w-70 hover:scale-105 transition-3 ">
        <img src={listings.images[0]} className="object-cover h-45 w-full" />
        <div className="p-4 ">
          <div className="flex justify-between">
            {listings.type === "sell" ? (
              <span className="font-semibold font-garamond text-2xl text-subtle-blue">
                {getSymbolFromCurrency("INR")}
                {listings.regularPrice.toLocaleString("en-IN")}
              </span>
            ) : (
              <span className="font-semibold font-garamond text-2xl text-subtle-blue">
                {getSymbolFromCurrency("INR")}
                {listings.regularPrice.toLocaleString("en-IN")}
                <span className="text-sm">/Month</span>
              </span>
            )}

            <span className="text-center self-center bg-red-800 rounded w-10 text-xs text-white ">
              {listings.type.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center">
            <LocationOnIcon
              sx={{ color: "green" }}
              fontSize="small"
              className="p-0"
            />
            <span className="text-xs">{listings.address}</span>
          </div>

          <div className="flex mt-8 justify-between">
            <div className="flex gap-1 items-center">
              <HotelIcon sx={{ color: "#03346E" }} fontSize="large" />
              <span className="font-semibold">{listings.bedrooms}</span>
            </div>
            <div
              className="flex gap-1 items-center
            "
            >
              <BathroomIcon sx={{ color: "#03346E" }} fontSize="large" />
              <span className="font-semibold">{listings.bathrooms}</span>
            </div>
            {listings.parking ? (
              <LocalParkingIcon sx={{ color: "#03346E" }} fontSize="large" />
            ) : null}
            {listings.furnished ? (
              <WeekendIcon sx={{ color: "#03346E" }} fontSize="large" />
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;
