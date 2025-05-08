const {getUserSubscriptionStatus} =require('../subscription/subscription.controller')

const router = require("express").Router();

router.get("/:msisdn", getUserSubscriptionStatus);
module.exports = router;



