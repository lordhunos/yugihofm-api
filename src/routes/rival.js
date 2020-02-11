const router = require('express').Router()
const RivalModel = require('../models/Rival')
const { validateObjID } = require('../utils/middlewares')

router.get('/rivals', async (req, res, next) => {
    try{
        let rivals = await RivalModel.find()
        res.status(200).json(rivals)
    } catch(e) {
        next(e)
    }
})

router.get('/rival/:id', 
    validateObjID, 
    async (req, res, next) => {
        try{
            let rival = await RivalModel.findById(req.params.id)
            res.status(200).json(rival)
        } catch(e) {
            next(e)
        }
    }
)

module.exports = router