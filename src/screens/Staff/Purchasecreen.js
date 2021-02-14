import React, {useEffect, useState} from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Fab,
  Form,
  H1,
  Icon,
  Input,
  Item,
  Label,
  List,
  ListItem,
  Picker,
  Spinner,
  Text,
} from 'native-base';
import {useSelector} from 'react-redux';
import {
  addPurchaseServices,
  deletePurchaseServices,
  getPurchaseServices,
  getSupplierServices,
  updatePurchaseServices,
} from '../../services/StaffServices';
import {Modal, ToastAndroid} from 'react-native';

const Purchasecreen = () => {
  const {purchase, item, supplier} = useSelector((state) => state.staff);
  const [purchaseId, setpurchaseId] = useState(null);

  const [supplierId, setSupplierId] = useState('selectSupplier');
  const [itemId, setitemId] = useState('selectItem');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(1);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const setUpdate = (data) => {
    setpurchaseId(data.id);
    setSupplierId(data.supplier_id);
    setitemId(data.barang_id);
    setQuantity(data.jumlah);
    setPrice(data.total_biaya);
  };

  const resetField = () => {
    setpurchaseId(null);
    setSupplierId(null);
    setitemId(null);
    setQuantity(1);
    setPrice(1);
  };

  const onClickAdd = () => {
    if (
      supplierId === 'selectSupplier' ||
      itemId === 'selectItem' ||
      price < 1 ||
      quantity < 1
    ) {
      ToastAndroid.show('isi dengan benar', ToastAndroid.LONG);
    } else {
      setLoading(true);
      addPurchaseServices(supplierId, itemId, quantity, price)
        .then(() => {
          ToastAndroid.show('Berhasil Menambah Supplier', ToastAndroid.LONG);
          setModal(false);
          resetField();
        })
        .catch((err) => {
          ToastAndroid.show('Gagal Menambah Supplier', ToastAndroid.LONG);
          console.log(err.response);
        })
        .finally(() => {
          getPurchaseServices();
          setLoading(false);
        });
    }
  };

  const onClickUpdate = () => {
    if (
      supplierId === 'selectSupplier' ||
      itemId === 'selectItem' ||
      price < 1 ||
      quantity < 1
    ) {
      ToastAndroid.show('isi dengan benar', ToastAndroid.LONG);
    } else {
      setLoading(true);
      updatePurchaseServices(purchaseId, supplierId, itemId, quantity, price)
        .then(() => {
          ToastAndroid.show('Berhasil Merubah Supplier', ToastAndroid.LONG);
          setModal(false);
          resetField();
        })
        .catch((err) => {
          ToastAndroid.show('Gagal Merubah Supplier', ToastAndroid.LONG);
          console.log(err.response);
        })
        .finally(() => {
          getPurchaseServices();
          setLoading(false);
        });
    }
  };

  const onClickDelete = () => {
    setDeleteLoading(true);
    deletePurchaseServices(purchaseId)
      .then(() => {
        ToastAndroid.show('Berhasil Menghapus Supplier', ToastAndroid.LONG);
        setModal(false);
        resetField();
      })
      .catch((err) => {
        ToastAndroid.show('Gagal Menghapus Supplier', ToastAndroid.LONG);
        console.log(err.response);
      })
      .finally(() => {
        getPurchaseServices();
        setDeleteLoading(false);
      });
  };

  useEffect(() => {
    getPurchaseServices();
  }, []);
  console.log(purchase.data);
  return (
    <Container>
      <Modal visible={modal}>
        <Content>
          <H1>{purchaseId ? 'Update' : 'Tambah'} Pembelian</H1>
          <Icon
            name="close"
            onPress={() => {
              setModal(!modal);
              resetField();
            }}
          />
          <Form>
            <Picker
              selectedValue={supplierId}
              onValueChange={(val) =>
                val !== 'selectSupplier' && setSupplierId(val)
              }>
              <Picker.Item label="Pilih supplier" value="selectSupplier" />
              {supplier.data.map((supplierData) => (
                <Picker.Item
                  label={supplierData.nama}
                  value={supplierData.id}
                  key={supplierData.id}
                />
              ))}
            </Picker>
            <Picker
              selectedValue={itemId}
              onValueChange={(val) => val !== 'selectItem' && setitemId(val)}>
              <Picker.Item label="Pilih Pembelian barang" value="selectItem" />
              {item.data.map((itemData) => (
                <Picker.Item
                  label={itemData.nama}
                  value={itemData.id}
                  key={itemData.id}
                />
              ))}
            </Picker>
            <Item rounded>
              <Input
                placeholder="Jumlah Barang"
                value={`${quantity}`}
                onChangeText={setQuantity}
              />
            </Item>
            <Item rounded>
              <Input
                placeholder="Total Harga"
                value={`${price}`}
                onChangeText={setPrice}
              />
            </Item>
            <Button
              rounded
              block
              disabled={loading}
              onPress={purchaseId ? onClickUpdate : onClickAdd}>
              {loading && <Spinner color="white" />}
              <Text>{purchaseId ? 'Update' : 'Tambah'} Pembelian</Text>
            </Button>
            {purchaseId && (
              <Button
                rounded
                block
                danger
                disabled={deleteLoading}
                onPress={onClickDelete}>
                {deleteLoading && <Spinner color="white" />}
                <Text>Hapus Pembelian</Text>
              </Button>
            )}
          </Form>
        </Content>
      </Modal>

      <Content>
        <H1>Hai ini screen Pembelian</H1>
        {purchase.loading ? (
          <Spinner />
        ) : purchase.data.length === 0 ? (
          purchase.data.error ? (
            <Text>{purchase.data.error}</Text>
          ) : (
            <Text>Pembelian Kosong</Text>
          )
        ) : (
          <List>
            {purchase.data.map((data) => (
              <ListItem
                key={data.id}
                onPress={() => {
                  setUpdate(data);
                  setModal(true);
                }}>
                <Body>
                  <Text>{data.barang.nama}</Text>
                  <Text note>{data.supplier.nama}</Text>
                </Body>
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

export default Purchasecreen;
