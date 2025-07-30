import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Videos from "@/components/pages/Videos";
import Posts from "@/components/pages/Posts";
import Cohorts from "@/components/pages/Cohorts";
import React from "react";
import "@/index.css";
import Layout from "@/components/organisms/Layout";
import Courses from "@/components/pages/Courses";
import Community from "@/components/pages/Community";
import Checkout from "@/components/pages/Checkout";
import Home from "@/components/pages/Home";
import Vault from "@/components/pages/Vault";
import PaymentSuccess from "@/components/pages/PaymentSuccess";
import NotFound from "@/components/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/cohorts" element={<Cohorts />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/community" element={<Community />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          zIndex: 9999
        }}
      />
    </BrowserRouter>
  );
}

export default App;