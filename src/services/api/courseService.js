import coursesData from "@/services/mockData/courses.json"

let courses = [...coursesData];

const courseService = {
  getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...courses]);
      }, 300);
    });
  },

  getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const course = courses.find(c => c.Id === parseInt(id));
        if (course) {
          resolve({ ...course });
        } else {
          reject(new Error("Course not found"));
        }
      }, 200);
    });
  },

  getFreeCourses() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const freeCourses = courses.filter(c => c.is_free);
        resolve([...freeCourses]);
      }, 250);
    });
  },

  getCoursesByMembership(membershipLevel) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const availableCourses = courses.filter(c => 
          c.is_free || c.required_membership <= membershipLevel
        );
        resolve([...availableCourses]);
      }, 300);
    });
  }
};

export default courseService;