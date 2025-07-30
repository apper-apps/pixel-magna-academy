import membershipsData from "@/services/mockData/memberships.json"

let memberships = [...membershipsData];

const membershipService = {
  getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...memberships]);
      }, 250);
    });
  },

  getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const membership = memberships.find(m => m.Id === parseInt(id));
        if (membership) {
          resolve({ ...membership });
        } else {
          reject(new Error("Membership not found"));
        }
      }, 200);
    });
  },

  purchase(membershipId, userInfo) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate payment processing
        resolve({
          success: true,
          transactionId: `TXN_${Date.now()}`,
          membershipId: membershipId,
          message: "결제가 성공적으로 완료되었습니다."
        });
      }, 1500);
    });
  }
};

export default membershipService;