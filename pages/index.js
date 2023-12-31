import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [wordsInput, setWordsInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: wordsInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setWordsInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/character.jpeg" />
      </Head>

      <main className={styles.main}>
        <img src="/character.jpeg"className={styles.icon} />
        <h3>Translate into Kana</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Enter a phrase or word in English"
            value={wordsInput}
            onChange={(e) => setWordsInput(e.target.value)}
          />
          <input type="submit" value="Generate Kana" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
