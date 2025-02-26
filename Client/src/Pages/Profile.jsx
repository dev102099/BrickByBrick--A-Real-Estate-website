import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  onUpdateStart,
  onUpdateSuccess,
  onUpdateFailure,
  onDeleteStart,
  onDeleteFail,
  onDeleteSuccess,
  onSignoutStart,
  onSignoutSuccess,
  onSignoutFail,
} from "../redux/user/userSlice";
import { useState } from "react";

export default function Profile() {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";
  const fileRef = useRef(null);
  const [bool, setBool] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [errorListings, setErrorListings] = useState(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { deleteLoading } = useSelector((state) => state.user);
  const { signoutLoading } = useSelector((state) => state.user);
  const maxSizeInBytes = 2 * 1024 * 1024;
  const [userListings, setUserListings] = useState([]);
  const [imageUpdated, setImageUpdated] = useState(false);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUpload = async (event) => {
    const file = event.target.files[0];

    if (file && file.size > maxSizeInBytes) {
      alert("File is too large. Please select a file smaller than 1MB.");
      return;
    }

    try {
      const imageU = await toBase64(file);

      setFormData({ avatar: imageU });
      setImageUpdated(true);

      setTimeout(() => {
        setImageUpdated(false);
      }, 2000);
    } catch (error) {
      console.error("Error converting file to Base64:", error);
    }
  };

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      dispatch(onUpdateStart());
      const res = await fetch(`/api/users/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(onUpdateFailure(data.message));
        return;
      }
      dispatch(onUpdateSuccess(data));
    } catch (error) {
      dispatch(onUpdateFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(onDeleteStart());
      const res = await fetch(
        `${API_BASE_URL}/api/users/delete/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(onDeleteFail(data.message));
      }
      dispatch(onDeleteSuccess());
    } catch (error) {
      dispatch(onDeleteFail(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(onSignoutStart());
      const res = await fetch(`${API_BASE_URL}/api/auth/signout`);
      const data = await res.json();
      if (data.success == false) {
        dispatch(onSignoutFail(data.message));
        return;
      }
      dispatch(onSignoutSuccess());
    } catch (error) {
      dispatch(onSignoutFail(error.message));
    }
  };

  const handleListing = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/users/listing/${currentUser._id}`
      );
      const data = await res.json();
      if (data.success === false) {
        setErrorListings(true);
        return;
      }

      setUserListings(data);
      if (data.length === 0) {
        setBool(true);
      }
    } catch (error) {
      setErrorListings(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/listing/delete/${listingId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col">
        <input
          type="file"
          ref={fileRef}
          onChange={handleUpload}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => {
            fileRef.current.click();
          }}
          src={
            currentUser.avatar != null
              ? currentUser.avatar
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="Profile"
          className="rounded-full h-20 w-20 object-cover cursor-pointer self-center "
        />
        {imageUpdated == true ? (
          <span className="text-green-600 text-center">
            Image uploaded successfully!
          </span>
        ) : null}
        <input
          type="text"
          id="username"
          onChange={handleFormData}
          defaultValue={currentUser.username}
          placeholder="Username"
          className="self-center  bg-black text-white p-3 rounded-lg w-110 mt-10"
        />
        <input
          type="email"
          id="email"
          onChange={handleFormData}
          defaultValue={currentUser.email}
          placeholder="Email"
          className="self-center  bg-black text-white p-3 rounded-lg w-110 mt-3"
        />
        <input
          type="password"
          id="password"
          onChange={handleFormData}
          placeholder="Password"
          className="self-center  bg-black text-white p-3 rounded-lg w-110 mt-3"
        />
        <button
          id="update"
          type="button"
          onClick={handleUpdate}
          className=" hover:opacity-80 cursor-pointer uppercase bg-blue-950 text-white rounded-lg p-3 self-center mt-5 w-110"
        >
          {loading ? "LOADING..." : "UPDATE"}
        </button>
        <Link
          to={"/create-listing"}
          className="text-center hover:opacity-80 bg-green-700 mt-2 w-110 self-center p-3 text-white rounded-lg"
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-center gap-67 cursor-pointer">
        <span
          onClick={handleDelete}
          className="text-red-700 mt-2 hover:underline"
        >
          {deleteLoading ? "Deleting User..." : "Delete Account"}
        </span>
        <span
          onClick={handleSignout}
          className="text-red-700 mt-2 hover:underline"
        >
          {signoutLoading ? "Signing Out Now..." : "Sign Out"}
        </span>
      </div>
      <div className="flex justify-center">
        {" "}
        <span
          onClick={handleListing}
          className="text-green-600 mt-6 hover:underline cursor-pointer "
        >
          My Listings
        </span>
        {errorListings ? (
          <p className="text-red-700 text-lg">Something went wrong</p>
        ) : null}
      </div>

      {userListings != null && userListings.length > 0
        ? userListings.map((listings, index) => {
            return (
              <div key={listings._id} className="flex justify-center m-3">
                <div className="flex border border-gray-300 rounded-lg w-120 justify-between items-center p-3">
                  <img
                    src={listings.images[0]}
                    className="w-30 h-15  rounded-lg"
                  />
                  <Link
                    to={`/listing/${listings._id}`}
                    className="hover:underline"
                  >
                    <p className="font-semibold">{`${listings.name}`}</p>
                  </Link>
                  <div className="flex flex-col">
                    <button
                      onClick={() => handleListingDelete(listings._id)}
                      className="text-red-700 hover:underline"
                    >
                      Delete
                    </button>
                    <Link to={`/update-listing/${listings._id}`}>
                      <button className="text-green-600 hover:underline">
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        : null}
      {bool ? (
        <div className="flex justify-center text-red-700">
          No listings yet by you.
        </div>
      ) : null}
    </>
  );
}
