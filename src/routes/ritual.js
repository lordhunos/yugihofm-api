const router = require('express').Router()
const RitualModel = require('../models/Ritual')
const { validateObjID } = require('../utils/middlewares')

router.get('/rituals', 
    async (req, res, next) => {
        try { 
            const results = await RitualModel.find()
                .populate('cr')
                .populate('c1')
                .populate('c2')
                .populate('c3')
                .populate('cf')
            res.status(200).json(results)
        } catch(e) { 
            next(e) 
        }
    }
)

router.get('/ritual/:id', 
    validateObjID,
    async (req, res, next) => {
        let cardID = req.params.id
        let query = { $or: [{ c1: cardID }, { c2: cardID }, { c3: cardID }, { cf: cardID }] }
        try { 
            const results = await RitualModel.find(query)
                .populate('cr')
                .populate('c1')
                .populate('c2')
                .populate('c3')
                .populate('cf')
            res.status(200).json(results)
        } catch(e) { 
            next(e) 
        }
    }
)

module.exports = router