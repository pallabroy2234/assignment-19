import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// ---------------- CREATE USER ----------------
export const POST = async () => {
    BigInt.prototype.toJSON = function () {
        return this.toString()
    }
    try {
        const result = await prisma.user.createMany({
            data: [
                {
                    firstName: "Pallab",
                    middleName: "Roy",
                    lastName: "Tushar",
                    password: "123456",
                    mobile: "1234567890",
                    email: "pallab@gmail.com",
                    admin: true,
                },
                {
                    firstName: "Fazle",
                    middleName: "Elahi",
                    lastName: "Refat",
                    password: "123456",
                    mobile: "1234567890",
                    email: "refat@gmail.com",
                    admin: true,
                }
            ]
        })
        
        return NextResponse.json({
            data: result
        })
        
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            error: e
        })
    }
}


// ---------------- READ ALL USER ----------------

export const GET = async () => {
    
    
    try {
        const result = await prisma.user.findMany()
        const dataCount = await prisma.user.aggregate({
            _count: true
        })
        return NextResponse.json({
            dataCount,
            data: result
        })
        
    } catch (error) {
        return NextResponse.json({
            error: error
        })
        
    }
}


// ---------------- UPDATE  USER ----------------

export const PUT = async (req, res) => {
    try {
        
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")
        
        const result = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                firstName: "Updated firstName",
                middleName: "updated middleName",
                lastName: "updated lastName",
            }
        })
        
        return NextResponse.json({
            
            data: result
        })
        
    } catch (error) {
        return NextResponse.json({
            error: error
        })
        
    }
}


// ---------------- DELETE  USER ----------------

export const DELETE = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")
        
        const user = prisma.user.create({
            data: {
                firstName: "Pallab",
                middleName: "Roy",
                lastName: "Tushar",
                password: "123456",
                mobile: "1234567890",
                email: "roy@gmail.com",
                admin: true,
            }
        })
        
        const deleteUser = prisma.user.delete({
            where: {
                id: id
            }
        })
        
        const result = await prisma.$transaction([user, deleteUser])
        
        
        return NextResponse.json({
            
            data: result
        })
        
    } catch
        (error) {
        return NextResponse.json({
            error: error
        })
        
    }
}
