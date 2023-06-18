import mongoose from 'mongoose';


const connectDb = async ()=>{

   return await mongoose.connect(process.env.DB_LOCAL)
   .then( ()=>{
    console.log("connect success");
   } ).catch( (error)=>{
    console.log(`connect error: ${error}`);
   })
   
}

export default connectDb;