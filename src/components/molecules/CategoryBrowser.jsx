import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import categoryService from "@/services/api/categoryService"

const CategoryBrowser = ({ onCategorySelect, selectedCategoryId }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      setError("카테고리를 불러오는데 실패했습니다.")
      toast.error("카테고리를 불러오는데 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const parentCategories = categories.filter(c => c.parent_id === null)

  const getChildCategories = (parentId) => {
    return categories.filter(c => c.parent_id === parentId)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadCategories} />

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text">카테고리</h3>
        <Button
          variant={selectedCategoryId === null ? "primary" : "outline"}
          size="sm"
          onClick={() => onCategorySelect(null)}
        >
          전체
        </Button>
      </div>
      
      <div className="space-y-3">
        {parentCategories.map(parent => {
          const children = getChildCategories(parent.Id)
          
          return (
            <div key={parent.Id} className="space-y-2">
              <Button
                variant={selectedCategoryId === parent.Id ? "primary" : "ghost"}
                className="w-full justify-start text-left"
                onClick={() => onCategorySelect(parent.Id)}
              >
                <ApperIcon name="Folder" size={16} className="mr-2" />
                {parent.name}
              </Button>
              
              {children.length > 0 && (
                <div className="ml-6 space-y-1">
                  {children.map(child => (
                    <Button
                      key={child.Id}
                      variant={selectedCategoryId === child.Id ? "primary" : "ghost"}
                      size="sm"
                      className="w-full justify-start text-left"
                      onClick={() => onCategorySelect(child.Id)}
                    >
                      <ApperIcon name="FileText" size={14} className="mr-2" />
                      {child.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryBrowser