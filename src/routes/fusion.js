const router = require('express').Router()
const FusionModel = require('../models/Fusion')
const { validateObjID } = require('../utils/middlewares')

router.get('/fusion/base/:id', 
    validateObjID,
    async (req, res, next) => {
        let cardID = req.params.id
        let query = { $or: [{ c1: cardID }, { c2: cardID }] }
        try { 
            const results = await FusionModel.find(query).populate('c1').populate('c2').populate('f')
            res.status(200).json(results)
        } catch(e) { 
            next(e) 
        }
    }
)

router.get('/fusion/result/:id', 
    validateObjID,
    async (req, res, next) => {
        let cardID = req.params.id
        let query = { f: cardID }
        try { 
            const results = await Fusion.find(query).populate('c1').populate('c2').populate('f')
            res.status(200).json(results)
        } catch(e) { 
            next(e) 
        }
    }
)

module.exports = router