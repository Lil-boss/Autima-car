import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About/About";
import Dashboard from "./pages/Dashboard/Dashboard";
import Blogs from "./pages/Blogs/Blogs";
import ErrorPage from "./pages/Extra/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import AllProduct from "./components/AllProduct/AllProduct";
import AllUsers from "./components/AllUsers/AllUsers";
import Orders from "./components/Orders/Orders";
import AllReviews from "./components/AllReviews/AllReviews";
import UpdateModal from "./components/UpdateProductModal/UpdateModal";
import { Toaster } from "react-hot-toast";
import PurchaseModal from "./components/PurchaseModal/PurchaseModal";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import RequiredAuth from "./pages/Auth/RequiredAuth/RequiredAuth";
import ManageOrders from "./components/ManageOrders/ManageOrders";
import MyProfile from "./components/MyProfile/MyProfile";
import UpdateUser from "./components/UpdateUser/UpdateUser";

function App() {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={
          <RequiredAuth>
            <Dashboard />
          </RequiredAuth>}>
          <Route index element={<MyProfile />} />
          <Route path="/dashboard/product" element={<AllProduct />} />
          <Route path="/dashboard/users" element={<AllUsers />} />
          <Route path="/dashboard/manageOrders" element={<ManageOrders />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/reviews" element={<AllReviews />} />
          <Route path="/dashboard/update/:id" element={<UpdateModal />} />
          <Route path="/dashboard/updateUser/:id" element={<UpdateUser />} />
        </Route>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/purchase/:id" element={
          <RequiredAuth>
            <PurchaseModal />
          </RequiredAuth>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

    </div>
  );
}

export default App;
