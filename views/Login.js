import React, {useState, useContext} from 'react';
import {View, AsyncStorage} from 'react-native';
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
import ServerContext from '../context/server/serverContext';

const Login = () => {
  // Context de Server
  const {user, getUser} = useContext(ServerContext);

  // State del formulario
  const [email, saveEmail] = useState('');
  const [password, savePassword] = useState('');

  const [message, saveMesage] = useState(null);

  const navigation = useNavigation();

  // Cuando el usuario pulsa en acceder
  const handleSubmit = () => {
    if (email === '' || password === '') {
      saveMesage('Todos los campos son obligatorios');
      return;
    }

    const userLoged = {email, password};
    getUser(userLoged).then((response) => {
      if (response.length !== 0) {
        AsyncStorage.setItem('user', response[0].id)
        navigation.navigate('home');
      } else {
        saveMesage('Los datos introducidos no son correctos');
      }
    });
  };

  const showAlert = () => {
    Toast.show({
      text: message,
      buttonText: 'OK',
      duration: 5000,
    });
  };

  return (
    <Container>
      <View style={globalStyles.loginContainer}>
        <H1 style={globalStyles.title}> Acceso de usuarios</H1>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Email"
              onChangeText={(texto) => saveEmail(texto)}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(texto) => savePassword(texto)}
            />
          </Item>
        </Form>
        <Button
          square
          block
          style={globalStyles.button}
          onPress={() => handleSubmit()}>
          <Text style={globalStyles.buttonText}>Iniciar Sesión</Text>
        </Button>
        {message && showAlert()}
        <Text
          style={globalStyles.link}
          onPress={() => navigation.navigate('register')}>
          Crear Cuenta
        </Text>
      </View>
    </Container>
  );
};

export default Login;
