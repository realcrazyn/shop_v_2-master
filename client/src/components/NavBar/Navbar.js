import { Fragment, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ShopContext } from '../../context/shop/shopContext'
import classes from './Navbar.module.css'

export const Navbar = ({ isAuthentificated }) => {
  const { cartCards } = useContext(ShopContext)
  const sum = cartCards.reduce((sum, card) => sum + card.amount, 0)

  const history = useHistory()
  const auth = useContext(AuthContext)
  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav
      className={'nav-wrapper teal lighten-1 ' + classes.navbar}
      style={{ padding: '0 2rem' }}
    >
      <NavLink exact to="/" className="nav-link hide-on-med-and-down">
        <div className="brand-logo">RCN shop</div>
      </NavLink>
      <ul id="nav-mobile" className="right ">
        <li className="nav-item">
          <NavLink exact to="/" className="nav-link">
            Main
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/catalog" className="nav-link">
            Catalog
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/cart" className="nav-link position-relative">
            Shopping Cart
            <span className={sum > 0 ? classes.active : classes.deactive}>
              {sum}
            </span>
          </NavLink>
        </li>
        {isAuthentificated ? (
          <Fragment>
            <li className="nav-item">
              <NavLink exact to="/create" className="nav-link">
                Create Card
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/manage" className="nav-link">
                Manage Cards
              </NavLink>
            </li>
            <li className="nav-item">
              <button
                className="waves-effect waves-light btn-small"
                style={{ marginLeft: '5px' }}
                onClick={logoutHandler}
              >
                Logout
              </button>
            </li>
          </Fragment>
        ) : (
          <li className="nav-item">
            <NavLink
              exact
              to="/auth"
              className="waves-effect waves-light btn-small"
            >
              Auth
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}
