/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useContext, type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import 'react-native-gesture-handler';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Categories} from './src/components/category';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Context, ContextProvider} from './src/context/context';
import {CategoryObjectsView} from './src/components/category-objects';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {createStore} from 'redux';
import {categoryReducers} from './src/store/store';
import {Dashboard} from './src/components/dashboard';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore, persistReducer} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
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
  // <SafeAreaView style={backgroundStyle}>
  //   {/* <StatusBar
  //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
  //     backgroundColor={backgroundStyle.backgroundColor}
  //   /> */}

  //   {/* <Header /> */}
  //   <Categories />
  // </SafeAreaView>
};

const Nav = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
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

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
