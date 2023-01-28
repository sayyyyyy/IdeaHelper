import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { counterSlice, CounterState,selectCount } from "../redux/counterSlice";
import { Textarea,Avatar,Button,ScrollArea, Group,Text, Paper,Header  } from '@mantine/core';
import {IconExternalLink } from '@tabler/icons';

import { selectIdea } from '@/redux/ideaSlice';
import { setChatList, selectChatList } from '@/redux/chatListSlice';

export default function Top() {
    const dispatch = useDispatch();
    const selector = useSelector(selectCount);
    const { increment,decrement } = counterSlice.actions;

    const router = useRouter()
    const [message,setMessage] = useState("")

    const idea = useSelector(selectIdea);
    const chatList = useSelector(selectChatList)

    const moveBack=()=>{
      router.push("/solve")
    }

    const moveDucumet=()=>{
      dispatch(increment());
      router.push("/document");
    }

    async function sendChat(event: any) {
        const question = message

        event.preventDefault();
        try {
          const response = await fetch("/api/sendChat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idea: idea, question : question }),
          });
    
          const data = await response.json();
          if (response.status !== 200) {
            console.log(data.error)
            return
          }
          
          console.log(data.result)
    
          // 取得データの整形
          dispatch(setChatList([...chatList, {'user': question}, {'openai': data.result}]))
        } catch(error: any) {
          sendChat(event)
          console.error(error);
        }
      }
   
    
    return (
    <>
      <header style={{display:"flex",justifyContent:"center",position: "fixed"}}>
        <Button variant="light" color="yellow" size="md" onClick={moveBack}> ＜ </Button>
        <h1>{idea}</h1>
      </header>
      

      <ScrollArea style={{ marginTop: 50,height: "70%",}}>
        {
            chatList.map((chat) =>
                {if (Object.keys(chat)[0] == 'user') {
                    return (
                      <>
                        <div key={Object.values(chat)[0]}>
                          <Group style={{ marginTop: 50}}>
                            <Avatar radius="xl" />
                            <div style={{ width: 400}} >
                              <Paper shadow="xs" p="md" color="yellow">
                                <Text >
                                {Object.values(chat)[0]}
                                </Text>
                              </Paper>
                            </div>
                          </Group>
                      
                        </div>
                      </>
                    )
                } else {
                    return (
                      // <p key={Object.values(chat)[0]} className=''>{Object.values(chat)[0]}</p>
                      <>
                        <div key={Object.values(chat)[0]}>
                          <Group style={{ marginTop: 50 ,marginBottom:50,display:'flex',justifyContent: "flex-end",color:"pink"}}>
                            <div style={{ width: 400,backgroundColor:"yellow"}} >
                              <Paper shadow="xs" p="md" color="yellow">
                                <Text color="yellow">
                                {Object.values(chat)[0]}
                                </Text>
                              </Paper>
                            </div>
                          </Group>
                        </div>
                      </>
                    )
                }}
            )
        }

      

      </ScrollArea>


      <div style={{display:'flex' ,bottom: "0",position:"fixed",marginBottom:10, backgroundColor:"white"}}>
        <Textarea
        placeholder="Your comment"
        withAsterisk
        style={{ width:'600px'}}
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
        />
        <Button variant="light" color="yellow.7" size="md" onClick={sendChat} style={{backgroundColor:"#FAB005",color:"white"}}>送信</Button>
      </div>
      <button onClick={moveDucumet}>ドキュメントへ</button>
    </>
  )
}

