import { useEffect, useState } from 'react'
import { CardManager } from '../../components/CardManager/CardManager'
import { Loader } from '../../components/Loader'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'

export const ManageCards = () => {
  const [cards, setCards] = useState([])
  const { request } = useHttp()
  const message = useMessage()

  useEffect(() => {
    async function getCards() {
      const data = await request('/api/manage/cardslist', 'GET')
      setCards(data)
    }
    getCards()
  }, [request])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const manageHandler = async () => {
    try {
      const data = await request('/api/manage/manageCards', 'POST', { cards })
      message(data.message)
    } catch (e) {}
  }

  if (cards.length === 0) {
    return <Loader />
  }

  return (
    <div className="container">
      <CardManager
        cards={cards}
        setCards={setCards}
        manageHandler={manageHandler}
      />
    </div>
  )
}
