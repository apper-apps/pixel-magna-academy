import ApperIcon from "@/components/ApperIcon"

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <ApperIcon 
          name="BookOpen" 
          size={24} 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" 
        />
      </div>
      <p className="text-lg font-medium text-gray-600 mt-4">
        로딩 중입니다...
      </p>
      <p className="text-sm text-gray-500 mt-2">
        잠시만 기다려 주세요
      </p>
    </div>
  )
}

export default Loading