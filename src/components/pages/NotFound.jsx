import { useNavigate } from "react-router-dom"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const NotFound = () => {
  const navigate = useNavigate()
  
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-8">
          <ApperIcon name="AlertTriangle" size={64} className="text-gray-500" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-400 mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-text mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          올바른 URL을 입력했는지 확인해보세요.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="primary"
            onClick={() => navigate("/")}
          >
            <ApperIcon name="Home" size={16} className="mr-2" />
            홈으로 가기
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
            이전 페이지
          </Button>
        </div>
        
        <div className="mt-12 p-6 bg-gray-50 rounded-xl max-w-md">
          <h3 className="font-semibold text-text mb-3">
            도움이 필요하신가요?
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <ApperIcon name="Mail" size={16} className="mr-2" />
              support@magna.kr
            </div>
            <div className="flex items-center">
              <ApperIcon name="Phone" size={16} className="mr-2" />
              1588-1234
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound