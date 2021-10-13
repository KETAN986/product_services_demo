const express = require('express')
const app = express()
app.use(require('body-parser').urlencoded({limit:'20mb' ,extended:true}))
app.use(express.json({limit:'20mb'}))

app.listen(process.env.PORT || 6001)

app.use(require('cors')())
app.use(express.static('htmls'))

const {swaggerDoc,logger} = require("./load.js");

swaggerDoc(app);

app.use((req,_,next)=>{
	logger.log({level: 'info',api:req.originalUrl,ip:req.ip});
	next()
})


app.get('/test',async (req,res)=>{ 
    res.send('ok')
})
app.post('/',(req,res)=>{
    res.send('okk')
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

