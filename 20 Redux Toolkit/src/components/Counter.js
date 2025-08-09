import { useDispatch, useSelector } from 'react-redux';
import classes from './Counter.module.css';
import {countActions} from './../store/count-slice';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count.count);
  const toggleShow = useSelector((state) => state.count.toggleShow);


  const incrementHandler = () => dispatch(countActions.increment())
  const decrementHandler = () => dispatch(countActions.decrement())
  const increaseHandler = () => dispatch(countActions.increase(5))
  const toggleCounterHandler = () => dispatch(countActions.toggleShow());

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {toggleShow && <div className={classes.value}>{count}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase By 5</button>
        <button onClick={decrementHandler}>Derement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

