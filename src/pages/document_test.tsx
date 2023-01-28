import { useState } from "react";

export default function DocumentTest() {
    const [document, setDocument] = useState([{}])
	const idea = '低炭素社会への移行を促進するアプリ"'

    async function createDocument(event: any) {
		const questionList = [
			{question: `${idea}のアプリ名を正確な文章で提案してください。`, questionText: 'アプリ名案'},
			{question: `${idea}のターゲットを正確な文章で提案してください。`, questionText: 'ターゲット案'},
			// {question: `${idea}の機能一覧を教えて`, questionText: '機能一覧案'},
			// {question: `${idea}の画面一覧を教えて`, questionText: '画面一覧案'},
		]
    
		event.preventDefault();
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
	
			
			console.log(data.result)
			setDocument(data.result)
	
		} catch(error: any) {
	
			// Consider implementing your own error handling logic here
			console.error(error);
		}
	}

	const copyText = () => {
		navigator.clipboard.writeText('あああ').then(
			() => {
			  console.log('コピーしました')
			},
			() => {
			  console.log('コピーに失敗しました')
			});
	}
  
    return (
		<>
		<h2>Create Document</h2>
		<button onClick={createDocument}>create</button>
		<button onClick={copyText}>copy</button>
		<p>{idea}</p>
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
		</>
    )
} 