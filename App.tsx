import { ProductsScreen } from './src/ProductsScreen/ProductsScreen';
import { PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <ProductsScreen/>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

export default App;
