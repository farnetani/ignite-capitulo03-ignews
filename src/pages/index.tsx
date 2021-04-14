import Head from 'next/head'
import styles from '../styles/home.module.scss'

export default function Home() {
  return (
    <>
    <Head>
      <title>Template Next.js</title>
      <meta name="description" content="..."/>
    </Head>

    <h1 className={styles.title}>      
      Hello <span>World</span>
    </h1>
    </>
  )
}
