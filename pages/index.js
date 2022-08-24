import {
  Authenticator,
  Button,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify, API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { createTodo, deleteTodo, updateTodo } from "../src/graphql/mutations";
import { listTodos } from "../src/graphql/queries";

import awsconfig from "../src/aws-exports";
Amplify.configure(awsconfig);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

async function onCreate(user) {
  await API.graphql({
    query: createTodo,
    variables: {
      input: {
        title: `New title ${Date.now()} ${user.username}}`,
        content: "",
      },
    },
  });
}

async function onDelete(id) {
  await API.graphql({
    query: deleteTodo,
    variables: {
      input: {
        id,
      },
    },
  });
}

async function onQuery(setTodos) {
  const { data } = await API.graphql({
    query: listTodos,
  });

  setTodos(data.listTodos.items);
}

async function onUpdate(currentItem) {
  await API.graphql({
    query: updateTodo,
    variables: {
      input: {
        id: currentItem.id,
        title: `Updated title ${getRandomInt(1, 20)} ${Date.now()}`,
      },
    },
  });
}

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    onQuery(setTodos);
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <View padding="1rem">
          <Flex direction="column">
            <Flex>
              <Button onClick={() => onCreate(user)}>New Record</Button>
              <Button onClick={() => onQuery(setTodos)}>Refresh Data</Button>
              <Button onClick={signOut}>Signout</Button>
            </Flex>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Content</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.id}</TableCell>
                    <TableCell>{todo.title}</TableCell>
                    <TableCell>{todo.content}</TableCell>
                    <TableCell>
                      <Button onClick={() => onUpdate(todo)}>Update Title and Rating</Button>
                      <Button onClick={() => onDelete(todo.id)}>Delete Item</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Flex>
        </View>
      )}
    </Authenticator>
  );
}

export default App;
