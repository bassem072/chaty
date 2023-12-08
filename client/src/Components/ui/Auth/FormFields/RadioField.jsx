import React from 'react'
import RadioInput from './RadioInput';

export default function RadioField({ onChange, onBlur, currentVal, condition, title, error }) {
  return (
    <div>
      <div className="max-w-sm w-full flex gap-5">
        <p className="text-lg pb-1 flex items-center whitespace-nowrap">
          {title}
        </p>
        <div className="flex w-full gap-4 my-3">
          <RadioInput
            onChange={onChange}
            onBlur={onBlur}
            text="Male"
            name="gender"
            val={0}
            currentVal={currentVal}
            condition={condition}
          />
          <RadioInput
            onChange={onChange}
            onBlur={onBlur}
            text="female"
            name="gender"
            val={1}
            currentVal={currentVal}
            condition={condition}
          />
        </div>
      </div>
      <div className="max-w-sm w-full text-sm text-red-600">
        {condition
          ? "* " + error
          : null}
      </div>
    </div>
  );
}
