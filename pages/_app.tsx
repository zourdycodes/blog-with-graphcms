import { AppProps } from 'next/app';
import { Wrapper } from '../components/templates/Wrapper';
import '../styles/global.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
};

export default MyApp;
