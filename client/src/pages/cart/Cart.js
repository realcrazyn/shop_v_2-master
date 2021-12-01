import { useContext, useState } from 'react'
import { CartDrawer } from '../../components/CartDrawer/CartDrawer'
import { ShopContext } from '../../context/shop/shopContext'
import { useHttp } from '../../hooks/http.hook'
import emailjs, { init } from 'emailjs-com'

export const Cart = () => {
  const { request } = useHttp()
  const { cartCards, scoreCartCard } = useContext(ShopContext)
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
  })

  init('user_jK0LKK7txIC86ZggNTre7')

  const submitOrder = async () => {
    try {
      const template_params = {
        ...form,
        message: cartCards.reduce(
          (list, card) => list + ' <br> ' + card.title,
          ''
        ),
        sum: cartCards.reduce((sum, card) => sum + card.price * card.amount, 0),
      }
      await request('/api/manage/submitOrder', 'POST', { cartCards })
      emailjs
        .send(
          'service_xgxsj3r',
          'template_ri7nmxt',
          template_params,
          'user_jK0LKK7txIC86ZggNTre7'
        )
        .then(
          (result) => {
            alert('Message Sent, We will get back to you shortly', result.text)
          },
          (error) => {
            alert('An error occurred, Please try again', error.text)
          }
        )

      scoreCartCard()
    } catch (e) {}
  }

  return (
    <div>
      <CartDrawer
        cards={cartCards}
        scoreCartCard={scoreCartCard}
        submitOrder={submitOrder}
        setForm={setForm}
        form={form}
      />
    </div>
  )
}
