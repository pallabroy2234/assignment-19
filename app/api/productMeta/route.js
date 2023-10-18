import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// ---------------- CREATE PRODUCT_META ----------------
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
                email: "jxzmfrd056@couldmail.com",
                admin: true,
                product: {
                    create: {
                        slug: "Product-1",
                        discount: 100,
                        price: 1000,
                        fistName: "T-shirt",
                        metaTitle: "T-shirt",
                        summary: "T-shirt",
                        product_meta: {
                            create: {
                                key: "This is Product meta",
                                content: "This is Product meta content"
                            }
                        }
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


// ---------------- READ ALL PRODUCT_META ----------------

export const GET = async () => {
    
    
    try {
        const result = await prisma.product_meta.findMany({
            include: {
                product: true
            }
        })
        
        
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


// ---------------- UPDATE  PRODUCT_META ----------------

export const PUT = async (req, res) => {
    try {
        
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")
        
        const result = await prisma.product_meta.update({
            where: {
                id: id
            }, data: {
                key: "This is Product meta update key",
                content: "This is Product meta update content"
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


// ---------------- DELETE  PRODUCT_META ----------------

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
                email: "lntlcnz848@fatamail.com",
                admin: true,
                product: {
                    create: {
                        slug: "Product-1",
                        discount: 100,
                        price: 1000,
                        fistName: "T-shirt",
                        metaTitle: "T-shirt",
                        summary: "T-shirt",
                        product_meta: {
                            create: {
                                key: "This is Product meta",
                                content: "This is Product meta content"
                            }
                        }
                    }
                }
            },
        })
        
        
        const deleteProduct = prisma.product_meta.delete({
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
