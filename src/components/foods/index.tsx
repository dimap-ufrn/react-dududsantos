import { foodCart, food } from "../../types"

interface foodProps {
  item: food;
  quantity: number;
  setCart: React.Dispatch<React.SetStateAction<foodCart[]>>;

}

export const Foods = ({ item, quantity, setCart }: foodProps) => {

  const removeFood = () => {
    setCart((prev) =>
      prev.filter((foodCart) => foodCart.productId != item.id)
    );
  };

  const addOrSub = (action: "acrescentar" | "retirar") => {
    setCart((prev) => {
      const cart = [...prev];
      const index = cart.findIndex(
        (foodCart) => foodCart.productId == item.id
      );
      if (action == "acrescentar") {
        cart[index].quantity++;
      } else {
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          removeFood();
        }

      }

      return cart;

    });
  };




  return (
    <div>
      <img

        src={item.img}
      />
      <div >
        <span >{item.title} </span>
        <small >
          {item.description}
        </small>
        <span >R$ {item.value}</span>
      </div>
      <div >
        <span>{quantity}</span>
        <div >
          <button onClick={() => addOrSub("acrescentar")}>
            <img

              src="https://cdn-icons-png.flaticon.com/512/4196/4196777.png"
            />
          </button>
          <button onClick={() => addOrSub("retirar")}>
            <img

              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Circle_arrow_down_font_awesome.svg/1024px-Circle_arrow_down_font_awesome.svg.png"
            />
          </button>
        </div>
        <span >
          R${(quantity * Number(item.value)).toFixed(2)}
        </span>
        <button onClick={() => removeFood()}>
          <img

            src="https://cdn-icons-png.flaticon.com/512/860/860829.png"
          />
        </button>
      </div>
    </div>
  )

}