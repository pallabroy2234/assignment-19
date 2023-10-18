import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// ---------------- CREATE ORDER ----------------
export const POST = async () => {
    BigInt.prototype.toJSON = function () {
        return this.toString()
    }
    try {
        const result = await prisma.user.create({
            data: {
                firstName: "Pallab",
                middleName: "Roy",
                lastName: "Tushar",
                password: "123456",
                mobile: "1234567890",
                email: "pallabroy@gmail.com",
                admin: true,
                order: {
                    create: {
                        title: "Order Title",
                        firstName: "Pallab",
                        middleName: "Roy",
                        lastName: "Tushar",
                        email: "pallabroy@gmail.com",
                        city: "Thakurgaon",
                        mobile: "1234567890",
                        country: "Bangladesh",
                        tax: 10,
                        discount: 10,
                        grandTotal: 100,
                        token: "1234567890",
                        subTotal: 100,
                        total: 100,
                        itemDiscount: 10,
                    }
                }
            },
        })
        
        const totalDiscount = await prisma.order.aggregate({
            _sum: {
                discount: true
            }
        })
        
        return NextResponse.json({
            totalDiscount, data: result
        })
        
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            error: e
        })
    }
}


// ---------------- READ ALL ORDER ----------------

export const GET = async () => {
    
    
    try {
        const result = await prisma.order.findMany()
        const dataCount = await prisma.order.aggregate({
            _count: true
        })
        return NextResponse.json({
            dataCount, data: result
        })
        
    } catch (error) {
        return NextResponse.json({
            error: error
        })
        
    }
}


// ---------------- UPDATE  ORDER ----------------

export const PUT = async (req, res) => {
    try {
        
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")
        
        const result = await prisma.order.update({
            where: {
                id: id
            }, data: {
                title: "This is updated order title"
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


// ---------------- DELETE  ORDER ----------------

export const DELETE = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")
        
        const createOrder = prisma.user.create({
            data: {
                firstName: "Pallab",
                middleName: "Roy",
                lastName: "Tushar",
                password: "123456",
                mobile: "1234567890",
                email: "pallabroyadoj@gmail.com",
                admin: true,
                order: {
                    create: {
                        title: "Order Title",
                        firstName: "Pallab",
                        middleName: "Roy",
                        lastName: "Tushar",
                        email: "pallabroy@gmail.com",
                        city: "Thakurgaon",
                        mobile: "1234567890",
                        country: "Bangladesh",
                        tax: 10,
                        discount: 10,
                        grandTotal: 100,
                        token: "1234567890",
                        subTotal: 100,
                        total: 100,
                        itemDiscount: 10,
                    }
                }
            },
        })
        
        
        const deleteOrder = prisma.order.delete({
            where: {
                id: id
            }
        })
        
        const result = await prisma.$transaction([createOrder, deleteOrder])
        
        return NextResponse.json({
            
            data: result
        })
        
    } catch (error) {
        return NextResponse.json({
            error: error
        })
        
    }
}
