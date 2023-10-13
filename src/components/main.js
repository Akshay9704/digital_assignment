import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import dayjs from "dayjs";
import { format } from "date-fns";

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState([dayjs(""), dayjs("")]);
  const [leads, setLeads] = useState();
  const [data, setData] = useState(getData);
  localStorage.setItem("data", JSON.stringify(data));

  const startDateValue = new Date(value[0].$d);
  const endDateValue = new Date(value[1].$d);
  const timeDifference = endDateValue - startDateValue;
  const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  const Month = new Date(value[0].$M + 1);
  const startDate = value[0].$d.toLocaleDateString();
  const endDate = value[1].$d.toLocaleDateString();
  const DE = `${startDate} - ${endDate}`;
  const timestamp = new Date().getTime();
  const lastUpdate = format(timestamp, "MM/dd/yyyy");

  const Number = parseFloat(leads);
  const DRR = isNaN(Number) ? 0 : Math.floor(Number / days);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCancel = () =>{
    if (isOpen === true){
      setIsOpen(false);
    }
  }

  const validateDates = () => {
    if (days < 0) {
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateDates()) {
      alert("Enter Valid Dates")
    } else {
      const newData = {
        startDate: startDate,
        endDate: endDate,
        DE: DE,
        days: days,
        DRR: DRR,
        Month: Month,
        leads: leads,
        lastUpdate: lastUpdate,
      };
      setData([...data, newData]);
    }
  };

  function getData() {
    const Items = localStorage.getItem("data");
    if (Items) {
      return JSON.parse(Items);
    } else {
      return [];
    }
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="flex flex-col gap-2 justify-start items-start w-full mx-20">
        <div>
          <Button onClick={handleClick} size="sm" variant="outline-primary">
            Add New
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table striped bordered hover className="min-w-full">
            <thead>
              <tr>
                <th>Action</th>
                <th>ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Month, Year</th>
                <th>Dates Excluded</th>
                <th>Number of Days</th>
                <th>Lead Count</th>
                <th>Expected DRR</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {isOpen ? (
                <tr>
                  <td>N/A</td>
                  <td>N/A</td>
                  <td>{value[0] ? value[0].$d.toLocaleDateString() : null}</td>
                  <td>{value[1] ? value[1].$d.toLocaleDateString() : null}</td>
                  <td>{value[0] ? value[0].$M + 1 : null}</td>
                  <td>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["SingleInputDateRangeField"]}>
                        <SingleInputDateRangeField
                          size="small"
                          value={value}
                          onChange={(newValue) => setValue(newValue)}
                          format="MM-DD-YYYY"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </td>
                  <td>{days}</td>
                  <td>
                    <input
                      className="w-20 px-1 py-1"
                      type="text"
                      id="count"
                      name="count"
                      placeholder="0"
                      onChange={(e) => setLeads(e.target.value)}
                    />
                  </td>
                  <td>{DRR}</td>
                  <td className="flex flex-col gap-2">
                    <Button variant="outline-success" onClick={handleSave}>
                      Save
                    </Button>
                    <Button variant="outline-danger" onClick={handleCancel}>Cancel</Button>
                  </td>
                </tr>
              ) : null}
              {data.length > 0 ? (
                data.map((element, index) => (
                  <tr key={index}>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>{element.startDate}</td>
                    <td>{element.endDate}</td>
                    <td></td>
                    <td>{element.DE}</td>
                    <td>{element.days}</td>
                    <td>{element.leads}</td>
                    <td>{element.DRR}</td>
                    <td>{element.lastUpdate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No data to display</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Main;
