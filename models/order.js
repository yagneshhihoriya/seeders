const orderDetailModel = require('./index').orderdetail
module.exports = (sequelize,DataTypes) =>{
    const order = sequelize.define('order',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customerId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty:true,
                isNumeric: true,
            }
        },
        orderByAdmin:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        orderStatus:{
            type: DataTypes.STRING,
            defaultValue:'success',
            validate:{
                notEmpty:true,
                isValidStatus(value){
                    if(!(value == 'success' || value == 'delivered' || value == 'processing' || value == 'cancelled')){
                        throw new Error(`Invalid Order Status`);
                    }
                }
            }
        },
        paymentStatus:{
            type: DataTypes.STRING,
            defaultValue:'pending',
            validate:{
                notEmpty:true,
                isValidPaymentStatus(value){
                    if(!(value == 'success' || value == 'pending' || value == 'cancelled')){
                        throw new Error(`Invalid Payment Status`);
                    }
                }
            }
        }
    },{
        modelName:'order',
        timestamps:true,
        paranoid:true
    })
    return order
}