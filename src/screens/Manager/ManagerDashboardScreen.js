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

const ManagerDashboardScreen = ({navigation}) => {
  const onClickLogout = () => {
    logout();
  };

  return (
    <Container>
      <Content>
        <H1>Halo Manager</H1>
        <List>
          <ListItem onPress={() => navigation.navigate('Allocation')}>
            <Text>Pengeluaran</Text>
          </ListItem>
        </List>
        <Button>
          <Text onPress={onClickLogout}>Logout</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default ManagerDashboardScreen;
