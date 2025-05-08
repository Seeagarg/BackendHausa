const pool = require('../../config.js/db')
const { default: axios } = require("axios");

module.exports={

    checkUserSubscription: (msisdn, callback) => {
        const checkActiveUser = process.env.checkActiveUser
          .replace("<ani>", msisdn)
          .replace("<service_type>", process.env.SERVICE_NAME_gameofyy);
      
        pool.query(`${checkActiveUser}`, [], (err, result) => {
          if (err) return callback(err);
    
          return callback("", result);
        });
      },
}