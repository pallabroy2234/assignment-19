import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// ---------------- CREATE PRODUCT_REVIEW ----------------
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
                email: "zuwfrit471@iemail.one",
                admin: true,
                product: {
                    create: {
                        slug: "Product-1",
                        discount: 100,
                        price: 1000,
                        fistName: "T-shirt",
                        metaTitle: "T-shirt",
                        summary: "T-shirt",
                        product_review: {
                            create: {
                                title: "This is Product review title",
                                content: "This is Product review content",
                                rating: "5"
                            }
                        }
                    }
                }
            },
        })
        
        
        const averageRating = await prisma.product_review.aggregate({
            _count: {
                rating: true
            }
        })
        
        return NextResponse.json({
            averageRating, data: result
        })
        
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            error: e
        })
    }
}


// ---------------- READ ALL PRODUCT_REVIEW ----------------

export const GET = async () => {
    
    
    try {
        const result = await prisma.product_review.findMany()
        
        
        return NextResponse.json({
            data: result
        })
        
    } catch (error) {
        return NextResponse.json({
            error: error
        })
        
    }
}


// ---------------- UPDATE  PRODUCT_REVIEW ----------------

export const PUT = async (req, res) => {
    try {
        
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")
        
        const result = await prisma.product_review.update({
            where: {
                id: id
            }, data: {
                title: "this is updated title", content: "This is updated content"
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


// ---------------- DELETE  PRODUCT_REVIEW ----------------

export const DELETE = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")
        
        const createProductReview = prisma.user.create({
            data: {
                firstName: "Pallab",
                middleName: "Roy",
                lastName: "Tushar",
                password: "123456",
                mobile: "1234567890",
                email: "aoewcuh864@couldmail.com",
                admin: true,
                product: {
                    create: {
                        slug: "Product-1",
                        discount: 100,
                        price: 1000,
                        fistName: "T-shirt",
                        metaTitle: "T-shirt",
                        summary: "T-shirt",
                        product_review: {
                            create: {
                                title: "This is Product review title",
                                content: "This is Product review content",
                                rating: "5"
                            }
                        }
                    }
                }
            },
        })
        
        
        const deleteProductReview = prisma.product_meta.delete({
            where: {
                id: id
            }
        })
        
        const result = await prisma.$transaction([createProductReview, deleteProductReview])
        
        
        return NextResponse.json({
            
            data: result
        })
        
    } catch (error) {
        return NextResponse.json({
            error: error
        })
        
    }
}
