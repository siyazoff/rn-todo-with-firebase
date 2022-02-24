import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { MainLayout } from "./src/MainLayout";
import { TodoState } from "./src/Context/todo/TodoState";
import { ScreenState } from "./src/Context/screen/ScreenState";

async function loadApplication() {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={(err) => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
}

//just fuck project
