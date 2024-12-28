export const APIBaseConfig = {
  fetchCreditReport: {
    endpoint: '/merchant/<merchantId>/credit-report',
    method: 'GET',
  },
  generateAadharOtp: {
    endpoint: '/merchant/<merchantId>/aadhar/<aadhar>/generate-otp',
    method: 'GET',
  },
  fetchCashData: {
    endpoint: '/pg/<merchantId>/tickets',
    method: 'GET',
  },
  validateAadharOtp: {
    endpoint: '/merchant/<merchantId>/aadhar/<aadhar>/verify-otp',
    method: 'POST',
  },
  getVPAid: {
    endpoint: '/merchant/<phone>/get-vpa',
    method: 'GET',
  },
  createOrderIdCC: {
    endpoint: '/payoutcc/initiate-pg-transaction/v3',
    method: 'POST',
  },
  createMarketplaceOrder: {
    endpoint: '/dpanda/marketplace/order',
    method: 'POST',
  },
  softVerifyTxn: {
    endpoint: '/risk-engine/merchant-soft-verify/v2',
    method: 'POST',
  },
  addBeneCC: {
    endpoint: '/payoutcc/beneficiaries',
    method: 'POST',
  },
  sendStmt: {
    endpoint: '/merchant/merchant-bank-document/upload/<merchantId>',
    method: 'POST',
  },
  getAllTransactions: {
    endpoint: '/merchant/merchant_transactions/v5/<merchantId>',
    method: 'GET',
  },
  createMerchant: {
    endpoint: '/merchant/',
    method: 'POST',
  },
  getMerchantDetails: {
    endpoint: '/merchant/<merchantId>',
    method: 'GET',
  },
  generateWhatsappOtp: {
    endpoint: '/authentication/app-authenticate-whatsapp/',
    method: 'POST',
  },
  generateOtpToken: {
    endpoint: '/authentication/app-authenticate/',
    method: 'POST',
  },
  validateOtpToken: {
    endpoint: '/authentication/app-validate/',
    method: 'POST',
  },
  validateOtpTokenAfterPayment: {
    endpoint:
      '/authentication/otp-authentication/validate-token-after-payment/',
    method: 'POST',
  },
  validateOtpTokenBeforePayment: {
    endpoint:
      '/authentication/otp-authentication/validate-token-before-payment/',
    method: 'POST',
  },
  logout: {
    endpoint: '/authentication/app-logout/<phone>',
    method: 'POST',
  },
  payeeVerification: {
    endpoint: '/account-verification/',
    method: 'POST',
  },
  saveUserBankMessageInBulk: {
    endpoint: '/merchant/<merchantId>/save-msg-data/v2',
    method: 'POST',
  },
  getRemoteConfigs: {
    endpoint: '/projects/',
    method: 'GET',
  },
  getCCStatement: {
    endpoint: '/merchant/merchant-banks-not-verfied_list/<merchantId>',
    method: 'GET',
  },
  cardPatterns: {
    endpoint: '/risk-engine/get-card-patterns',
    method: 'GET',
  },
  sendRepaymentUpi: {
    endpoint: '/merchant/add-card-repayment-upi',
    method: 'POST',
  },
  cardDetailsBin: {
    endpoint: '/pg/pg/card-details/<card_bin>',
    method: 'POST',
  },
  getDefaultValues: {
    endpoint: '/merchant/default-values/<merchantId>',
    method: 'POST',
  },
  referralCode: {
    endpoint: '/merchant/merchant-referred-by',
    method: 'POST',
  },
  getMerchantCards: {
    endpoint: '/pg/juspay/cards/list/<merchantId>',
    method: 'GET',
  },
  getPaymentStatus: {
    endpoint: '/pg/juspay/order/status/<orderId>',
    method: 'GET',
  },
  searchMerchant: {
    endpoint: '/merchant/search',
    method: 'GET',
  },
  markMerchantHardMode: {
    endpoint: '/merchant/mark-merchant-hard-mode/<merchantId>',
    method: 'POST',
  },
  getGstDetails: {
    endpoint: '/merchant/add-merchant-gstin/',
    method: 'POST',
  },
  retryToUpi: {
    endpoint: '/payoutcc/update-bene-to-new-upi/<paymentId>',
    method: 'POST',
  },
  retryToAccount: {
    endpoint: '/payoutcc/update-bene-to-acc-ifsc/<paymentId>',
    method: 'POST',
  },
  addBeneDetails: {
    endpoint: '/merchant/add-merchant-pan-gstin',
    method: 'POST',
  },
  getMDR: {
    endpoint: '/pg/mcc-mdr-config',
    method: 'GET',
  },
  getBbpsMDR: {
    endpoint: '/bbps/get-bbps-mdr',
    method: 'POST',
  },
  getMilestones: {
    endpoint: '/milestones/check-merchant-milestones/<merchantId>',
    method: 'GET',
  },
  deleteCard: {
    endpoint: '/risk-engine/soft-delete-merchant-card-new',
    method: 'POST',
  },
  getFavoriteAndRecentBene: {
    endpoint: '/metrics/most-frequent-bene-info',
    method: 'POST',
  },
  claimMilestone: {
    endpoint: '/milestones/check-milestone-2/',
    method: 'POST',
  },
  marketplaceItems: {
    endpoint: '/dpanda/search-products',
    method: 'POST',
  },
  getAddresses: {
    endpoint: '/marketplace/get_address/<merchantId>',
    method: 'GET',
  },
  pollInvoice: {
    endpoint: '/pg/invoice/<requestId>',
    method: 'POST',
  },
  saveAddresses: {
    endpoint: '/marketplace/save_address',
    method: 'POST',
  },
  loggingPaymentErrors: {
    endpoint: '/metrics/support-ticket',
    method: 'POST',
  },
  checkSession: {
    endpoint: '/authentication/app-session-check/',
    method: 'POST',
  },
  supportTicket: {
    endpoint:
      'https://tatatele.superpe.in/backend/v2/zeus/get-service-case-app/<merchantId>/',
    method: 'GET',
  },
  otpReverifyRequired: {
    endpoint: '/risk-engine/sms-trigger-check/<merchantId>',
    method: 'POST',
  },
  sendPaymentDetails: {
    endpoint: '/payoutcc/create-transaction/',
    method: 'POST',
  },
  pollFamilyCardPayment: {
    endpoint: '/payoutcc/poll-family-status/<ft_id>',
    method: 'GET',
  },
  paymentAuthorizationRequired: {
    endpoint: '/payoutcc/transactions/<merchantId>',
    method: 'GET',
  },
  cancelAuthorization: {
    endpoint: '/payoutcc/cancel-transaction/<requestId>',
    method: 'POST',
  },
  sellerGSTVerification: {
    endpoint: '/merchant/seller-verification',
    method: 'POST',
  },
  sellerPhoneVerification: {
    endpoint: '/merchant/bene-seller-onboarding',
    method: 'POST',
  },
  getPublicKey: {
    endpoint: '/authentication/get_public_key/',
    method: 'GET',
  },
  postPublicKey: {
    endpoint: '/authentication/public_key/',
    method: 'POST',
  },
  getAccountNumbers: {
    endpoint: '/merchant/merchant-bank-beneficiaries/<phone>',
    method: 'POST',
  },
  shareCard: {
    endpoint: '/merchant/share_card_details',
    method: 'POST',
  },
  cardSharedWithMerchants: {
    endpoint: '/merchant/fetch-shared-merchants',
    method: 'POST',
  },
  unshareCard: {
    endpoint: '/merchant/remove_card_details',
    method: 'POST',
  },
  verifyPaymentOTP: {
    endpoint: '/payoutcc/submit-otp-direct/',
    method: 'POST',
  },
  pollPaymentCompletion: {
    endpoint: '/pg/juspay/order/status/v2/',
    method: 'POST',
  },
  resendPaymentOTP: {
    endpoint: '/payoutcc/resend-otp-direct/',
    method: 'POST',
  },
  deleteAadhar: {
    endpoint: '/merchant/delete-aadhar/?phone_no=<phone>',
    method: 'POST',
  },
  saveCardToServer: {
    endpoint: '/risk-engine/add-card/',
    method: 'POST',
  },
  createCardToken: {
    endpoint: '/easebuzz-tms/create-card-token/',
    method: 'POST',
  },
  checkInstantSettlement: {
    endpoint: '/payoutcc/is_payout_paused-temp',
    method: 'GET',
  },
  getMarketPlaceOrderDetails: {
    endpoint: '/dpanda/get-order-info-new/',
    method: 'POST',
  },
  getFxRate: {
    endpoint: '/payoutcc/get-fx-rate/',
    method: 'GET',
  },
  getCityFromIP: {
    endpoint: '/merchant/get-location',
    method: 'POST',
  },
  linkPhoneToBene: {
    endpoint: '/payoutcc/update-beneficiary/',
    method: 'POST',
  },
  checkInvoiceHash: {
    endpoint: '/pg/is-duplicate-invoice',
    method: 'POST',
  },
  checkFailedTxn: {
    endpoint: '/merchant/check-failed-txn/?merchant_id=<merchantId>',
    method: 'POST',
  },
  generatePaymentOTP: {
    endpoint: '/razorpay/generate-otp-razorpay-direct/?payment_id=<paymentId>',
    method: 'POST',
  },
  settleHoldPayment: {
    endpoint: '/payoutcc/update-bene-to-self-internal/',
    method: 'POST',
  },
  sendVertexData: {
    endpoint: '/pg/save-invoice-ocr-data',
    method: 'POST',
  },
  getMerchantValues: {
    endpoint: '/merchant/get-merchant-values/',
    method: 'POST',
  },
  updateDefaultAccUpi: {
    endpoint: '/merchant/update-default-bene-merchant/',
    method: 'POST',
  },
  isPayoutPaused: {
    endpoint: '/payoutcc/is_payout_paused/v2',
    method: 'GET',
  },
  saveContactsToServer: {
    endpoint: '/merchant/upload_contacts_v1/',
    method: 'POST',
  },
  locationCheck: {
    endpoint: '/merchant/check-geo-location',
    method: 'POST',
  },
  verifySellerDocument: {
    endpoint: '/merchant/verify-seller-document/',
    method: 'POST',
  },
  getCategories: {endpoint: '/bbps/categories', method: 'GET'},
  fetchPlans: {endpoint: '/bbps/fetch_plans', method: 'POST'},
  retailerValidation: {endpoint: '/bbps/retailer_validation', method: 'POST'},
  viewBill: {endpoint: '/bbps/view_bill', method: 'POST'},
  bbpsRecharge: {endpoint: '/bbps/initiate-bbps-transaction/', method: 'POST'},
  getSellerDetails: {
    endpoint: '/merchant/get-seller-values/',
    method: 'POST',
  },
  saveSellerBankDetails: {
    endpoint: '/merchant/save-seller-bank-details',
    method: 'POST',
  },
  sendUserIPAddress: {
    endpoint: '/merchant/update-merchant-location',
    method: 'POST',
  },
  generateSellerInvoice: {
    endpoint: '/invoice/generate-seller-invoice',
    method: 'POST',
  },
  checkUserAccess: {
    endpoint: '/merchant/check-user-access',
    method: 'POST',
  },
  getMerchantConfigFromCDN: {
    endpoint:
      'https://storage.googleapis.com/default_value/default_values.json',
    method: 'GET',
  },
  notifyAboutNewSeller: {
    endpoint:
      'https://tatatele.superpe.in/backend/v2/tatatele/call-seller-to-onboard-to-app/<paymentId>',
    method: 'POST',
  },
  clickToCall: {
    endpoint:
      'https://tatatele.superpe.in/backend/v2/tatatele/initiate-tatatele-call/',
    method: 'POST',
  },
  refundPayment: {
    endpoint: '/risk-engine/refund-payment/<payment_id>',
    method: 'POST',
  },
  getCardRewards: {
    endpoint: '/merchant/get-cards-rewards/<merchant_id>',
    method: 'GET',
  },
};

export type APIEndpointsType = keyof typeof APIBaseConfig;
