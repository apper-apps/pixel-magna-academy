import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { Card, CardContent, CardHeader } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import CommentSection from "@/components/molecules/CommentSection"
import communityService from "@/services/api/communityService"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

const ViewPostModal = ({ postId, isOpen, onClose }) => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showComments, setShowComments] = useState(false)
  const [isLiking, setIsLiking] = useState(false)

  useEffect(() => {
    if (isOpen && postId) {
      loadPost()
    }
  }, [isOpen, postId])

  const loadPost = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await communityService.getById(postId)
      setPost(data)
    } catch (err) {
      setError("게시글을 불러오는데 실패했습니다.")
      toast.error("게시글을 불러오는데 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    if (isLiking || !post) return

    try {
      setIsLiking(true)
      const updatedPost = await communityService.likePost(post.Id)
      setPost(updatedPost)
      toast.success("좋아요를 눌렀습니다!")
    } catch (err) {
      toast.error("좋아요 처리 중 오류가 발생했습니다.")
    } finally {
      setIsLiking(false)
    }
  }

  const handleClose = () => {
    setPost(null)
    setShowComments(false)
    setError("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">게시글을 불러오는 중...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
            <p className="text-error mb-4">{error}</p>
            <div className="flex justify-center space-x-3">
              <Button variant="outline" onClick={loadPost}>
                다시 시도
              </Button>
              <Button variant="outline" onClick={handleClose}>
                닫기
              </Button>
            </div>
          </div>
        ) : post ? (
          <>
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-text mb-2">
                    {post.title}
                  </h2>
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
                <Button variant="ghost" size="sm" onClick={handleClose}>
                  <ApperIcon name="X" size={20} />
                </Button>
              </div>
            </CardHeader>

            <div className="max-h-[calc(90vh-200px)] overflow-y-auto">
              <CardContent className="p-6">
                <div className="prose max-w-none mb-6">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {post.content}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLike}
                      disabled={isLiking}
                      className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <ApperIcon 
                        name="Heart" 
                        size={16} 
                        className={isLiking ? "animate-pulse" : ""}
                      />
                      <span>{post.likes}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowComments(!showComments)}
                      className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors"
                    >
                      <ApperIcon name="MessageCircle" size={16} />
                      <span>{post.replies}</span>
                    </Button>
                  </div>

                  <Button
                    variant={showComments ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowComments(!showComments)}
                  >
                    {showComments ? "댓글 숨기기" : "댓글 보기"}
                  </Button>
                </div>

                {showComments && (
                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <CommentSection postId={post.Id} />
                  </div>
                )}
              </CardContent>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default ViewPostModal