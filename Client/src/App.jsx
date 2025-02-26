import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import CreateListing from "./Pages/CreateListing";
import "./App.css";
import Nav from "./components/Nav";
import PrivateProfile from "./components/privateProfile";
import UpdateListing from "./Pages/UpdateListing";
import Listing from "./Pages/Listing";
import Search from "./Pages/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Nav></Nav>
        <Home></Home>
      </div>
    ),
  },
  {
    path: "/about",
    element: (
      <div>
        <Nav></Nav>
        <About></About>
      </div>
    ),
  },
  {
    path: "/profile",
    element: (
      <div>
        <PrivateProfile />
      </div>
    ),
    children: [
      {
        index: true,
        element: (
          <div>
            <Nav />
            <Profile />
          </div>
        ),
      },
    ],
  },

  {
    path: "/sign-in",
    element: (
      <div>
        <Nav></Nav>
        <SignIn></SignIn>
      </div>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <div>
        <Nav></Nav>
        <SignUp></SignUp>
      </div>
    ),
  },
  {
    path: "/create-listing",
    element: (
      <>
        <Nav></Nav>
        <CreateListing></CreateListing>
      </>
    ),
  },
  {
    path: "/update-listing/:listingId",
    element: (
      <>
        <Nav></Nav>
        <UpdateListing></UpdateListing>
      </>
    ),
  },
  {
    path: "/listing/:listingId",
    element: (
      <>
        <Nav></Nav>
        <Listing></Listing>
      </>
    ),
  },
  {
    path: "/search?",
    element: (
      <>
        <Nav></Nav>
        <Search />
      </>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
