import React from "react";

import TableRows from "./TableRows";

const TableBody = (props) => {
  // console.log(props);
  return (
    <>
      <tbody>
        {props.data.map((item) => (
          <TableRows
            columns={props.columns}
            key={item.id}
            checked={props.selected.indexOf(item.id) >= 0 ? true : false}
            delete={props.delete}
            onSelect={props.onSelect}
            item={item}
          />
        ))}
      </tbody>
    </>
  );
};

export default TableBody;
