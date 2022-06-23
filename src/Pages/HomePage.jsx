import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { config, PagesLimit, DataPerPage } from "../App";
import "./styles.css";

//components
import Pagination from "../components/Pagination/Pagination";
import Navbar from "../components/Navbar/index";
import DataTable from "../components/DataTable/index";

const HomePage = () => {
  const [tableData, setTableData] = useState([]);
  const [debounceTimeOut, setDebounceTimeOut] = useState(null);
  let [totalData, setTotalData] = useState([]);

  const PerformAPICall = async () => {
    console.log("perform api call");
    try {
      const result = await axios.get(`${config.endPoint}`);
      setTableData(result.data);
      setTotalData(result.data);
    } catch (error) {
      return error.result.data.message;
    }
  };

  const performSearch = async (text) => {
    try {
      if (text !== "") {
        const newData = tableData.filter(
          (item) =>
            item.name.includes(text) ||
            item.email.includes(text) ||
            item.role.includes(text)
        );
        if (newData) {
          setTableData(newData);
        }else{
          setTableData(totalData);
        }
      }
      
    } catch (error) {
      setTableData(tableData);
    }
  };

  const deleteOneUser = (id) => {
    totalData = totalData.filter((el) => el.id !== id);
    setTableData([...tableData.filter((el) => el.id !== id)]);
  };

  const deleteMultiUser = (id) => {
    setTableData([...tableData.filter((el) => id.indexOf(el.id) < 0)]);
    totalData = totalData.filter((el) => id.indexOf(el.id) < 0);
  };

  const debounceSearch = (event, debounceTimeOut) => {
    const value = event.target.value;
    if (debounceTimeOut !== 0) {
      clearTimeout(debounceTimeOut);
    }
    const timer = setTimeout(async () => {
      await performSearch(value);
    }, 500);
    setDebounceTimeOut(timer);
  };

  useEffect(() => {
    PerformAPICall();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <div className="search-bar">
          <input
            id="input-field"
            type="text"
            placeholder="Search by name, email or role"
            onChange={(e) => debounceSearch(e, debounceTimeOut)}
          />
        </div>
          {data.length > 0 ? (
            <Pagination
              data={tableData}
              pageLimit={PagesLimit}
              dataLimit={DataPerPage}
              onDelete={deleteOneUser}
              onMultiDelete={deleteMultiUser}
              RenderComponent={DataTable}
            />
          ) : (
            <div>No Data</div>
          )}
      </Container>
    </>
  );
};

export default HomePage;
