const mongoose = require ("mongoose");
const Connectdb = async () => {
    try{
        mongoose.set('strictQuery', false); // This will remove some unwanted warnings.
        const conn = await mongoose.connect("mongodb+srv://suhailaafathima:R3B0Tv2PiZkmGRYF@cluster0.bluwmdb.mongodb.net/Books?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`Database Connected ${conn.connection.host}`);
    } catch(error){
        console.log(error);
        process.exit(1); // Used when unhandled fatal exception occur that were not handled.
    }
}
module.exports = Connectdb;
