const orderModel = require('../../models').order
const orderDetailModel = require('../../models').orderdetail
const productModel = require('../../models').product
const db = require('../../models')
const pagination = require('../../utils/pagination')

exports.add = async (req, res, next) => {
    let { customerId, paymentStatus, productDetails } = req.body
    customerId = (customerId) ? customerId : req.decoded.id
    const orderByAdmin = (req.isAdmin) ? true : false
    if (paymentStatus && !(['success', 'pending', 'cancelled'].includes(paymentStatus))) { return res.status(404).json({ success: false, message: "Invalid Payment Status" }) }
    if (!(productDetails && productDetails.length)) { return res.status(404).json({ success: false, message: "Invalid Product" }) }
    try {
        const result = await db.sequelize.transaction(async (t) => {
            const orderDatavalue = {
                customerId,
                orderByAdmin
            }
            if (paymentStatus) { orderDatavalue.paymentStatus = paymentStatus }
            const orderData = await orderModel.create(orderDatavalue, { transaction: t })
            if (orderData) {
                for (const data of productDetails) {
                    if (!(data.productId && data.quantity)) {
                        throw new Error('Invalid Product Details')
                    }
                    const productData = await productModel.findOne({
                        where: {
                            id: data.productId
                        }
                    })
                    if (!productData) {
                        throw new Error('Invalid Product Id')
                    }
                    if (productData.quantity < data.quantity) {
                        throw new Error(`Insufficient Quantity of product ${productData.name}`)
                    }

                    productData.quantity -= data.quantity
                    await productData.save()

                    const orderDetailValue = {
                        orderId: orderData.id,
                        productId: data.productId,
                        quantity: data.quantity,
                        price: productData.price,
                        totalAmount: (data.quantity * productData.price)
                    }
                    await orderDetailModel.create(orderDetailValue, { transaction: t })
                }
            }
            return res.status(200).json({ success: true, message: "Order Placed", data: orderData })
        });
    } catch (error) {
        return res.status(404).json({ success: false, message: "Error While Placing Order", error: error.message })
    }

}

exports.get = async (req, res, next) => {
    let searchObj = {
        where:{}
    }
    searchObj = pagination(searchObj)
    searchObj.include = orderDetailModel
    const orderData = await orderModel.findAll(searchObj)
    if (orderData && orderData.length) return res.status(200).json({ success: true, data: orderData })
    return res.status(404).json({ success: false, message: "Data Not Found" })
}

exports.update = async (req, res, next) => {
    const { orderStatus, paymentStatus } = req.body
    const { id } = req.params
    const orderData = await orderModel.findOne({ where: { id } })
    if (!orderData) return res.status(404).json({ success: false, message: "Data Not Found" })

    if (orderStatus) {
        if (!(['success', 'delivered', 'processing', 'cancelled'].includes(orderStatus))) return res.status(404).json({ success: false, message: "Invalid Order Status" })
        orderData.orderStatus = orderStatus
    }
    if (paymentStatus) {
        if (!(['success', 'pending', 'cancelled'].includes(paymentStatus))) return res.status(404).json({ success: false, message: "Invalid Payment status" })
        orderData.paymentStatus = paymentStatus
    }
    const data = await orderData.save()
    return res.status(200).json({ success: true, message: "Catgeory Updated", data })
}

exports.delete = async (req, res, next) => {
    const { id } = req.params
    const orderData = await orderModel.findOne({
        where: { id },
        include: orderDetailModel
    })
    if (orderData) {
        await orderData.destroy()
        return res.status(200).json({ success: true, message: "Order Deleted" })
    }
    return res.status(404).json({ success: false, message: "Data Not Found" })
}

exports.getById = async (req, res, next) => {
    const { id } = req.params
    const orderData = await orderModel.findOne({
        where: { id },
        include: orderDetailModel
    })
    if (orderData) return res.status(200).json({ success: true, data: orderData })
    return res.status(404).json({ success: false, message: "Data Not Found" })
}
