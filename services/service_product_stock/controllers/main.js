const api = require('express').Router()

module.exports = api

const {fetch, update, fetch_row} = require('../model.js')
const jwt = require('jsonwebtoken')



async function verify_req(req,res,next){

    let token = req.headers.authorization 
    // try{
    //     var decoded = jwt.verify(token,'test')
    //     req.header_data = decoded
    // }
    // catch(e){
    //     return res.status(401).send('Unauthorized access')
    // }
    
    next()
}

api.use(verify_req)

api.get('/',async (req,res,next)=>{try{

    let fields = 'product_sku,india_available,india_purchased,usa_available,usa_purchased,total_available_stock,total_purchased'


    let data = await fetch(fields,'product_stock',{})

    let resp = {
        data:data,
        status:0,
        msg:'success'
    }
    return res.send(resp)
    }catch(err){res.status(500);next(err)}
})


api.post('/buy',async (req,res,next)=>{try{
    const {product_sku,country} = req.body

    let row = await fetch_row('*','product_stock',{product_sku})
    let set = {}


    let error = {
        status:1,
        msg:'Out of Stock',
    }
    
    
    if(country=='india'){
        if(row.india_available==0){
            return res.send(error)
        }
        
        set['india_purchased'] = row.india_purchased +1
        set['india_available'] = row.india_available -1
    }
    else{
        if(row.usa_available==0){
            return res.send(error)
        }
        set['usa_purchased'] = row.usa_purchased +1
        set['usa_available'] = row.usa_available -1
    }

    set['total_purchased'] = row.total_purchased +1
    set['total_available_stock'] = row.total_available_stock -1

    await update(set,'product_stock',{product_sku})

    return res.send({
        status:0,
        msg:'success',
    })

    }catch(err){res.status(500);next(err)}
})