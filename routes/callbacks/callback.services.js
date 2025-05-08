const pool = require('../../config.js/db')
const { default: axios } = require("axios");

module.exports = {
  
  insertIntoCallback: (data, callback) => {
    const {
      MSISDN: msisdn,
      Action: action,
      SubscriptionStatus,
      OperatorName: operatorName,
      Price,
      Currency: currency,
      channel,
    
      ProductCode: productCode,
      SubscriptionId,
      TransactionId,
    } = data;
  

    
    const insertCallbackLogs = process.env.insertCallbackLogs
      .replace("<msisdn>", msisdn)
      .replace("<action>", action)
      .replace("<SubscriptionStatus>", SubscriptionStatus)
      .replace("<operatorName>", operatorName)
      .replace("<Price>", Price)
      .replace("<currency>", currency)
      .replace("<channel>", channel)
      .replace("<productCode>", productCode)
      .replace("<SubscriptionId>", SubscriptionId)
      .replace("<TransactionId>", TransactionId);
  
    console.log("insertCallbackLogs ", insertCallbackLogs);
  
    pool.query(`${insertCallbackLogs}`, [], (err, result) => {
      if (err) return callback(err);
      else return callback("", "Success");
    });
  },
  
  
  

  
  checkUserExists: (msisdn, callback) => {
    const checkIfUserExist = process.env.checkUserExist
      .replace("<ani>", msisdn)
      .replace("<service_type>", process.env.SERVICE_NAME_gameofyy);
    console.log("checkIfUserExist", checkIfUserExist);
    pool.query(`${checkIfUserExist}`, [], (err, result) => {
      if (err) return callback(err);

      return callback("", result);
    });
  },

  insertBillingSuccessSub: (data, typeEvent, callback) => {
    const {
      MSISDN: msisdn,
      Action: action,
      SubscriptionStatus,
      OperatorName: operatorName,
      Price,
      Currency: currency,
      channel,
      ValidUntil,
      ProductCode: productCode,
      SubscriptionId,
      TransactionId,
    } = data;

    //  ,','<deducted_amount>','<type_event>')

    if (SubscriptionStatus !== "SUSPENDED") {
      const insertIntoTblBillingSuccess =
        process.env.insertIntoTblBillingSuccess
          .replace("<ani>", msisdn)
          .replace("<channel>", channel)
          .replace("<TransactionId>", TransactionId)
          .replace("<deducted_amount>", Price)
          .replace("<type_event>", typeEvent);
      console.log("insertIntoTblBillingSuccess ", insertIntoTblBillingSuccess);

      // console.log("updateTblSubscription", updateTblSubscription);

      pool.query(`${insertIntoTblBillingSuccess}`, [], (errSub, result) => {
        if (errSub) return callback(errSub);
        return callback("", "Success");
      });
    } else {
      console.log("SUSPENDED");
      return callback("", "Failed as low balance");
    }
  },

  // sendPromotionExistNumberHit: async (requestBody, callback) => {
  //   const url = process.env.forwardSubPromotion;

  //   console.log("url ", url);
  //   console.log("requestBody ", requestBody);

  //   try {
  //     const response = await axios.post(url, requestBody);
  //     console.log("RESPONSE ", response.data);
  //     return callback("", response.data);
  //   } catch (err) {
  //     console.log("err.response ", err.response.data);
  //     return callback(err.response.data);
  //   }
  // },

  sendPromotionExistNumberHit: async (ani, clickId, serviceId, callback) => {
    const url = process.env.forwardSubPromotion
      .replace("<ANI>", ani)
      .replace("<EXT_REF>", clickId)
      .replace("<SERVICE_ID>", serviceId);

    console.log("url ", url);

    // logger.setLogData(url);
    // logger.info(url);
    try {
      const response = await axios.get(url);
      console.log("RESPONSE ", response.data);
      return callback("", response.data);
    } catch (err) {
      console.log("err.response ", err.response.data);
      return callback(err.response.data);
    }
  },


  insertBillingSuccess: (data, typeEvent, callback) => {
    const {
      MSISDN: msisdn,
      Action: action,
      SubscriptionStatus,
      OperatorName: operatorName,
      Price,
      Currency: currency,
      channel,
      ValidUntil,
      ProductCode: productCode,
      SubscriptionId,
      TransactionId,
    } = data;

    //  ,','<deducted_amount>','<type_event>')k

    const insertIntoTblBillingSuccess = process.env.insertIntoTblBillingSuccess
      .replace("<ani>", msisdn)
      .replace("<channel>", channel)
      .replace("<TransactionId>", TransactionId)
      .replace("<deducted_amount>", Price)
      .replace("<type_event>", typeEvent);
    console.log("insertIntoTblBillingSuccess ", insertIntoTblBillingSuccess);

    const updateTblSubscription = process.env.updateTblSubscription
      .replace("<ani>", msisdn)
      .replace("<service_type>", process.env.SERVICE_NAME_gameofyy)
      .replace("<next_billed_date>",ValidUntil);
    console.log("updateTblSubscription", updateTblSubscription);

    pool.query(`${updateTblSubscription}`, [], (errSub, result) => {
      if (errSub) return callback(errSub);

      pool.query(`${insertIntoTblBillingSuccess}`, [], (err, result) => {
        if (err) return callback(err);

        return callback("", "SUccess");
      });
    });
  },
  insertSubscriptionEntry: (data, type_event,callback) => {
    const {
      MSISDN: msisdn,
      Action: action,
      SubscriptionStatus,
      OperatorName: operatorName,
      Price,
      Currency: currency,
      channel = "WEB",
      ValidUntil,
      ProductCode: productCode,
      SubscriptionId,
      TransactionId,
    } = data;

    console.log("data===================",data)
    const insertTblSubscription = process.env.insertTblSubscription
      .replace("<ani>", msisdn)
      .replace("<action>", action)
      .replace("<SubscriptionStatus>", SubscriptionStatus)
      .replace("<OperatorName>", operatorName)
      .replace("<defaultAmount>", Price)
      .replace("<pack_type>", "daily")
      .replace("<service_type>", process.env.SERVICE_NAME_gameofyy)
      .replace("<next_billed_date>",ValidUntil)
      .replace("<SubscriptionId>", SubscriptionId)
      .replace("<m_act>", channel)
      .replace("<type_event>", type_event);;
    console.log("insertTblSubscription", insertTblSubscription);

    pool.query(`${insertTblSubscription}`, [], (err, result) => {
      if (err) return callback(err);

      return callback("", "Success");
    });
  },
  unsubscribeUser: (data, callback) => {
    const { MSISDN: msisdn, TransactionId, SubscriptionId, OperatorName, Action, channel } = data;

    const insertTblSubscriptionUNsub = process.env.insertTblSubscriptionUNsub
      .replace("<ani>", msisdn)
      .replace("<TransactionId>", TransactionId)
      .replace("<SubscriptionId>", SubscriptionId)
      .replace("<OperatorName>", OperatorName)
      .replace("<Action>", Action)
      .replace("<channel>", channel);

    console.log("insertTblSubscriptionUNsub", insertTblSubscriptionUNsub);

    const deleteTblSubscription = process.env.deleteTblSubscription
      .replace("<ani>", msisdn);

    console.log("deleteTblSubscription", deleteTblSubscription);

    // Insert into tbl_unsub
    pool.query(`${insertTblSubscriptionUNsub}`, [], (errUnsub, resultUnsub) => {
      if (errUnsub) return callback(errUnsub);

      // Delete from tbl_subscription
      pool.query(`${deleteTblSubscription}`, [], (errDelete, resultDelete) => {
        if (errDelete) return callback(errDelete);

        return callback("", "Unsubscription successful");
      });
    });
  },

};
