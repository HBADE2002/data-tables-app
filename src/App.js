import "./App.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import { Input } from "antd";
import ModalPop from "./components/ModalPop";
// import Modal from "react-bootstrap/Modal";

const { Search } = Input;
function App() {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleInfo = (row) => {
    console.log("Row clicked:", row);
    setShowModal(true);
    setModalData(row);
  };

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "darkblue",
        color: "white",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "600",
        textTransform: "uppercase",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
      },
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();

        // age data
        const age_data = [
          { id: 1, age: 28 },
          { id: 2, age: 35 },
          { id: 3, age: 22 },
          { id: 4, age: 39 },
          { id: 5, age: 31 },
          { id: 6, age: 19 },
          { id: 7, age: 26 },
          { id: 8, age: 33 },
          { id: 9, age: 37 },
          { id: 10, age: 24 },
        ];

        // Merging the fetched data with the age data
        const flattenedData = data.map((user) => {
          // const userAgeData = age_data.find(age => age.id === user.id);
          const userAgeData = age_data.find((age) => age.id === user.id);
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            city: user.address.city,
            age: userAgeData ? userAgeData.age : "N/A", // Set age if found, otherwise 'N/A'
          };
        });

        setRecords(flattenedData);
        setFilterRecords(flattenedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //this function is called when the delete button is clicked
  //items not equal to passed id are TRUE and printed and the same id are FALSE and filtered out
  // filtered items are stored in a new array and record and filter-record state is updated
  const handleDelete = (id) => {
    const index = records.findIndex((item) => item.id === id); // finds the index of the record to be deleted returns -1 is not match is found
    if (index !== -1) {
      const newArray = [
        ...records.slice(0, index),
        ...records.slice(index + 1),
      ]; // gets the items before the index and the items after the index, hence ommitting the matching index
      setRecords(newArray);
      console.log("Index of Record Array Deleted", index);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.age > 18,
          style: {
            backgroundColor: "green",
            color: "white",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row.age > 30,
          style: {
            backgroundColor: "yellow",
            color: "black",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],
    },
    {
      name: "Info",
      cell: (row) => <button onClick={() => handleInfo(row)}>Info</button>,
    },
    {
      name: "Edit",
      cell: () => <button>Edit</button>,
    },
    {
      name: "Delete",
      cell: (row) => (
        <button onClick={() => handleDelete(row.id)}>Delete</button>
      ),
    },
  ];

  //logic for search function in table, users can be searched by userID, name, email, city 
  const handleFilter = (e) => {
    const filteredData = filterRecords.filter(
      (row) => 
        row.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          row.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
          row.city.toLowerCase().includes(e.target.value.toLowerCase())||
          row.id.toString().includes(e.target.value)
      
      // row.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // .filter((row) => row.email.toLowerCase().includes(e.target.value.toLowerCase()))
    // .filter((row) => row.city.toLowerCase().includes(e.target.value.toLowerCase()));
    setRecords(filteredData);
  };

  return (
    <div className="App">
      <div className="table-header-container">
        <CSVLink data={records}>
          <button className="buttonContainer">
            Click Here to Convert to CSV
          </button>
        </CSVLink>
        <div className="searchContainer">
          <Search
            placeholder="input search text"
            onChange={handleFilter}
            enterButton
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
        selectableRows
      />
      <ModalPop
        show={showModal}
        onHide={() => setShowModal(false)}
        rowData={modalData}
      />
    </div>
  );
}

export default App;
