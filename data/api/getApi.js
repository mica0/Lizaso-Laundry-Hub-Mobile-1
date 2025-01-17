import { api } from "../axios";

// ALL AROUND API
// #MESSAGE MODULE
export const getMessages = async (user_one_id, user_two_id) => {
  try {
    const response = await api.get(
      `/mobile-customer-staff/${user_one_id}/${user_two_id}/get-messages`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getInbox = async (userId) => {
  try {
    const response = await api.get(
      `/mobile-customer-staff/${userId}/get-inbox`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCountForBottomNavigationBar = async (userId) => {
  try {
    const response = await api.get(
      `/mobile-customer-staff/${userId}/get-navigation-count`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNotification = async (userId) => {
  try {
    const response = await api.get(
      `/mobile-customer-staff/${userId}/get-notification`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNotificationCount = async (userId) => {
  try {
    const response = await api.get(
      `/mobile-customer-staff/${userId}/get-notification-count`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// CUSTOMER SECTION API REQUEST
export const getCheckCustomerDetails = async (userId) => {
  try {
    const response = await api.get(
      `/customers/${userId}/check-customer-details`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStoreList = async () => {
  try {
    const response = await api.get(`/customers/get-store-list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getUserDetails = async () => {
//   try {
//     const response = await api.get(`/mobile-users/me`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// #SERVICE REQUEST
export const getLaundryServices = async (storeId) => {
  try {
    const response = await api.get(`/customers/${storeId}/get-service-types`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// #TRACK ORDER
export const getLaundryTrackOrder = async (userId) => {
  try {
    const response = await api.get(`/customers/${userId}/get-track-order`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReceipt = async (assignmentId) => {
  try {
    const response = await api.get(
      `/customers/${assignmentId}/get-calculated-transaction`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// #PAYMENT HISTORY
export const getTransactionHistory = async (userId) => {
  try {
    const response = await api.get(
      `/customers/${userId}/get-transaction-history`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// STAFF SECTION API REQUEST
// # LAUNDRY PICKUP MODULE
export const getLaundryPickup = async (storeId, user_id) => {
  try {
    const response = await api.get(`/staff/${storeId}/get-laundry-pickup`, {
      params: { user_id },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//#LAUNDRY DELIVERY MODULE
export const getLaundryDelivery = async (storeId, user_id) => {
  try {
    const response = await api.get(`/staff/${storeId}/get-laundry-delivery`, {
      params: { user_id },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
