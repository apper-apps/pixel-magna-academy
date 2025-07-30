import HeroSection from "@/components/organisms/HeroSection"
import { Card, CardContent } from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const Home = () => {
  const features = [
    {
      icon: "Zap",
      title: "4주 집중 코호트",
      description: "체계적인 4주 프로그램으로 단기간에 확실한 성과를 얻으세요"
    },
    {
      icon: "Brain",
      title: "AI·뇌과학 글쓰기",
      description: "최신 AI 기술과 뇌과학 연구를 바탕으로 한 글쓰기 방법론"
    },
    {
      icon: "TrendingUp",
      title: "팔로워 10배 성장",
      description: "검증된 전략으로 소셜미디어 팔로워를 급속도로 늘려보세요"
    },
    {
      icon: "Users",
      title: "전문가 멘토링",
      description: "텍스트 인플루언서 전문가들의 1:1 개인 멘토링"
    },
    {
      icon: "BookOpen",
      title: "실전 템플릿",
      description: "바로 사용할 수 있는 고품질 콘텐츠 템플릿 제공"
    },
    {
      icon: "Award",
      title: "커뮤니티 네트워킹",
      description: "같은 목표를 가진 동료들과의 지속적인 네트워킹"
    }
  ]
  
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
              왜 Magna Academy인가?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              체계적인 커리큘럼과 검증된 방법론으로 텍스트 인플루언서로의 성공을 보장합니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-light to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={feature.icon} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 px-6 bg-gradient-to-br from-primary-light to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-text mb-6">
            지금 시작하세요
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            전문적인 텍스트 인플루언서로의 여정을 시작하고, 
            단어의 힘으로 세상에 영향을 미치는 사람이 되어보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">30일</div>
              <div className="text-sm text-gray-600">집중 프로그램</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">10배</div>
              <div className="text-sm text-gray-600">팔로워 성장</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">1:1</div>
              <div className="text-sm text-gray-600">전문가 멘토링</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home