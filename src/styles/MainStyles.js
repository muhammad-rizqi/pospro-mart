import {Dimensions, StyleSheet} from 'react-native';

const sw = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  centerFlex1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBorder: {borderWidth: 19},
  textWhite: {color: 'white'},
  textBold: {fontWeight: 'bold'},
  displayNone: {display: 'none'},
  backgroundOpacity: {backgroundColor: '#000000cc'},
  backgroundLight: {backgroundColor: '#f1f1f1'},
  flex1: {flex: 1},
  alignFlexEnd: {alignItems: 'flex-end'},
  backgroundPrimary: {backgroundColor: '#1565C0'},
  tetxCenter: {textAlign: 'center'},
  marginR16: {marginRight: 16},
  marginH16: {marginHorizontal: 16},
  marginV8: {marginVertical: 8},
  marginV16: {marginVertical: 16},
  marginH8: {marginHorizontal: 8},
  flexRow: {flexDirection: 'row'},
  margin16: {margin: 16},
  margin8: {margin: 8},
  padding16: {padding: 16},
  avatarCenterLarge: {width: 250, height: 250, alignSelf: 'center'},
  listSearch: {
    marginTop: 120,
    backgroundColor: '#f8f8f8',
    position: 'absolute',
    width: '100%',
  },
  textRight: {textAlign: 'right'},
  contentContainer: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#88888822',
    alignItems: 'center',
  },
  contentCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    width: '100%',
    maxWidth: 480,
  },
  input: {marginVertical: 8, borderRadius: 5},
  radius5: {borderRadius: 5},
  alignCenter: {alignItems: 'center'},
  cartMenu: {backgroundColor: 'white', padding: 16, marginBottom: 16},
  textOnScan: {color: 'white', textAlign: 'center', margin: 24},
  justifyCenter: {justifyContent: 'center'},
  membeCardContainer: {
    marginVertical: 16,
    backgroundColor: '#1565C0',
    width: sw < 480 ? sw - 24 : 480,
    height: sw < 480 ? (sw * 3) / 5 : (480 * 3) / 5,
    borderRadius: 25,
    padding: 16,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  memberCardLogo: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  memberCardBalance: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: 'white',
  },
  memberCardNumber: {color: 'white', fontSize: 24, fontFamily: 'monospace'},
  relative: {position: 'relative'},
  listMenu: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#f1f1f1',
    width: 200,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backgroundWhite: {backgroundColor: 'white'},
});
