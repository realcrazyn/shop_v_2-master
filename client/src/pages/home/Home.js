import { useEffect, useState } from 'react'
import { CardDrawer } from '../../components/CardDrawer/CardDrawer'
import { Loader } from '../../components/Loader'
import { useHttp } from '../../hooks/http.hook'
import classes from './Home.module.css'

export const Home = () => {
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

  const newCards = cards.filter((card) =>
    card.title.includes('Apple iPhone 13')
  )

  return (
    <div className={classes.main}>
      <div className={classes.main_section}>
        <h6
          style={{
            fontWeight: 'bold',
            marginBottom: '-50px',
            marginTop: '50px',
          }}
        >
          New goods
        </h6>
        <CardDrawer cards={newCards} />
      </div>
      <div className={classes.main_section}>
        <h6
          style={{
            fontWeight: 'bold',
          }}
        >
          Our shop
        </h6>
        <iframe
          className={classes.main_ourshop__map}
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.8151119547724!2d37.549175565096185!3d55.54493047134537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414aac47783c0a05%3A0xb6e43a5156dec17a!2z0J_QtdGA0LXQutGA0ZHRgdGC0L7Qug!5e0!3m2!1sru!2sru!4v1634191574500!5m2!1sru!2sru"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}
