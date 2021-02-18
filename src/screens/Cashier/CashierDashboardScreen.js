import React from 'react';
import {
  Button,
  Container,
  Content,
  H1,
  List,
  ListItem,
  Text,
  Thumbnail,
} from 'native-base';
import {logout} from '../../services/AuthServices';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

const CashierDashboardScreen = ({navigation}) => {
  const {user} = useSelector((state) => state);

  const onClickLogout = () => {
    logout();
  };

  return (
    <Container>
      <Content>
        <H1>Halo {user.nama}</H1>
        <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')}>
          <Thumbnail source={{uri: user.foto}} />
        </TouchableOpacity>
        <List>
          <ListItem onPress={() => navigation.navigate('Cart')}>
            <Text>Tambah Penjualan</Text>
          </ListItem>
        </List>
        <List>
          <ListItem onPress={() => navigation.navigate('HistorySelling')}>
            <Text>Riwayat Penjualan</Text>
          </ListItem>
        </List>
        <Button>
          <Text onPress={onClickLogout}>Logout</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default CashierDashboardScreen;
