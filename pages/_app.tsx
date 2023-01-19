import '@/styles/globals.css';
import { Row, Col } from 'antd';
import type { AppProps } from 'next/app';
import DisplayUsersData from './displayUsers';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Row justify="space-around">
      <Col span={10}>
        <Component {...pageProps} />
      </Col>

      <Col span={10}>
        <br />
        <DisplayUsersData />
      </Col>
    </Row>
  );
}
