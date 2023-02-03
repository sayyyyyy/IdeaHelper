// 自作スクリプトの呼び出し
import { callOpenAI } from "@/scripts/callOpenAI";

export default async function (req: any, res: any) {
    const content = req.body.questionList || '';
    if (content.length === 0) {
        res.status(400).json({
        error: {
            message: "質問リストが入力されていません",
        }
        });
        return;
    }

    try {
        const answerList = []
        for (const question of content) {
            const answer = await callOpenAI(question.question)
            answerList.push({question: question.questionText, answer: answer})
        }

        res.status(200).json({ result: answerList });
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