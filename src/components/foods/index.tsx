import { foodCartType, foodType } from "../../types"

interface foodProps {
  food: foodType;
  quantity: number;
  setCart: React.Dispatch<React.SetStateAction<foodCartType[]>>;

}

export const Foods = ({ food, quantity, setCart }: foodProps) => {

  const removeFood = () => {
    setCart((prev) =>
      prev.filter((foodCart) => foodCart.productId != food.id)
    );
  };

  const addOrSub = (action: "add" | "sub") => {
    setCart((prev) => {
      const cart = [...prev];
      const index = cart.findIndex(
        (foodCart) => foodCart.productId == food.id
      );
      if (action == "add") {
        cart[index].quantity++;
      } else {
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          removeFood();
        }

      };

      return cart;

    });
  };


  return (
    <div>
      <img

        src={food.img}
      />
      <div >
        <span >{food.title} </span>
        <small >
          {food.description}
        </small>
        <span >R$ {food.value}</span>
      </div>
      <div >
        <span>{quantity}</span>
        <div >
          <button onClick={() => addOrSub("add")}>
            <img

              src="https://cdn-icons-png.flaticon.com/512/4196/4196777.png"
            />
          </button>
          <button onClick={() => addOrSub("sub")}>
            <img

              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Circle_arrow_down_font_awesome.svg/1024px-Circle_arrow_down_font_awesome.svg.png"
            />
          </button>
        </div>
        <span >
          R${(quantity * Number(food.value)).toFixed(2)}
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