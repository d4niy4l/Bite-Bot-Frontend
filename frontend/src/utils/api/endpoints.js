export const ENDPOINTS = {
  FETCH_ALL_PRODUCTS: '/products/get/all',
  FETCH_PRODUCT: '/product/get/',
  SIGN_UP: '/register/create-account',
  LOGIN: '/auth/login',
  VERIFY_OTP: '/register/verify-otp',
  RESEND_OTP: '/register/resend-otp',
  EMOTION_API: '/recommendation/recommend',
  ORDER_TRACKING_API: '/orders/track',
  PLACE_ORDER: '/order/create',
  CONFIRM_ORDER: '/order/confirm',
  RESEND_ORDER_OTP: '/order/resendOTP',
  GET_PAST_ORDERS: '/orders/get-by-customer',
  CREATE_FEEDBACK: '/feedback/order',
  GET_ALL_FEEDBACKS: '/feedback/get/all',
  FOLLOW_UP_EMAIL: '/feedback/send/follow-up-email',
  PREPARE_ORDER: '/order/prepare',
  COMPLETE_ORDER: '/order/complete',
  GET_PROCESSING_ORDERS: '/orders/get-processing-and-prepared',
  GET_DELIVERED_ORDERS: '/orders/get-prepared-orders',

  /*  ADMIN */
  GET_ALL_WORKERS: '/workers/get/all',
  CREATE_WORKER: '/worker/create',
  DELETE_WORKER: '/worker/delete',
  UPDATE_WORKER: '/worker/update',

  GET_TOP_SECTORS: '/insights/orders-by-sector',
  GET_REVENUE: '/insights/get-revenue',
  GET_TOP_BUSINESS_HOURS: '/insights/top-business-hours',
  GET_TOP_SOLD_ITEMS: '/insights/top-sold-items',

  DELETE_PRODUCT: '/product/delete',
  UPDATE_PRODUCT: '/product/update',
  CREATE_PRODUCT: '/product/create',

  MARK_DELIVERED: '/order/delivered',
  DELIVER_FAILED: '/order/deliver-failed',
};
