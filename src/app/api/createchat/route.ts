import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../prisma/prismaclient";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req:NextRequest) {
  const body:{title:string} = await req.json()
  const {getUser} =  getKindeServerSession()
  const user = getUser()
  try {
    if(!user) {
      return new NextResponse('unauthorized', {status:401})
    }
    const createdChat = await db.chat.create({
      data:{
        title:body.title ? body.title : 'New Chat',
        userId: user.id as string
      }
    })

    return NextResponse.json(createdChat)
  } catch (error) {
    
  }
}