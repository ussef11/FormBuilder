import React, { useCallback, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "react-uuid";
import "./home.css";
const Home = () => {
  const [labelheader, setlabelheader] = useState("Header");

  const itemsfrombackend = [
    {
      id: "1",
      title: "input",
      thumbs: "input.png",
      tag: "input",
      label: "",
    },
    {
      id: "2",
      title: "button",
      thumbs: "button.png",
      tag: "button",
      label: "button",
    },
    {
      id: "3",
      title: "File Upload",
      thumbs: "file.png",
      tag: "input type='file' ",
      label: "",
    },
    {
      id: "4",
      title: "Header",
      thumbs: "header.png",
      tag: "h1",
      label: labelheader,
    },
  ];

  const columnsfrombackend = {
    [1]: {
      name: "drag",
      items: [],
    },
    [2]: {
      name: "drag",
      items: itemsfrombackend,
    },
  };

  const [columns, setcolumns] = useState(columnsfrombackend);
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      let sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);

      //  const [removed] = sourceItems.find((ele) => ele.id == source.index )

      console.log("sourceItems", sourceItems);
      const copied = [removed];
      copied[0].id = index.toString();
      //    sourced[0].id  =sourcecopy.toString()
      //  for(let i =0 ;i<=sourceItems.length;i++){
      //   sourceItems.splice(i-1,1 );
      //  }

      let input = {
        id: "1",
        title: "input",
        thumbs: "input.png",
        tag: "input",
        label: "",
      };
      let button = {
        id: "2",
        title: "button",
        thumbs: "button.png",
        tag: "button",
        label: "button",
      };
      let File = {
        id: "3",
        title: "File Upload",
        thumbs: "file.png",
        tag: "input type='file' ",
        label: "",
      };

      let Header = {
        id: "4",
        title: "Header",
        thumbs: "header.png",
        tag: "h1",
        label: labelheader,
      };

      if (copied[0].id == copied[0].id && copied[0].title == "input") {
        sourceItems.splice(source.index, 0, input);
      }
      if (copied[0].id == copied[0].id && copied[0].title == "button") {
        sourceItems.splice(source.index, 0, button);
      }
      if (copied[0].id == copied[0].id && copied[0].title == "File Upload") {
        sourceItems.splice(source.index, 0, File);
      }
      if (copied[0].id == copied[0].id && copied[0].title == "Header") {
        sourceItems.splice(source.index, 0, Header);
      }
      destItems.splice(destination.index, 0, copied[0]);
      let newitem = sourceItems;
      console.log("copied[0].id ", copied[0].id);
      console.log("sourceItems", sourceItems[0].id);
      console.log("removed", removed);
      console.log("destItems", destItems);

      setcolumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
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
  const [idhover, setidhover] = useState();
 
  const handledisplay = (index) =>{
    setshowOptionbar(index)
  }


  const handleDelete = (id , index)=>{
    console.log("id", id);

    for (let i = 0; i < columns[1].items.length; i++) {
      if (id == columns[1]["items"][i].id) {
        console.log(index)
        if(index>-1){
          columns[1]["items"].splice(index,1)
        }
        
      }
    }
  }


  const handleOnEdit = (id ,index) => {
    let newlabel = labelValue;
   

    //  const { source, destination } = result;
    //  const destColumn = columns[destination.droppableId];
    //  const destItems = [...destColumn.items];
    console.log("columns", columns);
    console.log("id", id);

    for (let i = 0; i < columns[1].items.length; i++) {
      if (
        id == columns[1]["items"][i].id &&
        !columns[1]["items"][i].tag.includes("input")
      ) {
        columns[1]["items"][i].label = newlabel;
        console.log("fromhandleOnedit", columns[1]["items"][i].label);
      }
    }
    setlabelValue("")
  };


  const onMouseEnter = (index)=>{
    sethover(index)
  }
  const [index, setindex] = useState(uuid());

  const [hover , sethover] = useState(-1)
  const [showOptionbar , setshowOptionbar] = useState(-1)
  const [labelValue , setlabelValue] = useState()

  return (
    <>
      <h1>formBuilder</h1>

      <div className="Content">
        <DragDropContext
          onDragStart={() => {
            setindex(index + 1);
          }}
          onDragEnd={(result) => handleOnDragEnd(result)}
        >
          {Object.entries(columns).map(([id, data]) => (
            <Droppable droppableId={id}>

              {(provided, snapshot) => (
           
                <div
                  className={`formsDrop-${id}`}
                  ref={provided.innerRef}
                  const style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? "blue"
                      : "transparent",
                    
                  }}
                  {...provided.droppableProps}
                >
                  <div className="drager">
                    {data.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={id == 1 ? "elements" : "myli"}
                             onMouseEnter={()=>{id == 1  ? onMouseEnter(index) : sethover(-1)  }}
                             onMouseLeave={()=>{sethover(-1)}}
                          >
                              
                         
                            {id == 1 ? (
                              <div className="titleofelem">
                                {" "}
                                <h3> {item.title} </h3>
                              </div>
                            ) : (
                              <span></span>
                            )}
                            {id == 1 ? (
                             <> 
                              <div
                                className="elemnt"
                                dangerouslySetInnerHTML={{
                                  __html: `<${item.tag}>   ${item.label}   </${item.tag}>`,
                                }}
                              />
                                   {hover === index ?    <div  className="optionbar">
                              <div>  {id == 1 ? (
                                  <span
                                    className="material-symbols-outlined"
                                    onClick={() => {
                                      handledisplay(index);
                                    }}

                                  >
                                    edit
                                  </span>
                                ) :(
                                  <span></span>
                                )}
                              </div>
                              <div>  {id == 1 ? (
                               <span onClick={()=>{handleDelete(item.id , index)}} className="material-symbols-outlined">
                               delete
                               </span>
                                ) : (
                                  <span></span>
                                )}
                              </div>


                            </div> : <span></span>}

                            
                            {  showOptionbar == index ?  <div  className="editContent">
                                  <div className="editInput"> 
                               
                                 <div className="closeOptionbar"> <span onClick={()=>{setshowOptionbar(-1)}} class="material-symbols-outlined">close</span></div>
                                 <div className="toGrid">
                                  <div  className="labeldiv"> <label htmlFor="label">label</label> </div> 
                                  <div  className="inputdiv">   <input value={labelValue} onChange={(e)=>{setlabelValue(e.target.value)}}  type="text" /></div> 
                                  </div>
                                  <div className="buttondiv"> <button style={{height:"25px"}} onClick={() => {
                                      handleOnEdit(item.id , index);
                                    }}> Update  </button>  </div>
                                  </div>

                                </div> :  <span></span>  }

                          




                                </>
                            ) : (
                              <span className="buttons">{item.title} </span>
                            )}
                            
                   
                          
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
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
