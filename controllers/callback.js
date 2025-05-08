    const connection = require('../config.js/db');

    module.exports = {
    callback: (req, res) => {
        const data = req.body;
        console.log("Received data:", data);
 
        res.status(200).json({ message: 'Success', data: data });
        
    },
    };

