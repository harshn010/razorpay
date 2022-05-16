var express = require('express');
var router = express.Router();
var razorPay = require('../razorpay/razorpay')
var crypto = require('crypto')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/gt',function(req,res, next){
const amt=req.body.amt
console.log(amt)
var options = {
  amount: amt*100, // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11"
};
razorPay.orders.create(options, function(err, order) {
  if(err){
    console.log(err)
  }else{
    console.log(order);
    res.render('chckout',{order})
  }
  
});
})
router.post('/varify',function(req,res){
  const data =req.body
  console.log(data)
  const order_id = data['response[razorpay_order_id]'];
  const payment_id = data['response[razorpay_payment_id]'];
  const  razorpay_signature=data['response[razorpay_signature]'];
  const key_secret = '86cxPXZbS771MfiDj1oNzzAn'; 
  let hmac = crypto.createHmac('sha256', key_secret); 
  hmac.update(order_id + "|" + payment_id);
  const generated_signature = hmac.digest('hex');
      
      
    if(razorpay_signature===generated_signature){
        console.log("success")
    }
    else
   console.log("failed")

})
module.exports = router;
