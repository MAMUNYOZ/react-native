import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: '2.5%',
    flex: 1,
  },
  button: {
    backgroundColor: '#5e2129',
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#DDD',
    fontSize: 16,
  },
  banner: {
    height: 200,
    alignSelf: 'center',
    flex: 1,
  },
  separator: {
    marginBottom: 20,
    backgroundColor: '#222',
  },
  separatorText: {
    color: '#DDD',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 24,
  },
  title: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
    fontSize: 30,
  },
  image: {
    height: 300,
    width: '100%',
  },
  price: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: '2.5%',
    flex: 1,
  },
  input: {
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  link: {
    color: '#5e2129',
    marginTop: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  textcenter: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  logo: {
    alignSelf: 'center',
    marginVertical: 30,
  },
  section: {
    marginVertical: 15,
  },
});

export default globalStyles;
