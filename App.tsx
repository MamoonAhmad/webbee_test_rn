/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {ScrollView, Text} from 'react-native';
import 'react-native-gesture-handler';

import {Categories} from './src/components/category';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {ContextProvider} from './src/context/context';
import {CategoryObjectsView} from './src/components/category-objects';
import {Provider, useSelector} from 'react-redux';
import {createStore} from 'redux';
import {categoryReducers, CombinedState} from './src/store/store';
import {Dashboard} from './src/components/dashboard';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore, persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage.clear();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['categories', 'categoryObject'],
};

const Drawer = createDrawerNavigator();

const persistedReducer = persistReducer(persistConfig, categoryReducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Text>Loading...</Text>}>
        <ContextProvider>
          <NavigationContainer>
            <Nav />
          </NavigationContainer>
        </ContextProvider>
      </PersistGate>
    </Provider>
  );
};

const Nav = () => {
  const categories = useSelector((state: CombinedState) => state.categories);
  return (
    <>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Manage Categories" component={Categories} />
        {categories?.categories
          ?.filter(c => !!c?.name)
          ?.map(c => {
            return (
              <Drawer.Screen name={c.name}>
                {() => (
                  <ScrollView>
                    <CategoryObjectsView name={c.name} />
                  </ScrollView>
                )}
              </Drawer.Screen>
            );
          })}
        <Drawer.Screen name="Dashboard">
          {() => (
            <ScrollView>
              <Dashboard />
            </ScrollView>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </>
  );
};

export default App;
