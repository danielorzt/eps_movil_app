import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../tipos/navigation";
import { InicioPantalla } from "../funcionalidades/inicio/pantallas/InicioPantalla";
import { PerfilPantalla } from "../pantallas/PerfilPantalla";
import { ListaMedicosPantalla } from "../funcionalidades/medicos/pantallas/ListaMedicosPantalla";
import { ListaEspecialidadesPantalla } from "../funcionalidades/especialidades/pantallas/ListaEspecialidadesPantalla";
import PilaCitas from "./Stacks/PilaCitas";
import InicioStack from "./Stacks/InicioStack";

type Props = NativeStackScreenProps<RootStackParamList, "MainTabs">;

export type MainTabParamList = {
  Inicio: undefined;
  Citas: undefined;
  Medicos: undefined;
  Especialidades: undefined;
  Perfil: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const NavegadorTabsPrincipal = ({ navigation }: Props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Inicio":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Citas":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "Medicos":
              iconName = focused ? "medkit" : "medkit-outline";
              break;
            case "Especialidades":
              iconName = focused ? "star" : "star-outline";
              break;
            case "Perfil":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "alert-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={InicioStack}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name="Citas"
        component={PilaCitas}
        options={{ title: "Citas" }}
      />
      <Tab.Screen
        name="Medicos"
        component={ListaMedicosPantalla}
        options={{ title: "Médicos" }}
      />
      <Tab.Screen
        name="Especialidades"
        component={ListaEspecialidadesPantalla}
        options={{ title: "Especialidades" }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilPantalla}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
};
