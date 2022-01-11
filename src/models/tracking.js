import { fetchOrder } from '@/services/tracking';
import { notification } from 'antd';

const TrackingModel = {
  namespace: 'tracking',
  state: {
    currentOrder: null,
  },
  effects: {
    *fetchOrder({ orderId }, { call, put }) {
      const response = yield call(fetchOrder, orderId);
      if (response && response.id) {
        // If found order
        yield put({
          type: 'setCurrentOrder',
          payload: response,
        });
      } else if (response) {
        if (response.status === 400) {
          notification.error({
            message: `Wrong postcode`,
            description: 'You have submitted the wrong postcode.',
          });
      } else if (response.status === 404) {
          notification.error({
            message: `Wrong Order`,
            description: 'Cannot find the order',
          });
        } else {
          notification.error({
            message: `Error`,
            description: 'Unknown error found',
          });
        }
      }
    },
  },
  reducers: {
    setCurrentOrder(state, action) {
      return { ...state, currentOrder: action.payload || null };
    },
  },
};
export default TrackingModel;
