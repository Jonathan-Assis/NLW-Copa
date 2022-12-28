import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import ShortUniqueId from 'short-unique-id';
import { z } from 'zod';

export async function pollRoutes(fastify: FastifyInstance){
    fastify.get('/polls/count', async () => {
        const count = await prisma.poll.count()

        return { count }
    })

    fastify.post('/polls', async (request, response) => {
        const createPollBody = z.object({
            title: z.string()
        })
        
        const { title } = createPollBody.parse(request.body)

        const generate = new ShortUniqueId({length:6})
        const code = String(generate()).toUpperCase()

        try {
            await request.jwtVerify()
            
            await prisma.poll.create({
                data: {
                    title,
                    code,
                    ownerId: request.user.sub,

                    participants: {
                        create: {
                            userId: request.user.sub   
                        }
                    }
                }
            })
        } catch {
            await prisma.poll.create({
                data: {
                    title,
                    code
                }
            })

        }

        return response.status(201).send({code})
    })
}