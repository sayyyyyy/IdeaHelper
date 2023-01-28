import React, { useState } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { selectIdea } from '@/redux/ideaSlice'
import { useDispatch, useSelector } from 'react-redux';
import { selectDocument, setDocument } from '@/redux/documentSlice';
import { selectChatList } from '@/redux/chatListSlice';

export default function Document() {
    const dispatch = useDispatch();

    const idea = useSelector(selectIdea)
    const documentList = useSelector(selectDocument)
    const chatList = useSelector(selectChatList)
    const [isLoading, setLoading] = useState(false)

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
            {(() => {
                if (isLoading) {
                    return (
						<div className='bg-slate-500 w-screen h-screen z-10 fixed '></div>
                    )
                }
            })()}
            <h1>ドキュメント化</h1>
            <button onClick={createDocument}>生成する</button>
            <div id='to-pdf'>
                {(() => {
                    if (documentList.length !== 0) {
                        return (
                            documentList.map((idea: {question: string, answer: string}) => (		
                                <>
                                    <p>{idea.question}</p>
                                    <p>{idea.answer}</p>
                                </>
                            ))

                        )
                    }
                })()}
                {(() => {
                    if (chatList.length !== 0) {
                        return (
                            <>
                                <p>メモ</p>
                                {    
                                    chatList.map((chat: {[speaker: string]: string}) => (
                                    <>
                                        <span>{Object.keys(chat)[0]}</span>
                                        <span>{Object.values(chat)[0]}</span>
                                        <br />
                                    </>
                                ))}
                            </>
                        )
                    }
                })()}
            </div>
            <button onClick={() => copyText(conversionToText())}>COPY</button>
            <button onClick={() => copyText(conversionToMarkdownText())}>Markdown Copy</button>
            <button onClick={conversionToPDF}>pdf</button>
        </>
    )
}
