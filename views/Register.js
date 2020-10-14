import React, {useState, useContext} from 'react';
import {ScrollView, View} from 'react-native';
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

const Register = () => {
  // Context de Server
  const {user, saveUser} = useContext(ServerContext);

  // State del formulario
  const [name, saveName] = useState('');
  const [surname, saveSurname] = useState('');
  const [direction, saveDirection] = useState('');
  const [email, saveEmail] = useState('');
  const [telephone, saveTelephone] = useState('');
  const [password, savePassword] = useState('');

  const [message, saveMesage] = useState(null);

  const navigation = useNavigation();

  // Cuando el usuario pulsa en registrar
  const handleSubmit = () => {
    if (
      name === '' ||
      surname === '' ||
      direction === '' ||
      email === '' ||
      telephone === '' ||
      password === ''
    ) {
      saveMesage('Todos los campos son obligatorios');
      return;
    }

    if (password.length < 6) {
      saveMesage('La clave debe tener al menos 6 caracteres');
      return;
    }

    const user =  { name, surname, direction, email, telephone, password };
    const registro = saveUser(user);
    if (registro){
      saveMesage('El registro se ha realizado correctamente');
      navigation.navigate('home');
    } else {
      saveMesage('Se ha producido un error, revise los datos e inténtalo de nuevo');
      };
    }


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
        <ScrollView>
        <H1 style={globalStyles.title}> Registro de usuarios</H1>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Nombre"
              onChangeText={(texto) => saveName(texto)}
            />
            </Item>
            <Item inlineLabel last style={globalStyles.input}>
             <Input
              placeholder="Apellidos"
              onChangeText={(texto) => saveSurname(texto)}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Dirección"
              onChangeText={(texto) => saveDirection(texto)}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Email"
              onChangeText={(texto) => saveEmail(texto)}
            />
          </Item>

          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Teléfono"
              onChangeText={(texto) => saveTelephone(texto)}
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
        {message && showAlert()}
        <Button
          square
          block
          style={globalStyles.button}
          onPress={() => handleSubmit()}>
          <Text style={globalStyles.buttonText}>Registrar</Text>
        </Button>
        </ScrollView>
      </View>
    </Container>
  );
};

export default Register;
