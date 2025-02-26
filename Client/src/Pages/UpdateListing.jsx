import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
function UpdateListing() {
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setformData] = useState({
    images: [],
    name: "",
    description: "",
    address: "",
    regularPrice: 5000,
    discountedPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    parking: false,
    furnished: false,
    type: "rent",
    offer: false,
  });

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const lId = params.listingId;
        const res = await fetch(`/api/listing/getListing/${lId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        setformData(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    dataFetch();
  }, []);

  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [listImages, setListImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [failure, setFailure] = useState(false);
  const [failedImages, setFailedImages] = useState([]);
  const imageSize = 1 * 1024 * 1024;
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  const handleChange = (e) => {
    if (e.target.id === "rent" || e.target.id === "sell") {
      setformData({ ...formData, type: e.target.id });
    }
    if (
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "number"
    ) {
      setformData({ ...formData, [e.target.id]: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setformData({ ...formData, [e.target.id]: e.target.checked });
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onUpload = async () => {
    let failedImagesTemp = [];

    if (listImages.length > 0 && listImages.length < 6) {
      setUploading(true);
      for (let i = 0; i < listImages.length; i++) {
        if (!allowedTypes.includes(listImages[i].type)) {
          continue;
        }
        if (listImages[i].size > imageSize) {
          failedImagesTemp.push(listImages[i].name);
        } else {
          console.log("hi");
          const result = await toBase64(listImages[i]);
          setformData((prev) => ({
            ...prev,
            images: [...prev.images, result],
          }));
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        }
      }
      setFailedImages(failedImagesTemp);
      setUploading(false);

      if (failedImages.length > 0) {
        setFailure(true);
        setError(`${failedImages} upload failed please reduce the size to less
          than 1mb`);
        setTimeout(() => {
          setFailure(false);
        }, 5000);
      }
      setListImages([]);
    } else {
      console.log("Select some Images!");
    }
  };

  const handleRemove = (index) => {
    setformData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (formData.images.length < 1) {
        setError(`Must upload atleast one image.`);
        setFailure(true);
        setTimeout(() => {
          setFailure(false);
        }, 2000);
        return;
      }
      if (+formData.regularPrice < +formData.discountedPrice) {
        setError(`Discounted price cannot be more than Regular price.`);
        setFailure(true);
        setTimeout(() => {
          setFailure(false);
        }, 2000);
        return;
      }
      setLoading(true);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        console.error(data.message);
      }
      alert("Listing Updated");
      navigate(`/listing/${data._id}`);
    } catch (e) {
      setLoading(false);
      console.error(e.message);
    }
  };

  return (
    <>
      <h1 className="font-semibold text-center text-3xl m-10 ">
        Update Listing
      </h1>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row flex-wrap mx-auto gap-3"
        >
          <div className="flex flex-col gap-4 m-3">
            <input
              type="text"
              placeholder="Name"
              id="name"
              maxLength="60"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.name}
              className="bg-black text-white rounded-lg p-2 "
            />
            <textarea
              type="textarea"
              placeholder="Description"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
              className="bg-black text-white rounded-lg p-2 h-30"
            />
            <input
              type="text"
              placeholder="Address"
              id="address"
              required
              onChange={handleChange}
              value={formData.address}
              className="bg-black text-white rounded-lg p-2 "
            />
            <div className="flex gap-6">
              <div className="">
                <input
                  type="checkbox"
                  className="w-4"
                  id="sell"
                  onChange={handleChange}
                  checked={formData.type === "sell"}
                />
                <span>Sell</span>
              </div>
              <div className=" ">
                <input
                  type="checkbox"
                  className="w-4"
                  id="rent"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="">
                <input
                  type="checkbox"
                  className="w-4"
                  id="parking"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking Spot</span>
              </div>
              <div className="">
                <input
                  type="checkbox"
                  className="w-4"
                  id="furnished"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="">
                <input
                  type="checkbox"
                  className="w-4"
                  id="offer"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex gap-1 items-center">
                <input
                  type="number"
                  min="1"
                  max="10"
                  required
                  id="bedrooms"
                  onChange={handleChange}
                  className="bg-black text-white p-3 rounded-lg"
                  defaultValue={formData.bedrooms}
                />
                <p>Bedrooms</p>
              </div>
              <div className="flex gap-1 items-center">
                <input
                  type="number"
                  min="1"
                  max="10"
                  required
                  id="bathrooms"
                  onChange={handleChange}
                  className="bg-black text-white p-3 rounded-lg"
                  defaultValue={formData.bathrooms}
                />
                <p>Bathrooms</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-1 items-center">
                <input
                  type="number"
                  required
                  id="regularPrice"
                  onChange={handleChange}
                  className="bg-black text-white p-3 w-20 rounded-lg"
                  defaultValue={formData.regularPrice}
                />
                <div>
                  <p>Regular Price</p>
                  <p className="text-xs">(ruppees/Month)</p>
                </div>
              </div>
              {formData.offer ? (
                <div className="flex gap-1 items-center">
                  <input
                    type="number"
                    required
                    id="discountedPrice"
                    onChange={handleChange}
                    defaultValue={formData.discountedPrice}
                    className="bg-black text-white p-3 w-16 rounded-lg"
                  />
                  <div>
                    <p>Discounted Price</p>
                    <p className="text-xs">(ruppees/Month)</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-2 m-3">
            <span className="">
              <b>Images:</b> The First will be your cover image. (max 5)
            </span>

            <div className="flex gap-6">
              <input
                className="border border-black w-80 p-3 rounded border-dashed "
                onChange={(e) => setListImages(e.target.files)}
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                className="p-3 rounded-lg hover:opacity-70 cursor-pointer bg-black text-white"
                disabled={uploading}
                onClick={onUpload}
                type="button"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>

              <button
                className="p-3 rounded-lg hover:opacity-70 cursor-pointer bg-black text-white"
                onClick={() => console.log(formData)}
                type="button"
              >
                Upload2
              </button>
            </div>
            {success ? (
              <p className="text-green-600">Images uploaded successfully</p>
            ) : null}
            {failure ? <p className="text-red-700">{`${error}`}</p> : null}
            {Array.isArray(formData.images) && formData.images.length > 0
              ? formData.images.map((image, index) => {
                  return (
                    <div
                      key={image}
                      className="flex justify-between w-100 p-3 border"
                    >
                      <img
                        src={image}
                        className="w-20 h-20 rounded-lg object-contain"
                      />
                      <button
                        className="text-red-700 cursor-pointer"
                        onClick={() => handleRemove(index)}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })
              : null}
            <button
              disabled={loading || uploading}
              className="p-3 bg-blue-950 hover:opacity-80 cursor-pointer text-white rounded-lg mt-3"
            >
              {loading ? "UPDATING..." : "UPDATE LISTING"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateListing;
