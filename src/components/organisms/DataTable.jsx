import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader } from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"

const DataTable = ({ 
  data = [], 
  columns = [], 
  onRowClick,
  searchable = true,
  sortable = true,
  paginated = true,
  pageSize = 10,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null })
  const [currentPage, setCurrentPage] = useState(1)

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data
    
    return data.filter(item =>
      columns.some(column => {
        const value = item[column.key]
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      })
    )
  }, [data, searchTerm, columns])

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [filteredData, sortConfig])

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData
    
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return sortedData.slice(startIndex, endIndex)
  }, [sortedData, currentPage, pageSize, paginated])

  const totalPages = Math.ceil(sortedData.length / pageSize)

  const handleSort = (key) => {
    if (!sortable) return

    setSortConfig(prevConfig => {
      if (prevConfig.key === key) {
        if (prevConfig.direction === 'asc') return { key, direction: 'desc' }
        if (prevConfig.direction === 'desc') return { key: null, direction: null }
      }
      return { key, direction: 'asc' }
    })
  }

  const handleRowClick = (item) => {
    if (onRowClick) {
      onRowClick(item)
    }
  }

  const formatValue = (value, column) => {
    if (column.format && typeof column.format === 'function') {
      return column.format(value)
    }
    return value
  }

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return "ArrowUpDown"
    return sortConfig.direction === 'asc' ? "ArrowUp" : "ArrowDown"
  }

  return (
    <Card className={className}>
      {(searchable || paginated) && (
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            {searchable && (
              <div className="relative max-w-sm">
                <ApperIcon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  type="text"
                  placeholder="검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}
            
            {paginated && (
              <div className="text-sm text-gray-500">
                총 {sortedData.length}개 항목
              </div>
            )}
          </div>
        </CardHeader>
      )}

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`text-left p-4 font-medium text-text ${
                      sortable && column.sortable !== false 
                        ? "cursor-pointer hover:bg-gray-100 select-none" 
                        : ""
                    }`}
                    onClick={() => sortable && column.sortable !== false && handleSort(column.key)}
                    style={{ width: column.width }}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{column.title}</span>
                      {sortable && column.sortable !== false && (
                        <ApperIcon 
                          name={getSortIcon(column.key)} 
                          size={14} 
                          className="text-gray-400"
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-8 text-gray-500">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr
                    key={item.Id || index}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      onRowClick ? "cursor-pointer" : ""
                    }`}
                    onClick={() => handleRowClick(item)}
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="p-4 text-gray-700">
                        {formatValue(item[column.key], column)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {paginated && totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              페이지 {currentPage} / {totalPages}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ApperIcon name="ChevronLeft" size={14} />
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ApperIcon name="ChevronRight" size={14} />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DataTable