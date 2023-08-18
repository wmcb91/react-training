import Counter from '@/components/Counter';
import UserForm, { User } from '@/components/UserForm';
import UserList from '@/components/UserList';
import { useState } from 'react';

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <div className='bg-gray-50 flex flex-wrap gap-6 py-8 items-start justify-center h-screen w-full'>
      <div className='bg-gray-400 text-gray-900 rounded-lg border p-4'>
        <Counter startingCount={5285} />
      </div>

      <div className='space-y-8'>
        <div className='bg-gray-400 text-gray-900 rounded-lg p-4'>
          <UserForm setUsers={setUsers} />
        </div>

        <div className='bg-gray-400 text-gray-900 rounded-lg p-4 w-64 h-full max-h-48 overflow-y-auto'>
          <UserList users={users} />
        </div>
      </div>
    </div>
  );
};

export default Home;
