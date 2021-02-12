/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CashierDashboardScreen,
  CategoryScreen,
  ForgotScreen,
  ItemScreen,
  LoginScreen,
  ManagerDashboardScreen,
  MemberDashboardScreen,
  RegisterScreen,
  StaffDashboardScreen,
  SupplierScreen,
} from '../screens';
import {Container, Content, H1, Spinner} from 'native-base';
import {styles} from '../styles/MainStyles';
import {useDispatch, useSelector} from 'react-redux';
import {getProfileServices} from '../services/UserServices';
import {getToken} from '../services/token/Token';
import {changeToken, setUser} from '../redux/action';
const Stack = createStackNavigator();

const AppRouter = () => {
  const [splash, setSplash] = useState(true);
  const {token, user} = useSelector((state) => state);

  const dispatch = useDispatch();

  const getStoredToken = async () => {
    try {
      const storedToken = await getToken();
      if (storedToken) {
        dispatch(changeToken(storedToken));
        getProfileServices();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // getStoredToken();
      setSplash(false);
    }, 1000);
  }, []);

  if (splash) {
    return (
      <Container>
        <Content contentContainerStyle={styles.centerFlex1}>
          <H1>POSpro Mart</H1>
          <Spinner color="blue" />
        </Content>
      </Container>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={false}
        screenOptions={{animationEnabled: false}}>
        {!token ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Forgot" component={ForgotScreen} />
          </>
        ) : (
          user !== null && (
            <>
              {user.roles[0].id === 5 && (
                <>
                  <Stack.Screen
                    name="MemberDashboard"
                    component={MemberDashboardScreen}
                  />
                </>
              )}
              {user.roles[0].id === 3 && (
                <>
                  <Stack.Screen
                    name="CashierDashboard"
                    component={CashierDashboardScreen}
                  />
                </>
              )}
              {user.roles[0].id === 4 && (
                <>
                  <Stack.Screen
                    name="StaffDashboard"
                    component={StaffDashboardScreen}
                  />
                  <Stack.Screen name="Category" component={CategoryScreen} />
                  <Stack.Screen name="Supplier" component={SupplierScreen} />
                  <Stack.Screen name="Item" component={ItemScreen} />
                </>
              )}
              {user.roles[0].id === 2 && (
                <>
                  <Stack.Screen
                    name="ManagerDashboard"
                    component={ManagerDashboardScreen}
                  />
                </>
              )}
            </>
          )
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
