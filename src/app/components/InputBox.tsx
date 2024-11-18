"use client"
import React from 'react';

interface PropsModel {
  label: string;
  type: string;
  name?:string;
  value:string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<PropsModel> = ({ label, type, name,value,onChange }) => {
  return (
    <div>
      <label className="text-gray-800 text-sm mb-2 block">{label}</label>
      <div className="relative flex items-center">
        <input

          type={type}
          required
          className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
          placeholder={`Enter ${label.toLowerCase()}`}
          onChange={onChange}
          name={name}
          value={value}
        />
        
      </div>
    </div>
  );
};

export default InputBox;
