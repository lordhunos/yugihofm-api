const router = require('express').Router()
const EquipmentModel = require('../models/Equipment')
const { validateObjID } = require('../utils/middlewares')

router.get('/equipment/*/:id', 
    validateObjID,
    async (req, res, next) => {
        
        const validRoute = ["card", "equip"]
        const searchBy = req.path.split('/')[2]
        
        if(validRoute.indexOf(searchBy)<0) { 
            res.status(404).json({ message: "Resource not found" }) 
            return
        }
        
        const ID = req.params.id
        const query = `{ "${searchBy}": "${ID}" }`
        try {
            const results = await EquipmentModel.find(JSON.parse(query)).populate(searchBy)
            res.status(200).json(results)
        } catch(e) { 
            next(e) 
        }
    }
)

module.exports = router