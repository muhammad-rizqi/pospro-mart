import React from 'react';
import {
  Button,
  Container,
  Content,
  H1,
  List,
  ListItem,
  Text,
} from 'native-base';
import {logout} from '../../services/AuthServices';

const StaffDashboardScreen = ({navigation}) => {
  const onClickLogout = () => {
    logout();
  };

  return (
    <Container>
      <Content>
        <H1>Halo Staff</H1>
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
