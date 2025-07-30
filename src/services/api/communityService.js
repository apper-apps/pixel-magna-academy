import communityPostsData from "@/services/mockData/communityPosts.json"
import commentsData from "@/services/mockData/comments.json"

let posts = [...communityPostsData]
let comments = [...commentsData]

const communityService = {
  getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...posts])
      }, 400)
    })
  },

  getPostsWithCounts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const postsWithCounts = posts.map(post => {
          const likesCount = post.likes || 0
          const commentsCount = comments.filter(c => c.post_id === post.Id).length
          
          return {
            ...post,
            likes: likesCount,
            comments: commentsCount
          }
        })
        resolve([...postsWithCounts])
      }, 400)
    })
  },

  getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = posts.find(p => p.Id === parseInt(id))
        if (post) {
          const commentsCount = comments.filter(c => c.post_id === post.Id).length
          resolve({ 
            ...post,
            replies: commentsCount
          })
        } else {
          reject(new Error("Post not found"))
        }
      }, 200)
    })
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
        }
        posts.unshift(newPost)
        resolve({ ...newPost })
      }, 500)
    })
  },

  likePost(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const post = posts.find(p => p.Id === parseInt(id))
        if (post) {
          post.likes = (post.likes || 0) + 1
          resolve({ ...post })
        }
      }, 300)
    })
  }
}

export default communityService