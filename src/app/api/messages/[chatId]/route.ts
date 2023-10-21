import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { db } from "../../../../../prisma/prismaclient"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest, {params}:{params:{chatId:string}}) {
  const {getUser} = getKindeServerSession()
  const user = getUser()
  try {
    const messages = await db.message.findMany({
      where:{
        chatId:params.chatId
      }
    })
    return NextResponse.json(messages)
  } catch (error) {
   console.log(error);
    return new NextResponse('something went wrong', {status:500})
  }
}