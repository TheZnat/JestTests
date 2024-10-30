import axios from "axios";

export async function getTodos() {
  try {
    const { res } = await axios.get(
      "https://jsonplaceholder.typicode.com/todo"
    );
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
}
