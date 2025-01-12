"use client";

import { useState } from "react";

let idCounter = 1;

export default function Home() {
  const [fields, setFields] = useState<{ id: number; input: string; select: string }[]>([
    { id: idCounter, input: "", select: "" },
  ]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (id: number, field: string, value: string) => {
    setFields((prevFields) =>
      prevFields.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const addField = () => {
    idCounter += 1;
    setFields([...fields, { id: idCounter, input: "", select: "" }]);
  };

  const deleteField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    fields.forEach((field) => {
      if (!field.input) newErrors[`input-${field.id}`] = "Input is required";
      if (!field.select) newErrors[`select-${field.id}`] = "Select is required";
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Dynamic Form Challenge</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-100 p-4 rounded shadow-md"
      >
        {fields.map((field) => (
          <div key={field.id} className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter value"
                value={field.input}
                onChange={(e) =>
                  handleInputChange(field.id, "input", e.target.value)
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors[`input-${field.id}`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`input-${field.id}`]}
                </p>
              )}
            </div>

            <div className="flex-1">
              <select
                value={field.select}
                onChange={(e) =>
                  handleInputChange(field.id, "select", e.target.value)
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
              {errors[`select-${field.id}`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`select-${field.id}`]}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => deleteField(field.id)}
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={addField}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            + Add Field
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>

      <h3 className="text-lg font-semibold mt-6">Form State:</h3>
      <table className="w-full mt-4 border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Input</th>
            <th className="px-4 py-2 border">Select</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.id}>
              <td className="px-4 py-2 border">{field.input}</td>
              <td className="px-4 py-2 border">{field.select}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
