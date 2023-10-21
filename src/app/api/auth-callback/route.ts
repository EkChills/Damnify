import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../prisma/prismaclient";

export async function GET () {
  try {
    const {getUser} = getKindeServerSession()
    const user = getUser()
    if(!user.id) {
      return NextResponse.json({success:false}, {status:401})
    }
    const dbUser = await db.user.findFirst({
      where:{
        id:user.id
      }
    })

    if(!dbUser) {
      await db.user.create({
        data:{
          id: user.id,
          email:user.email as string,
          name:user.family_name + ' ' + user.given_name,
          picture:user.picture
        }
      })

      return NextResponse.json({success:true})
    }

    return NextResponse.json({success:true})
  } catch (error) {
    return new NextResponse('something went wrong', {status:500})
  }
} 