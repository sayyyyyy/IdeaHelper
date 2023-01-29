import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { counterSlice, CounterState,selectCount } from "../redux/counterSlice";
import { Textarea,Avatar,Button,ScrollArea, Group,Text, Paper,Header,Center, Flex, LoadingOverlay  } from '@mantine/core';

import { selectIdea } from '@/redux/ideaSlice';
import { setChatList, selectChatList } from '@/redux/chatListSlice';
import { FileText } from 'tabler-icons-react';

export default function Top() {
    const dispatch = useDispatch();
    const selector = useSelector(selectCount);
    const { increment,decrement } = counterSlice.actions;

    const router = useRouter()
    const [message,setMessage] = useState("")
    const [isLoading, setLoading] = useState(false)

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
        setLoading(true)
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
          setMessage('')
          setLoading(false)
        } catch(error: any) {
          setLoading(false)
          console.error(error);
        }
      }
   
    
    return (
    <>
    <div style={{position:"fixed" ,backgroundColor:"#FFFFFF",width:"100%",height:120 ,zIndex:1 ,marginTop:-20}}>
      <header style={{backgroundColor:"#FCC419",width:"86%",display:"flex",height:80,position:"fixed",zIndex:2,marginTop:20}}>
        <Center style={{width:"100%"}}>
          <Button variant="light" color="yellow" size="md" onClick={moveBack} style={{marginLeft: 20,marginRight:"30%",position:"absolute", left: 0}}> ＜ </Button>
          <h1 className='text-white font-bold text-center overflow-x-scroll'>{idea}</h1>
          <button onClick={moveDucumet} style={{backgroundColor:"#FCC419",color:"white" ,position:"absolute",right: 0,marginRight: 30}}>
            <FileText
              size={52}
              strokeWidth={2}
            />
          </button>
        </Center>
      </header>
    </div>
      

      <ScrollArea style={{ height: "70%",marginTop:50}}>
        {
            chatList.map((chat) =>
                {if (Object.keys(chat)[0] == 'user') {
                    return (
                      <>
                        <div key={Object.values(chat)[0]}>
                          <Group style={{ marginTop: 50 ,marginBottom:50,display:'flex',justifyContent: "flex-end",color:"pink"}}>
                            <div style={{ width: 400,backgroundColor:"yellow"}} >
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
                          <Group style={{ marginTop: 50}}>
                            <Avatar radius="xl" />
                            <div style={{ width: 400}} >
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

      <Center style={{display:'flex' ,bottom: "0",position:"fixed",marginBottom:10, backgroundColor:"white",justifyContent:"center",width:"100%",marginLeft:"-10%"}}>
          <Textarea
          placeholder="メッセージを記入してください"
          withAsterisk
          style={{ width:'50%',marginRight:20}}
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          />
          <Button variant="light" color="yellow.7" size="md" onClick={sendChat} style={{backgroundColor:"#FAB005",color:"white"}}>
          {(() => {
            if (isLoading) {
                return (
                  <LoadingOverlay
                    loaderProps={{ size: 'md', color: 'yellow', variant: 'oval' }}
                    visible
                  />
                )
            } else {
              return '送信'
            }
        })()}
          </Button>
      </Center>

    </>
  )
}
