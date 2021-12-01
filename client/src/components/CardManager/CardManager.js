import { Fragment, useEffect, useState } from 'react'
import classes from './CardManager.module.css'

export const CardManager = ({ cards, setCards, manageHandler }) => {
  const [form, setForm] = useState({
    title: '',
    price: 0,
    quantity: 0,
    description: '',
    img: '',
    color: '',
  })
  const [select, setSelect] = useState(null)

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const selectHandler = (index, card) => {
    setSelect(index)
    setForm(card)
  }

  useEffect(() => {
    const data = cards.map((card) =>
      card.code === form.code ? (card = form) : card
    )
    setCards(data)
  }, [form])

  return (
    <Fragment>
      <ul className={classes.manage_cardlist}>
        {cards.map((card, index) => {
          return (
            <li
              className={
                select === index
                  ? classes.active + ' ' + classes.cardlist_card
                  : classes.cardlist_card
              }
              key={index}
              onClick={() => selectHandler(index, card)}
            >
              <h1 className={classes.cardlist_card__title}>{card.title}</h1>
              {select === index ? (
                <Fragment>
                  <span>Title </span>
                  <input
                    className={classes.cardlist_card__changetitle}
                    value={form.title}
                    name="title"
                    type="text"
                    onChange={changeHandler}
                  />
                  <div>
                    <span>Image </span>
                    <div className={classes.cardlist_card__img}>
                      <img src={form.img} alt="" />
                      <input
                        id="product_img"
                        type="text"
                        value={form.img}
                        className="validate"
                        name="img"
                        onChange={changeHandler}
                      />
                    </div>
                    <span>Quantity </span>
                    <input
                      className={classes.cardlist_card__quantity}
                      value={form.quantity}
                      name="quantity"
                      type="number"
                      onChange={changeHandler}
                    />
                    <span>Color </span>
                    <input
                      className={classes.cardlist_card__color}
                      value={form.color}
                      name="color"
                      type="text"
                      onChange={changeHandler}
                    />
                    <span>Price </span>
                    <input
                      className={classes.cardlist_card__price}
                      value={form.price}
                      name="price"
                      type="number"
                      onChange={changeHandler}
                    />
                  </div>
                  <textarea
                    id="product_description"
                    type="text"
                    value={form.description}
                    className={classes.cardlist_card__description}
                    name="description"
                    onChange={changeHandler}
                  />
                  <button
                    className="btn waves-effect waves-light"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelect(null)
                    }}
                  >
                    Done
                  </button>
                </Fragment>
              ) : null}
            </li>
          )
        })}
      </ul>
      <button className="btn waves-effect waves-light" onClick={manageHandler}>
        Submit
      </button>
    </Fragment>
  )
}
