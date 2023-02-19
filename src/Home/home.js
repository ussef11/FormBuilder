import "./home.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useCallback, useState } from "react";
import uuid from "react-uuid";

const Home = () => {
  const itemsfrombackend = [
    {
      id: " 1",
      title: "input",
      thumbs: "input.png",
    },
    {
      id: "2",
      title: "button",
      thumbs: "button.png",
    },
    {
      id: "3",
      title: "File Upload",
      thumbs: "file.png",
    },
    {
      id: "4",
      title: "Header",
      thumbs: "header.png",
    },
  ];

  const columnsfrombackend = {
    [uuid()]: {
      name: "drag",
      items: itemsfrombackend,
    },
    [uuid()]: {
      name: "drop",
      items: [],
    },
  };

  const [columns, setcolumns] = useState(columnsfrombackend);
  const handleOnDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    const { source, destination } = result;
    if(source.droppableId !== destination.droppableId){
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setcolumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    }else{
      
      const column = columns[source.droppableId];
      const copieditems = [...column.items];
      const [removeditem] = copieditems.splice(source.index, 1);
      copieditems.splice(destination.index, 0, removeditem);
      setcolumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copieditems,
        },
      });
    }

  };

  return (
    <>
      <h1>Welcome To Drag and Drop Form</h1>
      <div className="Spaces">
        <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
          {Object.entries(columns).map(([id, data]) => (
            
            <Droppable droppableId={id}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver ? "green" : "gray",
                    width: "13%",
                    margin:"20px"
                  }}
                >
                  {data.items.map((item, index) => (
                    
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div className="darg"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className="space">
                            <p>{item.title}</p>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </>
  );
};

export default Home;
