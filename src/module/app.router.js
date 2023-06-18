import authRouter from './auth/auth.router.js';
import messageRouter from './message/message.router.js';
import userRouter from './user/user.router.js';
import connectDb from '../../DB/connection.js';

const initApp=(app,express)=>{
    //connectDb();
    app.use(express.json());
    app.get('/',(req,res)=>{
        return res.send("hii!!");
    })
    app.use('/auth',authRouter);
    app.use('/message',messageRouter);
    app.use('/user',userRouter);
    app.use('*',(req,res)=>{
        return res.json({message:"page not found"});
    })
    
}

export default initApp;