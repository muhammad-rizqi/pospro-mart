import React, {useEffect} from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Title,
} from 'native-base';
import {useSelector} from 'react-redux';
import {getItemServices} from '../../services/StaffServices';
import {toPrice} from '../../services/helper/helper';

const ItemListScreen = ({navigation}) => {
  const {item} = useSelector((state) => state.staff);

  useEffect(() => {
    getItemServices();
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
          <Title>Rekap Barang</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        {item.loading ? (
          <Spinner />
        ) : item.data.length === 0 ? (
          item.data.error ? (
            <Text>{item.data.error}</Text>
          ) : (
            <Text>Barang Kosong</Text>
          )
        ) : (
          <List>
            {item.data.map((itemData) => (
              <ListItem key={itemData.id}>
                <Body>
                  <Text>{itemData.nama}</Text>
                  <Text note numberOfLines={2}>
                    {itemData.merk}
                  </Text>
                </Body>
                <Text>Rp. {toPrice(itemData.harga_jual)}</Text>
              </ListItem>
            ))}
          </List>
        )}
      </Content>
    </Container>
  );
};

export default ItemListScreen;
