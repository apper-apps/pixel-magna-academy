import { useNavigate } from "react-router-dom"
import Button from "@/components/atoms/Button"
import authService from "@/services/api/authService"

const HeroSection = () => {
  const navigate = useNavigate()
  
  const hasJun = authService.hasJun()
  const hasMaster = authService.hasMaster()
  const showCheckout = !(hasJun && hasMaster)
  
  return (
    <section 
      className="px-6 py-24 lg:py-32 text-center"
      style={{ background: "#E8F1FF" }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-text mb-3 leading-tight">
          준태스쿨<br />
          텍스트 인플루언서
        </h1>
        
        <h2 className="text-xl lg:text-2xl font-semibold text-text mb-6">
          30일 만에 단어로 마음을 움직이는 힘
        </h2>
        
        <p className="text-base lg:text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          🚀 4주 집중 코호트&nbsp;&nbsp;💡 AI·뇌과학 글쓰기&nbsp;&nbsp;💰 팔로워 10배
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            size="hero"
            onClick={() => navigate("/courses")}
            className="w-full sm:w-auto"
          >
            무료 체험
          </Button>
          
          {showCheckout && (
            <Button
              variant="secondary"
              size="hero"
              onClick={() => navigate("/checkout")}
              className="w-full sm:w-auto"
            >
              멤버십 가입
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroSection