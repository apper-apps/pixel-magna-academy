import React from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import NavItem from "@/components/molecules/NavItem";
import Button from "@/components/atoms/Button";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white border-b border-gray-200 lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ApperIcon name="Menu" size={24} />
        </button>
        
        <nav className="flex items-center space-x-6">
          <NavItem to="/courses" icon="BookOpen" label="강의" />
          <NavItem to="/videos" icon="Play" label="동영상" />
          <NavItem to="/posts" icon="FileText" label="게시판" />
          <NavItem to="/cohorts" icon="Users" label="코호트" />
          <NavItem to="/community" icon="MessageCircle" label="커뮤니티" />
          <NavItem to="/vault" icon="Archive" label="볼트" />
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button onClick={() => navigate("/checkout")}>
            멤버십 가입
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;