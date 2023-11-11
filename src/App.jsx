import "./App.css";
import React, { useState, useEffect } from "react";
import data from "./data.json";

function App() {
  const [jsonData, setJsonData] = useState(data);
  const [filterName, setFilterName] = useState("");
  const [filterEffect, setFilterEffect] = useState("");

  useEffect(() => {
    const sortedData = [...jsonData].sort((a, b) =>
      a.Name.localeCompare(b.Name)
    );
    setJsonData(sortedData);
  }, [jsonData]);

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleFilterEffectChange = (event) => {
    setFilterEffect(event.target.value);
  };

  const filteredData = jsonData.filter(
    (item) =>
      item.Name.toLowerCase().includes(filterName.toLowerCase()) &&
      (filterEffect === "" ||
        [item.Effect1, item.Effect2, item.Effect3, item.Effect4].includes(
          filterEffect
        ))
  );

  const uniqueEffects = [
    ...new Set(
      jsonData.flatMap((item) =>
        [item.Effect1, item.Effect2, item.Effect3, item.Effect4].filter(
          (effect) => effect !== null
        )
      )
    ),
  ];

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="font-bold">Kurwa Alchemy Giga Chad</h1>
      <div className="mb-4">
        <label htmlFor="filterName" className="block text-sm font-medium">
          Filter by Name:
        </label>
        <input
          type="text"
          id="filterName"
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Enter name to filter"
          value={filterName}
          onChange={handleFilterNameChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="filterEffect" className="block text-sm font-medium">
          Filter by Effect:
        </label>
        <select
          id="filterEffect"
          className="mt-1 p-2 border rounded-md w-full"
          value={filterEffect}
          onChange={handleFilterEffectChange}
        >
          <option value="">All Effects</option>
          {uniqueEffects.map((effect) => (
            <option key={effect} value={effect}>
              {effect}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        If you want to contribute message{" "}
        <a
          href="https://discord.com/users/189169615786475521"
          className="underline text-emerald-500"
        >
          leviwulf
        </a>{" "}
        at discord
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md text-black">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b ">Effect 1</th>
              <th className="py-2 px-4 border-b ">Effect 2</th>
              <th className="py-2 px-4 border-b ">Effect 3</th>
              <th className="py-2 px-4 border-b ">Effect 4</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.Name} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{item.Name}</td>
                <td className="py-2 px-4 border-b ">{item.Effect1}</td>
                <td className="py-2 px-4 border-b ">{item.Effect2}</td>
                <td className="py-2 px-4 border-b ">{item.Effect3}</td>
                <td className="py-2 px-4 border-b ">{item.Effect4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default App;
