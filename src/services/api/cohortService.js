import cohortsData from "@/services/mockData/cohorts.json"
import userCohortsData from "@/services/mockData/userCohorts.json"
import usersData from "@/services/mockData/users.json"

let cohorts = [...cohortsData];
let userCohorts = [...userCohortsData];
let users = [...usersData];

const cohortService = {
  getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cohortsWithUsers = cohorts.map(cohort => {
          const memberCount = userCohorts.filter(uc => uc.cohort_id === cohort.Id).length;
          return {
            ...cohort,
            memberCount
          };
        });
        resolve([...cohortsWithUsers]);
      }, 300);
    });
  },

  getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cohort = cohorts.find(c => c.Id === parseInt(id));
        if (cohort) {
          const memberCount = userCohorts.filter(uc => uc.cohort_id === cohort.Id).length;
          const members = userCohorts
            .filter(uc => uc.cohort_id === cohort.Id)
            .map(uc => {
              const user = users.find(u => u.Id === uc.user_id);
              return user ? { Id: user.Id, name: user.name, email: user.email } : null;
            })
            .filter(Boolean);
          
          resolve({
            ...cohort,
            memberCount,
            members
          });
        } else {
          reject(new Error("Cohort not found"));
        }
      }, 250);
    });
  },

  getUserCohorts(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userCohortIds = userCohorts
          .filter(uc => uc.user_id === parseInt(userId))
          .map(uc => uc.cohort_id);
        
        const userCohortsList = cohorts.filter(c => userCohortIds.includes(c.Id));
        resolve([...userCohortsList]);
      }, 200);
    });
  },

  enrollUser(cohortId, userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cohort = cohorts.find(c => c.Id === parseInt(cohortId));
        const user = users.find(u => u.Id === parseInt(userId));
        
        if (!cohort || !user) {
          reject(new Error("Cohort or user not found"));
          return;
        }

        const isAlreadyEnrolled = userCohorts.some(
          uc => uc.cohort_id === parseInt(cohortId) && uc.user_id === parseInt(userId)
        );

        if (isAlreadyEnrolled) {
          reject(new Error("User already enrolled in this cohort"));
          return;
        }

        userCohorts.push({
          user_id: parseInt(userId),
          cohort_id: parseInt(cohortId)
        });

        resolve({ success: true, message: "Successfully enrolled in cohort" });
      }, 400);
    });
  },

  unenrollUser(cohortId, userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = userCohorts.findIndex(
          uc => uc.cohort_id === parseInt(cohortId) && uc.user_id === parseInt(userId)
        );

        if (index !== -1) {
          userCohorts.splice(index, 1);
          resolve({ success: true, message: "Successfully unenrolled from cohort" });
        } else {
          reject(new Error("Enrollment not found"));
        }
      }, 300);
    });
  },

  create(cohortData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCohort = {
          Id: Math.max(...cohorts.map(c => c.Id)) + 1,
          ...cohortData,
          created_at: new Date().toISOString(),
          memberCount: 0
        };
        cohorts.push(newCohort);
        resolve({ ...newCohort });
      }, 400);
    });
  }
};

export default cohortService;