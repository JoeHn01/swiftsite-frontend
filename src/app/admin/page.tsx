'use client';

import { useState } from 'react';
import Sidebar from '@/components/Admin/SideBar/SideBar';
import Main from '@/components/Admin/Main/Main';

export default function Dashboard() {
  const [selectedCollection, setSelectedCollection] = useState<string>('Users');

  const handleSelectCollection = (collection: string) => {
    setSelectedCollection(collection);
  };

  return (
    <div className='dashboard'>
      <Sidebar onSelectCollection={handleSelectCollection} />
      <Main selectedCollection={selectedCollection} />
    </div>
  );
}
