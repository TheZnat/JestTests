import { v4 } from "uuid";

export function createTodo(title) {
  if (!title){
    throw new Error("Title is required");
  }
    return {
      title,
      completed: false,
      id: v4(),
    };
}

export async function createTodoOnServer(title) {
  const response = await fetch("https://jsonplaceholder.typicode.com/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      completed: false,
      id: v4(),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return response.json();
}
