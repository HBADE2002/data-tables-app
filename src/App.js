import "./App.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import { Input } from "antd";
const { Search } = Input;
function App() {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  
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
        // console.log(data);
        
        const flattenedData = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          city: user.address.city,

        }));

        setRecords(flattenedData);
        setFilterRecords(flattenedData);
        // console.log(flattenedData);
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
    // console.log('delete clicked', id);
    // alert('Row deleted');
    // const updatedRecords = records.filter((record) => record.id!== id);
    // setRecords(updatedRecords);
    // setFilterRecords(updatedRecords);

    const index = records.findIndex(item => item.id === id); // finds the index of the record to be deleted returns -1 is not match is found
    if (index !== -1) { 
      const newArray = [...records.slice(0,index), ...records.slice(index + 1)]; // gets the items before the index and the items after the index, hence ommitting the matching index
      setRecords(newArray);
      console.log('Index of Record Array Deleted', index);
    }
    
    // const updatedRecords = records.filter((_, i) => i !== id && id !== 0);
    // setRecords(updatedRecords);
    // setFilterRecords(updatedRecords);
    // console.log('Index of Record Array Deleted', updatedRecords, id);
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
      name: "Edit",
      cell: () => <button>Edit</button>
    },
    {
      name :"Delete",
      cell: (row) => (<button onClick={()=>handleDelete(row.id)}>Delete</button>)
    }
  ];

  //logic for search function in table
  const handleFilter = (e) => {
    const filteredData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setRecords(filteredData);
  };

  // console.log("Records", records);

  return (
    <div className="App">
      <div className="table-header-container">
        <CSVLink data={records}>
        <button className="buttonContainer">
          Click Here to Convert to CSV
        </button>
      </CSVLink>
      <div className="searchContainer">
      <Search placeholder="input search text" onChange={handleFilter} enterButton />
      </div>
      
      </div>
     
      <DataTable
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
        selectableRows
      />
      
    </div>
  );
}

export default App;