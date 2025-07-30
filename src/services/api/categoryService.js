import categoriesData from "@/services/mockData/categories.json"

let categories = [...categoriesData];

const categoryService = {
  getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...categories]);
      }, 200);
    });
  },

  getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const category = categories.find(c => c.Id === parseInt(id));
        if (category) {
          resolve({ ...category });
        } else {
          reject(new Error("Category not found"));
        }
      }, 150);
    });
  },

  getParentCategories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const parentCategories = categories.filter(c => c.parent_id === null);
        resolve([...parentCategories]);
      }, 200);
    });
  },

  getChildCategories(parentId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const childCategories = categories.filter(c => c.parent_id === parseInt(parentId));
        resolve([...childCategories]);
      }, 200);
    });
  },

  create(categoryData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCategory = {
          Id: Math.max(...categories.map(c => c.Id)) + 1,
          ...categoryData,
          parent_id: categoryData.parent_id ? parseInt(categoryData.parent_id) : null
        };
        categories.push(newCategory);
        resolve({ ...newCategory });
      }, 300);
    });
  },

  update(id, categoryData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = categories.findIndex(c => c.Id === parseInt(id));
        if (index !== -1) {
          categories[index] = {
            ...categories[index],
            ...categoryData,
            parent_id: categoryData.parent_id ? parseInt(categoryData.parent_id) : null
          };
          resolve({ ...categories[index] });
        } else {
          reject(new Error("Category not found"));
        }
      }, 300);
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = categories.findIndex(c => c.Id === parseInt(id));
        if (index !== -1) {
          const hasChildren = categories.some(c => c.parent_id === parseInt(id));
          if (hasChildren) {
            reject(new Error("Cannot delete category with subcategories"));
            return;
          }
          categories.splice(index, 1);
          resolve({ success: true });
        } else {
          reject(new Error("Category not found"));
        }
      }, 300);
    });
  }
};

export default categoryService;