const express=require("express");
const app=express();

const {connectToMongoDB}=require('./connect')
const URL=require('./model/url');
const urlRoute=require('./routes/url');
app.use(express.json())
app.use('/url',urlRoute);
app.get('/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{ 
            timestamp:Date.now(),
        },
    }});
    res.redirect(entry.redirectURL);

})


connectToMongoDB("mongodb+srv://127.0.0.1/short-url").then(()=>console.log('mongoDb connected'))
app.listen(8001);
