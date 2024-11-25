import { Prisma } from '@prisma/client'
import { v4 } from 'uuid'


export class User{
    id = v4()
    email: string
    name: string
    lastname: string
    password: string
    active: boolean
    createdAt = new Date()
    updatedAt: Date
    tokenPassword: string
}
