import Head from "next/head";
import styles from "../styles/Home.module.css";
import TextImprovementInput from "../components/TextImprovementInput";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to the AI21Labs Powered Text Improver!
        </h1>

        <TextImprovementInput />
      </main>

      <style jsx>{`
        main {
          width: 70vw;
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
