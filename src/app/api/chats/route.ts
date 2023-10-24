import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "../../../../prisma/prismaclient";
import { NextResponse } from "next/server";

export async function GET() {
  const {getUser} = getKindeServerSession()
  const user = getUser()
  if(!user || !user.id){
    return new NextResponse('unauthorized', {status:401})
  }
  try {
    const allChats = await db.chat.findMany({
      where:{
        userId:user.id as string
      },
      orderBy:{createdAt:'asc'}
    })
    return NextResponse.json(allChats)
  } catch (error) {
    console.log(error);
    return new NextResponse('something went wrong', {status:500})
  }
}