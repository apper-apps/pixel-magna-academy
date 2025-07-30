import { toast } from 'react-toastify';

const authService = {
  async getCurrentUser() {
    try {
      const { ApperUI } = window.ApperSDK;
      const user = await ApperUI.getCurrentUser();
      return user;
    } catch (error) {
      console.error("Error getting current user:", error.message);
      return null;
    }
  },

  async logout() {
    try {
      const { ApperUI } = window.ApperSDK;
      await ApperUI.logout();
      return true;
    } catch (error) {
      console.error("Error logging out:", error.message);
      return false;
    }
  },

  async hasJun(userId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } }
        ],
        where: [
          {
            FieldName: "user_id",
            Operator: "EqualTo",
            Values: [parseInt(userId)]
          },
          {
            FieldName: "membership_id",
            Operator: "EqualTo",
            Values: [1]
          },
          {
            FieldName: "status",
            Operator: "EqualTo",
            Values: ["active"]
          }
        ]
      };

      const response = await apperClient.fetchRecords('user_membership', params);
      return response.success && response.data && response.data.length > 0;
    } catch (error) {
      console.error("Error checking Jun membership:", error.message);
      return false;
    }
  },

  async hasMaster(userId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } }
        ],
        where: [
          {
            FieldName: "user_id",
            Operator: "EqualTo",
            Values: [parseInt(userId)]
          },
          {
            FieldName: "membership_id",
            Operator: "EqualTo",
            Values: [2]
          },
          {
            FieldName: "status",
            Operator: "EqualTo",
            Values: ["active"]
          }
        ]
      };

      const response = await apperClient.fetchRecords('user_membership', params);
      return response.success && response.data && response.data.length > 0;
    } catch (error) {
      console.error("Error checking Master membership:", error.message);
      return false;
    }
  },

  async canCommunity(userId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "role" } },
          { field: { Name: "community_enabled" } }
        ]
      };

      const response = await apperClient.getRecordById('app_User', userId, params);
      
      if (!response.success || !response.data) {
        return false;
      }

      const user = response.data;
      return user.role === "admin" || user.community_enabled === true;
    } catch (error) {
      console.error("Error checking community access:", error.message);
      return false;
    }
  }
};

export default authService;
export default authService;