import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Title,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {getAbsentServices} from '../../services/ManagerServices';

const AbsentReportScreen = ({navigation}) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAbsent = () => {
    setLoading(true);
    getAbsentServices()
      .then((result) => {
        setReport(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAbsent();
  }, []);
  console.log(report);
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Laporan Absen</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          {loading ? (
            <Spinner />
          ) : report ? (
            report.length > 0 &&
            report.map((absent, index) => (
              <ListItem key={index}>
                <Body>
                  <Text>{absent.nama}</Text>
                </Body>
                <Text note>{absent.hadir}</Text>
              </ListItem>
            ))
          ) : (
            <Text>Data Kosong</Text>
          )}
        </List>
      </Content>
    </Container>
  );
};

export default AbsentReportScreen;
