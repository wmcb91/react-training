import { useEffect, useState } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  bgColor?: string;
};

const Button = ({ bgColor, ...props }: ButtonProps) => {
  let bgColorHex = '#fff';

  if (bgColor === 'blue') {
    bgColorHex = '#0000ff';
  }

  return (
    <button
      style={{
        backgroundColor: bgColorHex,
      }}
      // Props spreading
      {...props}
    >
      {props.children}
    </button>
  );
};

type FormState = {
  first: string;
  last: string;
};

type Props = {
  startingCount?: number;
};

/**
 *
 */
function Counter({ startingCount = 0 }: Props) {
  const [count, setCount] = useState(startingCount);

  const [formState, setFormState] = useState<FormState>({
    first: '',
    last: '',
  });

  const onButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const newValue = event.currentTarget.name === 'inc' ? count + 1 : count - 1;

    setCount(newValue);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  useEffect(() => {
    console.log('mounted');

    return () => {
      console.log('unmounted');
    };
  }, []);

  return (
    <div className='bg-gray-500 text-gray-900 rounded-lg border p-4'>
      <h1>Count: {count}</h1>

      <Button bgColor='blue' name='inc' onClick={onButtonClick}>
        Increase +
      </Button>
      <Button name='dec' onClick={onButtonClick}>
        Decrease -
      </Button>

      <div className='py-4 space-x-5'>
        <input
          type='text'
          name='first'
          value={formState.first}
          onChange={handleNameChange}
        />
        <input
          type='text'
          name='last'
          value={formState.last}
          onChange={handleNameChange}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [showCounter, setShowCounter] = useState(true);

  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <div className='py-4 space-x-5'>
        <Button
          className='text-gray-400'
          onClick={() => setShowCounter(!showCounter)}
        >
          Toggle
        </Button>
      </div>

      {showCounter ? <Counter startingCount={5285} /> : null}
    </div>
  );
}
