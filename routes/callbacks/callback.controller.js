const {
  insertIntoCallback,
  checkUserExists,
  insertBillingSuccess,
  insertSubscriptionEntry,
  insertBillingSuccessSub,
  sendPromotionExistNumberHit,
  unsubscribeUser
} = require("./callback.services");

module.exports = {
  callbackNotify: (req, res) => {
    let typeEvent = "SUB";
    console.log("body ", req.body);
    const { MSISDN: msisdn } = req.body;
    insertIntoCallback(req.body, (err, result) => {
      if (err)
        return res
          .status(400)
          .json({ result: 0, message: "Some thing went wrong", err });
      // return res.send("success");

   

      checkUserExists(msisdn, (errSub, resultSub) => {
        if (errSub)
          return res
            .status(400)
            .json({ result: 0, message: "Some thing went wrong", errSub });
            
         

        const ifExist = resultSub.length;
        console.log("User exist ", ifExist);

        if (ifExist > 0 && req.body.Action === "SUBSCRIBE") {
          return res.status(400).json({ result: 0, message: "User already exists" });
        }
        if (req.body.Action === "RENEW" && req.body.SubscriptionStatus === "SUSPENDED") {
          console.log("Cannot renew due to low balance")
          return res.status(400).json({
            result: 0, 
            message: "Cannot renew due to low balance"
          });
        }
        if (ifExist > 0 && req.body.Action === "UNSUBSCRIBE") {
          // Handle the UNSUBSCRIBE action
          unsubscribeUser(req.body, (errUnsub, resultUnsub) => {
            if (errUnsub)
              return res
                .status(400)
                .json({ result: 0, message: "Unsubscription failed", errUnsub });
            return res.json({ result: 1, message: "Unsubscription successful" });
          }
          )
         
        }
      
        if (
          req.body.Action === "RENEW" &&
          req.body.SubscriptionStatus === "ACTIVE"
        ) {
          typeEvent = "REN";
          insertBillingSuccess(
            req.body,
            typeEvent,
            (errSuccess, resultSuccess) => {
              if (errSuccess)
                return res.status(400).json({
                  result: 0,
                  message: "Some thing went wrong",
                  errSuccess,
                });
              if (ifExist.length <= 0) {
                insertSubscriptionEntry(req.body, (err, result) => {
                  if (err)
                    return res.status(400).json({
                      result: 0,
                      message: "Some thing went wrong",
                      err,
                    });
                });
              }
              return res.send("success");
            }
          );
        }
        
        
        else {
          console.log(" IN new user Flow==>>>");


          if (req.body.Action === "SUBSCRIBE") {
         
            typeEvent = "SUB";
            insertSubscriptionEntry(req.body, typeEvent,(err, result) => {
              if (err)
                return res
                  .status(400)
                  .json({ result: 0, message: "Some thing went wrong", err });

              insertBillingSuccessSub(
                req.body,
                typeEvent,
                (errBilling, resultBilling) => {
                  if (errBilling)
                    return res.status(400).json({
                      result: 0,
                      message: "Some thing went wrong",
                      errBilling,
                    });

                 
                    sendPromotionExistNumberHit(
                      req.body.MSISDN,
                      req.body.TransactionId,
                      55,
                      (err, promoCallback) => {
                        return res.send("success");
                      }
                    );
                }
              );
            });
          }
        }
      });
      
      
      
    });
  },
};
