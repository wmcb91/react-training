import Counter from '@/components/Counter';
import UserForm, { User } from '@/components/UserForm';
import { useState } from 'react';

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <div className='flex flex-col gap-6 items-center justify-center h-screen w-full'>
      <div className='bg-gray-400 text-gray-900 rounded-lg border p-4'>
        <div className='flex flex-col items-center'>
          <Counter startingCount={5285} />
        </div>
      </div>
      <div className='bg-gray-400 text-gray-900 rounded-lg border p-4'>
        <UserForm setUsers={setUsers} />
      </div>

      <div className='bg-gray-400 text-gray-900 rounded-lg border p-4 w-64 h-full max-h-48 overflow-y-auto'>
        {users.map((user) => (
          <div key={user.id}>
            {user.firstName} {user.lastName} (ID: {user.id})
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
