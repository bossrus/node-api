import express, {Request, Response, NextFunction} from 'express';
import {userRouter} from './users/users.js';

const port = 8000;
const app = express();

app.use((req,res,next)=>{
    console.log('Время ', Date.now());
    console.log('  -> ',req.url);
    console.log('  -> ',req.method);
    next();
});

app.get('/hello', (req, res) => {
    throw new Error('Error...');
});

app.use('/users',userRouter);

app.use((err: Error,req: Request,res: Response,next: NextFunction)=>{
    console.log('Error: ',err.message);
    res.status(401).send(err.message);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});