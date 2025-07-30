import { toast } from 'react-toastify';

const communityService = {
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
          { field: { Name: "content" } },
          { field: { Name: "author" } },
          { field: { Name: "created_at" } },
          { field: { Name: "likes" } },
          { field: { Name: "replies" } }
        ],
        orderBy: [
          {
            fieldName: "created_at",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('community_post', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching community posts:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getPostsWithCounts() {
    try {
      const posts = await this.getAll();
      
      // Get comment counts for each post
      const postsWithCounts = await Promise.all(
        posts.map(async (post) => {
          const commentsCount = await this.getCommentsCount(post.Id);
          return {
            ...post,
            likes: post.likes || 0,
            comments: commentsCount
          };
        })
      );

      return postsWithCounts;
    } catch (error) {
      console.error("Error fetching posts with counts:", error.message);
      return [];
    }
  },

  async getCommentsCount(postId) {
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
            FieldName: "post_id",
            Operator: "EqualTo",
            Values: [parseInt(postId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords('app_Comment', params);
      return response.success ? (response.data || []).length : 0;
    } catch (error) {
      return 0;
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
          { field: { Name: "content" } },
          { field: { Name: "author" } },
          { field: { Name: "created_at" } },
          { field: { Name: "likes" } },
          { field: { Name: "replies" } }
        ]
      };

      const response = await apperClient.getRecordById('community_post', id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      const post = response.data;
      if (post) {
        const commentsCount = await this.getCommentsCount(post.Id);
        return {
          ...post,
          replies: commentsCount
        };
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching community post with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(postData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: postData.Name || postData.title,
          Tags: postData.Tags || "",
          title: postData.title,
          content: postData.content,
          author: postData.author,
          created_at: new Date().toISOString(),
          likes: 0,
          replies: 0
        }]
      };

      const response = await apperClient.createRecord('community_post', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create community post ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating community post:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async likePost(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Get current post to increment likes
      const post = await this.getById(id);
      if (!post) {
        toast.error("Post not found");
        return null;
      }

      const params = {
        records: [{
          Id: parseInt(id),
          likes: (post.likes || 0) + 1
        }]
      };

      const response = await apperClient.updateRecord('community_post', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to like community post ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error liking community post:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }
};

export default communityService;