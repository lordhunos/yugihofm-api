const router = require('express').Router()
const DeckModel = require('../models/Deck')
const { validateObjID } = require('../utils/middlewares')

router.get('/deck/rival/:id',
    validateObjID,
    async (req, res, next) => {
        let rivalID = req.params.id
        let query = { rival: rivalID }
        try { 
            const results = await DeckModel.find(query).populate('card')
            res.status(200).json(results)
        } catch(e) { 
            next(e) 
        }
    }
)

router.get('/deck/card/:id', 
    validateObjID,
    async (req, res, next) => {
        let cardID = req.params.id
        let query = { card: cardID }
        try { 
            const results = await DeckModel.find(query).populate('rival')
            res.status(200).json(results)
        } catch(e) { 
            next(e) 
        }
    }
)

module.exports = router