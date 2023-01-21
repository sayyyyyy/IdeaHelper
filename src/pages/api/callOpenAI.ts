import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: any, res: any) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI APIキーが正しくありません",
      }
    });
    return;
  }

  const problem = req.body.problem || '';
  if (problem.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "課題を入力してください",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 4000,
      prompt: `${problem}を解決するアイデアを3つ教えてください`,
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
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