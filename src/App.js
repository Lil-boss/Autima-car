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

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<AllProduct />} />
          <Route path="/dashboard/users" element={<AllUsers />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/reviews" element={<AllReviews />} />
        </Route>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>

    </div>
  );
}

export default App;
