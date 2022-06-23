import React, { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import "./tablestyles.css";

const TableRows = (props) => {
  const [editable, setEditable] = useState(false);

  const handleDelete = (id) => {
    if (!editable) {
      props.delete(id);
    }
  };

  const handleToggle = (id) => {
    props.onSelect(id);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    setEditable(false);
  };
  return (
    <>
      <tr className={props.checked ? "selected" : "deselected"}>
        <td>
          <input
            type="checkbox"
            checked={props.checked}
            onChange={() => handleToggle(props.item.id)}
            value={props.item.id}
          />
        </td>

        {props.columns.map((columnName) => (
          <td id={`${columnName}-${props.item.id}`} contentEditable={editable}>
            {props.item[columnName]}
          </td>
        ))}

        <td id="actions">
          {editable ? (
            <button onClick={handleSave}>
              <img
                src="https://img.icons8.com/material-rounded/24/000000/save.png"
                alt="save-button"
              />
            </button>
          ) : null}
          <button onClick={handleEdit} disabled={editable}>
            <span>
              <BiEdit className="icon" />
            </span>
          </button>
          <button
            disabled={editable}
            onClick={(e) => {
              handleDelete(props.item.id);
            }}
          >
            <span>
              <BiTrash className="icon" />
            </span>
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableRows;
