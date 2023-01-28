import { callOpenAI } from "@/scripts/callOpenAI";

export default async function (req: any, res: any) {
  const question = req.body.question || '';
  const idea = req.body.idea || '';

  if (question.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "質問を入力してください",
      }
    });
    return;
  }

  try {
    const completion = await callOpenAI(`${idea}について、${question}` )
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
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'OpenAI APIを呼び出せませんでした',
        }
      });
    }
  }
}