import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// ---------------- CREATE Product ----------------
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
                email: "ceibouttougrolli-4810@yopmail.com",
                admin: true,
                product: {
                    create: {
                        slug: "Product-1",
                        discount: 100,
                        price: 1000,
                        fistName: "T-shirt",
                        metaTitle: "T-shirt",
                        summary: "T-shirt",
                    }
                }
            },
        })
        
        
        const totalPrice = await prisma.product.aggregate({
            _sum: {
                price: true
            }
        })
        
        return NextResponse.json({
            totalPrice, data: result
        })
        
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            error: e
        })
    }
}


// ---------------- READ ALL Product ----------------

export const GET = async () => {
    
    
    try {
        const result = await prisma.product.findMany()
        // const dataCount = await prisma.product.aggregate({
        //     _count: true
        // })
        
        return NextResponse.json({
            data: result
        })
        
    } catch (error) {
        return NextResponse.json({
            error: error
        })
        
    }
}


// ---------------- UPDATE  Product ----------------

export const PUT = async (req, res) => {
    try {
        
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")
        
        const result = await prisma.product.update({
            where: {
                id: id
            }, data: {
                metaTitle: "This is update meta title"
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


// ---------------- DELETE  Product ----------------

export const DELETE = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")
        
        const createProduct = prisma.user.create({
            data: {
                firstName: "Pallab",
                middleName: "Roy",
                lastName: "Tushar",
                password: "123456",
                mobile: "1234567890",
                email: "dueltmp+kyhyl@gmail.com",
                admin: true,
                product: {
                    create: {
                        slug: "Product-1",
                        discount: 100,
                        price: 1000,
                        fistName: "T-shirt",
                        metaTitle: "T-shirt",
                        summary: "T-shirt",
                    }
                }
            },
        })
        
        
        const deleteProduct = prisma.product.delete({
            where: {
                id: id
            }
        })
        
        const result = await prisma.$transaction([createProduct, deleteProduct])
        
        
        return NextResponse.json({
            
            data: result
        })
        
    } catch (error) {
        return NextResponse.json({
            error: error
        })
        
    }
}
