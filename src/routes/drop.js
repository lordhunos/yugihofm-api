const router = require('express').Router()
const DropModel = require('../models/Drop')
const { validateObjID } = require('../utils/middlewares')

router.get('/drop/rival/:id', 
validateObjID,
    async (req, res, next) => {
        let rivalID = req.params.id
        let query = { rival: rivalID }
        try { 
            const results = await DropModel.find(query).populate('card')
            res.status(200).json(results)
        } catch(e) { 
            next(e) 
        }
    }
)

router.get('/drop/card/:id', 
validateObjID,
async (req, res, next) => {
    let cardID = req.params.id
    let query = { card: cardID }
    try { 
        const results = await DropModel.find(query).populate('rival')
        res.status(200).json(results)
    } catch(e) { 
        next(e) 
    }
}
)

module.exports = router