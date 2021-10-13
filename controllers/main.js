const api = require('express').Router()
const { default: axios } = require('axios')
const logger = require('winston')
const jwt = require('jsonwebtoken')

module.exports = api






async function verify_req(req,res,next){


    let token = req.headers.authorization 
    try{
        var decoded = jwt.verify(token,'test_demo')
        req.header_data = decoded
    }
    catch(e){
        logger.log('error','verifytoken ' +e.message)
        return res.status(401).send('Unauthorized access')
    }
    
    next()
}

api.use(verify_req)


api.get('/',async (req,res,next)=>{try{
    return res.send('ok')
    }catch(err){res.status(500);next(err)}
})




api.get('/fetch_product',async (req,res,next)=>{try{
    console.log('api hit')

    let options = {
        headers: {authorization:req.headers.authorization}
    }
    let stock = axios.get('http://localhost:6002/',options)
    let price = axios.get('http://localhost:6003/',options)
    let products = axios.get('http://localhost:6004/',options)

    Promise.all([stock,price,products]).then((data)=>{
        let stock = data[0].data.data
        let price = data[1].data.data
        let products = data[2].data.data

        let return_products =  products.map(ele=>{
            let ret = {}
            price.forEach(element => {
                if(element.product_sku == ele.product_sku){
                    ret = {...element,...ele}
                }
            });
            stock.forEach(element => {
                if(element.product_sku == ele.product_sku){
                    ret = {...element,...ret}
                }
            });

            return ret
        })


        return res.send({
            data:return_products,
            status:0,
            msg:'success'
        })
        
    })


    }catch(err){res.status(500);next(err)}
})


api.post('/buy',async (req,res,next)=>{try{
   
    console.log(req.body)
    let config = {
        method:'POST',
        url:'http://localhost:6002/buy',
        data:req.body,
        headers: {authorization:req.headers.authorization}
    }
    let resp = await axios(config)

    return res.send(resp.data)
    }catch(err){res.status(500);next(err)}
})