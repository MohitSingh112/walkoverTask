import {View, Text, Image, ScrollView, TextInput} from 'react-native';
import LoginScreenFC from './components/LoginScreenFC';
import { SafeAreaView } from 'react-native-safe-area-context';
const App = () => {
  return (
    <SafeAreaView>
      <LoginScreenFC></LoginScreenFC>
    </SafeAreaView>
  );
};

export default App;