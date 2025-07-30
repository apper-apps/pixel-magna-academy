import { Card, CardContent, CardHeader } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const CohortCard = ({ cohort, isEnrolled, onEnroll, onUnenroll, isLoading }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text mb-2">
              {cohort.label}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <ApperIcon name="Calendar" size={16} />
                <span>{formatDate(cohort.created_at)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ApperIcon name="Users" size={16} />
                <span>{cohort.memberCount}명 참여</span>
              </div>
            </div>
          </div>
          {isEnrolled && (
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <ApperIcon name="CheckCircle" size={16} className="text-success" />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="text-sm text-gray-700">
            함께 학습하고 성장하는 코호트입니다. 같은 목표를 가진 동료들과 
            체계적인 학습 여정을 시작해보세요.
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              그룹 학습
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
              멘토링
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning">
              프로젝트
            </span>
          </div>
          
          <div className="pt-2">
            {isEnrolled ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onUnenroll(cohort.Id)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span>처리 중...</span>
                  </div>
                ) : (
                  <>
                    <ApperIcon name="UserMinus" size={16} className="mr-2" />
                    탈퇴하기
                  </>
                )}
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() => onEnroll(cohort.Id)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>가입 중...</span>
                  </div>
                ) : (
                  <>
                    <ApperIcon name="UserPlus" size={16} className="mr-2" />
                    코호트 참여
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CohortCard