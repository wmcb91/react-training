import React from 'react';
import { User } from './UserForm';

type Props = {
  users: User[];
};

const UserList = ({ users }: Props) => {
  return (
    <div>
      <h2 className='text-lg font-medium text-center'>Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} (ID: {user.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
