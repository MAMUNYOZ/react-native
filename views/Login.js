import React from 'react';
import {View} from 'react-native';
import {
  Container,
  Button,
  Text,
  H1,
  Input,
  Form,
  Item,
  Toast,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';

const Login = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <View style={globalStyles.loginContainer}>
        <H1 style={globalStyles.title}> Acceso de usuarios</H1>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input autoCompleteType="email" placeholder="Email" />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input secureTextEntry={true} placeholder="Password" />
          </Item>
        </Form>
        <Button square block style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>Iniciar Sesión</Text>
        </Button>
        <Text style={globalStyles.link} onPress= { () => navigation.navigate("register")}>Crear Cuenta</Text>
      </View>
    </Container>
  );
};

export default Login;
