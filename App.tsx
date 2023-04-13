import React from 'react';
import {StyleProvider} from 'react-native-zephyr';
import Router from './src/router';
import {StyledSafeAreaView} from './src/zephyr/styled';

function App(): JSX.Element {
  return (
    <StyleProvider>
      <StyledSafeAreaView classes={['flex:1']}>
        <Router />
      </StyledSafeAreaView>
    </StyleProvider>
  );
}

export default App;
