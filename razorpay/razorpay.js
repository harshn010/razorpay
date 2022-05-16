var razorpay=require('razorpay');
var instance = new razorpay({
    key_id: 'rzp_test_Qur3KUufP6038b',
    key_secret: '86cxPXZbS771MfiDj1oNzzAn',
  });
  console.log("razorPay running..")
  module.exports = instance;