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
import {getSelingHistory} from '../../services/CashierServices';

const HistorySellingScreen = ({navigation}) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const getHistory = () => {
    setLoading(true);
    getSelingHistory()
      .then((result) => {
        console.log(result.data.data);
        setHistory(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getHistory();
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
          <Title>Riwayat Penjualan</Title>
        </Body>
      </Header>
      <Content>
        <List>
          {loading ? (
            <Spinner />
          ) : history.length === 0 ? (
            <Text>Data Kosong</Text>
          ) : (
            history.map((data) => (
              <ListItem key={data.id}>
                <Body>
                  <Text note>{data.updated_at}</Text>
                  <Text>
                    {data.barang.nama} x{data.jumlah_barang}
                  </Text>
                  <Text note>{data.user.nama}</Text>
                </Body>
                <Right>
                  <Text>{data.total_harga}</Text>
                </Right>
              </ListItem>
            ))
          )}
        </List>
      </Content>
    </Container>
  );
};

export default HistorySellingScreen;
