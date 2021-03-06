export const GOOGLE_API_KEY = "AIzaSyAfTlWss4rCm5xcHXcHqjr86rEF0yoBMmc";

export const COLORS = {
  primary: '#27acb1',
  danger: '#DF382C',
  warning: '#EFB73E',
  success: '#38B44A',
  gray: '#495057',
  darkGray: '#333333',
  lightGray: '#868e96',
  white: '#ffffff',
  blue: '#007bff'
}

export const OrderStatusValues = {
  CREATED: 'created',

  ROUTE_ASSIGNED_FOR_COLLECTION: 'route_assigned_for_collection',
  DRIVER_ASSIGNED_FOR_COLLECTION: 'driver_assigned_for_collection',
  OUT_FOR_COLLECTION: 'started_collection',
  COLLECTED: 'collected',
  NOT_COLLECTED: 'not_collected',

  RECEIVED_AT_COLLECTION_DEPOT: 'received_at_collection_depot',
  IN_TRANSIT_TO_SORTATION_DEPOT: 'in_transit_to_sortation_depot',
  RECEIVED_AT_SORTATION_DEPOT: 'received_at_sortation_depot',
  IN_TRANSIT_TO_DELIVERY_DEPOT: 'in_transit_to_delivery_depot',
  RECEIVED_AT_LAST_DEPOT: 'received_at_last_depot',

  ROUTE_ASSIGNED_FOR_DELIVERY: 'route_assigned_for_delivery',
  DRIVER_ASSIGNED_FOR_DELIVERY: 'driver_assigned_for_delivery',
  // AWAITING_PICKUP_FOR_DELIVERY: 'awaiting_pickup_for_delivery',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  PARTIALLY_DELIVERED: 'partially_delivered',
  NOT_DELIVERED: 'not_delivered',
  FINISHED: 'finished',
  
  MISSING: 'missing',
  DELAYED: 'delayed',
  DAMAGED_IN_TRANSIT: 'damaged_in_transit',
  LOST: 'lost',

  SENT_TO_SENDER: 'sent_to_sender'
}

