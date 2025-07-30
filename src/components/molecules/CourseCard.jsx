import { Card, CardContent, CardFooter } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const CourseCard = ({ course, canAccess, onEnroll }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-video bg-gradient-to-br from-primary-light to-primary/20 relative overflow-hidden">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ApperIcon name="BookOpen" size={48} className="text-primary/30" />
          </div>
        )}
        {course.is_free && (
          <div className="absolute top-3 left-3 bg-success text-white px-2 py-1 rounded-full text-xs font-semibold">
            무료
          </div>
        )}
        {!canAccess && !course.is_free && (
          <div className="absolute top-3 right-3 bg-gray-900/80 text-white px-2 py-1 rounded-full text-xs font-semibold">
            <ApperIcon name="Lock" size={12} className="inline mr-1" />
            멤버십 필요
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-text mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <ApperIcon name="Clock" size={16} className="mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <ApperIcon name="PlayCircle" size={16} className="mr-1" />
            {course.lessons}강
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          variant={canAccess || course.is_free ? "primary" : "outline"}
          className="w-full"
          onClick={() => onEnroll(course)}
          disabled={!canAccess && !course.is_free}
        >
          {course.is_free ? "무료 수강" : canAccess ? "수강하기" : "멤버십 가입 필요"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CourseCard