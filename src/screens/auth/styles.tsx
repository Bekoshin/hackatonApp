import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  authContainer: {
    alignItems: 'center',
    marginHorizontal: 14,
    marginBottom: 10,
    paddingHorizontal: 18,
    borderRadius: 4,
    paddingTop: 38,
    paddingBottom: 33,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  headerContainer: {
    marginBottom: 30,
  },
  input: {
    marginBottom: 11,
  },
  button: {
    marginTop: 11,
  },
});

export default styles;