export const OrderStatusTitles = {
  [OrderStatusValues.CREATED]: 'Created',

  [OrderStatusValues.ROUTE_ASSIGNED_FOR_COLLECTION]: 'Route Assigned for Collection',
  [OrderStatusValues.DRIVER_ASSIGNED_FOR_COLLECTION]: 'Driver Assigned for Collection',
  [OrderStatusValues.OUT_FOR_COLLECTION]: 'Out for Collection',
  [OrderStatusValues.COLLECTED]: 'Collected',
  [OrderStatusValues.NOT_COLLECTED]: 'Not Collected',

  [OrderStatusValues.RECEIVED_AT_SORTATION_DEPOT]: 'Received at Sortation Depot',
  [OrderStatusValues.IN_TRANSIT_TO_DELIVERY_DEPOT]: 'In Transit to Delivery Depot',
  [OrderStatusValues.RECEIVED_AT_LAST_DEPOT]: 'Received at Delivery Depot',

  [OrderStatusValues.ROUTE_ASSIGNED_FOR_DELIVERY]: 'Route Assigned for Delivery',
  [OrderStatusValues.DRIVER_ASSIGNED_FOR_DELIVERY]: 'Awaiting Pickup for Delivery',
  // [OrderStatusValues.AWAITING_PICKUP_FOR_DELIVERY]: 'Awaiting Pickup for Delivery',
  [OrderStatusValues.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [OrderStatusValues.DELIVERED]: 'Delivered',
  [OrderStatusValues.PARTIALLY_DELIVERED]: 'Partially Delivered',
  [OrderStatusValues.NOT_DELIVERED]: 'Not Delivered',
  [OrderStatusValues.FINISHED]: 'Finished',

  [OrderStatusValues.MISSING]: 'Parcels Missing',
  [OrderStatusValues.DELAYED]: 'Delivery Delayed',
  [OrderStatusValues.DAMAGED_IN_TRANSIT]: 'Damaged in Transit',
  [OrderStatusValues.LOST]: 'Parcels Lost',

  [OrderStatusValues.SENT_TO_SENDER]: 'Send to Sender',
}

export const OrderStatusMessages = {
  [OrderStatusValues.CREATED]: 'The order is created',

  [OrderStatusValues.ROUTE_ASSIGNED_FOR_COLLECTION]: 'Route is assigned for collection',
  [OrderStatusValues.DRIVER_ASSIGNED_FOR_COLLECTION]: 'Driver is assigned for collection',
  [OrderStatusValues.OUT_FOR_COLLECTION]: 'Driver is out for Collection',
  [OrderStatusValues.COLLECTED]: 'The shipments are collected by the driver',
  [OrderStatusValues.NOT_COLLECTED]: 'Collecting shipments failed',

  [OrderStatusValues.RECEIVED_AT_COLLECTION_DEPOT]: 'The shipments are received at collection depot',
  [OrderStatusValues.IN_TRANSIT_TO_SORTATION_DEPOT]: 'The shipments are in transit to sortation depot',
  [OrderStatusValues.RECEIVED_AT_SORTATION_DEPOT]: 'The shipments are received at sortation depot',
  [OrderStatusValues.IN_TRANSIT_TO_DELIVERY_DEPOT]: 'The shipments are in transit to delivery depot ',
  [OrderStatusValues.RECEIVED_AT_LAST_DEPOT]: 'The shipments are received at delivery depot',

  [OrderStatusValues.ROUTE_ASSIGNED_FOR_DELIVERY]: 'Route is assigned for delivery',
  [OrderStatusValues.DRIVER_ASSIGNED_FOR_DELIVERY]: 'Driver is assigned for delivery',
  // [OrderStatusValues.AWAITING_PICKUP_FOR_DELIVERY]: 'Awaiting Pickup for Delivery',
  [OrderStatusValues.OUT_FOR_DELIVERY]: 'Driver is out for delivery',
  [OrderStatusValues.DELIVERED]: 'The shipments are delivered',
  [OrderStatusValues.PARTIALLY_DELIVERED]: 'The shipments are partially delivered',
  [OrderStatusValues.NOT_DELIVERED]: 'The shipments are failed to deliver',
  [OrderStatusValues.FINISHED]: 'Finished',

  [OrderStatusValues.MISSING]: 'Delayed in transit',
  [OrderStatusValues.DELAYED]: 'Extended delivery time area. Package is on schedule',
  [OrderStatusValues.DAMAGED_IN_TRANSIT]: 'Delayed in transit',
  [OrderStatusValues.LOST]: 'Delayed package, please contact sender for more information',

  [OrderStatusValues.SENT_TO_SENDER]: 'Send to Sender',
}

export const OrderStatusColors = {
  [OrderStatusValues.CREATED]: COLORS.gray,
  [OrderStatusValues.ROUTE_ASSIGNED_FOR_COLLECTION]: COLORS.primary,
  [OrderStatusValues.DRIVER_ASSIGNED_FOR_COLLECTION]: COLORS.primary,
  [OrderStatusValues.OUT_FOR_COLLECTION]: COLORS.warning,
  [OrderStatusValues.COLLECTED]: COLORS.success,
  [OrderStatusValues.NOT_COLLECTED]: COLORS.danger,

  [OrderStatusValues.RECEIVED_AT_COLLECTION_DEPOT]: COLORS.primary,
  [OrderStatusValues.IN_TRANSIT_TO_SORTATION_DEPOT]: COLORS.gray,
  [OrderStatusValues.RECEIVED_AT_SORTATION_DEPOT]: COLORS.primary,
  [OrderStatusValues.IN_TRANSIT_TO_DELIVERY_DEPOT]: COLORS.gray,
  [OrderStatusValues.RECEIVED_AT_LAST_DEPOT]: COLORS.primary,

  [OrderStatusValues.ROUTE_ASSIGNED_FOR_DELIVERY]: COLORS.primary,
  [OrderStatusValues.DRIVER_ASSIGNED_FOR_DELIVERY]: COLORS.blue,
  // [OrderStatusValues.AWAITING_PICKUP_FOR_DELIVERY]: COLORS.warning,
  [OrderStatusValues.OUT_FOR_DELIVERY]: COLORS.warning,
  [OrderStatusValues.DELIVERED]: COLORS.success,
  [OrderStatusValues.PARTIALLY_DELIVERED]: COLORS.warning,
  [OrderStatusValues.NOT_DELIVERED]: COLORS.danger,
  [OrderStatusValues.FINISHED]: '#bbbbbb',

  [OrderStatusValues.MISSING]: COLORS.danger,
  [OrderStatusValues.DELAYED]: COLORS.lightGray,
  [OrderStatusValues.DAMAGED_IN_TRANSIT]: COLORS.danger,
  [OrderStatusValues.LOST]: COLORS.danger,

  [OrderStatusValues.SENT_TO_SENDER]: COLORS.lightGray,
}

export const OrderTypeValues = {
  DELIVERY: 'delivery',
  RETURN: 'return',
}

export const OrderTypeTitles = {
  [OrderTypeValues.DELIVERY]: 'Delivery',
  [OrderTypeValues.RETURN]: 'Return',
}



// Parcel Status Constants

export const ParcelStatusValues = {
  CREATED: 'created',
  RECEIVED_BY_DRIVER: 'received_by_driver',
  RECEIVED_AT_SORTATION_DEPOT: 'received_at_sortation_depot',
  IN_TRANSIT_TO_DELIVERY_DEPOT: 'in_transit_to_delivery_depot',
  RECEIVED_AT_DELIVERY_DEPOT: 'received_at_depot',
  IN_DELIVERY: 'in_delivery',
  DELIVERED: 'delivered',
  NOT_DELIVERED: 'not_delivered',
  ACCEPTED: 'accepted',
  RETURNED: 'returned',
  SENT_TO_SENDER: 'sent_to_sender',
  SENT_TO_NEW_ORDER: 'sent_to_new_order',
  KEEP_AT_DEPOT: 'keep_at_depot',
}

export const ParcelStatusTitles = {
  [ParcelStatusValues.CREATED]: 'Created',
  [ParcelStatusValues.RECEIVED_BY_DRIVER]: 'Accepted by Driver',
  [ParcelStatusValues.RECEIVED_AT_SORTATION_DEPOT]: 'Received at Sortation Depot',
  [ParcelStatusValues.IN_TRANSIT_TO_DELIVERY_DEPOT]: 'In Transit to Delivery Depot',
  [ParcelStatusValues.RECEIVED_AT_DELIVERY_DEPOT]: 'Received at Delivery Depot',
  [ParcelStatusValues.IN_DELIVERY]: 'In Delivery',
  [ParcelStatusValues.DELIVERED]: 'Delivered',
  [ParcelStatusValues.NOT_DELIVERED]: 'Not Delivered',
  [ParcelStatusValues.ACCEPTED]: 'Accepted',
  [ParcelStatusValues.RETURNED]: 'Returned',
  [ParcelStatusValues.SENT_TO_SENDER]: 'Sent to Sender',
  [ParcelStatusValues.SENT_TO_NEW_ORDER]: 'Sent to New Order',
  [ParcelStatusValues.KEEP_AT_DEPOT]: 'keep_at_depot',
}

export const ParcelStatusColors = {
  [ParcelStatusValues.CREATED]: COLORS.gray,
  [ParcelStatusValues.RECEIVED_BY_DRIVER]: COLORS.primary,
  [ParcelStatusValues.RECEIVED_AT_SORTATION_DEPOT]: COLORS.primary,
  [ParcelStatusValues.IN_TRANSIT_TO_DELIVERY_DEPOT]: COLORS.warning,
  [ParcelStatusValues.RECEIVED_AT_DELIVERY_DEPOT]: COLORS.primary,
  [ParcelStatusValues.IN_DELIVERY]: COLORS.warning,
  [ParcelStatusValues.DELIVERED]: COLORS.success,
  [ParcelStatusValues.NOT_DELIVERED]: COLORS.danger,
  [ParcelStatusValues.ACCEPTED]: COLORS.success,
  [ParcelStatusValues.RETURNED]: COLORS.danger,
  [ParcelStatusValues.SENT_TO_SENDER]: COLORS.gray,
  [ParcelStatusValues.SENT_TO_NEW_ORDER]: COLORS.primary,
  [ParcelStatusValues.KEEP_AT_DEPOT]: COLORS.gray,
}


export const ParcelStateValues = {
  NOT_RECEIVED: 'not_received',
  NORMAL: 'normal',
  DAMAGED_IN_UNLOADING: 'damaged_in_unloading',
  DAMAGED_IN_LOADING: 'damaged_in_loading',
  DAMAGED_IN_TRANSIT: 'damaged_in_transit',
  MISSING: 'missing',
  CUSTOMER_REFUSED: 'customer_refused',
}

export const ParcelStateTitles = {
  [ParcelStateValues.NOT_RECEIVED]: 'Not Received',
  [ParcelStateValues.NORMAL]: 'Normal',
  [ParcelStateValues.DAMAGED_IN_UNLOADING]: 'Damaged in Unloading',
  [ParcelStateValues.DAMAGED_IN_LOADING]: 'Damaged in Loading',
  [ParcelStateValues.DAMAGED_IN_TRANSIT]: 'Damaged in Transit',
  [ParcelStateValues.MISSING]: 'Delayed in Transit',
  [ParcelStateValues.CUSTOMER_REFUSED]: 'Customer Refused',
}

// ---------------- Leave Type ----------------

export const LeaveTypeValues = {
  CUSTOMER: 'customer',
  // For Business
  MAIL_ROOM: 'mail_room',
  RECEPTION: 'reception',
  SHOP_ASSISTANT: 'shop_assistant',
  // For Residential
  NEIGHBOR: 'neighbor',
  FRONT_PORCH: 'front_porch',
  REAR_PORCH: 'rear_porch',
  GARDEN: 'garden',
  BEHIND_WHEELIE_BIN: 'behind_wheelie_bin',
  SHED_GARDEN_HOUSE: 'shed_garden_house',
  LETTERBOX: 'letterbox',

  OTHER_PLACE: 'other_place',
}

export const LeaveTypeTitles = {
  [LeaveTypeValues.CUSTOMER]: 'Customer',
  // For Business
  [LeaveTypeValues.MAIL_ROOM]: 'Mail Room',
  [LeaveTypeValues.RECEPTION]: 'Reception',
  [LeaveTypeValues.SHOP_ASSISTANT]: 'Shop Assistant',
  // For Residential
  [LeaveTypeValues.NEIGHBOR]: 'Neighbor',
  [LeaveTypeValues.FRONT_PORCH]: 'Front Porch',
  [LeaveTypeValues.REAR_PORCH]: 'Rear Porch',
  [LeaveTypeValues.GARDEN]: 'Garden',
  [LeaveTypeValues.BEHIND_WHEELIE_BIN]: 'Behind Wheelie Bin',
  [LeaveTypeValues.SHED_GARDEN_HOUSE]: 'Shed Garden House',
  [LeaveTypeValues.LETTERBOX]: 'Letter Box',

  [LeaveTypeValues.OTHER_PLACE]: 'Other Place'
}