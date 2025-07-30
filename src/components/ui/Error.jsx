import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message = "오류가 발생했습니다.", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-6">
      <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertCircle" size={40} className="text-error" />
      </div>
      
      <h3 className="text-xl font-semibold text-text mb-2">
        문제가 발생했습니다
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <ApperIcon name="RotateCcw" size={16} className="mr-2" />
          다시 시도
        </Button>
      )}
    </div>
  )
}

export default Error