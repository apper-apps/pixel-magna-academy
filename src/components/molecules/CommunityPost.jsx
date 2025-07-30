import { Card, CardContent } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

const CommunityPost = ({ post, onLike }) => {
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-text mb-1">
              {post.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">{post.author}</span>
              <span className="mx-2">•</span>
              <span>
                {formatDistanceToNow(new Date(post.created_at), { 
                  addSuffix: true, 
                  locale: ko 
                })}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3">
          {post.content}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(post.Id)}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
            >
              <ApperIcon name="Heart" size={16} />
              <span>{post.likes}</span>
            </Button>
            
            <div className="flex items-center space-x-1 text-gray-500">
              <ApperIcon name="MessageCircle" size={16} />
              <span>{post.replies}</span>
            </div>
          </div>
          
          <Button variant="ghost" size="sm">
            답글
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CommunityPost