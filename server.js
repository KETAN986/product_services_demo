const express = require('express')
const app = express()
app.use(require('body-parser').urlencoded({limit:'20mb' ,extended:true}))
app.use(express.json({limit:'20mb'}))

app.listen(process.env.PORT || 6001)

app.use(require('cors')())
app.use(express.static('htmls'))

const {swaggerDoc,logger} = require("./load.js");
const jwt = require('jsonwebtoken')

swaggerDoc(app);

app.use((req,_,next)=>{
	logger.log({level: 'info',api:req.originalUrl,ip:req.ip});
	next()
})



app.post('/authenticate',async (req,res,next)=>{try{
	console.log('aya')
    let key = 'aweoriqpuoweiurqpowieituqoiwrets'
    let passkey = req.body.passkey
	console.log(req.body)
    if(key==passkey){
		console.log('here')
        let token = jwt.sign({data:'test'},'test_demo')
        return res.send({status:0,msg:'Success',token:token})
    }
    return res.send({status:1,msg:'Wrong Passkey'})
    }catch(err){res.status(500);next(err)}
})

app.use('/',require('./controllers/main.js'))

     
app.use(async (data,req,res,next)=>{
	if(res.statusCode==500){
		logger.log('error',data)
		return res.send(data.message ?? data.msg)
	}
	else{
		return res.send(data)
	}
})

