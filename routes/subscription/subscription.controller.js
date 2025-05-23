const { checkUserSubscription } = require('../subscription/subscription.services');

module.exports = {
    getUserSubscriptionStatus: (req, res) => {
        const msisdn = req.params.msisdn;
        checkUserSubscription(msisdn, (err, result) => {
            if (err) {
                res.status(500).send({ error: 'Internal Server Error' });
            } else {
                if (result && result.length > 0) {
                   
                    res.status(200).send({ status: 1 });
                } else {
                    res.status(200).send({ status: 0 });
                }
            }
        });
    }
};
