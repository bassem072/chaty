import React from 'react';
import { days, months, years } from '../../../../helpers/dates';

export default function SelectField({ onBlur, onChange, dayVal, monthVal, yearVal, error }) {
  return (
    <>
      <div className="max-w-sm w-full flex gap-5 my-3">
        <p className="text-lg pb-1 flex items-center whitespace-nowrap">
          Date of birth
        </p>
        <div className="flex w-full gap-4">
          <select
            name="day"
            placeholder="day"
            onChange={onChange}
            onBlur={onBlur}
            value={dayVal}
            className={
              "w-full border-2 rounded-md px-2 py-2 focus:outline-none bg-active " +
              (error ? "border-red-600" : "border-active")
            }
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <select
            name="month"
            placeholder="Month"
            onChange={onChange}
            onBlur={onBlur}
            value={monthVal}
            className={
              "w-full border-2 rounded-md px-2 py-2 focus:outline-none bg-active " +
              (error ? "border-red-600" : "border-active")
            }
          >
            {months.map((month, key) => (
              <option key={key} value={key}>
                {month}
              </option>
            ))}
          </select>
          <select
            name="year"
            placeholder="Year"
            onChange={onChange}
            onBlur={onBlur}
            value={yearVal}
            className={
              "w-full border-2 rounded-md px-2 py-2 focus:outline-none bg-active " +
              (error ? "border-red-600" : "border-active")
            }
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="max-w-sm w-full text-sm text-red-600">
        {error ? "* " + error : null}
      </div>
    </>
  );
}
