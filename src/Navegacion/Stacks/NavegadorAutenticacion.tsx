import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPantalla } from '../../funcionalidades/autenticacion/pantallas/LoginPantalla';
import { RegistroPantalla } from '../../funcionalidades/autenticacion/pantallas/RegistroPantalla';

export type AuthStackParamList = {
  Login: undefined;
  Registro: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function NavegadorAutenticacion() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Login"
        component={LoginPantalla}
        options={{
          title: 'Iniciar sesión',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Registro"
        component={RegistroPantalla}
        options={{
          title: 'Registrarse',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
