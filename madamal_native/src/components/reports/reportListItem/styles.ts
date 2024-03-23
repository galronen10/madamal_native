import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  listRow: {
    borderRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    height: 150,
    margin: 4,
  },
  listRowId: {
    fontSize: 25,
  },
  listRowImage: {
    height: 130,
    margin: 10,
    resizeMode: 'contain',
    width: 130,
  },
  listRowName: {
    fontSize: 30,
  },
  listRowTextContainer: {
    flex: 1,
    justifyContent: 'space-around',
    margin: 10,
  },
});
