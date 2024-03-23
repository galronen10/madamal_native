import { StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    height: 200,
    marginTop: 10,
    resizeMode: 'contain',
  },
  button: {
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  buttonText: {
    padding: 10,
  },
  buttonsContainer: {
    alignSelf: 'baseline',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  input: {
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
  },
});
