import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";
import Login from "./page/Login";
import NotFound from "./page/NotFount";
import Home from "./page/Home";
import AddNewCustomer from "./page/AddNewCustomer";
import CustomerProfile from "./page/CustomerProfile";
import CustomerEmiEntry from "./page/CustomerEmiEntry";
import Print from "./page/Print";
import Bin from "./page/Bin";
import Defaulters from "./page/Defaulters";

const App = () => {
  // const token = localStorage.getItem('jwt')
  const location = useLocation();

  // const showNavbar = location.pathname !== '/print';

  return (
    <>
      <Toaster />

      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        {/* Protected Route */}
        <Route element={<ProtectedRoute />} >


          <Route element={<DashboardLayout />} >

            <Route index element={<Home />} />
            <Route path="add" element={<AddNewCustomer />} />
            <Route path="entry" element={<CustomerEmiEntry />} />
            <Route path="customer/:id" element={<CustomerProfile />} />
            <Route path="bin" element={<Bin />} />
            <Route path="defaulter" element={<Defaulters />} />
            <Route path="defaulter/customer/:id" element={<CustomerProfile />} />


          </Route>

          <Route path="print" element={<Print />} />
        </Route>

        {/* 404 page */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App