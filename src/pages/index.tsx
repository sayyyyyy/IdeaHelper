import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Stepbar from '@/components/stepbar'
import { AppShell,Stepper, Button, Group } from '@mantine/core';
// import { counterSlice, CounterState, store,selectCount, ideaSlice, selectIdea} from "./_app";
import { counterSlice } from "../redux/counterSlice";
import { useRouter } from "next/router";

export default function Home() {
  const [ideaList, setIdeaList] = useState([])
  const dispatch = useDispatch();
  const { increment,decrement } = counterSlice.actions;
  const [text,setText] = useState("")
  const router = useRouter()

  async function onSubmit(event: any) {
    let errorCount = 0
    event.preventDefault();
    try {
      const response = await fetch("/api/generateIdea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problem : text }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        console.log(data.error)
        return 
      }

      console.log(data.result)

      // 取得データの整形
      const formatIdeaList = data.result.replaceAll('\n', '').replaceAll('。', '').replaceAll('\\', '').split(',')
      const changeArray = []

      for (const formatIdea of formatIdeaList) {
        changeArray.push(JSON.parse(formatIdea).idea)
      }
       
      setIdeaList(changeArray)
      console.log(ideaList)
      dispatch(increment())

    } catch(error: any) {
      errorCount++
      onSubmit(event)

      console.error(error);
    }
  }

  return (
    <>
      <Stepbar />
        <h1 className ="flex justify-center">あなたが解決したい課題はなんですか？</h1>
        <div className="flex justify-center">
            <input className=" mt-3 shadow appearance-none border rounded h-14 w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={text} onChange={(event)=>setText(event.target.value)}/>
        </div>

        <Group position="center" mt="xl">
            <Button variant="default" onClick={() => {dispatch(decrement());}}>
                Back
            </Button>
            {/* <Button variant="outline" color="yellow" size="md" onClick={() => {dispatch(decrement());router.push('/chat')}}>
              解決策の提案
            </Button> */}
            <Button onClick={onSubmit} variant="outline" color="yellow" size="md">
              解決策の提案
            </Button>
        </Group>
      {
        ideaList.map((idea) =>
          <p key={idea}>{idea}</p>
        )
      }
    </>
  )
}
