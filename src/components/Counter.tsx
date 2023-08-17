import { useEffect, useState } from 'react';
import Button from './Button';

type Props = {
  /**
   * Optional starting count. Defaults to 0.
   */
  startingCount?: number;
};

/**
 *
 */
function Counter({ startingCount = 0 }: Props) {
  const [count, setCount] = useState(startingCount);
  const [countHistory, setCountHistory] = useState<number[]>([startingCount]);

  /**
   * This was an example of how e.currentTarget works, but probably isn't
   * the best way to do things.
   */
  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newValue = event.currentTarget.name === 'inc' ? count + 1 : count - 1;

    setCount(newValue);
  };

  const updateCount = (countChange: 1 | -1) => {
    setCount(count + countChange);
  };

  /**
   * This is a side effect. It will run every time count changes. In this case,
   * a side effect of updating count is updating countHistory.
   */
  useEffect(() => {
    // This is probably the best example of when to definitely use a callback
    // in a state setter. We want to append to the previous state, but if
    // we just did setCountHistory([...countHistory, count]), we would be prompted
    // to add countHistory to the dependencies array. This would cause an infinite
    // loop because arrays if we add to countHistory, it would change, this
    // hook would run again, and we would add to countHistory again, etc.
    setCountHistory((prevHistory) => {
      const uniqueCountHistory = new Set([count, ...prevHistory]);

      return Array.from(uniqueCountHistory);
    });
  }, [count]);

  // You can uncomment this to see the infinite loop.
  // useEffect(() => {
  //   setCountHistory([...countHistory, count]);
  // }, [count, countHistory]);

  return (
    // This is a React fragment in short hand syntax. Same as <React.Fragment>.
    // It lets us return multiple elements without having to wrap them in a
    // div or other element.
    // It's not a good place to use a fragment, but it's just an example.
    <>
      <h1 className='max-w-fit mb-3 text-center text-gray-950 font-semibold rounded py-2 px-4 bg-white'>
        Count: {count}
      </h1>

      <div className='flex space-x-5'>
        <Button
          name='inc'
          // Sometimes it is useful to use an anonymous function with event
          // handler type props. This lets you pass in arguments to the function.
          // It's particularly useful when you're passing handlers to child
          // components that are rendered in a loop.
          onClick={() => updateCount(1)}

          // This was how we were using onButtonClick
          // onClick={onButtonClick}
        >
          Increase +
        </Button>
        <Button name='dec' onClick={onButtonClick}>
          Decrease -
        </Button>
      </div>

      <div>
        <h2 className='text-center text-gray-950 font-semibold rounded pt-6 px-4 text-white'>
          Count History
        </h2>

        <ul className='flex flex-wrap gap-2 items-center justify-center py-4 max-w-xs h-48 overflow-y-scroll'>
          {countHistory.map((count) => (
            <li key={count}>{count}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Counter;
