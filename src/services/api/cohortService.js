import { toast } from 'react-toastify';

const cohortService = {
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
          { field: { Name: "label" } },
          { field: { Name: "created_at" } }
        ]
      };

      const response = await apperClient.fetchRecords('cohort', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Get member counts for each cohort
      const cohortsWithCounts = await Promise.all(
        (response.data || []).map(async (cohort) => {
          const memberCount = await this.getMemberCount(cohort.Id);
          return {
            ...cohort,
            memberCount
          };
        })
      );

      return cohortsWithCounts;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching cohorts:", error?.response?.data?.message);
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
          { field: { Name: "label" } },
          { field: { Name: "created_at" } }
        ]
      };

      const response = await apperClient.getRecordById('cohort', id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      const cohort = response.data;
      const memberCount = await this.getMemberCount(id);
      const members = await this.getMembers(id);

      return {
        ...cohort,
        memberCount,
        members
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching cohort with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async getMemberCount(cohortId) {
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
            FieldName: "cohort_id",
            Operator: "EqualTo",
            Values: [parseInt(cohortId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords('user_cohort', params);
      return response.success ? (response.data || []).length : 0;
    } catch (error) {
      return 0;
    }
  },

  async getMembers(cohortId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "user_id" } }
        ],
        where: [
          {
            FieldName: "cohort_id",
            Operator: "EqualTo",
            Values: [parseInt(cohortId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords('user_cohort', params);
      
      if (!response.success) {
        return [];
      }

      // Get user details for each member
      const members = await Promise.all(
        (response.data || []).map(async (userCohort) => {
          const userParams = {
            fields: [
              { field: { Name: "Name" } },
              { field: { Name: "email" } }
            ]
          };
          
          const userResponse = await apperClient.getRecordById('app_User', userCohort.user_id?.Id || userCohort.user_id, userParams);
          
          if (userResponse.success && userResponse.data) {
            return {
              Id: userResponse.data.Id,
              Name: userResponse.data.Name,
              email: userResponse.data.email
            };
          }
          return null;
        })
      );

      return members.filter(Boolean);
    } catch (error) {
      return [];
    }
  },

  async getUserCohorts(userId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "cohort_id" } }
        ],
        where: [
          {
            FieldName: "user_id",
            Operator: "EqualTo",
            Values: [parseInt(userId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords('user_cohort', params);

      if (!response.success) {
        return [];
      }

      // Get cohort details for each enrollment
      const cohorts = await Promise.all(
        (response.data || []).map(async (userCohort) => {
          const cohortParams = {
            fields: [
              { field: { Name: "Name" } },
              { field: { Name: "Tags" } },
              { field: { Name: "label" } },
              { field: { Name: "created_at" } }
            ]
          };
          
          const cohortResponse = await apperClient.getRecordById('cohort', userCohort.cohort_id?.Id || userCohort.cohort_id, cohortParams);
          
          return cohortResponse.success ? cohortResponse.data : null;
        })
      );

      return cohorts.filter(Boolean);
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching user cohorts:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async enrollUser(cohortId, userId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Check if already enrolled
      const existingParams = {
        fields: [
          { field: { Name: "Name" } }
        ],
        where: [
          {
            FieldName: "cohort_id",
            Operator: "EqualTo",
            Values: [parseInt(cohortId)]
          },
          {
            FieldName: "user_id",
            Operator: "EqualTo",
            Values: [parseInt(userId)]
          }
        ]
      };

      const existingResponse = await apperClient.fetchRecords('user_cohort', existingParams);
      
      if (existingResponse.success && existingResponse.data && existingResponse.data.length > 0) {
        toast.error("User already enrolled in this cohort");
        return { success: false, message: "User already enrolled in this cohort" };
      }

      // Create enrollment
      const params = {
        records: [{
          Name: `Enrollment ${cohortId}-${userId}`,
          user_id: parseInt(userId),
          cohort_id: parseInt(cohortId)
        }]
      };

      const response = await apperClient.createRecord('user_cohort', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return { success: false, message: response.message };
      }

      toast.success("Successfully enrolled in cohort");
      return { success: true, message: "Successfully enrolled in cohort" };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error enrolling user:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return { success: false, message: "Error enrolling user" };
    }
  },

  async unenrollUser(cohortId, userId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Find enrollment record
      const findParams = {
        fields: [
          { field: { Name: "Name" } }
        ],
        where: [
          {
            FieldName: "cohort_id",
            Operator: "EqualTo",
            Values: [parseInt(cohortId)]
          },
          {
            FieldName: "user_id",
            Operator: "EqualTo",
            Values: [parseInt(userId)]
          }
        ]
      };

      const findResponse = await apperClient.fetchRecords('user_cohort', findParams);
      
      if (!findResponse.success || !findResponse.data || findResponse.data.length === 0) {
        toast.error("Enrollment not found");
        return { success: false, message: "Enrollment not found" };
      }

      // Delete enrollment
      const params = {
        RecordIds: [findResponse.data[0].Id]
      };

      const response = await apperClient.deleteRecord('user_cohort', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return { success: false, message: response.message };
      }

      toast.success("Successfully unenrolled from cohort");
      return { success: true, message: "Successfully unenrolled from cohort" };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error unenrolling user:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return { success: false, message: "Error unenrolling user" };
    }
  },

  async create(cohortData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: cohortData.Name || cohortData.label,
          Tags: cohortData.Tags || "",
          label: cohortData.label,
          created_at: new Date().toISOString()
        }]
      };

      const response = await apperClient.createRecord('cohort', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create cohort ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        const newCohort = successfulRecords.length > 0 ? successfulRecords[0].data : null;
        if (newCohort) {
          return {
            ...newCohort,
            memberCount: 0
          };
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating cohort:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }
};

export default cohortService;