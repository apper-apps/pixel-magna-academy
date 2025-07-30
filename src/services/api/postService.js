import postsData from "@/services/mockData/posts.json"
import postLikesData from "@/services/mockData/postLikes.json"
import usersData from "@/services/mockData/users.json"

let posts = [...postsData];
let postLikes = [...postLikesData];
let users = [...usersData];

const postService = {
  getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const postsWithDetails = posts.map(post => {
          const author = users.find(u => u.Id === post.author_id);
          const likes = postLikes.filter(pl => pl.post_id === post.Id).length;
          
          return {
            ...post,
            author: author ? { name: author.name, email: author.email } : null,
            likes,
            replies: 0 // Will be populated when comments are implemented
          };
        }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        resolve([...postsWithDetails]);
      }, 400);
    });
  },

  getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = posts.find(p => p.Id === parseInt(id));
        if (post) {
          const author = users.find(u => u.Id === post.author_id);
          const likes = postLikes.filter(pl => pl.post_id === post.Id).length;
          
          resolve({
            ...post,
            author: author ? { name: author.name, email: author.email } : null,
            likes,
            replies: 0
          });
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
          author_id: parseInt(postData.author_id),
          created_at: new Date().toISOString()
        };
        posts.unshift(newPost);
        
        const author = users.find(u => u.Id === newPost.author_id);
        resolve({
          ...newPost,
          author: author ? { name: author.name, email: author.email } : null,
          likes: 0,
          replies: 0
        });
      }, 500);
    });
  },

  update(id, postData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = posts.findIndex(p => p.Id === parseInt(id));
        if (index !== -1) {
          posts[index] = {
            ...posts[index],
            ...postData
          };
          
          const author = users.find(u => u.Id === posts[index].author_id);
          const likes = postLikes.filter(pl => pl.post_id === posts[index].Id).length;
          
          resolve({
            ...posts[index],
            author: author ? { name: author.name, email: author.email } : null,
            likes,
            replies: 0
          });
        } else {
          reject(new Error("Post not found"));
        }
      }, 400);
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = posts.findIndex(p => p.Id === parseInt(id));
        if (index !== -1) {
          posts.splice(index, 1);
          // Also remove associated likes
          const likesToRemove = postLikes.filter(pl => pl.post_id === parseInt(id));
          likesToRemove.forEach(like => {
            const likeIndex = postLikes.findIndex(pl => pl.post_id === like.post_id && pl.user_id === like.user_id);
            if (likeIndex !== -1) {
              postLikes.splice(likeIndex, 1);
            }
          });
          resolve({ success: true });
        } else {
          reject(new Error("Post not found"));
        }
      }, 300);
    });
  },

  likePost(postId, userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = posts.find(p => p.Id === parseInt(postId));
        if (!post) {
          reject(new Error("Post not found"));
          return;
        }

        const existingLike = postLikes.find(
          pl => pl.post_id === parseInt(postId) && pl.user_id === parseInt(userId)
        );

        if (existingLike) {
          // Unlike the post
          const likeIndex = postLikes.findIndex(
            pl => pl.post_id === parseInt(postId) && pl.user_id === parseInt(userId)
          );
          postLikes.splice(likeIndex, 1);
        } else {
          // Like the post
          postLikes.push({
            post_id: parseInt(postId),
            user_id: parseInt(userId)
          });
        }

        const likes = postLikes.filter(pl => pl.post_id === parseInt(postId)).length;
        const author = users.find(u => u.Id === post.author_id);
        
        resolve({
          ...post,
          author: author ? { name: author.name, email: author.email } : null,
          likes,
          replies: 0,
          isLiked: !existingLike
        });
      }, 300);
    });
  }
};

export default postService;