const Sequelize = require('sequelize')
const sequelize = app.get('sequelize')

module.exports = () => {
    const fields = {
        id : {
            autoIncrement : true,
            primaryKey : true,
            type : Sequelize.INTEGER
        },

        ship_name : Sequelize.STRING,
        ship_address : Sequelize.STRING,
        ship_city : Sequelize.STRING
    }

    
    const options = {
        timestamps : false,
        underscored : true
    }

    return sequelize.define('order',fields, options)
}