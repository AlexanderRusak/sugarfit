import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeContext } from './src/context/ThemeContext';
import { MainEntry } from './src/MainApp/Main.entry';

import store from './src/store';

export default function App() {


  const [themeColor, setThemeColor] = useState<string>('')

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }} >
      <ReduxProvider store={store}>
        <View style={styles.container}>
          <MainEntry />
        </View>
      </ReduxProvider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
