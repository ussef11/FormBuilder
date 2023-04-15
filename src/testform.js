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
  const [display, setdisplay] = useState();
  const [options, setoptions] = useState();
  useEffect(() => {
    let myoptions = [
      {
        emplacementid: "92d53091-7881-8079-91a1-e4a8388ef7f411",
        index: 1,
        id: 1,
        label: "men",
      },
      {
        emplacementid: "92d53091-7881-8079-91a1-e4a8388ef7f411",
        index: 2,
        id: 2,
        label: "women",
      },
      {
        emplacementid: "92d53091-7881-8079-91a1-e4a8388ef7f411",
        index: 3,
        id: 3,
        label: "Other",
      },
      {
        emplacementid: "92d53091-7881-8079-91a1-e4a8388ef7f4111",
        index: 4,
        id: 4,
        label: "bac",
      },
      {
        emplacementid: "92d53091-7881-8079-91a1-e4a8388ef7f4111",
        index: 5,
        id: 5,
        label: "licence",
      },
    ];
    setoptions(myoptions);
    setdisplay([
      {
        id: "92d53091-7881-8079-91a1-e4a8388ef7f41",
        title: "",
        thumbs: "header",
        tag: "h1",
        label: "Welcome To My form",
        required: false,
      },
      {
        id: "92d53091-7881-8079-91a1-e4a8388ef7f411",
        title: "gender",
        thumbs: "header.png",
        tag: "input type='radio' ",
        label: "",
        class: "labelL",
        required: false,
      },
      {
        id: "92d53091-7881-8079-91a1-e4a8388ef7f4111",
        title: "degrees",
        thumbs: "Checkbox.png",
        tag: "input type='checkbox' ",
        label: "",
        class: "labelL",
        required: false,
      },
      {
        id: "92d53091-7881-8079-91a1-e4a8388ef7f41111",
        title: "Number",
        thumbs: "header.png",
        tag: "input type='Number' ",
        label: "Years of experience ",
        class: "labelL",
        required: true,
      },
      {
        id: "92d53091-7881-8079-91a1-e4a8388ef7f411111",
        title: "textarea",
        thumbs: "header.png",
        tag: "textarea",
        label: "lettre de motivation",
        class: "labelL",
        required: false,
      },
      {
        id: "92d53091-7881-8079-91a1-e4a8388ef7f4111111",
        title: "File Upload",
        thumbs: "file.png",
        tag: "input type='file' ",
        label: "Telecharger C.V",
        required: false,
      },
      {
        id: "92d53091-7881-8079-91a1-e4a8388ef7f41111111",
        title: "",
        thumbs: "button.png",
        tag: "button",
        label: "Submit",
        required: false,
      },
    ]);
  }, [1]);

  const handlesubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    for (let key of display.entries()) {
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

  return (
    <div className="alldiv">
      <div style={{ background: "white" }} className="Content">
        <form className="myform" onSubmit={handlesubmit}>
          <div className="drager">
            {display &&
              display.map((item, index) => (
                <div>
                  <div className="reqtitlediv">
                    {" "}
                    <div className="titleofelem">
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
                    <div>
                      {" "}
                      {item.required && <span className="req">*</span>}{" "}
                    </div>
                  </div>

                  <>
                    {item.tag != "input type='radio' " &&
                    item.tag != "input type='checkbox' " ? (
                      <div
                        className="elemnt"
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
