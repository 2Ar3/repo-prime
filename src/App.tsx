import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
//import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DoctorHome from "./DoctorHome"; // Ensure it's correctly imported

const client = generateClient<any>();

function App() {
  const { user, signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<any["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <div>
      {/* Navigation Bar */}
      <header>
        <nav>
          <Link to="/">Home</Link> <span>|</span>
          <Link to="/about">About</Link> <span>|</span>
          <Link to="/contact">Contact</Link> <span>|</span>
          <Link to="/doctor-home">Doctor Home</Link> <span>|</span>
          <Link to="/todos">Todos</Link>
        </nav>
      </header>

      {/* Page Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctor-home" element={<DoctorHome />} />
          <Route
            path="/todos"
            element={
              <div>
                <h1>{user?.signInDetails?.loginId}'s Todos</h1>
                <button onClick={createTodo}>+ New Todo</button>
                <ul>
                  {todos.map((todo) => (
                    <li key={todo.id} onClick={() => deleteTodo(todo.id)}>
                      {todo.content}
                    </li>
                  ))}
                </ul>
                <button onClick={signOut}>Sign out</button>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
