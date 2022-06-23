import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import "./pagination.css";

const Pagination = (props) => {
  const page = Math.max(Math.round(props.data.length / props.dataLimit), 1);

  const [selected, setSelected] = useState([]);
  const [pages, setPages] = useState(page);
  const [currentPage, setCurrentPage] = useState(1);

  const FirstPage = () => {
    setCurrentPage(1);
    setSelected([]);
  };

  const LastPage = () => {
    setCurrentPage(pages);
    setSelected([]);
  };

  const NextPage = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
      setSelected([]);
    }
  };

  const PreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setSelected([]);
    }
  };

  const changePage = (e) => {
    const pageNumber = Number(e.target.textContent);
    setCurrentPage(pageNumber);
    setSelected([]);
  };

  const paginationData = () => {
    const startIndex = currentPage * props.dataLimit - props.dataLimit;
    const endIndex = startIndex + props.dataLimit;
    return props.data.slice(startIndex, endIndex);
  };

  const paginationGroup = () => {
    let start =
      Math.floor((currentPage - 1) / props.dataLimit) * props.dataLimit;
    return new Array(Math.min(pages, props.pageLimit))
      .fill()
      .map((_, idx) => start + idx + 1);
  };

  const visibleAll = () => {
    if (selected.length === getPaginationData().length) {
      setSelected([]);
    } else {
      setSelected([...getPaginationData().map((el) => el.id)]);
    }
  };

  const visibleRow = (id) => {
    let newSelected = [selected];
    let idx = selected.indexOf(id);

    if (idx >= 0) {
      newSelected = selected.filter((el) => el !== id);
    } else {
      newSelected = [id, ...newSelected];
    }
    setSelected([...newSelected]);
  };

  const handleDelete = (id) => {
    if (!id.length) {
      setSelected([...selected.filter((el) => el !== id)]);
      props.onDelete(id);
    } else {
      setSelected([...selected.filter((el) => id.indexOf(el) < 0)]);
      props.onMultiDelete(id);
    }
  };

  return (
    <>
      <props.RenderComponent
        columns={Object.keys(props.data[0]).slice(1)}
        data={paginationData()}
        selected={selected}
        onAllSelect={visibleAll}
        onSelect={visibleRow}
        delete={handleDelete}
      />
      {selected.length > 0 ? (
        <Button
          onClick={() => {
            handleDelete(selected);
          }}
          variant="danger"
        >
          Delete Selected
        </Button>
      ) : null}

      <div className="pagination">
        <button
          onClick={FirstPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          <span>
            <BiArrowFromRight className="icon" />
          </span>
        </button>
        <button
          onClick={PreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          <span>
            <IoIosArrowBack className="icon" />
          </span>
        </button>
        {paginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}
        <button
          onClick={NextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          <span>
            <IoIosArrowForward className="icon" />
          </span>
        </button>
        <button
          onClick={LastPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          <span>
            <BiArrowFromLeft className="icon" />
          </span>
        </button>
      </div>
    </>
  );
};

export default Pagination;
