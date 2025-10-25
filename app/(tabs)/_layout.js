import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from "expo-router";


export default function _Layout() {
    return(
        <Tabs screenOptions={{tabBarActiveTintColor:"red"}}>
            <Tabs.Screen 
            name="alphabets"
            options={{title:"ABC",headerShown:true,
            tabBarIcon:() => (<MaterialCommunityIcons name="alphabetical-variant" size={24} color="black" />)
            }}
            />
            <Tabs.Screen
            name="mynumbers"
            options={{title:"123",headerShown:true,
            tabBarIcon:() => (<Octicons name="number" size={24} color="black" />)    
            }}/>
            <Tabs.Screen
            name="mywords"
            options={{title:"Words",headerShown:true,
            tabBarIcon:() => (<FontAwesome5 name="wordpress-simple" size={24} color="black" />)    
            }}/>
            <Tabs.Screen
            name="mysentence"
            options={{title:"Sentences",headerShown:true,
            tabBarIcon:() => (<MaterialCommunityIcons name="read" size={24} color="black" />)    
            }}/>

        </Tabs>
        
    )
}