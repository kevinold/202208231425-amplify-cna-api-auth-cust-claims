import {
  Button,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify, API, Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { createTodo, deleteTodo, updateTodo } from "../src/graphql/mutations";
import { listTodos } from "../src/graphql/queries";

import awsconfig from "../src/aws-exports";
Amplify.configure({
  API: {
    graphql_headers: async () => ({
      Authorization: (await Auth.currentSession()).getIdToken().getJwtToken(),
    }),
  },
  ...awsconfig,
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//const group = "kevinold@gmail.com-group";

async function onCreate(user) {
  await API.graphql({
    query: createTodo,
    variables: {
      input: {
        name: `New name ${user.username}`,
        description: `${user.username} - ${Date()}\n`,
        //group,
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

function App({ signOut, user }) {
  const [todos, setTodos] = useState([]);

  // Get todoUserGroup from idToken if needed client side.
  // via https://www.xiegerts.com/post/amplify-ui-auth-nextjs/#group-based-access-with-cognito-groups
  // const todoUserGroup = user?.getSignInUserSession()?.getIdToken()?.payload["todoUserGroup"];
  // console.log({ todoUserGroup });

  useEffect(() => {
    onQuery(setTodos);
  }, []);

  return (
    <View padding="1rem">
      <Flex direction="column">
        <Flex justifyContent={"space-between"}>
          <Flex>
            <Button
              data-test="create-todo"
              onClick={() => onCreate(user).then(() => onQuery(setTodos))}
            >
              Create Todo
            </Button>
            <Button data-test="refresh-data" onClick={() => onQuery(setTodos)}>
              Refresh Data
            </Button>
          </Flex>
          <Flex justifyContent={"flex-end"}>
            <Text data-test="user-email">{user.attributes.email}</Text>
            <Button data-test="signout" onClick={signOut}>
              Signout
            </Button>
          </Flex>
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
              <TableRow data-test="todo-list" key={todo.id}>
                <TableCell data-test={`todo-id-${todo.id}`}>{todo.id}</TableCell>
                <TableCell data-test="todo-name">{todo.name}</TableCell>
                <TableCell data-test="todo-desc">{todo.description}</TableCell>
                <TableCell>
                  <Button
                    data-test={`update-todo-${todo.id}`}
                    onClick={() => onUpdate(todo, user).then(() => onQuery(setTodos))}
                  >
                    Update
                  </Button>
                  <Button
                    data-test={`delete-todo-${todo.id}`}
                    onClick={() => onDelete(todo.id).then(() => onQuery(setTodos))}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/*user && (
          <code>
            <pre data-test="user-info">{JSON.stringify(user, null, 2)}</pre>
          </code>
        )*/}
      </Flex>
    </View>
  );
}

export default withAuthenticator(App);
