import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const VideoPlayer = ({ video, onClose }) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">{video.title}</h2>
          {video.category && (
            <p className="text-sm text-gray-600 mt-1">카테고리: {video.category}</p>
          )}
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ApperIcon name="X" size={20} />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gray-100">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600">동영상을 불러오는 중...</span>
              </div>
            </div>
          )}
          <iframe
            src={video.embed_url}
            title={video.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleIframeLoad}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default VideoPlayer