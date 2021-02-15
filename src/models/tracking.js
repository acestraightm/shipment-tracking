import { getOrder } from '@/services/tracking';
import { notification } from 'antd';

const TrackingModel = {
  namespace: 'tracking',
  state: {
    currentOrder: null,
  },
  effects: {
    *fetchOrder({ orderId }, { call, put }) {
      const response = yield call(getOrder, orderId);
      if (response && response.id) { // If found order
        yield put({
          type: 'setCurrentOrder',
          payload: response,
        });
      } else if (response) {
        notification.error({
          message: `Wrong Order`,
          description: 'Cannot find the order',
        });
      }
    },
  },
  reducers: {
    setCurrentOrder(state, action) {
      return { ...state, currentOrder: action.payload || null };
    }
  },
};
export default TrackingModel;
