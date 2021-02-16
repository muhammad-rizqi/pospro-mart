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
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';

const StaffDashboardScreen = ({navigation}) => {
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
          <ListItem onPress={() => navigation.navigate('Category')}>
            <Text>Category</Text>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('Supplier')}>
            <Text>Supplier</Text>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('Item')}>
            <Text>Item</Text>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('Purchase')}>
            <Text>Pembelian</Text>
          </ListItem>
        </List>
        <Button>
          <Text onPress={onClickLogout}>Logout</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default StaffDashboardScreen;
