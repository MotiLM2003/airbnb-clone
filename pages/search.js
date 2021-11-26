import { useRouter } from 'next/dist/client/router';
import React from 'react';
import Head from 'next/head';
import { format } from 'date-fns';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';

const Search = ({ searchResults }) => {
  const router = useRouter();
  const { location, startDate, endDate, numberOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), 'dd MMMM yy');
  const formattedEndDate = format(new Date(endDate), 'dd MMMM yy');
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div className='h-screen'>
      <Head>
        <title>Airbnb Clone - Search page</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header
        placeHolder={`${location} - ${range} -  ${numberOfGuests} guests`}
      />

      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p>
            300+ stays - {range} for {numberOfGuests} gets
          </p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays {location}</h1>
          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800'>
            <p className='button text-xs'>Caneltion felxibily</p>
            <p className='button'>Type of a place</p>
            <p className='button'>Price</p>
            <p className='button'>Rooms and Beds</p>
            <p className='button'>More filtes</p>
            <p></p>
          </div>
          <div className='flex flex-col'>
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
        <section className='hidden md:inline-flex md:min-w-[400px] xl:inline-flex xl:min-w-[600px]'>
          <Map searchResults={searchResults} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults: searchResults,
    },
  };
}
