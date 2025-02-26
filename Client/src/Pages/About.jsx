import React from "react";

export default function About() {
  return (
    <>
      <div className="p-8 flex flex-col mt-12 items-center">
        <h1 className="text-3xl text-center font-bold">
          About <span className="text-red-700 underline">Brick</span>
          <span className="underline">By</span>
          <span className="text-red-700 underline">Brick</span>
        </h1>
        <p className="px-10 mt-5 py-3 font-semibold ">
          At <span className="text-red-700">Brick</span>
          <span>By</span>
          <span className="text-red-700">Brick</span>, we believe that finding
          the perfect home should be an exciting and seamless journey. Whether
          you're searching for your dream home, looking to sell, or investing in
          real estate, we are here to guide you every step of the way. Our
          platform is designed to connect buyers, sellers, and investors with
          the best properties while ensuring transparency, reliability, and ease
          of access.
        </p>
        <p className="px-10 py-3 font-semibold">
          With a carefully curated selection of listings, we bring you a diverse
          range of properties that cater to every lifestyle and budget. From
          cozy apartments to luxurious villas, we showcase homes that are more
          than just structures—they are spaces where memories are made. Our
          advanced search features, expert insights, and user-friendly interface
          make the entire process effortless and efficient.
        </p>

        <p className="px-10 py-3 font-semibold">
          At the heart of BrickByBrick is our commitment to trust and
          excellence. We work tirelessly to provide accurate property details,
          market trends, and expert advice to help you make informed decisions.
          Whether you're a first-time homebuyer or a seasoned investor, our goal
          is to build lasting relationships by offering exceptional service and
          personalized experiences.
        </p>
        <p className="px-10 py-3 font-semibold">
          More than just a real estate platform,{" "}
          <span className="text-red-700">Brick</span>
          <span>By</span>
          <span className="text-red-700">Brick</span> is a community where
          dreams take shape. We don’t just help you find a house; we help you
          find a home. Let’s build your future—brick by brick.
        </p>
      </div>
    </>
  );
}
