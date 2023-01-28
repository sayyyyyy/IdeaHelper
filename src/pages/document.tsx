import React from 'react'

import { selectIdea } from '@/redux/ideaSlice'
import { useDispatch, useSelector } from 'react-redux';
import { selectDocument, setDocument } from '@/redux/documentSlice';
import { selectChatList } from '@/redux/chatListSlice';

export default function Document() {
    const dispatch = useDispatch();

    const idea = useSelector(selectIdea)
    const document = useSelector(selectDocument)
    const chatList = useSelector(selectChatList)
    // console.log(chatList)

    const questionList = [
        {question: `${idea}のアプリ名を正確な文章で提案してください。`, questionText: 'アプリ名案'},
        {question: `${idea}のターゲットを正確な文章で提案してください。`, questionText: 'ターゲット案'},
        // {question: `${idea}の機能一覧を教えて`, questionText: '機能一覧案'},
        // {question: `${idea}の画面一覧を教えて`, questionText: '画面一覧案'},
    ]

    async function createDocument() {
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
	
		} catch(error: any) {
			console.error(error);
		}
	}

	const copyText = () => {
        const stringDocument = ''
		navigator.clipboard.writeText(stringDocument).then(
			() => {
			  console.log('コピーしました')
			},
			() => {
			  console.log('コピーに失敗しました')
			});
	}
    return (
        <>
            <h1>ドキュメント化</h1>
            <button onClick={createDocument}>生成する</button>
            {(() => {
                if (document) {
                    return (
                        document.map(idea => (		
                            <>
                                <p>{idea.question}</p>
                                <p>{idea.answer}</p>
                            </>
                        ))

                    )
                }
            })()}
            {(() => {
                if (chatList) {
                    
                    return (
                        <>
                            <p>メモ</p>
                            {
                                
                                chatList.map(chat => (
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
            <button onClick={copyText}>COPY</button>
        </>
    )
}
