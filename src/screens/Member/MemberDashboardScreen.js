import {Button, Container, Content, H1, Text, Thumbnail} from 'native-base';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from '../../redux/action';

const MemberDashboardScreen = () => {
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state);

  const onClickLogout = () => {
    dispatch(clearToken());
  };

  console.log(user);
  return (
    <Container>
      <Content>
        <H1>Halo {user.nama}</H1>
        <Thumbnail source={{uri: user.foto}} />
        <Text>{user.email}</Text>
        <Button onPress={onClickLogout}>
          <Text>Logout</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default MemberDashboardScreen;
