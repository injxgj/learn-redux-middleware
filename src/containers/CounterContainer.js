import React, { useCallback } from 'react';
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { increaseAsync, decreaseAsync } from '../modules/counter';

function CounterContainer() {
  const number = useSelector(({ counter }) => counter);
  const dispatch = useDispatch();

  const onIncrease = useCallback(() => dispatch(increaseAsync()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decreaseAsync()), [dispatch]);

  return <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />;
}

export default CounterContainer;
