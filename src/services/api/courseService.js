import { toast } from 'react-toastify';

const courseService = {
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "thumbnail" } },
          { field: { Name: "required_membership" } },
          { field: { Name: "is_free" } },
          { field: { Name: "duration" } },
          { field: { Name: "lessons" } }
        ]
      };

      const response = await apperClient.fetchRecords('course', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching courses:", error?.response?.data?.message);
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "thumbnail" } },
          { field: { Name: "required_membership" } },
          { field: { Name: "is_free" } },
          { field: { Name: "duration" } },
          { field: { Name: "lessons" } }
        ]
      };

      const response = await apperClient.getRecordById('course', id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching course with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async getFreeCourses() {
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "thumbnail" } },
          { field: { Name: "required_membership" } },
          { field: { Name: "is_free" } },
          { field: { Name: "duration" } },
          { field: { Name: "lessons" } }
        ],
        where: [
          {
            FieldName: "is_free",
            Operator: "EqualTo",
            Values: [true]
          }
        ]
      };

      const response = await apperClient.fetchRecords('course', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching free courses:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getCoursesByMembership(membershipLevel) {
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "thumbnail" } },
          { field: { Name: "required_membership" } },
          { field: { Name: "is_free" } },
          { field: { Name: "duration" } },
          { field: { Name: "lessons" } }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "is_free",
                    operator: "EqualTo",
                    values: [true]
                  }
                ],
                operator: "AND"
              },
              {
                conditions: [
                  {
                    fieldName: "required_membership",
                    operator: "LessThanOrEqualTo",
                    values: [membershipLevel]
                  }
                ],
                operator: "AND"
              }
            ]
          }
        ]
      };

      const response = await apperClient.fetchRecords('course', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching courses by membership:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }
};

export default courseService;