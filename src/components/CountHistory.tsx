import { useRef } from 'react';

type Props = {
  countHistory: number[];
};

/**
 * Displays a list of numbers. Changes colors when the list starts to overflow.
 */
const CountHistory = ({ countHistory }: Props) => {
  const countHistoryRef = useRef<HTMLUListElement>(null);

  const countHistoryHeight =
    countHistoryRef.current?.getBoundingClientRect().height || 0;

  // @TODO: 144 is currently a magic number. It equates to max-h-36, but we
  // would be better off giving it a good variable name.
  const countHistoryBgColor =
    countHistoryHeight >= 144 ? 'rgb(254, 202, 202)' : '#fff';

  return (
    <div>
      <h2 className='text-center font-semibold rounded pt-6 mb-1 px-4 text-white'>
        Count History
      </h2>

      <ul
        ref={countHistoryRef}
        className='flex flex-wrap gap-2 rounded items-start justify-center py-4 max-w-xs max-h-36 overflow-y-scroll'
        style={{
          backgroundColor: countHistoryBgColor,
        }}
      >
        {countHistory.map((count) => (
          <li key={count}>{count}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountHistory;
