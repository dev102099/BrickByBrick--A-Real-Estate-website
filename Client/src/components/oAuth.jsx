import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function oAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        }),
        credentials: "include",
      });
      const data = await res.json();

      dispatch(signInSuccess(data));

      navigate("/");
    } catch (error) {
      console.log("Could not connect Google account", error);
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={handleGoogle}
        className="bg-red-700 text-white p-3 uppercase rounded-lg hover:opacity-80"
      >
        Continue with google
      </button>
    </>
  );
}

export default oAuth;
