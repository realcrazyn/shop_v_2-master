import classes from './CardDrawer.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../../context/shop/shopContext'
import eye from '../../img/eye-solid.svg'

export const CardDrawer = (props) => {
  const { scoreCartCard } = useContext(ShopContext)
  return (
    <div className={classes.card_drawer}>
      {props.cards.map((card, i) => {
        return (
          <div className={classes.card} key={i}>
            <div className={classes.card_link}>
              <Link to={'/card/' + card.code} key={i}>
                <img
                  className={classes.card_img}
                  alt={card.img}
                  src={card.img}
                />
                <div className={classes.shadow}></div>
                <img alt="img" src={eye} className={classes.watch} />
              </Link>
            </div>
            <p className={classes.card_title}>{card.title}</p>
            <p className={classes.card_price}> ₽ {card.price}</p>
            <button
              className={
                classes.card_btn +
                ' waves-effect waves-light btn-small' +
                (card.quantity > 0 ? '' : ' disabled')
              }
              onClick={() => {
                scoreCartCard(card, 'add')
              }}
            >
              Buy
            </button>
          </div>
        )
      })}
    </div>
  )
}
