module.exports = (sequelize,DataTypes) =>{
    const product = sequelize.define('product',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate:{
                notEmpty: true,
                len: [3,20],
            }
        },
        category:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty:true,
                isNumeric: true,
            }
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true,
            }
        },
        price:{
            type:DataTypes.BIGINT,
            defaultValue:0,
            validate:{
                notEmpty: true,
                isNumeric: true,
            },
        },
        quantity:{
            type:DataTypes.BIGINT,
            defaultValue:0,
            validate:{
                notEmpty: true,
                isNumeric: true,
            },
        }
    },{
        modelName:'product',
        timestamps:true,
        paranoid:true
    })
    return product
}