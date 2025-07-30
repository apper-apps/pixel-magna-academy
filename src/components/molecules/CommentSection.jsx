import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { Card, CardContent } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import commentService from "@/services/api/commentService"
import authService from "@/services/api/authService"

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const currentUser = authService.getCurrentUser()

  useEffect(() => {
    loadComments()
  }, [postId])

  const loadComments = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await commentService.getByPostId(postId)
      setComments(data)
    } catch (err) {
      setError("댓글을 불러오는데 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    
    if (!newComment.trim()) {
      toast.error("댓글 내용을 입력해주세요.")
      return
    }
    
    if (newComment.length > 500) {
      toast.error("댓글은 500자 이내로 입력해주세요.")
      return
    }

    try {
      setIsSubmitting(true)
      const commentData = {
        post_id: postId,
        author_id: currentUser.Id,
        body: newComment.trim()
      }
      
      const savedComment = await commentService.create(commentData)
      setComments(prev => [...prev, savedComment])
      setNewComment("")
      toast.success("댓글이 등록되었습니다.")
    } catch (err) {
      toast.error("댓글 등록에 실패했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "방금 전"
    if (minutes < 60) return `${minutes}분 전`
    if (hours < 24) return `${hours}시간 전`
    if (days < 7) return `${days}일 전`
    return date.toLocaleDateString()
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadComments} />

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-text">
          댓글 {comments.length}개
        </h4>
      </div>
      
      {/* Comment Form */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSubmitComment} className="space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 작성해보세요..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-vertical focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {newComment.length}/500자
              </span>
              <Button type="submit" size="sm" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>등록 중...</span>
                  </div>
                ) : (
                  "댓글 등록"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Comments List */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
          </div>
        ) : (
          comments.map(comment => (
            <Card key={comment.Id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <ApperIcon name="User" size={16} className="text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-text">
                        {comment.author?.name || "사용자"}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {comment.body}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default CommentSection