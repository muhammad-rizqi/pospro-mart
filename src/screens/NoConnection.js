import {Button, Container, Content, H1, Text} from 'native-base';
import React from 'react';
import {getProfileServices} from '../services/UserServices';

const NoConnection = () => {
  return (
    <Container>
      <Content>
        <H1>No Connection</H1>
        <Button onPress={() => getProfileServices()}>
          <Text>Try Again</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default NoConnection;
