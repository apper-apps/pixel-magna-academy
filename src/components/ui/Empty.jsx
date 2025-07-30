import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { useNavigate } from "react-router-dom"

const Empty = ({ 
  message = "표시할 내용이 없습니다.", 
  actionText = "홈으로 가기",
  actionPath = "/"
}) => {
  const navigate = useNavigate()
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-6">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="FileX" size={40} className="text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-text mb-2">
        내용이 없습니다
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}
      </p>
      
      <Button 
        onClick={() => navigate(actionPath)} 
        variant="primary"
      >
        <ApperIcon name="Home" size={16} className="mr-2" />
        {actionText}
      </Button>
    </div>
  )
}

export default Empty