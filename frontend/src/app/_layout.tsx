import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>

      // Public Routes
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />

      // User Routes
      <Stack.Screen name='user/dashboard' />
      <Stack.Screen name="user/create-complaint" />
      <Stack.Screen name="user/complaints" />
      <Stack.Screen name="user/complaint/[id]" />
      <Stack.Screen name="user/profile" />

      // Officer Routes
      <Stack.Screen name="officer/dashboard" />
      <Stack.Screen name="officer/complaint/[id]" />

      // Admin Routes
      <Stack.Screen name="admin/dashboard" />
      <Stack.Screen name="admin/complaint/[id]" />
      <Stack.Screen name="admin/complaints" />
      <Stack.Screen name="admin/officers" />
      <Stack.Screen name="admin/users" />
    </Stack>
  );
}