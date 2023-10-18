import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// ---------------- CREATE CATEGORY ----------------
export const POST = async () => {
    BigInt.prototype.toJSON = function () {
        return this.toString()
    }
    try {
        const result = await prisma.category.createMany({
            data: {
                title: "Category 1", metaTitle: "This is meta title", slug: "category-1", content: "This is content",
            }
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


// ---------------- READ ALL CATEGORY ----------------

export const GET = async () => {
    
    
    try {
        const result = await prisma.category.findMany()
        const dataCount = await prisma.category.aggregate({
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


// ---------------- UPDATE  CATEGORY ----------------

export const PUT = async (req, res) => {
    try {
        
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")
        
        const result = await prisma.category.update({
            where: {
                id: id
            }, data: {
                title: "This is update Category title",
                metaTitle: "This is update meta title",
                content: "This is update content",
                slug: "This is update slug",
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


// ---------------- DELETE  CATEGORY ----------------

export const DELETE = async (req, res) => {
    try {
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")
        
        const createCategory = prisma.category.create({
            data: {
                title: "Category 1", metaTitle: "This is meta title", slug: "category-1", content: "This is content",
            }
        })
        
        const deleteCategory = prisma.category.delete({
            where: {
                id: id
            }
        })
        
        const result = await prisma.$transaction([createCategory, deleteCategory])
        
        
        return NextResponse.json({
            data: result
        })
        
    } catch (error) {
        return NextResponse.json({
            error: error
        })
        
    }
}
