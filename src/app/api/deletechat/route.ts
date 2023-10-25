import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../prisma/prismaclient";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req:NextRequest) {
    const {getUser} = getKindeServerSession()
    const user = getUser()
    console.log(user);
    
    try {
        const {chatId}:{chatId:string} = await req.json() 
        console.log(chatId);
        
        await db.message.deleteMany({
            where:{
                chatId:chatId
            }
        })
        const deletedChat = await db.chat.delete({
            where:{
                id:chatId,
            }
        })
        const allChats = await db.chat.findMany({
            where:{
                userId:user.id as string
            }
        })
       return NextResponse.json(allChats)
    } catch(err) {
        console.log(err);
        return new NextResponse("Error Occured", {status:500})
        
    }
}