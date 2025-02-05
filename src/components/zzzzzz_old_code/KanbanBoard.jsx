import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
// import Column from "./Column/Column";

export default function KanbanBoard() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  const tasksList = [
    { userId: 1, id: 4, title: "et porro tempora", completed: true },

    {
      userId: 1,
      id: 8,
      title: "quo adipisci enim quam ut ab",
      completed: true,
    },

    {
      userId: 1,
      id: 10,
      title: "illo est ratione doloremque quia maiores aut",
      completed: true,
    },

    {
      userId: 1,
      id: 11,
      title: "vero rerum temporibus dolor",
      completed: true,
    },

    {
      userId: 1,
      id: 12,
      title: "ipsa repellendus fugit nisi",
      completed: true,
    },

    {
      userId: 1,
      id: 14,
      title: "repellendus sunt dolores architecto voluptatum",
      completed: true,
    },

    {
      userId: 1,
      id: 15,
      title: "ab voluptatum amet voluptas",
      completed: true,
    },

    {
      userId: 1,
      id: 16,
      title: "accusamus eos facilis sint et aut voluptatem",
      completed: true,
    },

    {
      userId: 1,
      id: 17,
      title: "quo laboriosam deleniti aut qui",
      completed: true,
    },

    {
      userId: 1,
      id: 19,
      title: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
      completed: true,
    },

    {
      userId: 1,
      id: 20,
      title: "ullam nobis libero sapiente ad optio sint",
      completed: false,
    },

    {
      userId: 2,
      id: 22,
      title: "distinctio vitae autem nihil ut molestias quo",
      completed: false,
    },

    {
      userId: 2,
      id: 25,
      title: "voluptas quo tenetur perspiciatis explicabo natus",
      completed: false,
    },

    { userId: 2, id: 26, title: "aliquam aut quasi", completed: false },

    {
      userId: 2,
      id: 27,
      title: "veritatis pariatur delectus",
      completed: false,
    },

    {
      userId: 2,
      id: 30,
      title:
        "nemo perspiciatis repellat ut dolor libero commodi blanditiis omnis",
      completed: false,
    },

    {
      userId: 2,
      id: 35,
      title: "repellendus veritatis molestias dicta incidunt",
      completed: false,
    },

    {
      userId: 2,
      id: 36,
      title: "excepturi deleniti adipisci voluptatem et neque optio illum ad",
      completed: false,
    },

    { userId: 2, id: 40, title: "totam atque quo nesciunt", completed: false },

    {
      userId: 3,
      id: 43,
      title: "tempore ut sint quis recusandae",
      completed: false,
    },

    {
      userId: 3,
      id: 44,
      title: "cum debitis quis accusamus doloremque ipsa natus sapiente omnis",
      completed: false,
    },
  ];

  useEffect(() => {
    setCompleted(tasksList.filter((task) => task.completed));
    setIncomplete(tasksList.filter((task) => !task.completed));
  }, []);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/todos")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setCompleted(json.filter((task) => task.completed));
  //       setIncomplete(json.filter((task) => !task.completed));
  //     });
  // }, []);

  function findItemById(id, array) {
    return array.find((item) => `${item.id}` === id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => `${item.id}` !== id);
  }

  function handleDragEnd(result) {
    console.log(completed);
    const { destination, source, draggableId } = result;

    // Nothing to do
    if (destination === null) return;
    if (source.droppableId === destination.droppableId) return;

    //Remove from source array
    if (source.droppableId === "2") {
      setCompleted(removeItemById(draggableId, completed));
    } else {
      setIncomplete(removeItemById(draggableId, incomplete));
    }

    //Get item
    const task = findItemById(draggableId, [...incomplete, ...completed]);

    //Add item
    if (destination.droppableId === "2") {
      setCompleted([{ ...task, completed: !task.completed }, ...completed]);
    } else {
      setIncomplete([{ ...task, completed: !task.completed }, ...incomplete]);
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "center" }}> Progress Board </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Column title={"To do"} tasks={incomplete} id={"1"} />
        <Column title={"Done"} tasks={completed} id={"2"} />
        <Column title={"Backlog"} tasks={[]} id={"3"} />
      </div>
    </DragDropContext>
  );
}
