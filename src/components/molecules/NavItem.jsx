import { NavLink } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const NavItem = ({ to, icon, children, onClick, className }) => {
  const baseStyles = "flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 font-medium"
  
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(baseStyles, "w-full text-left", className)}
      >
        {icon && <ApperIcon name={icon} size={20} className="mr-3" />}
        {children}
      </button>
    )
  }
  
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        baseStyles,
        isActive && "bg-primary text-white hover:bg-primary-dark hover:text-white",
        className
      )}
    >
      {icon && <ApperIcon name={icon} size={20} className="mr-3" />}
      {children}
    </NavLink>
  )
}

export default NavItem