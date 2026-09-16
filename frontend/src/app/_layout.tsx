import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />

      <Stack.Screen name='user/dashboard' />
      <Stack.Screen name="user/create-complaint" />
      <Stack.Screen name="user/complaints" />
      <Stack.Screen name="user/complaint/[id]" />
      <Stack.Screen name="user/profile" />

      <Stack.Screen name="officer/dashboard" />
      <Stack.Screen name="officer/complaint/[id]" />

      <Stack.Screen name="admin/dashboard" />
    </Stack>
  );
}