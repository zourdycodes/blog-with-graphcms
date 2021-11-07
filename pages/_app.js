import { Wrapper } from '../components/templates/Wrapper';
import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
}

export default MyApp;
