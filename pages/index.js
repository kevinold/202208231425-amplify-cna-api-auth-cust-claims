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
        name: `New name ${user.username}`,
        description: `${user.username} - ${Date()}\n`,
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

async function onUpdate(currentItem, user) {
  await API.graphql({
    query: updateTodo,
    variables: {
      input: {
        id: currentItem.id,
        name: `Updated name ${Date.now()}`,
        description: currentItem.description.concat(`${user.username} - ${Date()}\n`),
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
              <Button onClick={() => onCreate(user).then(() => onQuery(setTodos))}>
                New Record
              </Button>
              <Button onClick={() => onQuery(setTodos)}>Refresh Data</Button>
              <Button onClick={signOut}>Signout</Button>
            </Flex>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.id}</TableCell>
                    <TableCell>{todo.name}</TableCell>
                    <TableCell>{todo.description}</TableCell>
                    <TableCell>
                      <Button onClick={() => onUpdate(todo, user).then(() => onQuery(setTodos))}>
                        Update
                      </Button>
                      <Button onClick={() => onDelete(todo.id).then(() => onQuery(setTodos))}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {user && (
              <code>
                <pre>{JSON.stringify(user, null, 2)}</pre>
              </code>
            )}
          </Flex>
        </View>
      )}
    </Authenticator>
  );
}

export default App;
