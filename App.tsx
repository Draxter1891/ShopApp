import React from 'react';
import AppNavigator from './src/AppNavigator';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <AppNavigator />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
