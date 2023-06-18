import * as dotenv from 'dotenv';
dotenv.config()
import  express  from 'express';
import initApp from './src/module/app.router.js';
import connectDb from './DB/connection.js';

const app=express();
const port = 3001;

initApp(app,express);
connectDb().then(()=>{
    app.listen(port,()=>{
        console.log(`server listening on ${port}!!`);
    });
})