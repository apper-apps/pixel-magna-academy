import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { Card, CardContent } from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import CategoryBrowser from "@/components/molecules/CategoryBrowser"
import VideoPlayer from "@/components/molecules/VideoPlayer"
import videoService from "@/services/api/videoService"

const Videos = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    loadVideos()
  }, [selectedCategoryId])

  const loadVideos = async () => {
    try {
      setError("")
      setLoading(true)
      
      let data
      if (selectedCategoryId) {
        data = await videoService.getByCategory(selectedCategoryId)
      } else {
        data = await videoService.getAll()
      }
      
      setVideos(data)
    } catch (err) {
      setError("동영상을 불러오는데 실패했습니다.")
      toast.error("동영상을 불러오는데 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId)
    setSelectedVideo(null)
  }

  const handleVideoSelect = (video) => {
    setSelectedVideo(video)
  }

  const handleCloseVideo = () => {
    setSelectedVideo(null)
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">
            동영상 강의
          </h1>
          <p className="text-gray-600">
            카테고리별로 정리된 다양한 학습 동영상을 만나보세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <CategoryBrowser
                onCategorySelect={handleCategorySelect}
                selectedCategoryId={selectedCategoryId}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedVideo ? (
              <div className="space-y-6">
                <VideoPlayer
                  video={selectedVideo}
                  onClose={handleCloseVideo}
                />
              </div>
            ) : (
              <>
                {loading ? (
                  <Loading />
                ) : error ? (
                  <Error message={error} onRetry={loadVideos} />
                ) : videos.length === 0 ? (
                  <Empty 
                    message={
                      selectedCategoryId 
                        ? "이 카테고리에는 동영상이 없습니다." 
                        : "등록된 동영상이 없습니다."
                    } 
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videos.map((video) => (
                      <Card 
                        key={video.Id} 
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleVideoSelect(video)}
                      >
                        <div className="aspect-video bg-gray-100 relative overflow-hidden rounded-t-lg">
                          <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                              <ApperIcon name="Play" size={24} className="text-primary ml-1" />
                            </div>
                          </div>
                          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                            동영상
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-text mb-2 line-clamp-2">
                            {video.title}
                          </h3>
                          {video.category && (
                            <div className="flex items-center text-sm text-gray-600">
                              <ApperIcon name="Folder" size={14} className="mr-1" />
                              <span>{video.category}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Videos