import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import CourseCard from "@/components/molecules/CourseCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import courseService from "@/services/api/courseService"
import authService from "@/services/api/authService"

const CourseList = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  const hasJun = authService.hasJun()
  const hasMaster = authService.hasMaster()
  
  useEffect(() => {
    loadCourses()
  }, [])
  
  const loadCourses = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await courseService.getAll()
      setCourses(data)
    } catch (err) {
      setError("강의 목록을 불러오는데 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }
  
  const canAccessCourse = (course) => {
    if (course.is_free) return true
    if (course.required_membership === 1) return hasJun || hasMaster
    if (course.required_membership === 2) return hasMaster
    return false
  }
  
  const handleEnroll = (course) => {
    if (canAccessCourse(course)) {
      toast.success(`"${course.title}" 강의를 시작합니다!`)
    } else {
      toast.info("멤버십 가입 후 이용 가능합니다.")
    }
  }
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadCourses} />
  if (courses.length === 0) return <Empty message="등록된 강의가 없습니다." />
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.Id}
          course={course}
          canAccess={canAccessCourse(course)}
          onEnroll={handleEnroll}
        />
      ))}
    </div>
  )
}

export default CourseList