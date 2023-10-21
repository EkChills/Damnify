import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { db } from "../../../../prisma/prismaclient";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export async function POST(req:NextRequest) {
  console.log('triggered');
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
  });
  const {getUser} = getKindeServerSession()
  const user = getUser()
  let pushToChatId:string = '';
  try {
    const body:{prompt:string, chatId:string} = await req.json()
    if(!body.prompt) {
      return NextResponse.json({msg:'bad request'}, {status:400})
    }
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "you are a brilliant assistant who's name is Damnify you can answer any question thrown at you. your reply must be in such a way its easy to use on the frontend",
        },
         {
          role: "user",
          content:
            `${body.prompt || 'hello Damnify'}`,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature:0.2,
      max_tokens:100
    });
   
    if(!body.chatId) {
      const newChat = await db.chat.create({
        data:{
          title:chatCompletion.choices[0].message.content as string,
          userId:user.id as string
        }
      })
      pushToChatId = newChat.id
      const createdMessages = await db.message.createMany({data:[
        {chatId:newChat.id, content:body.prompt, role:'user'},
        {chatId:newChat.id, content:chatCompletion.choices[0].message.content as string, role:'assistant'},
      ]})
    }
    if(body.chatId){
      const createdMessages = await db.message.createMany({data:[
        {chatId:body.chatId || pushToChatId, content:body.prompt, role:'user'},
        {chatId:body.chatId || pushToChatId, content:chatCompletion.choices[0].message.content as string, role:'assistant'},
      ]})

    }

    const editedTitle = await db.chat.update({
      data:{
        title:chatCompletion.choices[0].message.content as string
      },
      where:{
        id:body.chatId || pushToChatId,
        userId:user.id as string
      }
    })
    
    return NextResponse.json({
      success:true,
      pushTo:body.chatId || pushToChatId,
      reply:chatCompletion.choices[0].message.content
    })
  } catch (error:any) {
    console.log(error);
    
    return NextResponse.json({
      msg:JSON.stringify(error.error.message)
    }, {status:error.status})
  }

}
