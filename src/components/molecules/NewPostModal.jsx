import { useState } from "react"
import { toast } from "react-toastify"
import PostEditor from "@/components/molecules/PostEditor"
import communityService from "@/services/api/communityService"
import authService from "@/services/api/authService"

const NewPostModal = ({ isOpen, onClose, onSave }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async (formData) => {
    try {
      setIsLoading(true)
      
      const currentUser = authService.getCurrentUser()
      const postData = {
        title: formData.title,
        content: formData.body,
        author: currentUser.name,
        author_id: currentUser.Id
      }

      const savedPost = await communityService.create(postData)
      
      toast.success("게시글이 성공적으로 등록되었습니다!")
      onSave(savedPost)
      onClose()
    } catch (err) {
      toast.error("게시글 등록에 실패했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <PostEditor
          post={null}
          onSave={handleSave}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default NewPostModal