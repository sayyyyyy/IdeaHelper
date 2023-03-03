// ライブラリインポート
import React, { useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Copy,Code,FileDownload } from 'tabler-icons-react'
import { Button, Text, Center, Grid, Card, LoadingOverlay, Popover,Header,createStyles  } from '@mantine/core'

// 状態管理
import { useDispatch, useSelector } from 'react-redux'
import { selectIdea } from '@/redux/ideaSlice'
import { selectDocument, setDocument } from '@/redux/documentSlice'
import { selectChatList } from '@/redux/chatListSlice'

// コンポーネントインポート
import Stepbar from '@/components/stepbar'

const useStyles = createStyles((theme) => ({
	header: {
		backgroundColor: theme.fn.variant({ variant: 'filled', color: "yellow" }).background,
		borderBottom: 0,
		height: 56,
		maxHeight: 100,
		marginLeft:-16,
		marginRight:-16,
		marginBottom:0,
		[`@media (max-width:2000px)`]: {
		  	display: 'none',
		},
		'@media (max-width:800px)': {
		  	display:"block",
		  	// marginLeft:16,
		  	// marginRight:16
		},
	},
	headerImg:{
		width:150,
		marginTop:5
	},
}));

export default function Document() {
    // 状態管理
    const dispatch = useDispatch();
    const idea = useSelector(selectIdea)
    const documentList = useSelector(selectDocument)
    const chatList = useSelector(selectChatList)

    const [isLoading, setLoading] = useState(false)
    const [copy, setCopy] = useState(false)
    const [ existDocument, setexistDocument ] = useState(false)

    const { classes } = useStyles();

    const questionList = [
        {question: `${idea}のアプリ名を正確な文章で提案してください。`, questionText: 'アプリ名案'},
        {question: `${idea}のターゲットを正確な文章で提案してください。`, questionText: 'ターゲット案'},
        {question: `${idea}の機能一覧を教えてください。`, questionText: '機能一覧案'},
        {question: `${idea}の画面一覧を教えてください。`, questionText: '画面一覧案'},
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
            setexistDocument(true)
		} catch(error: any) {
            setLoading(false)
			console.error(error);
		}
	}

	const copyText = (text: string, event: any) => {
        navigator.clipboard.writeText(text).then(
			() => {
              setCopy(true)
			},
			(e) => {
                console.error(e)
			});
	}

    // documentがObject型なので表示できるようにstring型に変換
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
        if (!idea) {
            console.error("アイデアが見つかりませんでした")
            return
        }
        
        // #to-pdfの中身を画像に変換し、PDFに変換する
        const target = document.getElementById('to-pdf')
        if (target === null) {
            console.error('PDF化に失敗しました')
            return
        };

        html2canvas(target, { scale: 3.9 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/svg', 1.0);
            let pdf = new jsPDF();
            pdf.addImage(imgData, 'SVG', 5, 10, canvas.width / 18, canvas.height / 18);
            pdf.save(`${idea}.pdf`);
        });
    }

    return (
        <>
            <Header height={56} className={classes.header} mb={120}>
			    <Center><img src='ideaHelperLogo.png' className={classes.headerImg}/></Center>
		    </Header>
            <Stepbar />
            
            {/* ローディングDOM */}
            {(() => {
                if (isLoading) {
                    return (
						<LoadingOverlay
							loaderProps={{ size: 'md', color: 'yellow', variant: 'bars' }}
							overlayOpacity={0.6}
							overlayColor="#c5c5c5"
							visible
						/>
                    )
                }
            })()}

            <Center >
                <Button onClick={createDocument} variant="outline" mt="md" color="yellow" size="md" style={{width:300,marginTop:80}}>
                    ドキュメントを生成する
                </Button>
            </Center>
            {/* ドキュメントプレビュー */}
            <Center>
                <Card shadow="sm" p="lg" radius="md" withBorder style={{marginTop:30,width:"80%"}}>
                    <div id='to-pdf'>
                        {(() => {
                            if (documentList.length !== 0 && existDocument) {
                                return (
                                    <div style={{marginBottom:26}}>
                                        <Center>
                                            <Card.Section style={{fontWeight:"bold",color:"#FCC419"}}><h1>アプリ概要</h1></Card.Section>
                                        </Center>
                                        <Center style={{marginLeft:30,marginRight:30}}>
                                            <Card.Section><h3>{idea}</h3></Card.Section>
                                        </Center>
                                    </div>
                                )
                            }
                        })()}
                        {(() => {
                            if (documentList.length !== 0 && existDocument) {
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
                            if (chatList.length !== 0 && existDocument) {
                                return (
                                    <>
                                    <Card.Section style={{marginLeft:20,marginRight:20,marginTop:20}}>
                                        <Center>
                                            <Card.Section style={{fontWeight:"bold",color:"#FCC419",marginTop:20}}><h1>メモ</h1></Card.Section>
                                        </Center>
                                        {    
                                            chatList.map((chat: {[speaker: string]: string}) => (
                                            <>
                                                
                                                <span>{chat.sender}</span>
                                                <span>：</span>
                                                <span>{chat.data}</span>
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
        
            {/* ボタンDOM */}
            {(() => {
                if (existDocument) {
                    return (
                        <>
                            <Center style={{backgroundColor:"white" ,marginTop:100}}>
                                <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                                    <Grid.Col span={4}>
                                        <div onClick={(e) => copyText(conversionToText(), e)}>
                                            <Popover width={200} position="bottom" withArrow shadow="md">
                                                <Popover.Target>
                                                    <Button style={{borderColor:"2px solid #FCC419",backgroundColor:"white",width:70,height:70,borderRadius:"50%"}}>
                                                        <Copy
                                                            size={56}
                                                            strokeWidth={2}
                                                            color={'#FCC419'}
                                                        />
                                                    </Button>
                                                </Popover.Target>
                                                <Popover.Dropdown>
                                                    <Text size="sm">テキストをコピーしました</Text>
                                                </Popover.Dropdown>
                                            </Popover>
                                            <Center><Text color="gray.5">COPY</Text></Center>
                                        </div>
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        <div onClick={(e) => copyText(conversionToMarkdownText(), e)}>
                                            <Popover width={300} position="bottom" withArrow shadow="md">
                                                <Popover.Target>
                                                    <Button style={{borderColor:"2px solid #FCC419" ,width:70,height:70,borderRadius:"50%" ,backgroundColor:"white"}}>
                                                        <Code
                                                            size={56}
                                                            strokeWidth={2}
                                                            color={'#FCC419'}
                                                        />
                                                    </Button>
                                                </Popover.Target>
                                                <Popover.Dropdown>
                                                    <Text size="sm">Markdownテキストをコピーしました</Text>
                                                </Popover.Dropdown>
                                            </Popover>
                                            <Center><Text color="gray.5">MARKDOWN</Text></Center>
                                        </div>
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
                        </>
                    )
                }
            })()}
        </>
    )
}
