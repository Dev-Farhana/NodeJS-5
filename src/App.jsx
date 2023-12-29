import { useEffect, useState } from 'react'
import './App.css'
import Profile from './Profile'
import { io } from "socket.io-client";

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  const socket = io("http://localhost:8000");

  useEffect(()=> {
    socket.on("connect", () => {
      console.log(socket.id); 
    });
    socket.on("send-todo", (data)=> {
      console.log(data);
      setTodos([...todos, data.value])
    })  

  }, [todos])

  return (
    <>
      <h1>Vite & React</h1>
     <div>
      <input type="text" value={value} 
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={() => { 
        setTodos([...todos, value])
        setValue("")
        socket.emit("add-todo", {value})
      }} >
        Add todos </button>

     </div>
     <ul>
        {todos.map((v,i) => 
        <li key={i}> {v} <button onClick={() => {
            const oldTodos = [...todos]
            oldTodos.splice(i,1)
            setTodos(oldTodos)        
          }}>  Delete </button> 
        </li> )}
     </ul>


        <Profile/>

    </>
  )
}

export default App
