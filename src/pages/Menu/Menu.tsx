import { Link, NavLink, useLocation } from 'react-router-dom';
import './Menu.scss';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store';
import { setMenuStatus } from '../../features/phonesSlice';

export const Menu = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const favouritesPhones = useAppSelector(
    state => state.favouritesPhones.favouritesPhones,
  );

  const cartPhones = useAppSelector(state => state.cartPhones.phonesInCart);
  const isMenuOpen = useAppSelector(state => state.phones.isMenuOpen);

  const HeaderText = ['', 'Phones', 'Tablets', 'Accessories'];

  return (
    <div className={classNames('Menu', { 'Menu--open': isMenuOpen })}>
      <div className="Menu__head">
        <div className="Menu__head-left">
          <Link to="/" className="Logo">
            <img src="./img/logo.svg" alt="Logo" />
          </Link>
        </div>

        <div className="Menu__head-right">
          <button
            onClick={() => dispatch(setMenuStatus('none'))}
            className="close"
          >
            <img src="./img/Close.svg" alt="Close" />
          </button>
          {/* <Link to="/" className="close">
            <img src="./img/Close.svg" alt="Close" />
          </Link> */}
        </div>
      </div>

      <div className="Menu__top-container">
        <nav className="Menu__nav">
          <ul className="Menu__nav-list">
            {HeaderText.map(text => (
              <li className="Menu__nav-item" key={text}>
                <NavLink
                  to={`/${text}`}
                  className={({ isActive }) =>
                    classNames({
                      active__link: isActive,
                    })
                  }
                  onClick={() => dispatch(setMenuStatus('none'))}
                >
                  {text || 'Home'}
                </NavLink>

                <div
                  className={classNames({
                    active__line:
                      location.pathname === `/${text}` ||
                      (location.pathname.includes('Phones') &&
                        text === 'Phones'),
                  })}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="Menu__low-container">
        <NavLink
          to="./Favorites"
          className="category"
          onClick={() => dispatch(setMenuStatus('none'))}
        >
          <div
            className={classNames({
              active__line: location.pathname === `/${'Favorites'}`,
            })}
          />
          <img src="./img/heart.svg" alt="Favorites" />
          {favouritesPhones.length > 0 && (
            <div className="circle">{favouritesPhones.length}</div>
          )}
        </NavLink>
        <NavLink
          to="./Cart"
          className="category"
          onClick={() => dispatch(setMenuStatus('none'))}
        >
          <div
            className={classNames({
              active__line: location.pathname === `/${'Cart'}`,
            })}
          />
          <img src="./img/bag.svg" alt="Cart" />
          {cartPhones.length > 0 && (
            <div className="circle">
              {cartPhones.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.countToSell,
                0,
              )}
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
};
