import { connectToCollection, disconnectFromDB } from './connection_db.js'
import { buildFilter, queryFurnitures } from '../helpers/furnitureHelpers.js'
import { generateCode } from '../utils/idUtils.js'

export async function getAllFurnitures(req, res){
    try{
        const { category, min_price, max_price } = req.query
        const filter = buildFilter(category, min_price, max_price)
        const connection = await connectToCollection('muebles')
        const furnitures = await queryFurnitures(connection, filter, res)
        res.status(200).send(JSON.stringify(furnitures))
    }catch(error){
        console.error('Error al buscar los muebles', error)
        res.status(500).send('Error interno del servidor')
    }finally{
        await disconnectFromDB()
    }
}

export async function getFurnitureByCode(req, res){
    const { id } = req.params
    const connection = await connectToCollection('muebles')
    try{
        const furniture = await connection.findOne({ codigo: Number(id)})
        if(furniture) res.status(200).send(JSON.stringify(furniture))
        else res.status(404).send(JSON.stringify({message: "Mueble no encontrado"}))
    }catch(error){
        console.error('Error al buscar mueble por código:', error);
        res.status(500).send('Error interno del servidor');
    }finally{
        await disconnectFromDB()
    }
}

export async function addFurniture(req, res){
    const { name, price, category } = req.body
    if(!name || !price || !category) return res.status(400).send(JSON.stringify({message: "Faltan datos relevantes"}))
    try{
        const connection = await connectToCollection('muebles')
        const furniture = { 
            codigo: await generateCode(connection), 
            nombre: name,
            precio: Number(price), 
            categoria: category
        }
        await connection.insertOne(furniture)
        res.status(201).send(JSON.stringify(furniture))
    }catch(error){
        console.error('Error al crear archivo:', error);
        res.status(500).send('Error interno del servidor');
    }finally{
        await disconnectFromDB()
    }
}

export async function deleteFurnitureByCode(req, res){
    const { id } = req.params
    try{
        const connection = await connectToCollection('muebles')
        await connection.deleteOne({ codigo: id})
        res.status(200).send(JSON.stringify({message: "Mueble eliminado correctamente"}))
    }catch(error){
        console.error('Error al eliminar mueble:', error);
        res.status(500).send('Error interno del servidor');
    }finally{
        await disconnectFromDB()
    }
}

export async function editFurnitureByCode(req, res){
    const { id } = req.params
    const { name, price, category } = req.body
    if(!name || !price || !category) return res.status(400).send(JSON.stringify({message: "Faltan datos relevantes"}))
    try{
        const connection = await connectToCollection('muebles')
        await connection.updateOne({ codigo: Number(id) }, { $set: {nombre: name, precio: Number(price), categoria: category} })
        res.status(200).send(JSON.stringify({message: "Mueble actualizado correctamente"}))
    }catch(error){
        console.error('Error al eliminar mueble:', error);
        res.status(500).send('Error interno del servidor');
    }finally{
        await disconnectFromDB()
    }
}