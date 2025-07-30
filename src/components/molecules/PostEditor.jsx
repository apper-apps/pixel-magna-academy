import { useState } from "react"
import { toast } from "react-toastify"
import { Card, CardContent, CardHeader } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Label from "@/components/atoms/Label"
import ApperIcon from "@/components/ApperIcon"

const PostEditor = ({ post, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    body: post?.body || ""
  })
  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요."
    } else if (formData.title.length > 100) {
      newErrors.title = "제목은 100자 이내로 입력해주세요."
    }
    
    if (!formData.body.trim()) {
      newErrors.body = "내용을 입력해주세요."
    } else if (formData.body.length > 2000) {
      newErrors.body = "내용은 2000자 이내로 입력해주세요."
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("입력 내용을 확인해주세요.")
      return
    }
    
    onSave(formData)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text">
            {post ? "게시글 수정" : "새 게시글 작성"}
          </h3>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <ApperIcon name="X" size={20} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="게시글 제목을 입력하세요"
              className={errors.title ? "border-error" : ""}
            />
            {errors.title && (
              <p className="text-sm text-error mt-1">{errors.title}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="body">내용 *</Label>
            <textarea
              id="body"
              value={formData.body}
              onChange={(e) => handleChange("body", e.target.value)}
              placeholder="게시글 내용을 입력하세요"
              rows={8}
              className={`w-full px-3 py-2 border rounded-md resize-vertical focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.body ? "border-error" : "border-gray-300"
              }`}
            />
            {errors.body && (
              <p className="text-sm text-error mt-1">{errors.body}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {formData.body.length}/2000자
            </p>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              취소
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>저장 중...</span>
                </div>
              ) : (
                post ? "수정하기" : "게시하기"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default PostEditor