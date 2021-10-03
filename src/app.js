import './style.scss';
import { monthNames, weekDays, years } from './data';
import * as Icon from 'react-bootstrap-icons';
import { useState } from 'react';

export default function Calendar() {

  let [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  let [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  let currentDay = new Date().getDate();

  let monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

  // number of rows in every month
  let rows = [];

  function createCalendar(year, month) {
    let date = new Date(year, month);
    // number of week day
    let weekDay = date.getDay();
    // total number of days (last day of every month)
    let monthDays = new Date(year, month + 1, 0).getDate();

    // convert total number of days to array
    let monthDaysArr = Array.from({ length: monthDays }, (k, i) => i++);

    // make Sunday last day of the week (default: 0)
    if (weekDay === 0) { weekDay = 7 }

    // if day is not first day of the week fill it with empty spaces
    let days = [];
    for (let i = 1; i < weekDay; i++) { days.push(null); };

    // push 7 days to each row
    monthDaysArr.forEach((day) => {
      days.push(day + 1);
      if (days.length === 7) {
        rows.push(days);
        days = [];
      };
    });

    // if last day is not Sunday fill it with empty spaces
    if (days.length !== 0) {
      for (let i = days.length; i < 7; i++) { days.push(null); };
    };

    // push the rest of the days
    rows.push(days);
  };

  createCalendar(currentYear, currentMonth);

  return (
    <div className="calendar py-5">
      <div className="calendar-body bg-white mx-auto text-center rounded shadow position-relative overflow-hidden">
        <div className="d-flex flex-column h-100">
          <div className="header bg-danger text-white fw-bold m-0 h-100">
            <div className="d-flex justify-content-between align-items-center mx-3 border-bottom py-2">
              <button
                className="btn text-white p-2"
                onClick={() => {
                  setCurrentMonth(--currentMonth);
                  if (currentMonth === -1) {
                    setCurrentMonth(11);
                    setCurrentYear(--currentYear);
                  };
                }}
              ><Icon.CaretLeftFill /></button>
              <div>
                <div 
                  className="p-2 pointer"
                  onClick={() => { document.querySelector('.years-overlay').classList.toggle('d-none'); }}
                >{currentYear}</div>
                <div 
                  className="p-2 pointer"
                  onClick={() => { document.querySelector('.months-overlay').classList.toggle('d-none'); }}
                >{monthName}</div>
              </div>
              <button
                className="btn text-white p-2"
                onClick={() => {
                  setCurrentMonth(++currentMonth);
                  if (currentMonth === 12) {
                    setCurrentMonth(0);
                    setCurrentYear(++currentYear);
                  };
                }}
              ><Icon.CaretRightFill /></button>
            </div>
          </div>
          <table className="table m-0 table-striped">
            <thead className="bg-danger">
              <tr className="text-white">
                {weekDays.map((item, index) => {
                  return (
                    <th key={index}>{item}</th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="">
              {rows.map((row, index) => {
                return (
                  <tr key={index}>
                    {row.map((day, index) => {
                      return (
                        <td key={index} className={"border" + (day === currentDay && currentYear === new Date().getFullYear() && currentMonth === new Date().getMonth() ? " bg-danger text-white" : "") + (index === 5 || index === 6 ? " text-danger" : "") + (day !== null ? " hoverable pointer" : "")}>{day}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="months-overlay h-100 position-absolute bg-white d-none">
          <div className="row m-0 h-100">
            {monthNames.map((month, index) => {
              return (
                <div 
                  key={index} 
                  className="col-4 border p-3 pointer centered hoverable"
                  onClick={() => {
                    setCurrentMonth(index);
                    document.querySelector('.months-overlay').classList.toggle('d-none');
                  }}
                >{month.slice(0, 3)}</div>
              );
            })}
          </div>
        </div>
        <div className="years-overlay h-100 position-absolute bg-white d-none">
          <div className="row m-0 h-100 overflow-auto">
            {years.map((year, index) => {
              return (
                <div 
                  key={index} 
                  className="col-3 border p-3 pointer centered hoverable"
                  onClick={() => {
                    setCurrentYear(year);
                    document.querySelector('.years-overlay').classList.toggle('d-none');
                    document.querySelector('.months-overlay').classList.toggle('d-none');
                  }}
                >{year}</div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};