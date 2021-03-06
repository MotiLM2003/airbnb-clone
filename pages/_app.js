import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import Router from 'next/router';
import PorgressBar from '@badrap/bar-of-progress';
import { route } from 'next/dist/server/router';

const progress = new PorgressBar({
  size: 4,
  color: '#fe595e',
  className: 'z-50',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
