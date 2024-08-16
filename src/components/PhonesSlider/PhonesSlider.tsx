import { useState } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../store';
import { TypeCard } from '../../types/TypeCard';
import {
  scrollPositionLeft,
  scrollPositionRight,
} from '../../helpers/changePositionItem';
import { ProductCard } from '../ProductCard/ProductCard';
import './PhonesSlider.scss';

export enum Phones {
  Discount = 'Hot prices',
  New = 'Brand new models',
  Random = 'You may also like',
}

export const PhonesSlider = ({ type }: { type: Phones }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const phones = useAppSelector(state => state.phones.items);
  const itemWidth = useAppSelector(state => state.phones.itemWidth) + 16;
  const count = useAppSelector(state => state.phones.count);

  const findLastYear = () => {
    let lastYear = 0;
    const phonesYears = [];

    for (let i = 1; i < phones.length; i += 1) {
      phonesYears.push(phones[i].year);
    }

    for (let i = 1; i < phonesYears.length; i += 1) {
      if (phonesYears[i] > lastYear) {
        lastYear = phonesYears[i];
      }
    }

    return lastYear;
  };

  const phonesToDisplay = (key: string): TypeCard[] => {
    switch (key) {
      case Phones.Discount:
        return phones
          .filter(phone => phone.fullPrice - phone.price > 0)
          .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
      case Phones.New:
        return phones
          .filter(phone => phone.year === findLastYear())
          .sort((a, b) => b.price - a.price);
      case Phones.Random:
        return phones;
      default:
        return [];
    }
  };

  // eslint-disable-next-line no-console
  console.log(count);

  return (
    <div className="PhonesSlider container">
      <div className="top-container">
        <h2>{type}</h2>

        <div className="top-container__movement">
          <button
            type="button"
            disabled={scrollPosition + itemWidth > 0}
            onClick={() =>
              scrollPositionLeft(
                setScrollPosition,
                scrollPosition,
                itemWidth,
                count,
              )
            }
            className={classNames('top-container__button', {
              disabled: scrollPosition + itemWidth > 0,
            })}
          >
            <img src="./img/ArrowLeft.png" alt="ArrowLeft" />
          </button>
          <button
            type="button"
            onClick={() =>
              scrollPositionRight(
                setScrollPosition,
                scrollPosition,
                itemWidth,
                count,
              )
            }
            disabled={
              scrollPosition - itemWidth <
              -((phonesToDisplay(type).length - count) * itemWidth)
            }
            className={classNames('top-container__button', {
              disabled:
                scrollPosition - itemWidth <
                -((phonesToDisplay(type).length - count) * itemWidth),
            })}
          >
            <img src="./img/ArrowRight.png" alt="ArrowRight" />
          </button>
        </div>
      </div>

      <div
        data-cy="cardsContainer"
        className="cardsContainer"
        style={{
          width: `${count * itemWidth - 16}px`,
        }}
      >
        <ul
          className="cardsContainer__list"
          style={{
            transform: `translateX(${scrollPosition}px)`,
            transition: `transform ${1000}ms ease`,
          }}
        >
          {phonesToDisplay(type).map(card => {
            return (
              <li className="cardsContainer__item" key={card.id}>
                <ProductCard newPhone={type === Phones.Discount} card={card} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
