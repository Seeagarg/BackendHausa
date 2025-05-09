const {connection} = require('../config.js/db');

module.exports = {
  getVideos: (req, res) => {
    const queryy = 'SELECT * FROM tbl_videos';
 
    if (!connection) {
      res.status(500).json({ error: 'Database connection is not established.' });
      return;
    }
    
    connection.query(queryy, (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        res.status(500).json({ error: 'Error fetching data from the database' });
      } else {
        res.json(results);
      }
    });
  },
  

  getImages: (req, res) => {
    const queryy = 'SELECT imageFiveUrl FROM tbl_videos ORDER BY RAND() LIMIT 10';
    connection.query(queryy, (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        res.status(500).json({ error: 'Error fetching data from the database' });
      } else {
        res.json(results);
      }
    });
  },

  getSingleVideo: (req, res) => {
    const id=req.params.id
    console.log("id",id)
    const queryy = 'SELECT * FROM tbl_videos WHERE id=?';
    connection.query(queryy,id, (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        res.status(500).json({ error: 'Error fetching data from the database' });
      } else {
        res.json(results);
      }
    });
  },

  getRandomVideo: (req, res) => {
   
    const queryy = 'SELECT * FROM tbl_videos ORDER BY RAND() LIMIT 10';
    connection.query(queryy, (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        res.status(500).json({ error: 'Error fetching data from the database' });
      } else {
        res.json(results);
      }
    });
  },


  searchVideos:(req,res)=>{
    const keyword = req.query.keyword;
  console.log("keyword",keyword)
    if (!keyword) {
      return res.status(400).send('Keyword is required');
    }
  
    const query = 'SELECT * FROM tbl_videos WHERE name LIKE ?';
    connection.query(query, [`%${keyword}%`], (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        return res.status(500).json({ error: 'Error fetching data from the database' });
      }
      res.json(results);
    });
  }

};

