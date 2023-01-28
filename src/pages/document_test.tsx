import { useState } from "react";

export default function DocumentTest() {
    const [document, setDocument] = useState([{}])

    async function createDocument(event: any) {
		const  idea = '低炭素社会への移行を促進するアプリ"'
		const test = [
			{user: 'ターゲットどうしよう'},
			{openai: 'か ・全体の低炭素社会への移行を促進するアプリのターゲットとして、一般の大衆、企業、政府機関が挙げられます。 ・一般の大衆をターゲットとする場合、低炭素社会への移行を携わる行動を促すことが重要です。アプリを使用して、低炭素社会への貢献度を表示したり、低炭素社会への移行を促すキャンペーンを実施したりすることができます。 ・企業をターゲットとする場合、低炭素社会への移行を携わる行動を促すことが重要です。アプリを使用して、企業が低炭素社会への移行を行うための施策を実施したり、低炭素社会への移行を促すキャンペーンを実施したりすることができます。 ・政府機関をターゲットとする場合、低炭素社会への移行を携わる行動を促すことが重要です。アプリを使用して、政府が低炭素社会への移行を行うための施策を実施したり、低炭素社会への移行を促すキャンペーンを実施したりすることができます。'}
		]
		
		const questionList = [
			{question: `${idea}のアプリ名の提案して`, questionText: 'アプリ名案'},
			{question: `${idea}のターゲットどうしよう`, questionText: 'ターゲット案'},
			// {question: `${idea}の機能一覧を教えて`, questionText: '機能一覧案'},
			// {question: `${idea}の画面一覧を教えて`, questionText: '画面一覧案'},
		]
    
		event.preventDefault();
		console.log(JSON.stringify(test).replace(/{|}|\[|\]/g, ""))
		setDocument(test)
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
  
    return (
		<>
		<h2>Create Document</h2>
		<button onClick={createDocument}>create</button>
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