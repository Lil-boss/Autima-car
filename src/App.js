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
import Payments from "./components/Payments/Payments";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ForgetPassword from "./pages/Auth/ForgetPassword/ForgetPassword";
const stripePromise = loadStripe('pk_test_51L33vZEbRaFU5Eq7u6bUTw2RiaaYnGEgIJv7MTBHCFBBW4mfzOOHIEPr35bRSq2okG8lZt67EybT5kmCZBkzwV5000XKJO2TEs');
function App() {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPass" element={<ForgetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={
          <RequiredAuth>
            <Dashboard />
          </RequiredAuth>}>
          <Route index element={<MyProfile />} />
          <Route path="/dashboard/product" element={<AllProduct />} />
          <Route path="/dashboard/users" element={<AllUsers />} />
          <Route path="/dashboard/payment/:id" element={
            <Elements stripe={stripePromise}>
              <Payments />
            </Elements>
          } />
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
