import {
  Body,
  Button,
  Container,
  Content,
  H3,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Thumbnail,
  Title,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {getMemberListServices} from '../../services/CashierServices';

const MemberListScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [dataMember, setDataMember] = useState([]);

  const getMember = () => {
    setLoading(true);
    getMemberListServices()
      .then((result) => {
        setDataMember(result.data.data);
      })
      .catch((err) => {
        ToastAndroid.show('Gagal mengambil data', ToastAndroid.LONG);
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getMember();
  }, []);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Daftar Member</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          {loading ? (
            <Spinner />
          ) : dataMember.length === 0 ? (
            <Text>Data Kosong</Text>
          ) : (
            dataMember.map((member) => (
              <ListItem key={member.id} thumbnail>
                <Left>
                  <Thumbnail source={{uri: member.foto}} />
                </Left>
                <Body>
                  <Text>{member.nama}</Text>
                  <Text note>{member.kode_member}</Text>
                  <Text note numberOfLines={2}>
                    {member.alamat}
                  </Text>
                </Body>
              </ListItem>
            ))
          )}
        </List>
      </Content>
    </Container>
  );
};

export default MemberListScreen;
