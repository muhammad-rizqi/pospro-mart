import {
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
  Label,
  List,
  ListItem,
  Spinner,
  Text,
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

const CategoryScreen = () => {
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
      <Header />
      <Modal visible={modal}>
        <Content>
          <H1>{catId ? 'Update' : 'Tambah'} Kategori</H1>
          <Icon
            name="close"
            onPress={() => {
              setModal(!modal);
              resetField();
            }}
          />
          <Form>
            <Item rounded>
              <Label>Nama Ketegori</Label>
              <Input placeholder="Ayam" value={name} onChangeText={setName} />
            </Item>
            <Button
              rounded
              block
              disabled={loading}
              onPress={catId ? onClickUpdate : onClickAdd}>
              {loading && <Spinner color="white" />}
              <Text>{catId ? 'Update' : 'Tambah'} Kategori</Text>
            </Button>
            {catId && (
              <Button
                rounded
                block
                danger
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
              <ListItem key={category.id} onPress={() => setUpdate(category)}>
                <Text>{category.nama}</Text>
              </ListItem>
            ))}
          </List>
        )}
      </Content>
      <Fab position="bottomRight" onPress={() => setModal(true)}>
        <Icon name="add" />
      </Fab>
    </Container>
  );
};

export default CategoryScreen;
