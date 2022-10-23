const personModel = require('../../models').person
const {genHash , compareHash} = require('../../utils/bcrypt')
const {genToken} = require('../../utils/jwt')
const pagination = require('../../utils/pagination')

exports.add = async(req,res,next) =>{
    const {name,address,phone,password} = req.body
    let isAdmin = (req.routeName == 'admin') ? true : false 
    const personData = await personModel.findOne({where:{
        name
    }})
    if(!personData){
        const hashPassword = await genHash(password)
        const addPerson = await personModel.create({
            name,
            address,
            phone,
            isAdmin,
            password:hashPassword
        })
        return res.status(200).json({
            success:true,
            message:"New Person Added ...!",
            data:addPerson
        })
    }
    return res.status(404).json({
        success:false,
        message:"Person Already Exist"
    })
}

exports.get =async (req,res,next) =>{
    let adminRoute = (req.routeName == 'admin') ? true : false
    let searchObj = {
        where:{}
    }
    searchObj = pagination(searchObj,req.query)
    searchObj.where.isAdmin = adminRoute
    const {name} = req.body
    if(name) searchObj.where['name'] = name
    const personData = await personModel.findAll(searchObj)
    if(personData && personData.length){
        return res.status(200).json({
            success:true,
            data:personData
        })
    }
    return res.status(404).json({
        success:false,
        message:"Data Not Found"
    })
}

exports.update =async (req,res,next) =>{
    const { id } = req.params
    const searchObj = {id:id}
    let adminRoute = (req.routeName == 'admin') ? true : false
    searchObj.isAdmin = adminRoute
    const {name,address,phone,isAdmin} = req.body
    const personData = await personModel.findOne({where:searchObj})
    if(personData){
        if(name) personData.name = name
        if(address) personData.address = address
        if(phone) personData.phone = phone
        if(isAdmin || isAdmin === false) personData.isAdmin = isAdmin

        const data = await personData.save()

        return res.status(200).json({
            success:true,
            message:"Person updated",
            data
        })
    }
    return res.status(404).json({
        success:false,
        message:"Person Not Found"
    })
}

exports.delete = async(req,res,next) =>{
    const {id} = req.params
    const searchObj = {id:id}
    let adminRoute = (req.routeName == 'admin') ? true : false
    searchObj.isAdmin = adminRoute
    const personData = await personModel.findOne({where:searchObj})
    if(personData){
        await personModel.destroy({
            where:searchObj
        })
        return res.status(200).json({
            success:true,
            message:"person Deleted"
        })
    }
    return res.status(404).json({
        success:false,
        message:'person Data not Found'
    })
}

exports.getById = async(req,res,next) =>{
    const {id} = req.params
    const searchObj = {id:id}
    let adminRoute = (req.routeName == 'admin') ? true : false
    searchObj.isAdmin = adminRoute
    const personData = await personModel.findOne({where:searchObj})
    if(personData){
        return res.status(200).json({
            success:true,
            data:personData
        })
    }
    return res.status(404).json({
        success:false,
        message:'person Data not Found'
    })
}

exports.login = async(req,res,next) =>{
    const {name,password} = req.body
    const customerData = await personModel.findOne({where:{
        name
    }})
    if(!customerData && !(customerData?.dataValues)) {return res.status(404).json({success:false,message:"Invalid Name and Password"})}
    if(await compareHash(password,customerData.dataValues.password)){
        delete await customerData.dataValues.password
        const token = await genToken(customerData.dataValues)
        return res.status(200).json({
            success:true,
            message:"Login Successfull",
            token
        })
    }
    return res.status(404).json({
        success:false,
        message:"Invalid Name and Password"
    })
}
