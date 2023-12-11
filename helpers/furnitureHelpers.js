export function buildFilter(category, min_price, max_price){
    const filter = {}

    if(category) filter.category = category
    if(min_price && max_price) filter.price = {$lte: Number(max_price),$gte: Number(min_price)}
    else if(min_price) filter.price = { $gte: Number(min_price) }
    else if(max_price) filter.price = { $lte: Number(max_price) }

    return filter
}

export async function queryFurnitures(connection, filter, res){
    if(filter.category === 'asc' && !filter.price){
        return await connection.find().sort({ categoria: 1 }).toArray()
    } 
    else if((!isNaN(filter.price.$gte) || !isNaN(filter.price.$lte)) && !filter.category){
        return await connection.find({ precio: filter.price }).sort({ categoria: 1 }).toArray()
    }
    else if((!isNaN(filter.price.$gte) || !isNaN(filter.price.$lte)) && filter.category){
        return await connection.find({ precio: filter.price }).toArray()
    }else if(!filter || filter.category !== 'asc' || isNaN(filter.price.$gte) || isNaN(filter.price.$lte)){
        return await connection.find().toArray()
    }else{
        return res.status(400).send(JSON.stringify({error: "Hubo un error al buscar el mueble."}))
    }
}