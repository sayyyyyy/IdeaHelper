import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Stepbar from '@/components/stepbar'

const inter = Inter({ subsets: ['latin'] })
import { Button, Group,Card, Image,Text, Badge, Flex, Center,Title } from '@mantine/core';
import { useDispatch, useSelector } from "react-redux";
import { counterSlice, CounterState, selectCount } from "../redux/counterSlice";
import { setIdea } from '@/redux/ideaSlice'
import { useRouter } from "next/router";
import { selectIdeaList, setIdeaList } from "../redux/idealistSlice";
import { selectTitleList,addTitleList } from '@/redux/titleListSlice'

export default function solve() {
  const dispatch = useDispatch();
  const selector = useSelector(selectCount);
  const { increment,decrement } = counterSlice.actions;
  const router = useRouter()
  

  const ideaList = useSelector(selectIdeaList);

  const moveDucument = (idea: string)=>{
    dispatch(setIdea(idea))
    dispatch(increment());
    router.push("/document");
  }

  const moveChat = (idea: string) => {
    dispatch(setIdea(idea))
    router.push("/chat")
  }

  return (
    <>
      <Stepbar />

      <Center style={{ marginTop:60}}>
        {/* <Title order={1}>{TitleList}</Title> */}
      </Center>
      <div style={{ justifyContent:"center",display:'flex',marginTop:20}} >
        {ideaList.map((idea:any,index:any) =>{
          return(
            <>
              <div style={{ width: 280,marginTop:'100px',marginRight:'50px',display:'flex'}} key={index}>
                <div>
                <Card shadow="sm" p="lg" radius="md" withBorder style={{width:300,height:200}}>
                  <Group position="center" mt="md" mb="xs" >
                    <Text weight={500}>{idea}</Text>
                  </Group>  
                  <Center >     
                    <Button variant="light" color="yellow" mt="md" radius="md" onClick={() => moveChat(idea)} style={{position:"absolute", bottom: 0,width:"70%",marginBottom:20}}>
                      もっと深ぼる
                    </Button>
                  </Center>
                </Card>
                <Center >
                  <Button onClick={() => moveDucument(idea)} variant="filled" mt="md" color="yellow" size="md" style={{width:200}}>
                      ドキュメント化
                  </Button>
                </Center>
              </div>
              </div>
            </>
          )}
        )}
      </div>

      <Group position="center" mt="80px">
        <Button variant="default" onClick={() => {dispatch(decrement());router.push("/");}}>
          戻る
        </Button>
      </Group>
    </>
  )
}


