import {json, Request, Response} from "express";
import {v4 as uuidv4} from 'uuid';
import prisma from "../database/db";

class UserController {

    async addUser(req:Request, res:Response) {
        try {
          const {name, username} = req.body;
      
          const user = await prisma.user.create({
            data: {name, username}
          });
      
          return res.status(201).json(user);
        } catch (error) {
          console.error(error);
          return res.status(500).json({message: 'Error creating user'});
        }
      }
}

export default UserController