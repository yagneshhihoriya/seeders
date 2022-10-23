module.exports = (sequelize,DataTypes) =>{
    const orderdetail = sequelize.define('orderdetail',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderId:{
            type: DataTypes.BIGINT,
            allowNull:false,
            validate:{
                notEmpty:true,
                isNumeric: true,
            }
        },
        productId:{
            type: DataTypes.BIGINT,
            allowNull:false,
            validate:{
                notEmpty:true,
            }
        },
        quantity:{
            type: DataTypes.BIGINT,
            allowNull:false,
            validate:{
                notEmpty:true,
                isNumeric: true,
            }
        },
        price:{
            type:DataTypes.BIGINT,
            allowNull:false,
            validate:{
                notEmpty: true,
                isNumeric: true,
            }
        },
        totalAmount:{
            type:DataTypes.BIGINT,
            allowNull:false,
            validate:{
                notEmpty: true,
                isNumeric: true,
            }
        }
        
    },{
        modelName:'orderdetail',
        timestamps:true,
        paranoid:true
    })
    return orderdetail
}