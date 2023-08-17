import { Component } from 'react';

type Props = {
  startingCount?: number;
};

type FormState = {
  first: string;
  last: string;
};

class Counter extends Component<
  Props,
  { count: number; formState: FormState }
> {
  constructor({ startingCount = 0 }: Props) {
    super({ startingCount });

    this.state = {
      count: startingCount,
      formState: {
        first: 'hi',
        last: 'there',
      },
    };
  }

  onDecrement = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };

  onIncrement = () => {
    this.setState({
      count: this.state.count + 1,
      formState: {
        ...this.state.formState,
        first: 'some else'
      }
    });
  };

  render() {
    const { count } = this.state;
    const { onDecrement, onIncrement } = this;

    return (
      <div className='bg-gray-500 text-gray-900 rounded-lg border p-4'>
        <h1>Count: {count}</h1>

        <button name='inc' onClick={onIncrement}>
          Increase +
        </button>
        <button name='dec' onClick={onDecrement}>
          Decrease -
        </button>
      </div>
    );
  }
}

export default function Home() {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <Counter startingCount={7} />
    </div>
  );
}
