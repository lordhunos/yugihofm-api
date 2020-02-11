const router = require('express').Router()
const CardModel = require('../models/Card')
const { validateObjID } = require('../utils/middlewares')


router.get('/cards', async (req, res, next) => {
    let cards = await CardModel.find()
    res.send(cards)
})

router.get('/card/:id', 
    validateObjID, 
    async (req, res, next) => {
        try{
            let card = await CardModel.findById(req.params.id)
            res.send(card)
        } catch(e) {
            next(e)
        }
    }
)

module.exports = router