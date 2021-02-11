import React from 'react';
import {Button, Container, Content, H1, Text} from 'native-base';
import {logout} from '../../services/AuthServices';

const CashierDashboardScreen = () => {
  const onClickLogout = () => {
    logout();
  };

  return (
    <Container>
      <Content>
        <H1>Halo Cashier</H1>
        <Button>
          <Text onPress={onClickLogout}>Logout</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default CashierDashboardScreen;
