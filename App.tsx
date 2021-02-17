import 'react-native-gesture-handler';

import App from './src/App';
import firebase from '@react-native-firebase/app';
import {firebaseConfig} from './config';

const config = {
  name: 'MAIN_APP',
};
firebase.initializeApp(firebaseConfig, config);

export default App;
