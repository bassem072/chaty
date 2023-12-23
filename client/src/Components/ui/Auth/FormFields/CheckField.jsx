import React from 'react'

export default function CheckField({ name, text, val, onChange, onBlur }) {
  return (
    <>
      <div className="max-w-sm w-full mb-2.5 text-paragraph text-md pt-2">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={val}
            className="checked:accent-primary h-4 w-4 mr-2 rounded-full align-middle border-[1.5px] border-secondary"
          />
          {text}
        </label>
      </div>
    </>
  );
}
