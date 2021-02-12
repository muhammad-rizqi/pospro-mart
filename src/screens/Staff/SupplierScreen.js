import {
  Body,
  Container,
  Content,
  H1,
  List,
  ListItem,
  Spinner,
  Text,
} from 'native-base';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getSupplierServices} from '../../services/StaffServices';

const SupplierScreen = () => {
  const {supplier} = useSelector((state) => state.staff);

  useEffect(() => {
    getSupplierServices();
  }, []);

  return (
    <Container>
      <Content>
        <H1>Supplier Screen</H1>
        {supplier.loading ? (
          <Spinner />
        ) : supplier.data.length === 0 ? (
          supplier.data.error ? (
            <Text>{supplier.data.error}</Text>
          ) : (
            <Text>Kategori Kosong</Text>
          )
        ) : (
          <List>
            {supplier.data.map((suplierData) => (
              <ListItem key={suplierData.id}>
                <Body>
                  <Text>{suplierData.nama}</Text>
                  <Text note numberOfLines={2}>
                    {suplierData.alamat}
                  </Text>
                </Body>
              </ListItem>
            ))}
          </List>
        )}
      </Content>
    </Container>
  );
};

export default SupplierScreen;
