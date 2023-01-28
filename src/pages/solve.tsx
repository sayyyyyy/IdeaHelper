import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Stepbar from '@/components/stepbar'

const inter = Inter({ subsets: ['latin'] })
import { Button, Group,Card, Image,Text, Badge, Flex } from '@mantine/core';
import { useDispatch, useSelector } from "react-redux";
import { counterSlice, CounterState, selectCount } from "../redux/counterSlice";
import { setIdea } from '@/redux/ideaSlice'
import { useRouter } from "next/router";
import { selectIdeaList, setIdeaList } from "../redux/idealistSlice";

export default function solve() {
  const dispatch = useDispatch();
  const selector = useSelector(selectCount);
  const { increment,decrement } = counterSlice.actions;
  const router = useRouter()
  

  const ideaList = useSelector(selectIdeaList);

  const moveDucumet=()=>{
    // dispatch(increment());
    // router.push("/document");
  }

  const moveChat = (idea: string) => {
    dispatch(setIdea(idea))
    // console.log(idea)
    router.push("/chat")
  }

  return (
    <>
      <Stepbar />
      <div style={{ justifyContent:"center",display:'flex',marginTop:20}} >
        {ideaList.map((idea:any,index:any) =>{
          return(
            <>
              <div style={{ width: 280,marginTop:'100px',marginRight:'20px',display:'flex'}} key={index}>
                <Card shadow="sm" p="lg" radius="md" withBorder >
                  <Group position="center" mt="md" mb="xs" >
                    <Text weight={500}>{idea}</Text>
                  </Group>
                  
                  <button value={idea} onClick={(e) => moveChat(e.target.value)}>
                    もっと深ぼる
                  </button>
                </Card>
              </div>
            </>
          )}
        )}
      </div>
      <Group position="center" mt="xl">
        <Button variant="default" onClick={() => {dispatch(decrement());router.push("/");}}>
          戻る
        </Button>
        {/* <Button variant="outline" color="yellow" size="md" onClick={() => {dispatch(decrement());router.push('/chat')}}>
          解決策の提案
        </Button> */}
        <Button onClick={moveDucumet} variant="filled" color="yellow" size="md">
          ドキュメント化
        </Button>
      </Group>
    </>
  )
}


