import { StyleSheet } from 'react-native';
import Colors from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
  },
  item: {
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    padding: 10,
  },
});
