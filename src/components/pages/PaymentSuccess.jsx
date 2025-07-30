import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Button from "@/components/atoms/Button"
import { Card, CardContent } from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const PaymentSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { membership, transactionId } = location.state || {}
  
  useEffect(() => {
    if (!membership || !transactionId) {
      navigate("/checkout")
    }
  }, [membership, transactionId, navigate])
  
  if (!membership || !transactionId) {
    return null
  }
  
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-success to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="CheckCircle" size={40} className="text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-text mb-4">
          결제가 완료되었습니다! 🎉
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          {membership} 가입을 축하드립니다.<br />
          이제 모든 프리미엄 기능을 이용하실 수 있습니다.
        </p>
        
        <Card className="mb-8 bg-gradient-to-r from-primary-light to-primary/10">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <div className="text-sm text-gray-600 mb-1">멤버십</div>
                <div className="font-semibold text-text">{membership}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">거래 ID</div>
                <div className="font-mono text-sm text-text">{transactionId}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">결제일</div>
                <div className="font-semibold text-text">
                  {new Date().toLocaleDateString("ko-KR")}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">상태</div>
                <div className="flex items-center">
                  <ApperIcon name="CheckCircle" size={16} className="text-success mr-1" />
                  <span className="font-semibold text-success">활성</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-text mb-3">
            🚀 다음 단계
          </h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                1
              </div>
              <div>
                <div className="font-medium text-text">강의 수강 시작</div>
                <div className="text-sm text-gray-600">모든 프리미엄 강의에 바로 접근하실 수 있습니다</div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                2
              </div>
              <div>
                <div className="font-medium text-text">커뮤니티 참여</div>
                <div className="text-sm text-gray-600">동료들과 함께 소통하고 네트워킹하세요</div>
              </div>
            </div>
            {membership.includes("마스터") && (
              <div className="flex items-start">
                <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  3
                </div>
                <div>
                  <div className="font-medium text-text">마이 코호트 이용</div>
                  <div className="text-sm text-gray-600">마스터 전용 프리미엄 콘텐츠를 확인하세요</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/courses")}
          >
            <ApperIcon name="PlayCircle" size={16} className="mr-2" />
            강의 시작하기
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/")}
          >
            <ApperIcon name="Home" size={16} className="mr-2" />
            홈으로 가기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess