import request from '@/utils/request';
import { Config } from '@/config';

export async function fetchOrder(orderId, postcode) {
  return request(`${Config.COURIER_ENDPOINT}/api/orders/${orderId}/track/`, {
    method: 'POST',
    data: {postcode}
  });
}
