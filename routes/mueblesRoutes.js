import express from 'express'
import * as furnitures from '../controllers/mueblesController.js'
const router = express.Router()

// ROUTES
router.get('/', furnitures.getAllFurnitures)
router.get('/furniture/:id', furnitures.getFurnitureByCode)
router.post('/furniture', furnitures.addFurniture)
router.put('/furniture/:id', furnitures.editFurnitureByCode)
router.delete('/furniture/:id', furnitures.deleteFurnitureByCode)

export default router