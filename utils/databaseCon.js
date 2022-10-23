module.exports = () =>{
    const db = require('../models')
    const connectionType = process.env.DatabaseConnectionType || 'authenticate'
    db.sequelize[connectionType]()
    .then(()=>{
        console.log(`Database Connected`);
    }).catch((ex)=>{
        throw new Error(`Error While Connecting Database\n${ex.message}\n${ex}`)
    })
}