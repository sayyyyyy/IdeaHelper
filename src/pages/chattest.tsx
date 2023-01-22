import { useState } from "react"

export default function ChatTest() {
    const [chatList, setChatList] = useState([])

    async function sendChat(event: any) {
        const question = 'ターゲットどうしよう'
        const idea = '低炭素社会への移行を促進するアプリ"'

        event.preventDefault();
        try {
          const response = await fetch("/api/sendChat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idea: idea, question : question }),
          });
    
          const data = await response.json();
          if (response.status !== 200) {
            console.log(data.error)
            return
            throw data.error || new Error(`Request failed with status ${response.status}`);
          }
          
          console.log(data.result)
    
          // 取得データの整形
          
          setChatList([{'user': question}, {'openai': data.result}])
          console.log(chatList)
        } catch(error: any) {
          sendChat(event)
          console.error(error);
        }
      }

    return (
        <>
        <h2>Chat Scene</h2>
        <button onClick={sendChat}>send</button>
        {
            chatList.map((chat) =>
                {if (Object.keys(chat)[0] == 'user') {
                    return (<p key={Object.values(chat)[0]} className=''>{Object.values(chat)[0]}</p>)
                } else {
                    return (<p key={Object.values(chat)[0]} className=''>{Object.values(chat)[0]}</p>)
                }}
            )
        }
        <p></p>
        </>
    )
}