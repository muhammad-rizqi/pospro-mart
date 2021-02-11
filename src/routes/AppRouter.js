import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ForgotScreen,
  LoginScreen,
  MemberDashboardScreen,
  RegisterScreen,
} from '../screens';
import {Container, Content, H1, Spinner} from 'native-base';
import {styles} from '../styles/MainStyles';
import {useSelector} from 'react-redux';
const Stack = createStackNavigator();

const AppRouter = () => {
  const [splash, setSplash] = useState(true);
  const {token} = useSelector((state) => state);

  useEffect(() => {
    setTimeout(() => {
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
          <>
            <Stack.Screen
              name="MemberDashboard"
              component={MemberDashboardScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
