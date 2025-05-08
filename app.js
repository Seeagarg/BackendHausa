const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

var callbackRouter = require("./routes/callbacks/callback.router");
var activeUserRouter=require('./routes/subscription/subscription.router')
var addWatchlist=require('./routes/userAction/userAction.router')
const VideoRouter = require('./routes/ContentRouter/Content.route')
const app = express();
const port = process.env.PORT || 5631; 

app.use(bodyParser.json());
app.use(cors());

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api',VideoRouter)

app.use('/', apiRoutes);
// app.use("/callback", callbackRouter);
// app.use('/checkuser',activeUserRouter)
// app.use('/watchlist',addWatchlist)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
