import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { Card, CardContent } from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import CohortCard from "@/components/molecules/CohortCard"
import cohortService from "@/services/api/cohortService"
import authService from "@/services/api/authService"

const Cohorts = () => {
  const [cohorts, setCohorts] = useState([])
  const [userCohorts, setUserCohorts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [enrollLoading, setEnrollLoading] = useState({})
  
  const currentUser = authService.getCurrentUser()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setError("")
      setLoading(true)
      
      const [cohortsData, userCohortsData] = await Promise.all([
        cohortService.getAll(),
        cohortService.getUserCohorts(currentUser.Id)
      ])
      
      setCohorts(cohortsData)
      setUserCohorts(userCohortsData)
    } catch (err) {
      setError("코호트 정보를 불러오는데 실패했습니다.")
      toast.error("코호트 정보를 불러오는데 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const isEnrolled = (cohortId) => {
    return userCohorts.some(uc => uc.Id === cohortId)
  }

  const handleEnroll = async (cohortId) => {
    try {
      setEnrollLoading(prev => ({ ...prev, [cohortId]: true }))
      
      await cohortService.enrollUser(cohortId, currentUser.Id)
      
      // Update local state
      const enrolledCohort = cohorts.find(c => c.Id === cohortId)
      if (enrolledCohort) {
        setUserCohorts(prev => [...prev, enrolledCohort])
        setCohorts(prev => prev.map(c => 
          c.Id === cohortId 
            ? { ...c, memberCount: c.memberCount + 1 }
            : c
        ))
      }
      
      toast.success("코호트에 성공적으로 참여했습니다!")
    } catch (err) {
      if (err.message.includes("already enrolled")) {
        toast.info("이미 참여 중인 코호트입니다.")
      } else {
        toast.error("코호트 참여에 실패했습니다.")
      }
    } finally {
      setEnrollLoading(prev => ({ ...prev, [cohortId]: false }))
    }
  }

  const handleUnenroll = async (cohortId) => {
    try {
      setEnrollLoading(prev => ({ ...prev, [cohortId]: true }))
      
      await cohortService.unenrollUser(cohortId, currentUser.Id)
      
      // Update local state
      setUserCohorts(prev => prev.filter(uc => uc.Id !== cohortId))
      setCohorts(prev => prev.map(c => 
        c.Id === cohortId 
          ? { ...c, memberCount: Math.max(0, c.memberCount - 1) }
          : c
      ))
      
      toast.success("코호트에서 탈퇴했습니다.")
    } catch (err) {
      toast.error("코호트 탈퇴에 실패했습니다.")
    } finally {
      setEnrollLoading(prev => ({ ...prev, [cohortId]: false }))
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadData} />

  const enrolledCohorts = cohorts.filter(c => isEnrolled(c.Id))
  const availableCohorts = cohorts.filter(c => !isEnrolled(c.Id))

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">
            학습 코호트
          </h1>
          <p className="text-gray-600">
            같은 목표를 가진 동료들과 함께 학습하고 성장해보세요
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Users" size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {cohorts.length}
              </div>
              <div className="text-sm text-gray-600">전체 코호트</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="CheckCircle" size={24} className="text-success" />
              </div>
              <div className="text-2xl font-bold text-success mb-1">
                {enrolledCohorts.length}
              </div>
              <div className="text-sm text-gray-600">참여 중인 코호트</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Clock" size={24} className="text-warning" />
              </div>
              <div className="text-2xl font-bold text-warning mb-1">
                {availableCohorts.length}
              </div>
              <div className="text-sm text-gray-600">참여 가능한 코호트</div>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled Cohorts */}
        {enrolledCohorts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-text mb-6">
              참여 중인 코호트
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCohorts.map((cohort) => (
                <CohortCard
                  key={cohort.Id}
                  cohort={cohort}
                  isEnrolled={true}
                  onUnenroll={handleUnenroll}
                  isLoading={enrollLoading[cohort.Id]}
                />
              ))}
            </div>
          </div>
        )}

        {/* Available Cohorts */}
        <div>
          <h2 className="text-2xl font-bold text-text mb-6">
            {enrolledCohorts.length > 0 ? "다른 코호트 둘러보기" : "참여 가능한 코호트"}
          </h2>
          
          {availableCohorts.length === 0 ? (
            <Empty message="현재 참여 가능한 코호트가 없습니다." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCohorts.map((cohort) => (
                <CohortCard
                  key={cohort.Id}
                  cohort={cohort}
                  isEnrolled={false}
                  onEnroll={handleEnroll}
                  isLoading={enrollLoading[cohort.Id]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cohorts