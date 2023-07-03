import React from 'react';

const Select = (props) => (
    <select  className=" text-gray-500 bg-white border rounded-md focus:border-egg" value={props.value} onChange={props.onChange}>
        {props.options.map((option,index) => (
            <option key={option.value + index} value={option.value} disabled={option.disabled}>{option.label}</option>
        ))}
         </select>
);

export default Select;