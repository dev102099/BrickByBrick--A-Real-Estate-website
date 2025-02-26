import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/oAuth";
export default function SignUp() {
  let [formData, setformData] = useState({});
  let [loading, setLoad] = useState(false);
  let [Error, setError] = useState(null);
  const navigate = useNavigate();

  const handleData = (e) => {
    setformData((formData = { ...formData, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      if (formData == {}) {
        alert("Form is empty");
      }
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setLoad(false);
        setError(data.message);
        alert(data.message);
      } else {
        setLoad(false);
        setError(null);
        navigate("/sign-in");
      }
    } catch (error) {
      setLoad(false);
    }
  };
  return (
    <>
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-semibold text-center my-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleData}
            className="border rounded-lg p-3 focus:outline-none"
          />
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
            {loading ? "Loading..." : "SIGN UP"}
          </button>
          <OAuth></OAuth>
        </form>
        <div className="flex pt-3">
          <p className="pr-2">Have an account?</p>
          <Link to="/sign-in">
            <span className="hover:underline text-blue-500">Sign in</span>
          </Link>
        </div>
      </div>
    </>
  );
}
