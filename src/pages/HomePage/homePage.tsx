/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './HomePage.scss';
import { useAppSelector } from '../../store';
import {
  mainUrl,
  scrollPositionLeft,
  scrollPositionRight,
} from '../../helpers/changePositionItem';
import {
  Phones,
  PhonesSlider,
} from '../../components/PhonesSlider/PhonesSlider';

export const HomePage = () => {
  const slider = useRef<HTMLDivElement>(null);
  const sliderWidth: number = slider.current?.offsetWidth || 0;
  const imgWidth = sliderWidth + 48;
  const phones = useAppSelector(state => state.phones.items);
  const [scrollImgPosition, setScrollImgPosition] = useState(0);
  const categoryImg = [
    {
      img: `./img/category/category-phones.png`,
      name: 'Mobile phones',
      count: `${phones.length}`,
      color: '#D53C51',
      type: 'Phones',
    },
    {
      img: `./img/category/category-tablets.png`,
      name: 'Tablets',
      count: 0,
      color: '#D53C51',
      type: 'Tablets',
    },
    {
      img: `./img/category/category-accessories.png`,
      name: 'Accessories',
      count: 0,
      color: '#D53C51',
      type: 'Accessories',
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (scrollImgPosition === -imgWidth * 2) {
        scrollPositionRight(setScrollImgPosition, imgWidth, imgWidth);
      } else {
        scrollPositionRight(setScrollImgPosition, scrollImgPosition, imgWidth);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [scrollImgPosition, imgWidth]);

  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];

    setStartX(touch.clientX);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touch = event.touches[0];

    setEndX(touch.clientX);
  };

  const handleTouchResult = () => {
    const diffX = startX - endX;

    if (diffX > 0) {
      if (!(scrollImgPosition < -imgWidth)) {
        scrollPositionRight(setScrollImgPosition, scrollImgPosition, imgWidth);
      }
    } else if (diffX < 0) {
      if (!(scrollImgPosition >= 0)) {
        scrollPositionLeft(setScrollImgPosition, scrollImgPosition, imgWidth);
      }
    }
  };

  return (
    <div className="Home-page">
      <h1 className="container">Welcome to Nice Gadgets store!</h1>

      <div className="Slider container">
        <div className="Slider__main">
          <button
            type="button"
            className={classNames('Slider__button', {
              disabled: scrollImgPosition >= 0,
            })}
            disabled={scrollImgPosition >= 0}
            onClick={() =>
              scrollPositionLeft(
                setScrollImgPosition,
                scrollImgPosition,
                imgWidth,
              )
            }
          >
            <img src="./img/ArrowLeft.png" alt="ArrowLeft" />
          </button>
          <div
            ref={slider}
            className="Slider__list"
            style={{
              transform: `translateX(${scrollImgPosition}px)`,
              transition: `transform ${1000}ms ease`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchEnd}
            onTouchEnd={handleTouchResult}
          >
            <Link to="Phones">
              <img
                className="Slider__img"
                src={`${mainUrl}/_new/img/banner-phones.png`}
                alt="banner-phones"
              />
            </Link>
            <Link to="Tablets">
              <img
                className="Slider__img"
                src={`${mainUrl}/_new/img/banner-tablets.png`}
                alt="banner-tablets"
              />
            </Link>
            <Link to="Accessories">
              <img
                className="Slider__img"
                src={`${mainUrl}/_new/img/banner-accessories.png`}
                alt="banner-accessories"
              />
            </Link>
          </div>
          <button
            type="button"
            onClick={() =>
              scrollPositionRight(
                setScrollImgPosition,
                scrollImgPosition,
                imgWidth,
              )
            }
            className={classNames('Slider__button', {
              disabled: scrollImgPosition < -imgWidth,
            })}
            disabled={scrollImgPosition < -imgWidth}
          >
            <img src="./img/ArrowRight.png" alt="ArrowRight" />
          </button>
        </div>

        <div className="Slider__line-list">
          <div
            className={classNames('Slider__line', {
              active: scrollImgPosition === 0,
            })}
          />
          <div
            className={classNames('Slider__line', {
              active: scrollImgPosition === -imgWidth,
            })}
          />
          <div
            className={classNames('Slider__line', {
              active: scrollImgPosition === -imgWidth * 2,
            })}
          />
        </div>
      </div>

      <PhonesSlider type={Phones.New} />

      <div data-cy="categoryLinksContainer" className="Category container">
        <h2>Shop by category</h2>
        <ul data-cy="categoryLinksContainer" className="Category__list">
          {categoryImg.map(({ img, name, count, color, type }) => (
            <li className="Category__item" key={name}>
              <div
                className="Category__container"
                style={{ backgroundColor: `${color}` }}
              >
                <Link to={type} className="Category__img-container">
                  <img className="Category__img" src={img} alt={name} />
                </Link>
              </div>

              <div className="Category__description">
                <h4 className="Category__name">{name}</h4>
                <p className="Category__count">{`${count} models`}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <PhonesSlider type={Phones.Discount} />
    </div>
  );
};
