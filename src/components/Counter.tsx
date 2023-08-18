import { useEffect, useState } from 'react';
import Button from './Button';
import CountHistory from './CountHistory';

type Props = {
  /**
   * Optional starting count. Defaults to 0.
   */
  startingCount?: number;
};

/**
 * Goes up, goes down, keeps track of history.
 */
function Counter({ startingCount = 0 }: Props) {
  const [count, setCount] = useState(startingCount);
  const [countHistory, setCountHistory] = useState<number[]>([startingCount]);
  const [allowChangeByOne, setAllowChangeByOne] = useState(true);

  /**
   * This was an example of how e.currentTarget works, but probably isn't
   * the best way to do things.
   */
  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newValue = event.currentTarget.name === 'inc' ? count + 1 : count - 1;

    setCount(newValue);
  };

  /**
   * Updates the count by the given amount.
   *
   * @param countChange The amount to change the count by.
   */
  const updateCount = (countChange: number) => {
    setCount(count + countChange);
  };

  /**
   * This is a side effect. It will run every time count changes. In this case,
   * a side effect of updating count is updating countHistory.
   */
  useEffect(() => {
    // This is probably the best example of when to definitely use a callback
    // in a state setter. We want to prepend a new value to the previous state, but if
    // we just did setCountHistory([count, ...countHistory]), we would be prompted
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
    <div className='flex flex-col items-center w-[570px]'>
      <div className='relative w-full flex justify-center'>
        <h1 className='max-w-fit mb-3 text-center text-gray-950 font-semibold rounded py-2 px-4 bg-white'>
          Count: {count}
        </h1>

        <div className='flex flex-col items-center absolute top-1 left-1'>
          <label>
            <input
              className='mr-1'
              type='checkbox'
              checked={allowChangeByOne}
              onChange={(event) => setAllowChangeByOne(event.target.checked)}
            />
            Allow +/- 1
          </label>
        </div>
      </div>

      <div className='flex space-x-5'>
        <Button onClick={() => updateCount(-3)}>Decrease ---</Button>

        {allowChangeByOne && (
          // This is a React fragment short hand. It is the same as <React.Fragment>.
          // It lets us return multiple elements without having to wrap them in a
          // div or other element. It's particularly useful in this case because
          // the parent is using flex and providing the spacing between the buttons.
          <>
            <Button onClick={() => updateCount(-1)}>Decrease -</Button>
            <Button
              // Sometimes it is useful to use an anonymous function with event
              // handler type props. This lets you pass in arguments to the function.
              // It's particularly useful when you're passing handlers to child
              // components that are rendered in a loop.
              onClick={() => updateCount(1)}

              // This was how we were using onButtonClick.
              // onClick={onButtonClick}
              // name='inc'
            >
              Increase +
            </Button>
          </>
        )}

        <Button onClick={() => updateCount(3)}>Increase +++</Button>
      </div>

      <CountHistory countHistory={countHistory} />
    </div>
  );
}

export default Counter;
