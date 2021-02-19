import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Spinner,
  Text,
  Title,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {getDailyReportServices} from '../../services/ManagerServices';

const DailyReportScreen = ({navigation}) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const getReport = () => {
    setLoading(true);
    getDailyReportServices()
      .then((result) => {
        setReport(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getReport();
  }, []);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Laporan Harian</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        {loading ? (
          <Spinner />
        ) : report ? (
          <Text>{JSON.stringify(report)}</Text>
        ) : (
          <Text>Data Kosong</Text>
        )}
      </Content>
    </Container>
  );
};

export default DailyReportScreen;
