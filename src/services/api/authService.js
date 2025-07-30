import usersData from "@/services/mockData/users.json"
import userMembershipsData from "@/services/mockData/userMemberships.json"

let currentUser = usersData[0]; // Default to admin for demo

const authService = {
  getCurrentUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(currentUser);
      }, 100);
    });
  },

  logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        currentUser = null;
        resolve(true);
      }, 200);
    });
  },

  hasJun() {
    if (!currentUser) return false;
    return userMembershipsData.some(x => 
      x.user_id === currentUser.Id && 
      x.membership_id === 1 && 
      x.status === "active"
    );
  },

  hasMaster() {
    if (!currentUser) return false;
    return userMembershipsData.some(x => 
      x.user_id === currentUser.Id && 
      x.membership_id === 2 && 
      x.status === "active"
    );
  },

  canCommunity() {
    if (!currentUser) return false;
    return currentUser.role === "admin" || currentUser.community_enabled;
  }
};

export default authService;