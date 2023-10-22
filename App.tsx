/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { Navigation } from './src/navigation';
import { persistStorage, store } from './src/store/index'
import { Provider } from 'react-redux'
import { AppExecutor } from './src/ctx/ECommerceCtx';
import { PersistGate } from 'redux-persist/integration/react';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStorage} loading={null}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppExecutor>
            <Navigation />
          </AppExecutor>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}


export default App;
