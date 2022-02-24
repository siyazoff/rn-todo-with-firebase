import React, { useState, useEffect, useContext, useCallback } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { TodoContext } from "../Context/todo/todoContext";
import { ScreenContext } from "../Context/screen/screenContext";
import { THEME } from "../theme";
import { AppLoader } from "../components/UI/AppLoader";
import { AppText } from "../components/UI/AppText";
import { AppButton } from "../components/UI/AppButton";

export const MainScreen = () => {
  const { addTodo, todos, removeTodo, fetchTodos, loading, error } =
    useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };

    const listener = Dimensions.addEventListener("change", update);

    return () => {
      listener.remove();
    };
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Try</AppButton>
      </View>
    );
  }

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
        )}
      />
    </View>
  );

  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require("../../assets/empty-man.png")}
        />
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />

      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
    height: 280,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    flexDirection: "column",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  error: {
    fontSize: 21,
    color: "black",
  },
});
