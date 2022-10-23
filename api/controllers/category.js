const categoryModel = require('../../models').category
const pagination = require('../../utils/pagination')
exports.add = async (req,res,next) =>{
    const {name,description} = req.body
    const categoryData = await categoryModel.findOne({where:{
        name
    }})
    if(!categoryData){
        const addcategory = await categoryModel.create({
            name,
            description
        })
        return res.status(200).json({
            success:true,
            message:"New Category Added ...!",
            data:addcategory
        })
    }
    return res.status(404).json({
        success:false,
        message:"Category Already Exist"
    })
}

exports.get =async (req,res,next) =>{
    let searchObj = {
        where:{}
    }
    searchObj = pagination(searchObj,req.query)
    const {name} = req.body
    if(name) searchObj.where['name'] = name
    const categoryData = await categoryModel.findAll(searchObj)
    if(categoryData && categoryData.length){
        return res.status(200).json({
            success:true,
            data:categoryData
        })
    }
    return res.status(404).json({
        success:false,
        message:"Data Not Found"
    })
}

exports.update =async (req,res,next) =>{
    const { id } = req.params
    const {name,description} = req.body
    const categoryData = await categoryModel.findOne({where:{id}})
    if(categoryData){
        if(name) categoryData.name = name
        if(description) categoryData.description = description

        const data = await categoryData.save()

        return res.status(200).json({
            success:true,
            message:"Catgeory Updated",
            data
        })
    }
    return res.status(404).json({
        success:false,
        message:"Category Not Found"
    })
}

exports.delete = async(req,res,next) =>{
    const {id} = req.params
    const categoryData = await categoryModel.findOne({where:{id}})
    if(categoryData){
        await categoryModel.destroy({
            where:{
                id
            }
        })
        return res.status(200).json({
            success:true,
            message:"Category Deleted"
        })
    }
    return res.status(404).json({
        success:false,
        message:'Category Data not Found'
    })
}

exports.getById =async (req,res,next) =>{
    const {id} = req.params
    const categoryData = await categoryModel.findOne({where:{id}})
    if(categoryData){
        return res.status(200).json({
            success:true,
            data:categoryData
        })
    }
    return res.status(404).json({
        success:false,
        message:'Category Data not Found'
    })
}