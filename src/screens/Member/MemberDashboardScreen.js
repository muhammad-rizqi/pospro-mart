/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Container, Content, H1, Text, Thumbnail} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from '../../redux/action';
import {getBalanceServices} from '../../services/MemberServices';

const MemberDashboardScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const {user} = useSelector((state) => state);

  const onClickLogout = () => {
    dispatch(clearToken());
  };

  const getBalance = () => {
    getBalanceServices(user.id)
      .then((result) => {
        setBalance(result.data.data[0].saldo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <Container>
      <Content>
        <H1>Halo {user.nama}</H1>
        <Thumbnail source={{uri: user.foto}} />
        <Text>{user.email}</Text>
        <Text>Saldo Anda :</Text>
        <Text>Rp. {balance},-</Text>
        <Button onPress={onClickLogout}>
          <Text>Logout</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default MemberDashboardScreen;
