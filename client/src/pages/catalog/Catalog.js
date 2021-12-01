import { useEffect, useState } from 'react'
import { CardDrawer } from '../../components/CardDrawer/CardDrawer'
import { Loader } from '../../components/Loader'
import { useHttp } from '../../hooks/http.hook'

export const Catalog = () => {
  const { request } = useHttp()
  const [cards, setCards] = useState([])

  useEffect(() => {
    async function getCards() {
      const data = await request('/api/manage/cardslist', 'GET')
      setCards(data)
    }
    getCards()
  }, [request])

  if (cards.length === 0) {
    return <Loader />
  }

  return (
    <div className="cards_container">
      <CardDrawer cards={cards} />
    </div>
  )
}
