const { addToWatchlist ,getWatchlist} = require('./userAction.services');

module.exports = {
    addVideoToWatchlist: (req, res) => {

        const videoData = {
            videoid: req.body.videoid,
            ani: req.body.ani,
            videoUrl: req.body.videoUrl,
            thumbnail: req.body.thumbnail,
            name: req.body.name
        };
      
        addToWatchlist(videoData, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ error: 'Internal Server Error' });
            }
            res.status(200).send({ message: 'Video added to watchlist successfully' });
        });

    },

    getWatchlistForUser: (req, res) => {
        const ani = req.params.ani; 
        getWatchlist(ani, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ error: 'Internal Server Error' });
            }
            res.status(200).send({ message: 'Watchlist fetched successfully', data: result });
        });
    },
    
}
