import communityPostsData from "@/services/mockData/communityPosts.json"

let posts = [...communityPostsData];

const communityService = {
  getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...posts]);
      }, 400);
    });
  },

  getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = posts.find(p => p.Id === parseInt(id));
        if (post) {
          resolve({ ...post });
        } else {
          reject(new Error("Post not found"));
        }
      }, 200);
    });
  },

  create(postData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPost = {
          Id: Math.max(...posts.map(p => p.Id)) + 1,
          ...postData,
          created_at: new Date().toISOString(),
          likes: 0,
          replies: 0
        };
        posts.unshift(newPost);
        resolve({ ...newPost });
      }, 500);
    });
  },

  likePost(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const post = posts.find(p => p.Id === parseInt(id));
        if (post) {
          post.likes += 1;
          resolve({ ...post });
        }
      }, 300);
    });
  }
};

export default communityService;