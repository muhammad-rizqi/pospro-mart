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
import {toPrice} from '../../services/helper/helper';
import {
  addAllocationServices,
  getAllocationServices,
  updateAllocationServices,
  deleteAllocationServices,
} from '../../services/ManagerServices';
import {styles} from '../../styles/MainStyles';

const AllicationScreen = ({navigation}) => {
  const {allocation} = useSelector((state) => state.manager);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [allocationId, setAllocationId] = useState(null);
  const [tipe, setTipe] = useState('');
  const [biaya, setBiaya] = useState(1);

  const setUpdate = (data) => {
    setAllocationId(data.id);
    setTipe(data.tipe);
    setBiaya(data.biaya);
  };

  const resetField = () => {
    setAllocationId(null);
    setTipe('');
    setBiaya(1);
  };

  const onClickAdd = () => {
    if (tipe === '' || biaya < 1) {
      ToastAndroid.show('isi dengan benar', ToastAndroid.LONG);
    } else {
      setLoading(true);
      addAllocationServices(tipe, biaya)
        .then(() => {
          ToastAndroid.show('Berhasil Menambah Pengeluaran', ToastAndroid.LONG);
          setModal(false);
          resetField();
        })
        .catch((err) => {
          ToastAndroid.show('Gagal Menambah Pengeluaran', ToastAndroid.LONG);
          console.log(err.response);
        })
        .finally(() => {
          getAllocationServices();
          setLoading(false);
        });
    }
  };

  const onClickUpdate = () => {
    if (tipe === '' || biaya < 1) {
      ToastAndroid.show('isi dengan benar', ToastAndroid.LONG);
    } else {
      setLoading(true);
      updateAllocationServices(allocationId, tipe, biaya)
        .then(() => {
          ToastAndroid.show('Berhasil Merubah Pengeluaran', ToastAndroid.LONG);
          setModal(false);
          resetField();
        })
        .catch((err) => {
          ToastAndroid.show('Gagal Merubah Pengeluaran', ToastAndroid.LONG);
          console.log(err.response);
        })
        .finally(() => {
          getAllocationServices();
          setLoading(false);
        });
    }
  };

  const onClickDelete = () => {
    setDeleteLoading(true);
    deleteAllocationServices(allocationId)
      .then(() => {
        ToastAndroid.show('Berhasil Menghapus Pengeluaran', ToastAndroid.LONG);
        setModal(false);
        resetField();
      })
      .catch((err) => {
        ToastAndroid.show('Gagal Menghapus Pengeluaran', ToastAndroid.LONG);
        console.log(err.response);
      })
      .finally(() => {
        getAllocationServices();
        setDeleteLoading(false);
      });
  };

  useEffect(() => {
    getAllocationServices();
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
          <Title>Pengeluaran</Title>
        </Body>
        <Right />
      </Header>
      <Modal visible={modal} transparent>
        <Content contentContainerStyle={styles.contentContainer}>
          <View style={styles.contentCard}>
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
              {allocationId ? 'Update' : 'Tambah'} Pengeluaran
            </H1>
            <Form>
              <View style={styles.marginV8}>
                <Text note>Nama Pengeluaran</Text>
                <Item regular style={styles.radius5}>
                  <Input
                    placeholder="Tipe Pengeluaran"
                    value={tipe}
                    onChangeText={setTipe}
                  />
                </Item>
              </View>
              <View style={styles.marginV8}>
                <Text note>Total Pengeluaran</Text>
                <Item regular style={styles.radius5}>
                  <Input
                    placeholder="Total Pengeluaran"
                    value={`${biaya}`}
                    onChangeText={setBiaya}
                  />
                </Item>
              </View>
              <Button
                style={styles.marginV8}
                block
                disabled={loading}
                onPress={allocationId ? onClickUpdate : onClickAdd}>
                {loading && <Spinner color="white" />}
                <Text>{allocationId ? 'Update' : 'Tambah'} Pengeluaran</Text>
              </Button>
              {allocationId && (
                <Button
                  style={styles.marginV8}
                  block
                  danger
                  disabled={deleteLoading}
                  onPress={onClickDelete}>
                  {deleteLoading && <Spinner color="white" />}
                  <Text>Hapus Pengeluaran</Text>
                </Button>
              )}
            </Form>
          </View>
        </Content>
      </Modal>
      <Content>
        {allocation.loading ? (
          <Spinner />
        ) : allocation.data.length === 0 ? (
          allocation.data.error ? (
            <Text>{allocation.data.error}</Text>
          ) : (
            <Text>Pengeluaran Kosong</Text>
          )
        ) : (
          <List>
            {allocation.data.map((data) => (
              <ListItem
                key={data.id}
                onPress={() => {
                  setUpdate(data);
                  setModal(true);
                }}>
                <Body>
                  <Text>{data.tipe}</Text>
                </Body>
                <Text>Rp. {toPrice(data.biaya)}</Text>
              </ListItem>
            ))}
          </List>
        )}
      </Content>
      <Fab
        style={styles.backgroundPrimary}
        position="bottomRight"
        onPress={() => {
          setModal(true);
        }}>
        <Icon name="add" />
      </Fab>
    </Container>
  );
};

export default AllicationScreen;
