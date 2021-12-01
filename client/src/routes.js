import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { Card } from './pages/card/Card'
import { Cart } from './pages/cart/Cart'
import { Catalog } from './pages/catalog/Catalog'
import { CreateCard } from './pages/createCard/createCardPage'
import { Home } from './pages/home/Home'
import { ManageCards } from './pages/manageCards/manageCardsPage'

export const useRoutes = (isAuthentificated) => {
  if (isAuthentificated) {
    return (
      <Switch>
        <Route path="/cart" component={Cart} />
        <Route path="/card/:name" component={Card} />
        <Route path="/catalog" component={Catalog} exact />
        <Route path="/create" component={CreateCard} exact />
        <Route path="/manage" component={ManageCards} exact />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/cart" component={Cart} />
      <Route path="/card/:name" component={Card} />
      <Route path="/catalog" component={Catalog} exact />
      <Route path="/auth" component={AuthPage} exact />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  )
}
