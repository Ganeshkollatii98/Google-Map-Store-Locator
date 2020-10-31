const express=require('express')
const mongoose = require('mongoose');
const Store= require('./api/models/store')
const axios=require('axios')
const app=express()
const port=3000;

mongoose.connect('mongodb+srv://Ganesh1998:Gani1998@cluster0.8qvgj.mongodb.net/<dbname>?retryWrites=true&w=majority', 
            {useNewUrlParser: true
            ,
            useUnifiedTopology: true,
        useCreateIndex:true
     });



app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin',"*");
    next();
})


app.use(express.json({limit:'50mb'}));

app.post('/api/stores', (req, res)=>{
    var dbStores=[]
    var stores=req.body;
    stores.forEach((store)=>{
        dbStores.push({
            storeName:store.name,
            phoneNumber:store.phoneNumber,
            address:store.address,
            openStatusText:store.openStatusText,
            addressLines:store.addressLines,
            location:{
                type:'Point',
                coordinates:[
                    store.coordinates.longitude,
                    store.coordinates.latitude
                ]
            }
        })
    })
    Store.create(dbStores,(err,st)=>{
        if(err)
        {
            res.status(500).send(err);
        }
        else{
            res.status(200).send(st);
        }
    })
})
app.get('/api/stores',(req,res)=>{
    const zipCode=req.query.zip_code;
    const GoogleMapsUrl="http://maps.googleapis.com/maps/api/geocode/json"
    axios.get(GoogleMapsUrl,{
        params:{     
            address:zipCode,
            key:"AIzaSyDsq_AIwGkug5pPBefBNRhuMa2txGhy4Zw"
        }
    }).then((responce)=>{
        const data =responce.data;
        const coordinates =[
            data.results[0].geometry.location.lng,
            data.results[1].gementry.location.lng
        ]
        // Store.find({
        //     location:{
        //         $near:{
        //             $maxDistance:3218,
        //             #geometry:{
        //                 type:"Point",
        //                 coordinates:coordinates
        //             }
        //         }
        //     }
        // },(err,stores)=>{
        //     if(err)
        //     {
        //         res.status(500).send(err);
        //     }
        //     else{
        //         res.status(200).send(stores);
        //     }
        // })
    }).catch((error)=>{
        console.log(error);
    })
    Store.find({},(err,stores)=>{
        if(err)
        {
            res.status(500).send(err);
        }
        else{
            res.status(200).send(stores);
        }
    })
})

app.delete('/api/stores',(req,res)=>{
    Store.deleteMany({},(err)=>{
        res.status(200).send(err);
        
    })

})

app.listen(port,()=>console.log(`App is listening ot  http://localhost:${port}`))