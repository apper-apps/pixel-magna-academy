import { useContext } from 'react';
import { AuthContext } from '../../App';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const LogoutButton = ({ className = "" }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className={`flex items-center gap-2 ${className}`}
    >
      <ApperIcon name="LogOut" size={16} />
      Logout
    </Button>
  );
};

export default LogoutButton;