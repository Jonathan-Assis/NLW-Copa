import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
    const user = await prisma.user.create({
        data:{
            name: 'John Johnny',
            email: 'john.johnny@gmail.com',
            avatarUrl: 'https://github.com/jonathan-assis.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create:{
                    userId: user.id,
                }
            }
        }
    })

    //new Date().toISOString()
    await prisma.game.create({
        data:{
            date: '2022-11-02T12:30:55.026Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data:{
            date: '2022-11-03T10:25:30.026Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',
        
            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId:{
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })


}

main()