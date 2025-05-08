const { getVideos } = require("./Content.service")

module.exports={
    GetAllVideos:(req,res)=>{
        getVideos((err,result)=>{
            if(err){
                return res.status(500).json({err:err,message:'INTERNAL SERVER ERROR'})
            }
            else{
                return res.json({result:result})
            }
        })
    }
}