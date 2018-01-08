const router = require('express').Router()
const sequelize = app.get('sequelize')
const Customer = sequelize.models['customer']
const Order = sequelize.models['order']

const Op = sequelize.Op


router.post('/insertCustomer',async (req,res) => {

    const {first_name,last_name} = req.body

    try {
        const result = await Customer.create({ first_name, last_name})

        return res.json(result)
        
    } catch (err) {
        return res.status(500).end()
    }

})

router.post('/search',async (req,res) => {
    
    console.log("Search")
    const { first_name } = req.body
    const include = [
        {
            model : Order
        }
    ]
    try {
        const customers = await Customer.findAll({
            include : include,
            where : { first_name }
        })

        return res.json(customers)
        
    } catch (err) {
        return res.status(500).end()
    }

})

router.get('/',async (req,res) => {

    const include = [
        {
            model : Order,
            /*
            where : {

            }
            */
        }
    ] 

    try {
        const state = 'NY'
        const customers = await Customer.findAll({
            //include : include,
            include,
            where : {
                'state_province' : {
                    [ Op.ne ] : state
                }
            }, 
            order : [
                [ 'first_name', 'DESC' ],
                [ 'last_name' ]
            ],
            limit : 5
        })

        return res.json(customers)
    } catch (error) {
        return res.status(500).end()
    }
})

module.exports = router
