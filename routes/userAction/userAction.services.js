const pool = require('../../config.js/db')

module.exports={
    addToWatchlist: (videoData, callback) => {
       
        const { videoid, ani, videoUrl, thumbnail, name } = videoData;
        const insertQuery = process.env.insertIntoTableWatchlist
            .replace("<videoid>", videoid)
            .replace("<ani>", ani)
            .replace("<videoUrl>", videoUrl)
            .replace("<thumbnail>", thumbnail)
            .replace("<name>", name);
            pool.query(insertQuery, (err, result) => {
           if (err) return callback(err);

            return callback(null, result);
        });
    },

    getWatchlist: (ani, callback) => {
        const getWatchlistQuery = process.env.getWatchlist.replace("<ani>", ani);
        pool.query(getWatchlistQuery, (err, result) => {
            if (err) return callback(err);

            return callback(null, result);
        });
    },
    
  
  
}