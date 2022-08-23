import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Navbar,
  AllProduct,
  AllUsers,
  Orders,
  AllReviews,
  UpdateModal,
  PurchaseModal,
  ManageOrders,
  MyProfile,
  UpdateUser,
  Payments,
  ShowProduct,
} from "./components";
import About from "./pages/About/About";
import Dashboard from "./pages/Dashboard/Dashboard";
import Blogs from "./pages/Blogs/Blogs";
import ErrorPage from "./pages/Extra/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import RequiredAuth from "./pages/Auth/RequiredAuth/RequiredAuth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ForgetPassword from "./pages/Auth/ForgetPassword/ForgetPassword";
import MyPortfolio from "./pages/MyPortfolio/MyPortfolio";
import ContactUs from "./pages/ContactUs/ContactUs";
const stripePromise = loadStripe(
  "pk_test_51L33vZEbRaFU5Eq7u6bUTw2RiaaYnGEgIJv7MTBHCFBBW4mfzOOHIEPr35bRSq2okG8lZt67EybT5kmCZBkzwV5000XKJO2TEs"
);
function App() {
  const queryClient = new QueryClient();
  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPass" element={<ForgetPassword />} />
        <Route
          path="/"
          element={
            <QueryClientProvider client={queryClient}>
              <Home />
            </QueryClientProvider>
          }
        />
        <Route path="/showProduct" element={<ShowProduct />} />
        <Route
          path="/dashboard"
          element={
            <RequiredAuth>
              <Dashboard />
            </RequiredAuth>
          }
        >
          <Route index element={<MyProfile />} />
          <Route path="/dashboard/product" element={<AllProduct />} />
          <Route path="/dashboard/users" element={<AllUsers />} />
          <Route
            path="/dashboard/payment/:id"
            element={
              <Elements stripe={stripePromise}>
                <Payments />
              </Elements>
            }
          />
          <Route path="/dashboard/manageOrders" element={<ManageOrders />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/reviews" element={<AllReviews />} />
          <Route path="/dashboard/update/:id" element={<UpdateModal />} />
          <Route path="/dashboard/updateUser/:id" element={<UpdateUser />} />
        </Route>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<MyPortfolio />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/purchase/:id"
          element={
            <RequiredAuth>
              <PurchaseModal />
            </RequiredAuth>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
