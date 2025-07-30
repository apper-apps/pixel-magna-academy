import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DataTable from "@/components/organisms/DataTable";
import communityService from "@/services/api/communityService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const CommunityFeed = ({ onViewPost }) => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '-').replace('.', '')
  }

  const handleRowClick = (post) => {
    if (onViewPost) {
      onViewPost(post.Id)
    }
  }

  const columns = [
    {
      key: 'title',
      title: '제목',
      width: '40%',
      sortable: true
    },
    {
      key: 'likes',
      title: '좋아요',
      width: '15%',
      sortable: true
    },
    {
      key: 'comments',
      title: '댓글',
      width: '15%',
      sortable: true
    },
    {
      key: 'created_at',
      title: '작성일',
      width: '30%',
      sortable: true,
      format: formatDate
    }
  ]

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadPosts} />
  if (posts.length === 0) return <Empty message="아직 작성된 게시글이 없습니다." />
  
  return (
    <DataTable
      data={posts}
      columns={columns}
      onRowClick={handleRowClick}
      searchable={true}
      sortable={true}
      paginated={true}
      pageSize={10}
      className="shadow-sm"
    />
  )
}

export default CommunityFeed