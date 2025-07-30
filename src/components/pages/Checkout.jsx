import ApperIcon from "@/components/ApperIcon"
import MembershipOptions from "@/components/organisms/MembershipOptions"

const Checkout = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-text mb-4">
            멤버십 선택
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            텍스트 인플루언서로의 성공을 위한 최적의 멤버십을 선택하세요
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Zap" size={24} className="text-white" />
            </div>
            <h3 className="font-semibold text-text mb-2">빠른 성장</h3>
            <p className="text-sm text-gray-600">
              체계적인 커리큘럼으로 단기간 성과 달성
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Shield" size={24} className="text-white" />
            </div>
            <h3 className="font-semibold text-text mb-2">검증된 방법</h3>
            <p className="text-sm text-gray-600">
              수백 명의 성공 사례로 검증된 전략
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Users" size={24} className="text-white" />
            </div>
            <h3 className="font-semibold text-text mb-2">커뮤니티</h3>
            <p className="text-sm text-gray-600">
              같은 목표를 가진 동료들과 함께 성장
            </p>
          </div>
        </div>
        
        <MembershipOptions />
        
        <div className="mt-12 text-center">
          <div className="bg-gray-50 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-text mb-4">
              💡 궁금한 점이 있으신가요?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              멤버십 선택에 도움이 필요하시면 언제든 문의해주세요
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <div className="flex items-center text-sm text-gray-600">
                <ApperIcon name="Mail" size={16} className="mr-2" />
                support@magna.kr
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <ApperIcon name="Phone" size={16} className="mr-2" />
                1588-1234
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout