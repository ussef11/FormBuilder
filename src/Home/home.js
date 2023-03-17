import { use } from "i18next";
import React, { useCallback, useEffect, useState } from "react";
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
      label: "input",
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
    {
      id: "5",
      title: "Checkbox",
      thumbs: "header.png",
      tag: "input type='radio' ",
      label: "",
      class:"labelL"
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
        label: "input",
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
     let checkbox = {
        id: "5",
        title: "Checkbox",
        thumbs: "header.png",
        tag: "input type='radio' ",
        label: "",
        class:"labelL"
      }

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
      if (copied[0].id == copied[0].id && copied[0].title == "Checkbox") {
        sourceItems.splice(source.index, 0, checkbox);
      }
      destItems.splice(destination.index, 0, copied[0]);
      let newitem = sourceItems;
      console.log("copied[0].id ", copied[0].id);
      console.log("sourceItems", sourceItems[0].id);
      console.log("removed", removed);
      console.log("destItems", destItems);

      setalledite(destItems)
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
 
  const handledisplay = (index , id) =>{
    setshowOptionbar(index)
 
    
  }
  
  const [nbroption , setnbroption] = useState(1)
  const [options , setoptions] = useState([])
 const [indexblockOption , setindexblockOption] = useState(0)
 const [blockOption , setblockOption] = useState([{"index" : 0 ,"id" :0 , "label" : `label`}])

const addoption = (id)=>
{

  

  setnbroption(nbroption+1)
  let myoptions = {"emplacementid" : id,"index" : nbroption ,"id" :nbroption , "label" : `label${nbroption}`}

  setoptions(current => [...current , myoptions])
  console.log("options  :" ,options)

}

const HandledeleteOption = (id , index)=>{

    options.map((x)=>{
      if(id == x.id){
        setoptions( optionss => optionss.filter(i => i.id != id)) 
//  optionss get value of setoptions (options)
      }
    })

    console.log("options  :" ,options)
  

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
    setoptions([ ])
    setblockOption([])
    setnbroption(1)
  }
const [alledite , setalledite] = useState([])



  const handleupdate = (e,id , index,optid)=>{

   alledite.map((x)=>{
    if(x.id === id && x.tag != "input type='radio' "){
      x.label = e.target.value
    }else if(x.id === id && x.tag =="input type='radio' "){
      options.map((opt)=>{
        if(opt.id === optid){
          opt.label = e.target.value
        }
      })
    }
   })
    setlabelValue(e.target.value)

    
  }
  const handleupdatetitle = (e,id , index)=>{

   alledite.map((x)=>{
    if(x.id === id ){
      x.title = e.target.value
    }
   })
   settitleValue(e.target.value)

  }

   const  handleOnEdit =  (id ,index) => {
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
         columns[1]["items"][i].label =  newlabel;
         
         console.log("fromhandleOnedit", columns[1]["items"][i].label);
        // let result = [...alledite]
        // let data = {"index" : index , "id" : columns[1]["items"][i].id , 'label':columns[1]["items"][i].label}
      //  for(let i =0 ; i< alledite.length; i++){
      //   if(alledite.includes(alledite[i]['id'])){
      //     alledite.splice(alledite[i]["index"],1)
      //   }
      //  }
      //   console.log("index" , index)
      //   alledite.splice(index,1)
      //   alledite.splice(index,0,data)
      //   // result.push(data)
      //   setalledite(result)
        //  options.push({"emplacementid" : 0,"index" : 0 ,"id" :0 , "label" : `label`})
        
      }
    }
    setlabelValue("")
    setshowOptionbar(-1 )
   console.log("alledited" ,alledite)
  //  options.push({"emplacementid" : 0,"index" : 0 ,"id" :0 , "label" : `label`})
  //  console.log(options)

  //  setindexblockOption(indexblockOption+1)
  //  blockOption.splice(indexblockOption , 0 , {"idop" :id ,options})
  //  setoptions([])
      
  //  console.log("blockOption",blockOption)


      //  blockOption.map((pt)=>{
      //   pt.options.map((ptma)=>{
      //     console.log("ptma :  ", ptma)

      //   })
      //  })
    
      

      
    

   
  };


  const onMouseEnter = (index)=>{
    sethover(index)
  }
  const [index, setindex] = useState(uuid());

  const [hover , sethover] = useState(-1)
  const [showOptionbar , setshowOptionbar] = useState(-1)
  const [labelValue , setlabelValue] = useState()
  const [titleValue , settitleValue] = useState()

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
                      ? "hsla(0,0%,100%,.25)"
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
                              
                         
                            {id == 1 ? (<div className="titleofelem">
                                {" "}
                                <h3>{  item.tag.includes("input") && item.tag != "input type='radio' " ? item.label : item.title} </h3>
                              </div>
                            ) : (
                              null
                            )}
                            {id == 1  ? (
                             <> 
                             <form> 
                           { item.tag != "input type='radio' "  ?


                           <div
                                className="elemnt"
                                dangerouslySetInnerHTML={{
                                  __html: `<${item.tag} class=${item.tag == "input type='radio' " ? "Checkbox": ""  }   > 
                                    ${ item.tag.includes("input") && item.tag != "input type='radio' " ? "" : `<span class="${item.class}">${item.label} </span>`  } 
                                      </${item.tag}> `,
                                }}
                              /> : 
                              
                             <> {

    


options.map((opt)=>(
  opt.emplacementid == item.id  ?
    <div
    className="elemnt"
    dangerouslySetInnerHTML={{
      __html: `<${item.tag} id="${opt.id}" ${opt.label && `value=${opt.label}` }  ${item.title && `name=${item.title}` }  class=${item.tag == "input type='radio' " ? "Checkbox": "" }   > 
        ${ item.tag.includes("input") && item.tag != "input type='radio' " ? "" : `<span class="${item.class}">${opt.label} </span>`  } 
          </${item.tag}>`,
    }}
  /> : null

  
                              
                              


                              ))
                            }</>
                             }

</form>



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
                                  null
                                )}
                              </div>
                              <div>  {id == 1 ? (
                               <span onClick={()=>{handleDelete(item.id , index)}} className="material-symbols-outlined">
                               delete
                               </span>
                                ) : (
                                  null
                                )}
                              </div>


                            </div> : null}

                            
                            {showOptionbar == index ?  <div  className="editContent">
                                  <div className="editInput"> 
                               
                                 {/* <div className="closeOptionbar"> <span onClick={()=>{setshowOptionbar(-1 ,item.id )}} className="material-symbols-outlined">close</span></div> */}
                             {   item.tag != "input type='radio' "  ?  <div className="toGrid">
                                  <div  className="labeldiv"> <label htmlFor="label">label</label> </div> 
                                  <div  className="inputdiv"> {
                                         
                                alledite.map((x)=>( 
                                    item.id === x.id ? <input value={x.label} onChange={(e)=>{handleupdate(e ,item.id , index )}}  type="text" />
                                    
                                    : null
                                  )) 
                                  }
                                   </div> 
                                   
                                {item.tag.includes("input") && item.tag != "input type='radio' "  ? null  :  <div  className="labeldiv"> <label htmlFor="label">Title</label> </div> }

                                {item.tag.includes("input") && item.tag != "input type='radio' "  ?  null:  <div  className="inputdiv">  { 

                                                 
                                     alledite.map((x)=>( 
                                             item.id === x.id ? <input value={x.title} onChange={(e)=>{handleupdatetitle(e ,item.id , index )}}  type="text" />
                                             : null
                                           ))     

                                           }
                                 
                                  </div>}
                                
                                  </div> :

<>

                        { 
                      
                          options.map((opt)=>(
                            opt.emplacementid == item.id  ?
                          <div className="toGrid">
                                  <div  className="labeldiv"> <label htmlFor="label">label</label> </div> 
                                  <div  className="labeldiv"> <span className="material-symbols-outlined"  onClick={()=>{HandledeleteOption(opt.id , opt.index)}} htmlFor="label">close</span> </div> 
                                  <div  className="inputdiv"> {   
                                         
                                alledite.map((x)=>( 
                                    item.id === x.id ? <input value={opt.label} onChange={(e)=>{handleupdate(e ,item.id , index ,opt.id )}}  type="text" />
                                    
                                    : null
                                  )) 
                                  }
                                   </div> 
                                   
                                {item.tag.includes("input") && item.tag != "input type='radio' "  ? null  :  <div style={{width:0}}  className="labeldiv">  {    opt.index == 1 ? <label htmlFor="label">Title</label> : null }</div> }

                                {item.tag.includes("input") && item.tag != "input type='radio' "  ?  null :  <div  className="inputdiv">  { 

                                                 
                                     alledite.map((x)=>( 
                                       opt.index == 1 ?
                                             item.id === x.id ? <input value={x.title} onChange={(e)=>{handleupdatetitle(e ,item.id , index )}}  type="text" />
                                             : null
                                        :null   ))     

                                           }
                                 
                                  </div>}
                                  </div>

                               
                              
                   : null     ))
                                }

                                  <div> <button className="addoption" onClick={()=>{addoption(item.id)}}>Add Option <span className="plus">+</span> </button></div>

                                  </>
                                  
                                }
                                  <div className="buttondiv"> <button style={{height:"25px"}} onClick={() => {
                                      handleOnEdit(item.id , index);
                                    }}> Close  </button>  </div>
                                  </div>

                                </div> :  null  }
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
