import StackNavigator from './navigation/StackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
const App = () => {
  return (
      
      <SafeAreaView style={{ flex: 1 }}>
        <StackNavigator />
      </SafeAreaView>
 
  );
};

export default App;