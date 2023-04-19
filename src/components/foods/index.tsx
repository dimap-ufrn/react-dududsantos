import { foodCartType, foodType } from '../../types'
import styles from './styles.module.scss'

interface foodProps {
  food: foodType
  quantity: number
  setCart: React.Dispatch<React.SetStateAction<foodCartType[]>>
}

export const Foods = ({ food, quantity, setCart }: foodProps) => {
  const removeFood = () => {
    setCart(prev => prev.filter(foodCart => foodCart.productId != food.id))
  }

  const addOrSub = (action: 'add' | 'sub') => {
    setCart(prev => {
      const cart = [...prev]
      const index = cart.findIndex(foodCart => foodCart.productId == food.id)
      if (action == 'add') {
        cart[index].quantity++
      } else {
        if (cart[index].quantity > 1) {
          cart[index].quantity--
        } else {
          removeFood()
        }
      }

      return cart
    })
  }

  return (
    <div className={styles.boxItems}>
      <img className={styles.foodPic} src={food.img} />
      <div className={styles.foodDetail}>
        <span>{food.title} </span>
        <small>{food.description}</small>
        <span>R$ {food.value}</span>
      </div>
      <div className={styles.foodActions}>
        <span>{quantity}</span>
        <div className={styles.actions}>
          <button onClick={() => addOrSub('add')}>
            <img src="https://cdn-icons-png.flaticon.com/512/60/60564.png" />
          </button>
          <button onClick={() => addOrSub('sub')}>
            <img src="https://cdn-icons-png.flaticon.com/512/25/25623.png" />
          </button>
        </div>
        <span className={styles.foodValue}>
          R${(quantity * Number(food.value)).toFixed(2)}
        </span>
        <button onClick={() => removeFood()}>
          <img src="https://cdn-icons-png.flaticon.com/512/860/860829.png" />
        </button>
      </div>
    </div>
  )
}
