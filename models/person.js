module.exports = (sequelize,DataTypes) =>{
    const person = sequelize.define('person',{
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
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
            }
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
            }
        },
        phone:{
            type:DataTypes.BIGINT,
            allowNull:false,
            validate:{
                notEmpty:true,
                isNumeric: true,
            }
        },
        isAdmin:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },

    },{
        modelName:'person',
        timestamps:true,
        paranoid:true
    })
    return person
}