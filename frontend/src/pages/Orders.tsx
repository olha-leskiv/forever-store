import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { Order, OrderItem } from '../types/types'


const Orders = () => {
  const [orderData, setOrderData ] = useState<OrderItem[]>([])

  const { backendUrl, token, currency } = useContext(ShopContext)!;

  const loadOrderData = async () => {
    try {
      if(!token) return null;

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers: { token }})

      if(response.data.success) {
        const allOrdersItem: OrderItem[] = [];
        response.data.orders.map((order: Order ) => {
          order.items.map((item: OrderItem)=> [
            item['status'] = order.status,
            item['payment'] = order.payment,
            item['paymentMethod'] = order.paymentMethod,
            item['date'] = order.date,
            allOrdersItem.push(item)
,
          ])
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.error(error)
    }
  }



  useEffect(() => {
    loadOrderData()
  }, [token])


  return (
    <div className="pt-16 border-t">
      <div className="text-2xl">
        <Title text1="My" text2="Orders" />
      </div>

      <div>
        {orderData.length > 0 ? orderData.map((item: OrderItem, index) => (
            <div key={index} className="flex flex-col gap-4 py-4 text-gray-700 border-y md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={item.image[0]} alt=''/>
                <div>
                  <p className="font-medium sm:text-base">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p className="text-lg">{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1">Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                  <p className="mt-1">Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
                </div>
              </div>

                <div className="flex justify-between md:w-1/2">
                  <div className="flex items-center gap-2">
                    <p className="h-2 bg-green-500 rounded-full min-w-2"></p>
                    <p>{item.status}</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium border rounded-sm">Track Order</button>
                </div>
            </div>
          )) : null
        }
      </div>
    </div>
  )
}

export default Orders
