import React, {useState} from 'react';
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

const Register = () => {
  // State del formulario
  const [name, saveName] = useState('');
  const [direction, saveDirection] = useState('');
  const [email, saveEmail] = useState('');
  const [telephone, saveTelephone] = useState('');
  const [password, savePassword] = useState('');

  const navigation = useNavigation();

  return (
    <Container>
      <View style={globalStyles.loginContainer}>
        <H1 style={globalStyles.title}> Registro de usuarios</H1>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input placeholder="Nombre" onChangeText={ texto => saveName(texto)} />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input autoCompleteType="email" placeholder="Dirección" />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input autoCompleteType="email" placeholder="Email" />
          </Item>

          <Item inlineLabel last style={globalStyles.input}>
            <Input autoCompleteType="email" placeholder="Teléfono" />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input secureTextEntry={true} placeholder="Password" />
          </Item>
        </Form>
        <Button square block style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>Registrar</Text>
        </Button>
      </View>
    </Container>
  );
};

export default Register;
