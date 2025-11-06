import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from "expo-router";
import { appTheme } from '../../utilities/theme.colors';


export default function _Layout() {
    return(
        <Tabs screenOptions={{tabBarActiveTintColor:appTheme.orange}}>
            <Tabs.Screen 
            name="alphabets"
            options={{title:"ABC",headerShown:false,
            tabBarIcon:() => (<MaterialCommunityIcons name="alphabetical-variant" size={24} color="black" />)
            }}
            />
            <Tabs.Screen
            name="mynumbers"
            options={{title:"123",headerShown:false,
            tabBarIcon:() => (<Octicons name="number" size={24} color="black" />)    
            }}/>
            <Tabs.Screen
            name="mywords"
            options={{title:"Words",headerShown:false,
            tabBarIcon:() => (<FontAwesome5 name="wordpress-simple" size={24} color="black" />)    
            }}/>
            <Tabs.Screen
            name="mysentence"
            options={{title:"Sentences",headerShown:false,
            tabBarIcon:() => (<MaterialCommunityIcons name="read" size={24} color="black" />)    
            }}/>

        </Tabs>
        
    )
}