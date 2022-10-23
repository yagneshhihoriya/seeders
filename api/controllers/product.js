const productModel = require('../../models').product
const categoryModel = require('../../models').category
const pagination = require('../../utils/pagination')

exports.add = async (req,res,next) =>{
    const {name,category,description,price,quantity} = req.body
    const productExist = await productModel.findOne({where:{
        name
    }})
    if(!productExist){
        const categoryData = await categoryModel.findOne({where:{
            id:category
        }})
        if(categoryData){
            const addproduct = await productModel.create({
                name,
                category,
                description,
                price,
                quantity
            })
            return res.status(200).json({
                success:true,
                message:"New Catgory Added ...!",
                data:addproduct
            })
        }else{
            return res.status(404).json({
                success:false,
                message:"Category Id Not Exist"
            })
        }
    }
    return res.status(404).json({
        success:false,
        message:"Product Already Exist"
    })
}

exports.addQuantity = async (req,res,next) =>{
    const { id } = req.params
    const {quantity} = req.body
    const productData = await productModel.findOne({where:{id}})
    if(productData){
        productData.quantity += quantity
        const data = await productData.save();
        return res.status(200).json({
            success:true,
            message:"Product Added",
            data
        })
    }
    return res.status(404).json({
        success:false,
        message:"Error While Added Quanity or Product Not Found"
    })
}

exports.get =async (req,res,next) =>{
    let searchObj = {
        where:{}
    }
    searchObj = pagination(searchObj,req.query)
    const {name,category,description,price,quantity} = req.body
    if(name) searchObj.where['name'] = name
    if(category) searchObj.where['category'] = category
    if(price) searchObj.where['price'] = price
    if(quantity) searchObj.where['quantity'] = quantity
    
    const productData = await productModel.findAll(searchObj)
    if(productData && productData.length){
        return res.status(200).json({
            success:true,
            data:productData
        })
    }
    return res.status(404).json({
        success:false,
        message:"Data Not Found"
    })
}

exports.update =async (req,res,next) =>{
    const { id } = req.params
    const {name,category,description,price,quantity} = req.body
    const productData = await productModel.findOne({where:{id}})
    if(productData){
        if(name) productData.name = name
        if(category) productData.category = category
        if(price) productData.price = price
        if(quantity) productData.quantity = quantity
        if(description) productData.description = description

        const data = await productData.save()

        return res.status(200).json({
            success:true,
            message:"Quanity Added",
            data
        })
    }
    return res.status(404).json({
        success:false,
        message:"Product Not Found"
    })
}

exports.delete = async(req,res,next) =>{
    const {id} = req.params
    const productData = await productModel.findOne({where:{id}})
    if(productData){
        await productModel.destroy({
            where:{
                id
            }
        })
        return res.status(200).json({
            success:true,
            message:"Product Deleted"
        })
    }
    return res.status(404).json({
        success:false,
        message:'Product Data not Found'
    })
}

exports.getById =async (req,res,next) =>{
    const {id} = req.params
    const productData = await productModel.findOne({where:{id}})
    if(productData){
        return res.status(200).json({
            success:true,
            data:productData
        })
    }
    return res.status(404).json({
        success:false,
        message:'Product Data not Found'
    })
}