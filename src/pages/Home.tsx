import React, { useState } from 'react';
import { Alert, StyleSheet, View } from "react-native";

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const checkIfTaskEXists = tasks.findIndex(
      (task) => task.title === newTaskTitle
    );

    if (checkIfTaskEXists !== -1) {
      return Alert.alert(
        "Task already exists",
        `You can't add a task with title ${newTaskTitle}`
      );
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleToogleTaskDone(id: number) {
    const updatedTasks = [...tasks];
    const taskToUpdate = updatedTasks.find((task) => task.id === id);

    if (!taskToUpdate) {
      Alert.alert("Task no found", "Please select a task");
      return;
    }

    taskToUpdate.done = !taskToUpdate.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remove task", "Would you like to remove the task ?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () =>
          setTasks(tasks.filter((tasksFilteres) => tasksFilteres.id !== id)),
      },
    ]);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = [...tasks];
    const taskToUpdate = updatedTasks.find((task) => task.id === taskId);

    if (!taskToUpdate) {
      Alert.alert("Task no found", "Please select a task");
      return;
    }

    taskToUpdate.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToogleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})