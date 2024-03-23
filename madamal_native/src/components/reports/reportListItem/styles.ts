import { StyleSheet } from 'react-native';
import Colors from '@/constants/colors'; // Import the Colors file

export const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  container: {
    borderBottomColor: Colors.listBorder,
    borderBottomWidth: 1,
    padding: 10,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  postTime: {
    color: Colors.listItemTime,
    textAlign: 'right',
  },
  profileImage: {
    borderRadius: 25,
    height: 50,
    marginLeft: 10,
    width: 50,
  },
  reportData: {
    marginBottom: 10,
    textAlign: 'right',
  },
  reportImage: {
    borderRadius: 10,
    height: 200,
    resizeMode: 'cover',
    width: '100%',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
