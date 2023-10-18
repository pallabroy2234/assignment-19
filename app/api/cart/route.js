import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// ---------------- CREATE CART ----------------

export const POST = async () => {
    try {
        const result = await prisma.user.create({
            data: {
                firstName: "Tushar",
                middleName: "Roy",
                lastName: "Pallab",
                admin: true,
                email: "tushar@gmail.com",
                mobile: "1234567890",
                password: "123456",
                cart: {
                    create: {
                        title: "Cart 1",
                        firstName: "Tushar",
                        middleName: "Roy",
                        lastName: "Pallab",
                        country: "Bangladesh",
                        email: "tushar@gmail.com",
                        mobile: "1234567890",
                        city: "Thakurgaon",
                        token: "1234567890",
                        sessionId: "1234567890",
                        status: "active",
                        
                    }
                }
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


// ---------------- READ ALL CART ----------------

export const GET = async () => {
    
    try {
        const result = await prisma.cart.findMany()
        const dataCount = await prisma.cart.aggregate({
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


// ---------------- UPDATE  CART ----------------

export const PUT = async (req, res) => {
    try {
        
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")
        
        const result = await prisma.cart.update({
            where: {
                id: id
            },
            data: {
                title: "Updated Cart 1",
                firstName: "Updated card firstName",
                middleName: "updated card middleName",
                lastName: "updated card lastName",
                country: "updated card country",
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


// ---------------- DELETE  CART ----------------

export const DELETE = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")
        
        const createCart = prisma.user.create({
            data: {
                firstName: "Tushar",
                middleName: "Roy",
                lastName: "Pallab",
                admin: true,
                email: "tusharroy@gmail.com",
                mobile: "1234567890",
                password: "123456",
                cart: {
                    create: {
                        title: "Cart 1",
                        firstName: "Tushar",
                        middleName: "Roy",
                        lastName: "Pallab",
                        country: "Bangladesh",
                        email: "tushar@gmail.com",
                        mobile: "1234567890",
                        city: "Thakurgaon",
                        token: "1234567890",
                        sessionId: "1234567890",
                        status: "active",
                        
                    }
                }
            }
        })
        
        
        const deleteCart = prisma.cart.delete({
            where: {
                id: id
            }
        })
        
        const result = await prisma.$transaction([createCart, deleteCart])
        
        
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
