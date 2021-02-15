import request from '@/utils/request';
import { Config } from '@/config';

export async function getOrder(orderId) {
  return request(`${Config.COURIER_ENDPOINT}/api/orders/${orderId}/track/`, {
    method: 'GET',
  });
}
