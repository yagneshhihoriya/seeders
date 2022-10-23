const express = require('express')
const server = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000
const useCluster = process.env.useCluster || false
const {errorHandler} = require('../utils/error')
const router = require('../app')
const logger = require('morgan')
const dbCon = require('../utils/databaseCon')

dbCon()
server.use(logger('dev'))
server.use(express.json())
server.use('/',router)
server.use('*',(req,res)=>{
    return res.json({
        success:false,
        message:"Route Not Exist"
    })
})
server.use(errorHandler)

const MAIN_SERVER =()=>{
    server.listen(PORT,()=>{
        console.log(`Server listening on ${PORT} at process ${process.pid}`)
    })
}
const CLUSTER = (callback) =>{
    const cluster = require('cluster')
    const {cpus} = require('os')
    const numCPUs = cpus().length
    if(cluster.isMaster){
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    }else{
        callback()
    }
}
if(useCluster){
    CLUSTER(MAIN_SERVER)
}else{
    MAIN_SERVER()
}