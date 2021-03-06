import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
const Header = ({ placeHolder }) => {
  const [serchInput, setSerachInput] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const router = useRouter();
  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const search = () => {
    console.log('in search');
    router.push({
      pathname: '/search',
      query: {
        location: serchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests,
      },
    });
  };
  return (
    <header className='sticky top-0 z-50 grid grid-cols-3  bg-white shadow-md p-5 md:px-10 '>
      <div className='relative flex items-center h-10 cursor-pointer my-auto'>
        <Image
          src='https://links.papareact.com/qd3'
          layout='fill'
          objectFit='contain'
          objectPosition='left'
          onClick={() => router.push('/')}
        />
      </div>
      <div className='flex items-center border-2 rounded-full py-2 md:shadow-sm overflow-hidden'>
        <input
          type='text'
          value={serchInput}
          onChange={(e) => setSerachInput(e.target.value)}
          placeholder={placeHolder}
          className='pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400'
        />
        <SearchIcon
          className=' hidden md:inline-flex 
            h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2'
        />
      </div>

      <div className='flex space-x-4 items-center justify-end text-gray-500'>
        <GlobeAltIcon className='h-6 cursor-pointer' />
        <p className='hidden md:inline'> Become a host</p>
        <div className='flex  items-center border-2 rounded-full p-2 space-x-2'>
          <MenuIcon className='h-6 cursor-pointer' />
          <UserCircleIcon className='h-6 cursor-pointer' />
        </div>
      </div>
      {serchInput && (
        <div className='flex  flex-col col-span-3 mx-auto'>
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5b61']}
            onChange={handleSelect}
          />

          <div className='flex items-center border-b mb-4'>
            <h2 className='text-2xl flex-grow font-semibold'>
              Number of guests
            </h2>
            <UsersIcon className='h-5' />
            <input
              min={1}
              type='number'
              className='w-12 pl-2 text-lg outline-none text-red-400'
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests((prev) => e.target.value)}
            />
          </div>
          <div className='flex'>
            <button
              className='flex-grow text-sm text-gra-400 cursor-pointer'
              onClick={() => setSerachInput('')}
            >
              Cancel
            </button>
            <button
              className='flex-grow text-red-400 cursor-pointer'
              onClick={search}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
