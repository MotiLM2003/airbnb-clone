import Head from 'next/head';
import Banner from '../components/Banner';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';

export default function Home(props) {
  const { exploreData, cardsData } = props;
  console.log('e', cardsData);
  return (
    <div className=''>
      <Head>
        <title>Airbnb Clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Banner />
      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>
          <div className='flex justify-self-center'>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 justify-center w-full'>
              {exploreData?.map(({ img, distance, location }, index) => {
                return (
                  <Card
                    key={index}
                    img={img}
                    distance={distance}
                    location={location}
                  />
                );
              })}
            </div>
          </div>
        </section>
        <section>
          <h2 className='text-4xl font-semibold py-8'>Live anywhere</h2>

          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
            {cardsData?.map((item, index) => {
              return (
                <MediumCard key={index} img={item.img} title={item.title} />
              );
            })}
          </div>
        </section>

        <div>
          <div className=''></div>
        </div>
        <div></div>

        <LargeCard
          img='https://links.papareact.com/4cj'
          title='The Greatest Outdoors'
          description='Wishlists curated by Airbnb'
          buttonText='Get Inspired'
        />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploredata = await fetch('https://links.papareact.com/pyp').then(
    (res) => res.json()
  );

  const cardsData = await fetch('https://links.papareact.com/zp1').then((res) =>
    res.json()
  );

  return {
    props: {
      exploreData: exploredata,
      cardsData,
    },
  };
}
