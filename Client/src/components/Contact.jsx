import { dividerClasses } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";
  const [message, setMessage] = useState(null);
  useEffect(() => {
    const getLandLord = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/users/${listing.userRef}`,
          { credentials: "include" }
        );

        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setLandlord(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getLandLord();
  }, [listing.userRef]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landlord ? (
        <>
          <div className="flex flex-col w-full">
            <span className="">
              Contact{" "}
              <span className="font-semibold text-blue-300">
                {landlord.username}
              </span>{" "}
              for{" "}
              <span className="font-semibold text-blue-300">
                {listing.name}
              </span>
            </span>
            <textarea
              name="message"
              id="message"
              rows={3}
              onChange={(e) => handleMessage(e)}
              placeholder="Enter your message here..."
              className="mt-2 bg-black text-white row rounded-lg p-2 "
            ></textarea>
            <Link
              to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
              className="bg-blue-950 text-white text-center rounded-lg p-3 mt-3"
            >
              Send Message
            </Link>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Contact;
