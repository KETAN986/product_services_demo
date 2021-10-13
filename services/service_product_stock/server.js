const express = require('express')
const app = express()
app.use(require('body-parser').urlencoded({limit:'20mb' ,extended:true}))
app.use(express.json({limit:'20mb'}))


app.listen(process.env.PORT || 6002)

app.use(require('cors')())

const fs = require('fs')


app.use('/',require('./controllers/main.js'))

     
app.use(async (data,req,res,next)=>{
	if(res.statusCode==500){
		return res.send(data.message ?? data.msg)
	}
	else{
		return res.send(data)
	}
})

