import { ADD_CART_CARD, REMOVE_CART } from '../types'

const handlers = {
  [ADD_CART_CARD]: (state, { payload }) => ({
    ...state,
    cartCards: payload,
  }),
  [REMOVE_CART]: (state) => ({
    ...state,
    cartCards: [],
  }),
  DEFAULT: (state) => state,
}

export const shopReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
