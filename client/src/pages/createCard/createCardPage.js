import React, { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'

export const CreateCard = () => {
  const message = useMessage()
  const { request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    code: Math.floor(Date.now() / 1000),
    title: '',
    price: 0,
    quantity: 0,
    description: '',
    img: '',
    color: '',
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const createHandler = async () => {
    try {
      const data = await request('/api/manage/createCard', 'POST', { ...form })
      message(data.message)
      setForm({
        code: Math.floor(Date.now() / 1000),
        title: '',
        price: 0,
        quantity: 0,
        description: '',
        img: '',
        color: '',
      })
      window.M.updateTextFields()
    } catch (e) {}
  }

  return (
    <div className="container" style={{ maxWidth: '1100px' }}>
      <div className="row">
        <div className="input-field row s6" style={{ marginTop: '40px' }}>
          <input
            id="product_name"
            type="text"
            value={form.title}
            className="validate"
            name="title"
            onChange={changeHandler}
          />
          <label className="active" htmlFor="product_name">
            Product name
          </label>
        </div>
        <div className="input-field row s6" style={{ marginTop: '40px' }}>
          <input
            id="product_price"
            type="number"
            value={form.price}
            className="validate"
            name="price"
            onChange={changeHandler}
          />
          <label className="active" htmlFor="product_price">
            Product price
          </label>
        </div>
        <div className="input-field row s6" style={{ marginTop: '40px' }}>
          <input
            id="product_quantity"
            type="number"
            value={form.quantity}
            className="validate"
            name="quantity"
            onChange={changeHandler}
          />
          <label className="active" htmlFor="product_quantity">
            Product quantity
          </label>
        </div>
        <div className="input-field row s6" style={{ marginTop: '40px' }}>
          <textarea
            id="product_description"
            type="text"
            value={form.description}
            className="validate materialize-textarea"
            name="description"
            onChange={changeHandler}
          />
          <label className="active" htmlFor="product_description">
            Product description
          </label>
        </div>
        <div className="input-field row s6" style={{ marginTop: '40px' }}>
          <input
            id="product_img"
            type="text"
            value={form.img}
            className="validate"
            name="img"
            onChange={changeHandler}
          />
          <label className="active" htmlFor="product_img">
            Product img
          </label>
        </div>
        <div className="input-field row s6" style={{ marginTop: '40px' }}>
          <input
            id="product_color"
            type="text"
            value={form.color}
            className="validate"
            name="color"
            onChange={changeHandler}
          />
          <label className="active" htmlFor="product_color">
            Product color
          </label>
        </div>
        <button
          className={
            form.title === '' ||
            form.price === 0 ||
            form.description === '' ||
            form.img === '' ||
            form.color === '' ||
            form.quantity === 0
              ? 'btn waves-effect waves-light disabled'
              : 'btn waves-effect waves-light'
          }
          type="submit"
          name="action"
          onClick={createHandler}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
