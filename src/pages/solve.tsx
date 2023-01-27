import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Stepbar from '@/components/stepbar'

const inter = Inter({ subsets: ['latin'] })
import { Button, Group,Card, Image,Text, Badge, Flex } from '@mantine/core';
import { useDispatch, useSelector } from "react-redux";
import { counterSlice, CounterState, selectCount } from "../redux/counterSlice";
import { useRouter } from "next/router";
import { selectIdeaList, setIdeaList } from "../redux/idealistSlice";

export default function solve() {
  const dispatch = useDispatch();
  const selector = useSelector(selectCount);
  const { increment,decrement } = counterSlice.actions;
  const router = useRouter()
  

  // const ideaList = useSelector(selectIdeaList);
  const ideaList =["gagagag","111111","kkkkkkk"]

  const moveDucumet=()=>{
    // dispatch(increment());
    // router.push("/document");
  }

  return (
    <>
      <Stepbar ></Stepbar>

      {/* <div style={{ width: 340, margin: 'auto',marginTop:'100px'}} >
          <Card shadow="sm" p="lg" radius="md" withBorder >
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>aaa</Text>
              <Badge color="pink" variant="light">
                On Sale
              </Badge>
            </Group>

            <Text size="sm" color="dimmed">
              With Fjord Tours you can explore more of the magical fjord landscapes with tours and
              activities on and around the fjords of Norway
            </Text>

            <Button variant="light" color="yellow" fullWidth mt="md" radius="md">
              もっと深ぼる
            </Button>
          </Card>
        </div> */}


<div style={{ justifyContent:"center",display:'flex'}} >
      {ideaList.map((idea:any,index:any) =>{
        return(
        <>
          <div style={{ width: 280,marginTop:'100px',marginRight:'20px',display:'flex'}} key={index}>
            <Card shadow="sm" p="lg" radius="md" withBorder >
              <Group position="center" mt="md" mb="xs" >
                <Text weight={500}>{idea}</Text>
                {/* <Badge color="pink" variant="light">
                  On Sale
                </Badge> */}
              </Group>

              <Text size="sm" color="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
              </Text>

              <Button variant="light" color="yellow" fullWidth mt="md" radius="md" onClick={() => {router.push("/chat")}}>
                もっと深ぼる
              </Button>
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
        <Button onClick={moveDucumet} variant="outline" color="yellow" size="md">
          ドキュメント化
        </Button>
      </Group>
    </>
  )
}


