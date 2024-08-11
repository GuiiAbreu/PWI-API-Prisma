import {json, Request, Response} from "express";
import {v4 as uuidv4} from 'uuid';
import prisma from "../database/db";

class TechnologieController {

    async getTechnologies(req:Request, res:Response) {
        const {userName}: {userName: string} = req.body;

        try {
            const userHaveTechnologies = await prisma.user.findUnique({
                where: {username: userName},
                include: {technologies: true},
            });

            if (!userHaveTechnologies) {
                return res.status(404).json({error: "User not found"});
            }

            return res.status(200).json(userHaveTechnologies.technologies);
        } catch (error) {
            return res.status(500).json({error: "Internal Server Error"});
        }
    }

    async addTechnology(req: Request, res: Response) {
        const {userName}: {userName: string} = req.body as {userName: string};
        const {title, deadline}: {title: string, deadline: string} = req.body;

        if (new Date(deadline) <= new Date()) {
            return res.status(400).json({error: "Erro com data."});
        }

        try {
            const user = await prisma.user.findUnique({
                where: {username: userName},
            });

            if (!user) {
                return res.status(404).json({error: "User not found"});
            }

            const newTechnology = await prisma.technology.create({
                data: {
                    id: parseInt(uuidv4(), 16),  
                    title,
                    deadline: new Date(deadline),
                    created_at: new Date(),
                    studied: false,
                    userId: user.id,  
                },
            });

            return res.status(201).json(newTechnology);
        } catch (error) {
            return res.status(500).json({error: "Internal Server Error"});
        }
    }

    async updateTechnology(req:Request, res:Response) {
        const {userName}: {userName: string} = req.body;
        const {title, deadline}: {title: string, deadline: string} = req.body;
        const {id}: {id: string} = req.params as {id: string};

        try {
            const user = await prisma.user.findUnique({
                where: {username: userName},
            });

            if (!user) {
                return res.status(404).json({error: "User not found"});
            }

            const technology = await prisma.technology.findFirst({
                where: {
                    id: parseInt(id),
                    userId: user.id,
                },
            });

            if (!technology) {
                return res.status(404).json({error: "Tecnologia não existe."});
            }

            if (!!deadline && new Date(deadline) < new Date()) {
                return res.status(400).json({error: "Data inválida."});
            }

            const updatedTechnology = await prisma.technology.update({
                where: {id: technology.id},
                data: {
                    title: title || technology.title,
                    deadline: deadline ? new Date(deadline): technology.deadline,
                },
            });

            return res.status(200).json(updatedTechnology);
        } catch (error) {
            return res.status(500).json({error: "Internal Server Error"});
        }
    }

    async updateTechnologyStatus(req:Request, res:Response) {
        const {userName}: {userName: string} = req.body;
        const {id}: {id: string} = req.params as {id: string};

        try {
            const user = await prisma.user.findUnique({
                where: {username: userName},
            });

            if (!user) {
                return res.status(404).json({error: "User not found"});
            }

            const technology = await prisma.technology.findFirst({
                where: {
                    id: parseInt(id),
                    userId: user.id,
                },
            });

            if (!technology) {
                return res.status(404).json({ error: "Technology not found" });
            }

            const updatedTechnology = await prisma.technology.update({
                where: {id: technology.id},
                data: {
                    studied: true,
                },
            });

            return res.status(200).json(updatedTechnology);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async deleteTechnology(req:Request, res:Response) {
        const {userName}: {userName: string} = req.headers as {userName: string};
        const {id}: {id: string} = req.params as {id: string};

        try {
            const user = await prisma.user.findUnique({
                where: {username: userName},
            });

            if (!user) {
                return res.status(404).json({error: "User not found"});
            }

            const technology = await prisma.technology.findFirst({
                where: {
                    id: parseInt(id),
                    userId: user.id,
                },
            });

            if (!technology) {
                return res.status(404).json({error: "Tecnologia não existe."});
            }

            await prisma.technology.delete({
                where: {id: technology.id},
            });

            return res.status(200).json({status: "Technology removed"});
        } catch (error) {
            return res.status(500).json({error: "Internal Server Error"});
        }
    }
}

export default TechnologieController