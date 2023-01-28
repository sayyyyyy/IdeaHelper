import React, { useState } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { selectIdea } from '@/redux/ideaSlice'
import { useDispatch, useSelector } from 'react-redux';
import { selectDocument, setDocument } from '@/redux/documentSlice';
import { selectChatList } from '@/redux/chatListSlice';
import Stepbar from '@/components/stepbar'

import { Textarea,Avatar,Button,ScrollArea, Group,Text, Paper,Header,Center, Flex,Grid,Card  } from '@mantine/core';
import { Copy,Code,FileDownload } from 'tabler-icons-react';
import { Margarine } from '@next/font/google';
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

export default function Document() {
    const dispatch = useDispatch();

    const idea = useSelector(selectIdea)
    const documentList = useSelector(selectDocument)
    const chatList = useSelector(selectChatList)
    const [isLoading, setLoading] = useState(false)
    const [copy,setCopy] =useState(false)

    const questionList = [
        {question: `${idea}のアプリ名を正確な文章で提案してください。`, questionText: 'アプリ名案'},
        {question: `${idea}のターゲットを正確な文章で提案してください。`, questionText: 'ターゲット案'},
        // {question: `${idea}の機能一覧を教えて`, questionText: '機能一覧案'},
        // {question: `${idea}の画面一覧を教えて`, questionText: '画面一覧案'},
    ]

    async function createDocument() {
        setLoading(true)
		try {
			const response = await fetch("/api/createDocument", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ questionList: questionList }),
			});
	
			const data = await response.json();
			if (response.status !== 200) {
			    throw data.error || new Error(`Request failed with status ${response.status}`);
			}

			dispatch(setDocument(data.result)) 
            setLoading(false)
		} catch(error: any) {
            setLoading(false)
			console.error(error);
		}
	}

	const copyText = (text: string) => {
        navigator.clipboard.writeText(text).then(
			() => {
			  console.log('コピーしました')
              setCopy(true)
			},
			(e) => {
                console.error(e)
			    console.log('コピーに失敗しました')
			});
	}

    const conversionToText = () => {
        let stringDocument = ''

        if (idea) {
            stringDocument += `${idea}\n`
        }

        if (documentList.length !== 0) {
            for (const context of documentList) {
                stringDocument += `${context.question}\n${context.answer}\n\n`
    
            }
        }

        stringDocument += '\n\n'
        if (chatList.length !== 0) {
            for (const chat of chatList) {
                stringDocument += `${Object.keys(chat)[0]}: ${Object.values(chat)[0]}\n`
            }
        }
        return stringDocument
    }

    const conversionToMarkdownText = () => {
        let stringDocument = ''

        if (idea) {
            stringDocument += `# ${idea}\n`
        }

        if (documentList.length !== 0) {
            for (const context of documentList) {
                stringDocument += `## ${context.question}\n${context.answer}\n\n`
    
            }
        }

        stringDocument += '\n\n'
        if (chatList.length !== 0) {
            stringDocument += '## メモ\n'
            for (const chat of chatList) {
                stringDocument += `${Object.keys(chat)[0]}: ${Object.values(chat)[0]}\n`
            }
        }

        return stringDocument
    }

    const conversionToPDF = () => {
        console.log(idea)
        if (!idea) {
            console.log("error1")
            return
        }

        const target = document.getElementById('to-pdf')
        if (target === null) {
            console.log('error2')
            return};

        html2canvas(target, { scale: 2.5 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/svg', 1.0);
            let pdf = new jsPDF();
            pdf.addImage(imgData, 'SVG', 5, 10, canvas.width / 18, canvas.height / 18);
            pdf.save(`test.pdf`);
        });
    }
    return (
        <>
            <Stepbar />
            {(() => {
                if (isLoading) {
                    return (
						<div className='bg-slate-500 w-screen h-screen z-10 fixed '></div>
                    )
                }
            })()}

            <Center >
                <Button onClick={createDocument} variant="outline" mt="md" color="yellow" size="md" style={{width:300,marginTop:80}}>
                    ドキュメントを生成する
                </Button>
            </Center>
            <Center>
            <Card shadow="sm" p="lg" radius="md" withBorder style={{marginTop:30,width:"80%"}}>
                <div id='to-pdf'>
                    {(() => {
                        if (documentList.length !== 0) {
                            return (
                                documentList.map((idea: {question: string, answer: string}) => (		
                                    <>  
                                        <div style={{marginBottom:26}}>
                                            <Center>
                                                <Card.Section style={{fontWeight:"bold",color:"#FCC419"}}><h1>{idea.question}</h1></Card.Section>
                                            </Center>
                                            <Center style={{marginLeft:30,marginRight:30}}>
                                                <Card.Section><h3>{idea.answer}</h3></Card.Section>
                                            </Center> 
                                        </div>
                                    </>
                                ))

                            )
                        }
                    })()}
                    {(() => {
                        if (chatList.length !== 0) {
                            return (
                                <>
                                <Card.Section style={{marginLeft:20,marginRight:20,marginTop:20}}>
                                    <Center>
                                        <Card.Section style={{fontWeight:"bold",color:"#FCC419",marginTop:20}}><h1>メモ</h1></Card.Section>
                                    </Center>
                                    {    
                                        chatList.map((chat: {[speaker: string]: string}) => (
                                        <>
                                            
                                            <span>{Object.keys(chat)[0]}</span>
                                            <span>{Object.values(chat)[0]}</span>
                                            <br />
                                        </>
                                    ))}
                                </Card.Section>
                                </>
                            )
                        }
                    })()}
                </div>
            </Card>
            </Center>
        
            <Center style={{backgroundColor:"white" ,marginTop:100}}>
            <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50} >
                <Grid.Col span={4}>
                    <Button style={{borderColor:"2px solid #FCC419",backgroundColor:"white",width:70,height:70,borderRadius:"50%"}} onClick={() => copyText(conversionToText())}>
                        <Copy
                            size={56}
                            strokeWidth={2}
                            color={'#FCC419'}
                        />
                    </Button>
                    <Center><Text color="gray.5">COPY</Text></Center>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Button style={{borderColor:"2px solid #FCC419" ,width:70,height:70,borderRadius:"50%" ,backgroundColor:"white"}} onClick={() => copyText(conversionToMarkdownText())}>
                        <Code
                            size={56}
                            strokeWidth={2}
                            color={'#FCC419'}
                        />
                    </Button>
                    <Center><Text color="gray.5">MARKDOWN</Text></Center>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Button style={{backgroundColor:"white",borderColor:"2px solid #FCC419" ,width:70,height:70,borderRadius:"50%"}} onClick={conversionToPDF}>
                        <FileDownload
                            size={56}
                            strokeWidth={2}
                            color={'#FCC419'}
                        />
                    </Button>
                    <Center><Text color="gray.5">PDF</Text></Center>
                </Grid.Col>
            </Grid>
            </Center>

            

            {/* { (function(){
                if(copy) {
                    <Alert color="blue.7">
                        コピーしました
                    </Alert>
                }   
                })()
            } */}
        </>
    )
}
