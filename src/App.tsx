import './App.css'
import { useState } from "react";
import { Foods } from "./components/foods"
import { food, foodCart } from './types';

const products: food[] = [
  {
    id: "1",
    title: "Pizza da Mãe",
    description: "Saborosa pizza caseira feita por sua mãe",
    img: "https://www.sabornamesa.com.br/media/k2/items/cache/9189082f4804c1ab16e77d2cfe8d09d4_XL.jpg",
    value: "49.99",
  },
  {
    id: "2",
    title: "Churrasquinho",
    description:
      "Delicioso espetinho misto a moda da casa",
    img: "https://cptstatic.s3.amazonaws.com/imagens/enviadas/materias/materia28136/churrasco-e-acompanhamentos-afe.jpg",
    value: "65.80",
  },
  {
    id: "3",
    title: "Espaguete",
    description: "Massa ao molho de tomate",
    img: "https://www.kitano.com.br/wp-content/uploads/2019/07/SSP_1756-Massa-spaguetti-ao-molho-sugo-e-manjerica%E2%95%A0%C3%A2o.jpg",
    value: "34.90",
  },
];



export default function App() {
  const [cep, setCep] = useState<string>("");
  const [frete, setFrete] = useState({
    valor: 0.0,
    endereco: "",
  });
  const [cart, setCart] =
    useState<foodCart[]>([
      {
        productId: "1",
        quantity: 1,
      },
      {
        productId: "2",
        quantity: 1,
      },
      {
        productId: "3",
        quantity: 1,
      },
    ]);

  const numFoodCart = cart.reduce((accumulator, value) => accumulator + value.quantity,
    0
  );

  const totalValue = cart.reduce((accumulator, value) =>
    accumulator + Number(products.find((product) => product.id == value.productId)?.value) * value.quantity,
    0
  )

  const getCep = (cep: string) => {
    fetch(`https://viacep.com.br/ws/${cep.replace("-", "")}/json`)
      .then((res) => res.json())
      .then((data) =>
        setFrete((prev) => ({
          valor: data.logradouro ? Math.random() * (30 - 11 + 2) + 8 : 0,
          endereco: data.logradouro
            ? data.logradouro + " - " + data.bairro
            : "CEP Inválido",
        }))
      );
  }

  const sendOrder = () => {
    const order = {
      cart: cart.map((foodCart) => ({
        product: products.find((product) => product.id == foodCart.productId)?.title,
        quantity: foodCart.quantity,
      })),
      cep,
      frete: frete.valor.toFixed(2),
    }
    console.log(order);
    alert("Seu pedido foi enviado")
  }

  return (
    <>

      <main >
        <div >
          <div >
            <h1 >Carrinho de compras</h1>
            <span >
              Você tem {numFoodCart}{" "}
              {numFoodCart > 1 ? "itens" : "item"}
            </span>
            <div >
              {cart.map((foodCart) => (
                <Foods
                  key={foodCart.productId}
                  quantity={foodCart.quantity}
                  setCart={setCart}
                  item={
                    products.find(
                      (product) => product.id == foodCart.productId
                    ) as food
                  }
                />
              ))}
            </div>
          </div>
          <div >
            <h2 >Resumo</h2>
            <hr />
            <span >Frete</span>
            <div >
              <span>CEP</span>
              <div >
                <input
                  name="cep"
                  value={cep}
                  placeholder="Ex.: 00000-000"
                  maxLength={9}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/\D/g, "");
                    value = value.replace(/(\d{5})(\d)/, "$1-$2");
                    setCep(value);
                    console.log(e.target.value.length);
                    if (e.target.value.length == 9) {
                      getCep(e.target.value);
                    }
                  }}

                />
                <button

                  onClick={() => cep.length == 9 && getCep(cep)}
                >
                  <img
                    src="https://www.svgrepo.com/show/506675/refresh.svg"

                  />
                </button>
              </div>

              <span >R$ {frete.valor.toFixed(2)}</span>
            </div>
            <small >{frete.endereco}</small>
            <hr />
            <div >
              <span>Itens ({numFoodCart})</span>
              <span>R$ {totalValue.toFixed(2)}</span>
            </div>
            <div >
              <span>Frete</span>
              <span>R$ {frete.valor.toFixed(2)}</span>
            </div>
            <hr />
            <div >
              <span>Total</span>
              <span>R$ {(totalValue + frete.valor).toFixed(2)}</span>
            </div>
            <button
              onClick={() => sendOrder()}
              disabled={frete.endereco.length == 0 || numFoodCart == 0}

            >
              Fechar pedido
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
