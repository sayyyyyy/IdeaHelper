import { callOpenAI } from "@/scripts/callOpenAI";

export default async function (req: any, res: any) {
  const junre = req.body.junre || '';
  if (junre.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "課題を入力してください",
      }
    });
    return;
  }

  try {
    const completion = await callOpenAI(`${junre}アプリのアイデアを{{'idea': value}, {'idea': value}, {'idea': value}}形式のjsonで3つ渡してください。`)
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