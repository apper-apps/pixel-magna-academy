import videosData from "@/services/mockData/videos.json"
import categoriesData from "@/services/mockData/categories.json"

let videos = [...videosData];
let categories = [...categoriesData];

const videoService = {
  getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const videosWithCategory = videos.map(video => {
          const category = categories.find(c => c.Id === video.category_id);
          return {
            ...video,
            category: category ? category.name : "미분류"
          };
        });
        resolve([...videosWithCategory]);
      }, 300);
    });
  },

  getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const video = videos.find(v => v.Id === parseInt(id));
        if (video) {
          const category = categories.find(c => c.Id === video.category_id);
          resolve({
            ...video,
            category: category ? category.name : "미분류"
          });
        } else {
          reject(new Error("Video not found"));
        }
      }, 200);
    });
  },

  getByCategory(categoryId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categoryVideos = videos.filter(v => v.category_id === parseInt(categoryId));
        const videosWithCategory = categoryVideos.map(video => {
          const category = categories.find(c => c.Id === video.category_id);
          return {
            ...video,
            category: category ? category.name : "미분류"
          };
        });
        resolve([...videosWithCategory]);
      }, 250);
    });
  },

  create(videoData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newVideo = {
          Id: Math.max(...videos.map(v => v.Id)) + 1,
          ...videoData,
          category_id: parseInt(videoData.category_id)
        };
        videos.push(newVideo);
        const category = categories.find(c => c.Id === newVideo.category_id);
        resolve({
          ...newVideo,
          category: category ? category.name : "미분류"
        });
      }, 400);
    });
  },

  update(id, videoData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = videos.findIndex(v => v.Id === parseInt(id));
        if (index !== -1) {
          videos[index] = {
            ...videos[index],
            ...videoData,
            category_id: parseInt(videoData.category_id)
          };
          const category = categories.find(c => c.Id === videos[index].category_id);
          resolve({
            ...videos[index],
            category: category ? category.name : "미분류"
          });
        } else {
          reject(new Error("Video not found"));
        }
      }, 350);
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = videos.findIndex(v => v.Id === parseInt(id));
        if (index !== -1) {
          videos.splice(index, 1);
          resolve({ success: true });
        } else {
          reject(new Error("Video not found"));
        }
      }, 300);
    });
  }
};

export default videoService;