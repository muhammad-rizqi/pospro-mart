import {
  Container,
  Content,
  H3,
  List,
  ListItem,
  Spinner,
  Text,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {getSelingHistory} from '../../services/CashierServices';

const HistorySellingScreen = () => {
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
      <Content>
        <H3>Halo ini screen riwayat</H3>
        <List>
          {loading ? (
            <Spinner />
          ) : history.length === 0 ? (
            <Text>Data Kosong</Text>
          ) : (
            history.map((data) => (
              <ListItem key={data.id}>
                <Text>{JSON.stringify(data)}</Text>
              </ListItem>
            ))
          )}
        </List>
      </Content>
    </Container>
  );
};

export default HistorySellingScreen;
