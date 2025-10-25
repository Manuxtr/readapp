import { Stack } from "expo-router";

export default function RootLayout() {
  return(
      <Stack>
        <Stack.Screen
        name="(tabs)"
        options={{
          headerShown:true
        }}
        />

        <Stack.Screen
        name="index"
        options={{headerShown:true,title:"index"}}/>
      </Stack>
  )
}
