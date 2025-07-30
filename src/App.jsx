import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import Home from "@/components/pages/Home"
import Community from "@/components/pages/Community"
import Courses from "@/components/pages/Courses"
import Vault from "@/components/pages/Vault"
import Checkout from "@/components/pages/Checkout"
import PaymentSuccess from "@/components/pages/PaymentSuccess"
import NotFound from "@/components/pages/NotFound"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="community" element={<Community />} />
            <Route path="courses" element={<Courses />} />
            <Route path="vault" element={<Vault />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        
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
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App