import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import NavItem from "@/components/molecules/NavItem"
import ApperIcon from "@/components/ApperIcon"
import authService from "@/services/api/authService"
import { cn } from "@/utils/cn"

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  
  const hasJun = authService.hasJun()
  const hasMaster = authService.hasMaster()
  const canCommunity = authService.canCommunity()
  const showCheckout = !(hasJun && hasMaster)
  
  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await authService.logout()
      toast.success("로그아웃되었습니다.")
      navigate("/")
    } catch (error) {
      toast.error("로그아웃 중 오류가 발생했습니다.")
    } finally {
      setIsLoggingOut(false)
    }
  }
  
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:flex lg:flex-col lg:w-60 lg:bg-white lg:border-r lg:border-gray-200 lg:h-full"
      )}>
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-text">
            Magna Academy
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            텍스트 인플루언서 양성
          </p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavItem to="/" icon="Home">
            홈
          </NavItem>
          
          {canCommunity && (
            <NavItem to="/community" icon="MessageCircle">
              커뮤니티
            </NavItem>
          )}
          
          {(hasJun || hasMaster) && (
            <NavItem to="/courses" icon="Play">
              강의
            </NavItem>
          )}
          
          {hasMaster && (
            <NavItem to="/vault" icon="Key">
              마이 코호트
            </NavItem>
          )}
          
          {showCheckout && (
            <NavItem to="/checkout" icon="CreditCard">
              멤버십 가입
            </NavItem>
          )}
        </nav>
        
        <div className="p-4 border-t border-gray-100">
          <NavItem 
            onClick={handleLogout}
            icon="LogOut"
            className={isLoggingOut ? "opacity-50 cursor-not-allowed" : ""}
          >
            {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
          </NavItem>
        </div>
      </aside>
      
      {/* Mobile Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 lg:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-text">
              Magna Academy
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              텍스트 인플루언서 양성
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ApperIcon name="X" size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavItem to="/" icon="Home" onClick={onClose}>
            홈
          </NavItem>
          
          {canCommunity && (
            <NavItem to="/community" icon="MessageCircle" onClick={onClose}>
              커뮤니티
            </NavItem>
          )}
          
          {(hasJun || hasMaster) && (
            <NavItem to="/courses" icon="Play" onClick={onClose}>
              강의
            </NavItem>
          )}
          
          {hasMaster && (
            <NavItem to="/vault" icon="Key" onClick={onClose}>
              마이 코호트
            </NavItem>
          )}
          
          {showCheckout && (
            <NavItem to="/checkout" icon="CreditCard" onClick={onClose}>
              멤버십 가입
            </NavItem>
          )}
        </nav>
        
        <div className="p-4 border-t border-gray-100">
          <NavItem 
            onClick={() => {
              handleLogout()
              onClose()
            }}
            icon="LogOut"
            className={isLoggingOut ? "opacity-50 cursor-not-allowed" : ""}
          >
            {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
          </NavItem>
        </div>
      </aside>
    </>
  )
}

export default Sidebar