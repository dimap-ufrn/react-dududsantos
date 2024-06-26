
import { useState } from 'react'
import { Foods } from './components/foods'
import { foodType, foodCartType } from './types'
import styles from './index.module.scss'

const products: foodType[] = [
  {
    id: '1',
    title: 'Pizza da Mãe',
    description: 'Saborosa pizza caseira feita por sua mãe',
    img: 'https://www.sabornamesa.com.br/media/k2/items/cache/9189082f4804c1ab16e77d2cfe8d09d4_XL.jpg',
    value: '49.99'
  },
  {
    id: '2',
    title: 'Churrasquinho',
    description: 'Delicioso espetinho misto a moda da casa',
    img: 'https://cptstatic.s3.amazonaws.com/imagens/enviadas/materias/materia28136/churrasco-e-acompanhamentos-afe.jpg',
    value: '65.80'
  },
  {
    id: '3',
    title: 'Espaguete',
    description: 'Massa fina italiana ao molho de tomate',
    img: 'https://www.kitano.com.br/wp-content/uploads/2019/07/SSP_1756-Massa-spaguetti-ao-molho-sugo-e-manjerica%E2%95%A0%C3%A2o.jpg',
    value: '34.90'
  }
]

export default function App() {
  const [cep, setCep] = useState<string>('')
  const [frete, setFrete] = useState({
    valor: 0.0,
    endereco: ''
  })
  const [cart, setCart] = useState<foodCartType[]>([
    {
      productId: '1',
      quantity: 1
    },
    {
      productId: '2',
      quantity: 1
    },
    {
      productId: '3',
      quantity: 1
    }
  ])

  const numFoodCart = cart.reduce(
    (accumulator, value) => accumulator + value.quantity,
    0
  )

  const totalValue = cart.reduce(
    (accumulator, value) =>
      accumulator +
      Number(products.find(product => product.id == value.productId)?.value) *
      value.quantity,
    0
  )

  const getCep = (cep: string) => {
    fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json`)
      .then(res => res.json())
      .then(data =>
        setFrete(prev => ({
          valor: data.logradouro ? Math.random() * (30 - 11 + 2) + 8 : 0,
          endereco: data.logradouro
            ? data.logradouro + ' - ' + data.bairro
            : 'CEP Inválido'
        }))
      )
  }

  const sendOrder = () => {
    const order = {
      cart: cart.map(foodCart => ({
        product: products.find(product => product.id == foodCart.productId)
          ?.title,
        quantity: foodCart.quantity
      })),
      cep,
      frete: frete.valor.toFixed(2)
    }
    console.log(order)
    alert('Seu pedido foi enviado')
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.cart}>
            <h1>Carrinho de compras</h1>
            <span>
              Você tem {numFoodCart} {numFoodCart > 1 ? 'itens' : 'item'}
            </span>
            <div>
              {cart.map(foodCart => (
                <Foods
                  key={foodCart.productId}
                  quantity={foodCart.quantity}
                  setCart={setCart}
                  food={
                    products.find(
                      product => product.id == foodCart.productId
                    ) as foodType
                  }
                />
              ))}
            </div>
          </div>
          <div className={styles.resumo}>
            <h2>Resumo</h2>
            <hr />
            <span>Frete</span>
            <div className={styles.cep}>
              <span>CEP</span>
              <div className={styles.input}>
                <input
                  name="cep"
                  value={cep}
                  placeholder="00000-000"
                  maxLength={9}
                  onChange={e => {
                    let val = e.target.value
                    val = val.replace(/\D/g, '')
                    val = val.replace(/(\d{5})(\d)/, '$1-$2')
                    setCep(val)
                    console.log(e.target.value.length)
                    if (e.target.value.length == 9) {
                      getCep(e.target.value)
                    }
                  }}
                />
                <button onClick={() => cep.length == 9 && getCep(cep)}>
                  <img src="https://www.svgrepo.com/show/506675/refresh.svg" />
                </button>
              </div>

              <span>R$ {frete.valor.toFixed(2)}</span>
            </div>
            <small>{frete.endereco}</small>
            <hr />
            <div className={styles.numItens}>
              <span>Itens ({numFoodCart})</span>
              <span>R$ {totalValue.toFixed(2)}</span>
            </div>
            <div className={styles.frete}>
              <span>Frete </span>
              <span>R$ {frete.valor.toFixed(2)}</span>
            </div>
            <hr />
            <div>
              <span>Total </span>
              <span>R$ {(totalValue + frete.valor).toFixed(2)}</span>
            </div>
            <button className={styles.sendOrder}
              onClick={() => sendOrder()}
              disabled={frete.endereco.length == 0 || numFoodCart == 0}>
              Fechar pedido
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
