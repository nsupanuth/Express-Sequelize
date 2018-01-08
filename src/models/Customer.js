const Sequelize = require('sequelize')
const sequelize = app.get('sequelize')

module.exports = () => {
    const fields = {
        id : {
            autoIncrement : true,
            primaryKey : true,
            type : Sequelize.INTEGER
        },

        first_name : Sequelize.STRING,
        last_name : Sequelize.STRING,
        email_address : Sequelize.STRING
 
    }

    const options = {
        timestamps : false,
        underscored : true
    }

    return sequelize.define('customer',fields, options)
}