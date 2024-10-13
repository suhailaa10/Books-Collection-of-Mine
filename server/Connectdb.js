const mongoose = require ("mongoose");
const Connectdb = async () => {
    try{
        mongoose.set('strictQuery', false); // This will remove some unwanted warnings.
        const conn = await mongoose.connect(process.env.Mongodb_Url);
        console.log(`Database Connected ${conn.connection.host}`);
    } catch(error){
        console.log(error);
        process.exit(1); // Used when unhandled fatal exception occur that were not handled.
    }
}
module.exports = Connectdb;