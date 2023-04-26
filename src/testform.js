import React, { useCallback, useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "react-uuid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import deletsvg from "./media/delete.svg";
import editesvg from "./media/edit.svg";
import "./Home/home.css";
const Testform = () => {
  const [labelheader, setlabelheader] = useState("Header");
  const [typehead, settypehead] = useState("");
  const [items, setitems] = useState();
  const [options, setoptions] = useState();
  useEffect(() => {
    setoptions(JSON.parse(localStorage.getItem("option")));
    setitems(JSON.parse(localStorage.getItem("items")));
  }, [1]);

  const handlesubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    for (let key of items.entries()) {
      let title;
      if (
        key[1]["tag"].includes("input type='checkbox' ") ||
        key[1]["tag"].includes("input type='radio' ")
      ) {
        title = key[1]["title"];
      } else if (!key[1]["tag"].includes("input type='checkbox' ")) {
        title = key[1]["label"];
      }

      if (data.get(key[1]["id"]) == null) {
        continue;
      } else {
        let mydata = data.get(key[1]["id"]);
        console.log(title, " : ", mydata);
      }
    }
  };

  useEffect(() => {
    console.log(localStorage.getItem("items"));
  });

  return (
    <div className="alldivform">
      <div className="Contentform">
        <form className="myform" onSubmit={handlesubmit}>
          <div className="dragerform">
            {items &&
              items.map((item, index) => (
                <div className="divcontentform">
                  <div className="reqtitledivform">
                    {" "}
                    <div className="titleofelemform">
                      {" "}
                      <h3 className="head3">
                        {(item.tag.includes("input") &&
                          item.tag != "input type='radio' " &&
                          item.tag.includes("input") &&
                          item.tag != "input type='checkbox' ") ||
                        item.tag.includes("textarea")
                          ? item.label
                          : item.title}{" "}
                      </h3>
                    </div>
                    <div className="reqform">
                      {" "}
                      {item.required && <span>*</span>}{" "}
                    </div>
                  </div>

                  <>
                    {item.tag != "input type='radio' " &&
                    item.tag != "input type='checkbox' " ? (
                      <div
                        className="elemntform"
                        dangerouslySetInnerHTML={{
                          __html: `<${item.tag} 
                          name=${item.id}
                          ${item.required ? "required" : ""} class=${
                            item.tag == "input type='radio' " ||
                            item.tag == "input type='checkbox' "
                              ? "Checkbox"
                              : ""
                          }
                       
                        > 
                                    ${
                                      (item.tag.includes("input") &&
                                        item.tag != "input type='radio' " &&
                                        item.tag.includes("input") &&
                                        item.tag != "input type='checkbox' ") ||
                                      item.tag.includes("textarea")
                                        ? ""
                                        : `${item.label}`
                                    } 
                                     </${item.tag}>`,
                        }}
                      />
                    ) : (
                      <>
                        {" "}
                        {options.map((opt) =>
                          opt.emplacementid == item.id ? (
                            <div
                              className="elemnt"
                              dangerouslySetInnerHTML={{
                                __html: `<${item.tag} name=${item.id} ${
                                  item.required && "required"
                                } id="${opt.id}" ${
                                  opt.label && `value=${opt.label}`
                                }  ${
                                  item.title && `name=${item.title}`
                                }  class=${
                                  item.tag == "input type='radio' " ||
                                  item.tag == "input type='checkbox' "
                                    ? "Checkbox"
                                    : ""
                                }   > 
                                              ${
                                                (item.tag.includes("input") &&
                                                  item.tag !=
                                                    "input type='radio' " &&
                                                  item.tag.includes("input") &&
                                                  item.tag !=
                                                    "input type='checkbox' ") ||
                                                item.tag.includes("textarea")
                                                  ? ""
                                                  : `<span class="${item.class}">${opt.label} </span>`
                                              } 
                                                </${item.tag}>`,
                              }}
                            />
                          ) : null
                        )}
                      </>
                    )}
                  </>
                </div>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Testform;
