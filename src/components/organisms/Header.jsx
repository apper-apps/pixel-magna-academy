import ApperIcon from "@/components/ApperIcon"

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ApperIcon name="Menu" size={24} />
        </button>
        
        <div className="text-center">
          <h1 className="text-lg font-bold text-text">
            Magna Academy
          </h1>
        </div>
        
        <div className="w-10" /> {/* Spacer */}
      </div>
    </header>
  )
}

export default Header