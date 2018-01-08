const express = require('express')
const Sequelize = require('sequelize')
const { databaseOptions,rawQueryOptions } = require('./options')

app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))

const connectionUri = 'mysql://root:supanuth@localhost/northwind'
const sequelize = new Sequelize(connectionUri,databaseOptions)

app.set('sequelize',sequelize)

/* import model */
const Customer = require('./models/Customer')()
const Order = require('./models/Order')()

/* Model Relationship */
Customer.hasMany(Order)
Order.belongsTo(Customer,{
    foreignKey : 'customer_id'
})

app.get('/',(req,res) => {
    res.json({})
})

app.get('/query', async (req,res) => {
    const sql = `
        SELECT orders.*, customers.*
        FROM orders
            LEFT OUTER JOIN customers
                ON orders.customer_id = customers.id
        LIMIT 5
    `
    try {
        const result = await sequelize.query(sql,rawQueryOptions)
        res.json(result)
    } catch (error) {
        res.status(500).end()        
    }
    
    /*
    sequelize.query(sql,rawQueryOptions)
        .then(result => {
            res.json(result)            
        })
        .catch(err => {
            res.status(500).end()
        })
    */
})

/* router */
app.use('/customers',require('./routes/customer'))


const port = process.env.PORT || 3000

app.listen(port)