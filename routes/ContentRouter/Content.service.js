// const connection2 = require("../../db")

const { connection2 } = require("../../config.js/db")

module.exports={
    getVideos:(callback)=>{
        const get_query = process.env.GET_VIDEOS_API

        connection2.query(get_query,[],(err,result)=>{
            if(err){
                return callback(err)
            }
            else{
                return callback('',result)
            }
        })
    }
}