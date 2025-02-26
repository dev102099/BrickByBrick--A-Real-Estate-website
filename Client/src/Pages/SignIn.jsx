import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  singInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/oAuth";

export default function SignIn() {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";
  let [formData, setformData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleData = (e) => {
    setformData((formData = { ...formData, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(singInFailure(data.message));
        return;
      } else {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(singInFailure(error.message));
    }
  };
  return (
    <>
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-semibold text-center my-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleData}
            className="border rounded-lg p-3 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleData}
            className="border rounded-lg p-3 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-950 hover:opacity-80 text-white p-3 rounded-lg"
          >
            {loading ? "Loading..." : "SIGN IN"}
          </button>
          <OAuth></OAuth>
        </form>

        <div className="flex pt-3">
          <p className="pr-2">Dont have an account?</p>
          <Link to="/sign-up">
            <span className="hover:underline text-blue-500">Sign up</span>
          </Link>
        </div>
      </div>
    </>
  );
}
