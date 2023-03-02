import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Authentification from "../screens/Authentification";
import Home from "../screens/Home";
import InvalidTicket from "../screens/InvalidTicket";
import QrScanner from "../screens/QrScanner";
import RecordedTicket from "../screens/RecordedTicket";
import ValidTicket from "../screens/ValidTicket";

const AStack = createNativeStackNavigator();

const commonOptions = { headerShown: false };

const Stack = () => {
  return (
    <AStack.Navigator initialRouteName="Authentification">
      <AStack.Screen name="Authentification" options={commonOptions} component={Authentification} />
      <AStack.Screen name="Home" options={commonOptions} component={Home} />
      <AStack.Screen name="Scanner" options={commonOptions} component={QrScanner} />
      <AStack.Screen name="ValidTicket" options={commonOptions} component={ValidTicket} />
      <AStack.Screen name="InvalidTicket" options={commonOptions} component={InvalidTicket} />
      <AStack.Screen name="RecordedTicket" options={commonOptions} component={RecordedTicket} />
    </AStack.Navigator>
  )
}

export default Stack