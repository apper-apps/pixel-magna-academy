import { Card, CardContent, CardHeader } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import CommunityFeed from "@/components/organisms/CommunityFeed"
import authService from "@/services/api/authService"

const Community = () => {
  const canCommunity = authService.canCommunity()
  
  if (!canCommunity) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <ApperIcon name="Lock" size={40} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-text mb-4">
            커뮤니티 접근 권한이 필요합니다
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">
            커뮤니티에 참여하려면 멤버십 가입이 필요합니다.
          </p>
          <Button onClick={() => window.location.href = "/checkout"}>
            멤버십 가입하기
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text mb-2">
              커뮤니티
            </h1>
            <p className="text-gray-600">
              텍스트 인플루언서들과 함께 소통하고 성장하세요
            </p>
          </div>
          
          <Button variant="primary">
            <ApperIcon name="PlusCircle" size={16} className="mr-2" />
            새 글 작성
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">156</div>
              <div className="text-sm text-gray-600">전체 멤버</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-success mb-1">89</div>
              <div className="text-sm text-gray-600">활성 멤버</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-info mb-1">234</div>
              <div className="text-sm text-gray-600">이번 달 게시글</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-warning mb-1">12</div>
              <div className="text-sm text-gray-600">오늘의 새 글</div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold">커뮤니티 가이드라인</h3>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-600">
            <p>• 서로를 존중하며 건설적인 피드백을 나누어주세요</p>
            <p>• 개인정보나 민감한 내용은 공유하지 마세요</p>
            <p>• 스팸이나 광고성 게시물은 삭제될 수 있습니다</p>
            <p>• 텍스트 인플루언서 관련 주제로 소통해주세요</p>
          </CardContent>
        </Card>
        
        <CommunityFeed />
      </div>
    </div>
  )
}

export default Community