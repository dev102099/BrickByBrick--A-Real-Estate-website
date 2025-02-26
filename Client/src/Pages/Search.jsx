import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ListingCard from "../components/ListingCard";

function Search() {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";
  const [searchbardata, setSearchbardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [showMore, setshowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [noListing, setNoListing] = useState(false);
  useEffect(() => {
    const url = new URLSearchParams(location.search);
    const searchtermFromURL = url.get("searchTerm");
    const typeFromURL = url.get("type");
    let offerFromURL = url.get("offer");
    let parkingFromURL = url.get("parking");
    let furnishedFromURL = url.get("furnished");
    const sortFromURL = url.get("sort");
    const orderFromURL = url.get("order");

    if (
      searchtermFromURL ||
      typeFromURL ||
      offerFromURL ||
      parkingFromURL ||
      furnishedFromURL ||
      sortFromURL ||
      orderFromURL
    ) {
      setSearchbardata({
        searchTerm: searchtermFromURL || "",
        type: typeFromURL || "all",
        offer: offerFromURL === "true" ? true : false,
        parking: parkingFromURL === "true" ? true : false,
        furnished: furnishedFromURL === "true" ? true : false,
        sort: sortFromURL || "createdAt",
        order: orderFromURL || "desc",
      });
    }

    const fetchListings = async () => {
      const queryUrl = url.toString();
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/listing/get?${queryUrl}`);
      const data = await res.json();
      if (data.length === 0) {
        setNoListing(true);
      } else {
        setNoListing(false);
      }
      if (data.length > 8) {
        {
          setshowMore(true);
        }
      } else {
        setshowMore(false);
      }
      setListings(data);

      setLoading(false);
    };
    fetchListings();
  }, [location.search]);

  const navigate = useNavigate();
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sell"
    ) {
      setSearchbardata({ ...searchbardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSearchbardata({ ...searchbardata, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSearchbardata({
        ...searchbardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchbardata({ ...searchbardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = new URLSearchParams();
    url.set("searchTerm", searchbardata.searchTerm);
    url.set("type", searchbardata.type);
    url.set("parking", searchbardata.parking);
    url.set("furnished", searchbardata.furnished);
    url.set("offer", searchbardata.offer);
    url.set("sort", searchbardata.sort);
    url.set("order", searchbardata.order);
    const query = url.toString();
    navigate(`/search?${query}`);
  };
  const handleShowMore = async () => {
    const startIndex = listings.length;
    const url = new URLSearchParams(location.search);
    url.set("startIndex", startIndex);
    const Query = url.toString();
    const res = await fetch(`${API_BASE_URL}/api/listing/get?${Query}`);
    const data = await res.json();
    if (data.length < 9) {
      setshowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      {/*this is search div*/}
      <div className=" p-8  w-150 border-b-2 border-b-gray-400 md:border-r-gray-400 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
          <div className="flex gap-2 items-center">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              className="bg-black shrink w-full text-white p-3 rounded-lg"
              defaultValue={searchbardata.searchTerm}
              onChange={handleChange}
              placeholder="Search"
            />
          </div>

          {/*this is type div*/}

          <div className="flex gap-3 items-center flex-wrap">
            <label className=" font-semibold">Type:</label>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="all"
                checked={searchbardata.type === "all"}
                onChange={handleChange}
              />

              <span>Rent & sell</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="rent"
                checked={searchbardata.type === "rent"}
                onChange={handleChange}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="sell"
                checked={searchbardata.type === "sell"}
                onChange={handleChange}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="offer"
                checked={searchbardata.offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>

          {/*this is amenity div*/}

          <div className="flex gap-3 items-center flex-wrap">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="parking"
                checked={searchbardata.parking}
                onChange={handleChange}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="furnished"
                checked={searchbardata.furnished}
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>
          </div>

          {/*this is sort div*/}
          <div className="flex gap-2 items-center">
            <label htmlFor="" className="font-semibold">
              Sort:
            </label>
            <select
              defaultValue={"createdAt_desc"}
              onChange={handleChange}
              id="sort_order"
              className="bg-black text-white p-2 rounded-lg"
            >
              <option value="regularPrice_desc" className="text-white">
                Price high to low
              </option>
              <option value="regularPrice_asc" className="text-white">
                Price low to high
              </option>
              <option value="createdAt_desc" className="text-white">
                Latest
              </option>
              <option value="createdAt_asc" className="text-white">
                Oldest
              </option>
            </select>
          </div>

          <button className="p-3 bg-blue-950 text-white rounded-lg cursor-pointer hover:opacity-95">
            Search
          </button>
        </form>
      </div>

      <div className="mt-8 w-full">
        <h1 className="font-semibold text-2xl text-center">Listings</h1>
        {loading ? <Spinner /> : null}
        {noListing ? (
          <p className="text-center text-red-700 font-semibold text-lg">
            No Listings found.
          </p>
        ) : null}
        {!loading && listings && listings.length >= 1 ? (
          <div className=" gap-5 flex flex-wrap mt-4 ml-10">
            {listings.map((listing) => {
              return <ListingCard key={listing._id} listings={listing} />;
            })}
          </div>
        ) : null}
        {showMore && (
          <button
            onClick={handleShowMore}
            className="text-sm m-5 cursor-pointer text-green-600 hover:underline"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;
