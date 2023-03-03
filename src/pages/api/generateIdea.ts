// 自作スクリプトの呼び出し
import { callOpenAI } from "@/scripts/callOpenAI";

export default async function (req: any, res: any) {
	const problem = req.body.problem || '';

  const body = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
        {role: 'system', content: `
        これからある問題を投げかけます。
その問題を解決するアプリのアイデアを3つレスポンスとして返してください。
レスポンスは「アイデア|アイデア|アイデア」のように|で区切って返してください
        `},

        {role: 'user', content: `
ストレスを解消したい。
        `},

        {role: 'assistant', content: `
ストレス解消のためのレラクゼーションアプリ|ストレスを解消するためのヨガアプリ|ストレスを解消するためのメンタルヘルスアプリ
        `},
        
        {role: 'user', content: problem}
    ]
});

	if (problem.trim().length === 0) {
		res.status(400).json({
		error: {
			message: "課題を入力してください",
		}
		});
		return;
	}

	try {
		const completion = await callOpenAI(body)
		if (!completion) {
			res.status(500).json({
				error: {
				message: 'OpenAI APIキーが正しくありません',
				}
			});
			return
		}
		
		res.status(200).json({ result: completion });
	} catch(error: any) {
		if (error.response) {
			console.error(error.response.status, error.response.data);
			res.status(error.response.status).json(error.response.data);
		} 
		else {
			console.error(`Error with OpenAI API request: ${error.message}`);
			res.status(500).json({
				error: {
				message: 'OpenAI APIを呼び出せませんでした',
				}
			});
		}
	}
}