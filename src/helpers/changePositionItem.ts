import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCount, setItemWidth } from '../features/phonesSlice';

export const mainUrl = 'https://mate-academy.github.io/react_phone-catalog';

export const scrollPositionRight = (
  callback: (newPosition: number) => void,
  state: number,
  width: number,
  count = 1,
) => {
  const newPosition = state - width * count;

  callback(newPosition);
};

export const scrollPositionLeft = (
  callback: (newPosition: number) => void,
  state: number,
  width: number,
  count = 1,
) => {
  const newPosition = state + width * count;

  callback(newPosition);
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

export const useItemWidthAndCount = () => {
  const dispatch = useDispatch();
  const { windowWidth } = useWindowSize();
  const itemCard = useRef<HTMLDivElement>(null);

  const itemWidth: number = itemCard.current?.offsetWidth || 272;

  useEffect(() => {
    dispatch(setItemWidth(itemWidth));
  }, [itemWidth, dispatch]);

  const updateCount = (width: number) => {
    if (width < 560) {
      dispatch(setCount(1));
    } else if (width < 850) {
      dispatch(setCount(2));
    } else if (width < 1200) {
      dispatch(setCount(3));
    } else {
      dispatch(setCount(4));
    }
  };

  useEffect(() => {
    updateCount(windowWidth);
  }, [windowWidth]);

  return { itemCard };
};
