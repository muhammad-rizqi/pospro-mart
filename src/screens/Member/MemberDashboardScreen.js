import {Button, Container, Content, H1, Text} from 'native-base';
import React from 'react';
import {useDispatch} from 'react-redux';
import {clearToken} from '../../redux/action';

const MemberDashboardScreen = () => {
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(clearToken());
  };

  return (
    <Container>
      <Content>
        <H1>Halo Member</H1>
        <Button onPress={onClickLogout}>
          <Text>Logout</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default MemberDashboardScreen;
