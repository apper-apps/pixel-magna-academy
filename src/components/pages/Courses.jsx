import { Card, CardContent } from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"
import CourseList from "@/components/organisms/CourseList"
import authService from "@/services/api/authService"

const Courses = () => {
  const hasJun = authService.hasJun()
  const hasMaster = authService.hasMaster()
  const hasAnyMembership = hasJun || hasMaster
  
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">
            강의 목록
          </h1>
          <p className="text-gray-600">
            텍스트 인플루언서가 되기 위한 체계적인 강의를 만나보세요
          </p>
        </div>
        
        {!hasAnyMembership && (
          <Card className="mb-8 bg-gradient-to-r from-primary-light to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <ApperIcon name="Info" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text mb-2">
                    멤버십 가입으로 더 많은 강의를 만나보세요
                  </h3>
                  <p className="text-gray-700 mb-3">
                    현재는 무료 강의만 이용 가능합니다. 준 멤버십 또는 마스터 멤버십에 가입하시면 
                    모든 프리미엄 강의에 접근할 수 있습니다.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-white/50 px-3 py-1 rounded-full">🎯 AI 글쓰기 고급 과정</span>
                    <span className="bg-white/50 px-3 py-1 rounded-full">🧠 뇌과학 기반 설득법</span>
                    <span className="bg-white/50 px-3 py-1 rounded-full">🚀 팔로워 급성장 전략</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="CheckCircle" size={24} className="text-success" />
              </div>
              <div className="text-2xl font-bold text-success mb-1">
                {hasAnyMembership ? "전체" : "1"}개
              </div>
              <div className="text-sm text-gray-600">이용 가능한 강의</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Clock" size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">4주</div>
              <div className="text-sm text-gray-600">평균 수강 기간</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Users" size={24} className="text-warning" />
              </div>
              <div className="text-2xl font-bold text-warning mb-1">500+</div>
              <div className="text-sm text-gray-600">수강생</div>
            </CardContent>
          </Card>
        </div>
        
        <CourseList />
      </div>
    </div>
  )
}

export default Courses