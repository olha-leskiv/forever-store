import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)!;
    const [cartAmount, setCartAmount] = useState(0);

    useEffect(() => {
        const fetchCartAmount = async () => {
        const amount = await getCartAmount();
        setCartAmount(amount);
        };

        fetchCartAmount();
    }, [getCartAmount]);

  return (
    <div className="w-full">
        <div className="text-2xl">
            <Title text1="Cart" text2="Totals" />
        </div>

        <div className="flex flex-col gap-2 mt-3 text-sm">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency}{cartAmount}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>{currency}{delivery_fee}.00</p>
            </div>
            <hr />
               <div className="flex justify-between">
                <b>Total</b>
                <b>{currency}{cartAmount === 0 ? 0 : cartAmount + delivery_fee}.00</b>
            </div>
        </div>
      
    </div>
  )
}

export default CartTotal
