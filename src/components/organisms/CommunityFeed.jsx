import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import CommunityPost from "@/components/molecules/CommunityPost"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import communityService from "@/services/api/communityService"

const CommunityFeed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  useEffect(() => {
    loadPosts()
  }, [])
  
  const loadPosts = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await communityService.getAll()
      setPosts(data)
    } catch (err) {
      setError("게시글을 불러오는데 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }
  
  const handleLikePost = async (postId) => {
    try {
      const updatedPost = await communityService.likePost(postId)
      setPosts(prev => prev.map(post => 
        post.Id === postId ? updatedPost : post
      ))
      toast.success("좋아요를 눌렀습니다!")
    } catch (err) {
      toast.error("좋아요 처리 중 오류가 발생했습니다.")
    }
  }
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadPosts} />
  if (posts.length === 0) return <Empty message="아직 작성된 게시글이 없습니다." />
  
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <CommunityPost
          key={post.Id}
          post={post}
          onLike={handleLikePost}
        />
      ))}
    </div>
  )
}

export default CommunityFeed