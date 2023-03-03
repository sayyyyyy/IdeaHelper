import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
  
const openai = new OpenAIApi(configuration);

//////GPT-3.5モデル///////////
export const callOpenAI = async (body: any) => {
    if (!configuration.apiKey) {
        return '';
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${configuration.apiKey}`,
        },
        body
    });
    const data = await res.json();
    console.log(data.choices[0].message.content);
    // console.log(data.choices[0].text);
    const choice = 0;
    return data.choices[choice].message.content;
}