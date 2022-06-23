import React from "react";
import { Table } from "react-bootstrap";

//Component
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const DataTable = (props) => {
  return (
    <>
      <Table responsive border hover>
        <TableHeader
          columns={props.columns}
          checked={props.selected.length === props.data.length ? true : false}
          onSelect={props.onAllSelect}
        />
        <TableBody 
            columns={props.columns}
            data={props.data}
            onSelect={props.onSelect}
            selected={props.selected}
            delete={props.delete}
          />
       </Table> 
    </>)
    };

export default DataTable;
