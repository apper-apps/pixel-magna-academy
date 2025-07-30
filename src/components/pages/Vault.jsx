import { Card, CardContent, CardHeader } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import authService from "@/services/api/authService"

const Vault = () => {
  const hasMaster = authService.hasMaster()
  
  if (!hasMaster) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center mb-6">
            <ApperIcon name="Key" size={40} className="text-warning" />
          </div>
          <h2 className="text-2xl font-bold text-text mb-4">
            마스터 멤버십이 필요합니다
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">
            마이 코호트는 마스터 멤버만 접근할 수 있는 프리미엄 콘텐츠입니다.
          </p>
          <Button onClick={() => window.location.href = "/checkout"}>
            마스터 멤버십 가입하기
          </Button>
        </div>
      </div>
    )
  }
  
  const exclusiveContent = [
    {
      title: "마스터 전용 라이브 세션",
      description: "매주 금요일 오후 8시, 실시간 Q&A 및 고급 전략 공유",
      type: "live",
      date: "매주 금요일 20:00"
    },
    {
      title: "프리미엄 템플릿 라이브러리",
      description: "검증된 고급 콘텐츠 템플릿 100+ 개 무제한 다운로드",
      type: "resource",
      count: "120개 템플릿"
    },
    {
      title: "1:1 개인 멘토링",
      description: "월 1회 전문가와의 개인 멘토링 세션 (60분)",
      type: "mentoring",
      duration: "60분/월"
    },
    {
      title: "독점 케이스 스터디",
      description: "성공한 인플루언서들의 실제 전략과 노하우 분석",
      type: "case",
      count: "12개 사례"
    }
  ]
  
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Crown" size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-2">
            마이 코호트
          </h1>
          <p className="text-gray-600">
            마스터 멤버만을 위한 프리미엄 콘텐츠와 독점 혜택
          </p>
        </div>
        
        <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text mb-2">
                  🎉 마스터 멤버십 축하합니다!
                </h3>
                <p className="text-gray-700">
                  프리미엄 콘텐츠와 독점 혜택을 마음껏 이용하세요
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">멤버십 상태</div>
                <div className="text-lg font-semibold text-success">활성</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {exclusiveContent.map((content, index) => {
            const iconMap = {
              live: "Video",
              resource: "Download",
              mentoring: "UserCheck",
              case: "FileText"
            }
            
            const colorMap = {
              live: "text-red-500 bg-red-50",
              resource: "text-blue-500 bg-blue-50",
              mentoring: "text-green-500 bg-green-50",
              case: "text-purple-500 bg-purple-50"
            }
            
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[content.type]}`}>
                      <ApperIcon name={iconMap[content.type]} size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-text mb-2">
                        {content.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {content.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        {content.date || content.count || content.duration}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">다음 라이브 세션</h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-light to-primary/10 rounded-lg">
              <div>
                <h4 className="font-semibold text-text mb-1">
                  "AI 시대 텍스트 인플루언서 전략"
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  최신 AI 도구를 활용한 콘텐츠 제작 노하우
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <ApperIcon name="Calendar" size={16} className="mr-1" />
                  2024년 2월 23일 (금) 오후 8:00
                </div>
              </div>
              <Button variant="primary">
                참가 예약
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Vault