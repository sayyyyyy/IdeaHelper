import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
  
const openai = new OpenAIApi(configuration);

export const callOpenAI = async (prompt: string) => {
    if (!configuration.apiKey) {
        return '';
    }

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 4000,
        prompt: prompt,
        temperature: 0.6,
    });
    console.log(completion.data.choices[0].text)
    return completion.data.choices[0].text
}