import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux'; 
import store from './redux/store'; 
import StackNavigator from './navigation/StackNavigator';

const App = () => {
  return (
      <Provider store={store}>
          <SafeAreaView style={{ flex: 1 }}>
            <StackNavigator />
          </SafeAreaView>
      </Provider>
  );
};

export default App;