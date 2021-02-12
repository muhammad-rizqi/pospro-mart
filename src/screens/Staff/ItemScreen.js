import React, {useEffect} from 'react';
import {
  Body,
  Container,
  Content,
  H1,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
} from 'native-base';
import {useSelector} from 'react-redux';
import {getItemServices} from '../../services/StaffServices';

const ItemScreen = () => {
  const {item} = useSelector((state) => state.staff);

  useEffect(() => {
    getItemServices();
  }, []);
  return (
    <Container>
      <Content>
        <H1>List Barang</H1>
        {item.loading ? (
          <Spinner />
        ) : item.data.length === 0 ? (
          item.data.error ? (
            <Text>{item.data.error}</Text>
          ) : (
            <Text>Kategori Kosong</Text>
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
                <Right>
                  <Text>{itemData.harga_jual}</Text>
                </Right>
              </ListItem>
            ))}
          </List>
        )}
      </Content>
    </Container>
  );
};

export default ItemScreen;
