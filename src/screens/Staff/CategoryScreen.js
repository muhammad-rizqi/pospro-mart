import {
  Body,
  Button,
  Container,
  Content,
  Fab,
  Form,
  H1,
  Header,
  Icon,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Title,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Modal, ToastAndroid} from 'react-native';
import {useSelector} from 'react-redux';
import {
  addCategoryServices,
  deleteCategoryServices,
  getCategoryServices,
  updateCategoryServices,
} from '../../services/StaffServices';
import {styles} from '../../styles/MainStyles';

const CategoryScreen = ({navigation}) => {
  const {staff} = useSelector((state) => state);
  const [modal, setModal] = useState(false);
  const [catId, setCatId] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    getCategoryServices();
  }, []);

  const resetField = () => {
    setCatId(null);
    setName('');
  };

  const setUpdate = (categoryItem) => {
    setModal(true);
    setCatId(categoryItem.id);
    setName(categoryItem.nama);
  };

  const onClickAdd = () => {
    setLoading(true);
    addCategoryServices(name)
      .then((res) => {
        if (res.data.code === 201) {
          ToastAndroid.show('Berhasil Menambah Kategori', ToastAndroid.LONG);
          setModal(false);
          resetField();
        } else {
          ToastAndroid.show('Gagal Menambah Kategori', ToastAndroid.LONG);
        }
        console.log(res.data);
      })
      .catch((err) => {
        ToastAndroid.show('Gagal Menambah Kategori', ToastAndroid.LONG);
        console.log(err.response);
      })
      .finally(() => {
        getCategoryServices();
        setLoading(false);
      });
  };

  const onClickUpdate = () => {
    setLoading(true);
    updateCategoryServices(catId, name)
      .then(() => {
        ToastAndroid.show('Berhasil Merubah Kategori', ToastAndroid.LONG);
        setModal(false);
        resetField();
      })
      .catch((err) => {
        ToastAndroid.show('Gagal Merubah Kategori', ToastAndroid.LONG);
        console.log(err.response);
      })
      .finally(() => {
        getCategoryServices();
        setLoading(false);
      });
  };

  const onClickDelete = () => {
    setDeleteLoading(true);
    deleteCategoryServices(catId)
      .then(() => {
        ToastAndroid.show('Berhasil Menghapus Kategori', ToastAndroid.LONG);
        setModal(false);
        resetField();
      })
      .catch((err) => {
        ToastAndroid.show('Gagal Menghapus Kategori', ToastAndroid.LONG);
        console.log(err.response);
      })
      .finally(() => {
        getCategoryServices();
        setDeleteLoading(false);
      });
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Kategori</Title>
        </Body>
        <Right />
      </Header>
      <Modal visible={modal}>
        <Content style={styles.padding16}>
          <View style={styles.alignFlexEnd}>
            <Icon
              name="close"
              onPress={() => {
                setModal(!modal);
                resetField();
              }}
            />
          </View>
          <H1 style={styles.marginV8}>
            {catId ? 'Update' : 'Tambah'} Kategori
          </H1>
          <Form>
            <View style={styles.marginV8}>
              <Text note>Nama Ketegori</Text>
              <Item regular style={styles.radius5}>
                <Input
                  placeholder="Kategori"
                  value={name}
                  onChangeText={setName}
                />
              </Item>
            </View>
            <Button
              block
              style={styles.marginV8}
              disabled={loading}
              onPress={catId ? onClickUpdate : onClickAdd}>
              {loading && <Spinner color="white" />}
              <Text>{catId ? 'Update' : 'Tambah'} Kategori</Text>
            </Button>
            {catId && (
              <Button
                block
                danger
                style={styles.marginV8}
                disabled={deleteLoading}
                onPress={onClickDelete}>
                {deleteLoading && <Spinner color="white" />}
                <Text>Hapus Kategori</Text>
              </Button>
            )}
          </Form>
        </Content>
      </Modal>
      <Content>
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
              <ListItem key={category.id} onPress={() => setUpdate(category)}>
                <Text>{category.nama}</Text>
              </ListItem>
            ))}
          </List>
        )}
      </Content>
      <Fab
        position="bottomRight"
        onPress={() => setModal(true)}
        style={styles.backgroundPrimary}>
        <Icon name="add" />
      </Fab>
    </Container>
  );
};

export default CategoryScreen;
