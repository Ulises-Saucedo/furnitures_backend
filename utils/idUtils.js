export async function generateCode(collection){
    const documentMaxCode = await collection.find().sort({ codigo: -1 }).limit(1).toArray()
    const maxCode = documentMaxCode[0]?.codigo ?? 0;
    return maxCode + 1
}