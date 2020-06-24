import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export default api;

/**
 * baseURL depends on how you are running your app:
 *
 * iOS with emulator: localhost
 * iOS with physical device : IP address
 * Android with emulator: -> adb reverse tcp:3333 tcp:3333 (at 3:00 min from the "Listando projetos da API" class -> Mobile with React Native, week 1)
 * Android with emulator: 10.0.2.2 (Android Studio emulator's default IP address)
 */
