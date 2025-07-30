import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { Card, CardContent, CardHeader } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import PostEditor from "@/components/molecules/PostEditor"
import CommentSection from "@/components/molecules/CommentSection"
import postService from "@/services/api/postService"
import authService from "@/services/api/authService"

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showEditor, setShowEditor] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [showComments, setShowComments] = useState({})
  
  const currentUser = authService.getCurrentUser()
  const canCommunity = authService.canCommunity()

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await postService.getAll()
      setPosts(data)
    } catch (err) {
      setError("게시글을 불러오는데 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (postData) => {
    try {
      setIsSubmitting(true)
      const newPost = await postService.create({
        ...postData,
        author_id: currentUser.Id
      })
      setPosts(prev => [newPost, ...prev])
      setShowEditor(false)
      toast.success("게시글이 작성되었습니다.")
    } catch (err) {
      toast.error("게시글 작성에 실패했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikePost = async (postId) => {
    try {
      const updatedPost = await postService.likePost(postId, currentUser.Id)
      setPosts(prev => prev.map(post => 
        post.Id === postId ? updatedPost : post
      ))
      
      if (updatedPost.isLiked) {
        toast.success("좋아요를 눌렀습니다!")
      } else {
        toast.info("좋아요를 취소했습니다.")
      }
    } catch (err) {
      toast.error("좋아요 처리 중 오류가 발생했습니다.")
    }
  }

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (hours < 1) return "방금 전"
    if (hours < 24) return `${hours}시간 전`
    if (days < 7) return `${days}일 전`
    return date.toLocaleDateString()
  }

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
            커뮤니티 게시글에 참여하려면 멤버십 가입이 필요합니다.
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
              커뮤니티 게시판
            </h1>
            <p className="text-gray-600">
              함께 학습하고 경험을 공유해보세요
            </p>
          </div>
          <Button onClick={() => setShowEditor(true)}>
            <ApperIcon name="Plus" size={16} className="mr-2" />
            글쓰기
          </Button>
        </div>

        {showEditor && (
          <div className="mb-8">
            <PostEditor
              onSave={handleCreatePost}
              onCancel={() => setShowEditor(false)}
              isLoading={isSubmitting}
            />
          </div>
        )}

        {loading ? (
          <Loading />
        ) : error ? (
          <Error message={error} onRetry={loadPosts} />
        ) : posts.length === 0 ? (
          <Empty message="아직 작성된 게시글이 없습니다. 첫 번째 글을 작성해보세요!" />
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.Id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <ApperIcon name="User" size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text">
                          {post.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{post.author?.name || "사용자"}</span>
                          <span>•</span>
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-wrap mb-4">
                    {post.body}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikePost(post.Id)}
                        className="text-gray-600 hover:text-primary"
                      >
                        <ApperIcon name="Heart" size={16} className="mr-1" />
                        {post.likes}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleComments(post.Id)}
                        className="text-gray-600 hover:text-primary"
                      >
                        <ApperIcon name="MessageCircle" size={16} className="mr-1" />
                        댓글
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-primary"
                    >
                      <ApperIcon name="Share" size={16} className="mr-1" />
                      공유
                    </Button>
                  </div>
                  
                  {showComments[post.Id] && (
                    <div className="mt-6 pt-6 border-t">
                      <CommentSection postId={post.Id} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Posts