import { GetServerSideProps } from 'next'
import Head from 'next/head'
import styles from './home.module.scss'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

interface HomeProps {
  product: {
    priceId: string
    amount: number
  }
}

export default function Home({product}) {  
  return (
    <>
    <Head>
      <title>Home | ig.news</title>
      <meta name="description" content="..."/>
    </Head>
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 Olá, seja bem vindo(a)!</span>
        <h1>Notícias sobre <span>React</span> no mundo.</h1>
        <p>
          Obter acesso para todas as publicações<br/>
          <span>por {product.amount} mês</span>
        </p>
        <SubscribeButton priceId={product.priceId}/>
      </section>
      <img src="/images/avatar.svg" alt="Girl coding" />
    </main>
    </>
  )
}

// Para fazermos uma chamada SSR
// Formato padrão para ser executado na camada do next.js no servidor nodejs
export const getServerSideProps: GetServerSideProps = async () => {
  // const price = await stripe.prices.retrieve('price_1IgH2vGNFxtimzRlZbSiWBeN', {
  //   expand: ['product']
  // })
  // Como não vamos precisar de mais detalhes do produto, se precisarmos é só ativar e aí dentro de price.product.aqui vai estar as info do produto
  const price = await stripe.prices.retrieve('price_1IgH2vGNFxtimzRlZbSiWBeN')
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount / 100)
  }

  return { 
    props: {
      product
    }
  }
}