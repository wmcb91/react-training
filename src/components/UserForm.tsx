import React, { useState } from 'react';
import Button from './Button';

export type User = {
  firstName: string;
  lastName: string;
  id: number;
};

/**
 * Pick is a TypeScript provided utility type that lets us pick specific keys
 * from a type.
 */
type FormState = Pick<User, 'firstName' | 'lastName'>;

const defaultFormState: FormState = {
  firstName: '',
  lastName: '',
};

type Props = {
  /**
   * React provides some generic types for us to use.
   * React.Dispatch is pretty simple, it just takes a generic type and returns
   * void.
   *
   * React.SetStateAction is a little more complicated. It is a generic type
   * that takes a type and returns a type. It is used to infer the type of the
   * state that is being set.
   *
   * This is overly specific for general components. We would probably want to
   * use a more generic prop like onSubmitSuccess that takes a function that
   * accepts a user and returns void, but if we know we are only want to accept
   * a setter from useState that takes an array of users, this would be the way.
   */
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;

  // This is what onSubmitSuccess would look like:
  // onSubmitSuccess (newUser: User) => void;
};

/**
 *
 */
const UserForm = ({ setUsers }: Props) => {
  const [formState, setFormState] = useState(defaultFormState);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // This is necessary any time you have a form. Otherwise, the page will
    // refresh when you submit the form.
    event.preventDefault();

    const resp = await fetch('/api/newUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    });

    const respJson = await resp.json();

    if (resp.status === 201) {
      /**
       * This is a good example of when to use a callback with useState. We
       * don't need to require users as a prop, we can just use the setter's
       * prevValue argument to get the current value of users.
       */
      setUsers((users) => [respJson as User, ...users]);
      setFormState(defaultFormState);
    } else {
      alert(`error:\n ${JSON.stringify(respJson, null, 2)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-2 items-center justify-center py-4 '
    >
      <input
        className='rounded py-2 px-4'
        type='text'
        name='firstName'
        placeholder='First Name'
        value={formState.firstName}
        onChange={handleNameChange}
      />
      <input
        className='rounded py-2 px-4'
        type='text'
        name='lastName'
        placeholder='Last Name'
        value={formState.lastName}
        onChange={handleNameChange}
      />

      <Button type='submit'>Submit User</Button>
    </form>
  );
};

export default UserForm;
