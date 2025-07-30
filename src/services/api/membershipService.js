import { toast } from 'react-toastify';

const membershipService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "tier" } },
          { field: { Name: "price" } },
          { field: { Name: "benefits" } }
        ]
      };

      const response = await apperClient.fetchRecords('membership', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching memberships:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "tier" } },
          { field: { Name: "price" } },
          { field: { Name: "benefits" } }
        ]
      };

      const response = await apperClient.getRecordById('membership', id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching membership with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async purchase(membershipId, userInfo) {
    try {
      // Simulate payment processing with ApperClient
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        success: true,
        transactionId: `TXN_${Date.now()}`,
        membershipId: membershipId,
        message: "결제가 성공적으로 완료되었습니다."
      };
    } catch (error) {
      console.error("Error processing payment:", error.message);
      return {
        success: false,
        message: "결제 처리 중 오류가 발생했습니다."
      };
    }
  }
};

export default membershipService;