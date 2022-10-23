module.exports = (sequelize,DataTypes) =>{
    const category = sequelize.define('category',{
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
        description:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true,
            }
        }   
    },{
        modelName:'category',
        timestamps:true,
        paranoid:true
    })
    return category
}