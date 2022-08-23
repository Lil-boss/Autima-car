import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import auth from "../../pages/Auth/Firebase/firebase.init";
import Loading from "../../pages/Extra/Loading/Loading";
const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully", { id: "logout" });
      })
      .catch((error) => {
        toast.error("not logout", { id: "logout" });
      });
  };
  if (loading) {
    return <Loading />;
  }
  const navItem = (
    <>
      <li className="hover:bg-secondary hover:text-white rounded-lg py-2 px-2 text-lg">
        <Link to="/">Home</Link>
      </li>
      <li className="hover:bg-secondary hover:text-white rounded-lg py-2 px-2 text-lg">
        <Link to="/showProduct">Product</Link>
      </li>
      <li className="hover:bg-secondary hover:text-white rounded-lg py-2 px-2 text-lg">
        <Link to="/portfolio">My Portfolio</Link>
      </li>
      <li className="hover:bg-secondary hover:text-white rounded-lg py-2 px-2 text-lg">
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li className="hover:bg-secondary hover:text-white rounded-lg  py-2 px-2 text-lg">
        <Link to="/blogs">Blogs</Link>
      </li>
      <li className="hover:bg-secondary hover:text-white rounded-lg  py-2 px-2 text-lg">
        <Link to="/contact">Contact us</Link>
      </li>
      {user ? (
        <li className="hover:bg-secondary hover:text-white rounded-lg  py-2 px-2 text-lg">
          <button onClick={logout}>Logout</button>
        </li>
      ) : (
        <li className="hover:bg-secondary hover:text-white rounded-lg  py-2 px-2 text-lg">
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="p-4 bg-base-100 sticky top-0 z-10">
      <div className="w-4/5 mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold shadow-md">Autima</h2>
          <div className="flex list-none gap-6">{navItem}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
