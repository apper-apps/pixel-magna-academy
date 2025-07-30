import commentsData from "@/services/mockData/comments.json"
import usersData from "@/services/mockData/users.json"

let comments = [...commentsData];
let users = [...usersData];

const commentService = {
  getByPostId(postId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const postComments = comments
          .filter(c => c.post_id === parseInt(postId))
          .map(comment => {
            const author = users.find(u => u.Id === comment.author_id);
            return {
              ...comment,
              author: author ? { name: author.name, email: author.email } : null
            };
          })
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        
        resolve([...postComments]);
      }, 300);
    });
  },

  getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const comment = comments.find(c => c.Id === parseInt(id));
        if (comment) {
          const author = users.find(u => u.Id === comment.author_id);
          resolve({
            ...comment,
            author: author ? { name: author.name, email: author.email } : null
          });
        } else {
          reject(new Error("Comment not found"));
        }
      }, 200);
    });
  },

  create(commentData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComment = {
          Id: Math.max(...comments.map(c => c.Id)) + 1,
          ...commentData,
          post_id: parseInt(commentData.post_id),
          author_id: parseInt(commentData.author_id),
          created_at: new Date().toISOString()
        };
        comments.push(newComment);
        
        const author = users.find(u => u.Id === newComment.author_id);
        resolve({
          ...newComment,
          author: author ? { name: author.name, email: author.email } : null
        });
      }, 400);
    });
  },

  update(id, commentData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = comments.findIndex(c => c.Id === parseInt(id));
        if (index !== -1) {
          comments[index] = {
            ...comments[index],
            ...commentData
          };
          
          const author = users.find(u => u.Id === comments[index].author_id);
          resolve({
            ...comments[index],
            author: author ? { name: author.name, email: author.email } : null
          });
        } else {
          reject(new Error("Comment not found"));
        }
      }, 350);
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = comments.findIndex(c => c.Id === parseInt(id));
        if (index !== -1) {
          comments.splice(index, 1);
          resolve({ success: true });
        } else {
          reject(new Error("Comment not found"));
        }
      }, 300);
    });
  }
};

export default commentService;