import {
  Container,
  Content,
  H1,
  Header,
  List,
  ListItem,
  Spinner,
  Text,
} from 'native-base';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getCategoryServices} from '../../services/StaffServices';

const CategoryScreen = () => {
  const {staff} = useSelector((state) => state);

  useEffect(() => {
    getCategoryServices();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <H1>Category Screen</H1>
        {staff.category.loading ? (
          <Spinner />
        ) : staff.category.data.length === 0 ? (
          staff.category.data.error ? (
            <Text>{staff.category.data.error}</Text>
          ) : (
            <Text>Kategori Kosong</Text>
          )
        ) : (
          <List>
            {staff.category.data.map((category) => (
              <ListItem key={category.id}>
                <Text>{category.nama}</Text>
              </ListItem>
            ))}
          </List>
        )}
      </Content>
    </Container>
  );
};

export default CategoryScreen;
