const api = require('express').Router()

module.exports = api

const {fetch} = require('../model.js')
const jwt = require('jsonwebtoken')



async function verify_req(req,res,next){


    let token = req.headers.authorization 
    try{
        var decoded = jwt.verify(token,'test_demo')
        req.header_data = decoded
    }
    catch(e){
        return res.status(401).send('Unauthorized access')
    }
    
    next()
}

api.use(verify_req)

api.get('/',async (req,res,next)=>{try{

    let fields = 'product_sku,price_inr,price_usd'


    let data = await fetch(fields,'product_stock',{})

    let resp = {
        data:data,
        status:0,
        msg:'success'
    }
    return res.send(resp)
    }catch(err){res.status(500);next(err)}
})
