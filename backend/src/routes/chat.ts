import express, {Request, Response} from 'express';

async function getMessages(req: Request, res: Response) {
  try {
    
  } catch (err) {
    res.status(500).send(err);
  }
}


export default express.Router().get('/', getMessages)