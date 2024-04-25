import React, { useState, useEffect } from "react";
import { axiosInstance } from "./axiosInstance";

const NameMeaning = () => {
  const [name, setName] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const fetchNameMeanings = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const {data} = await axiosInstance.post("/fetch",{name:name})
      const apiData = JSON.parse(data.candidates[0].content.parts[0].text);
      console.log(apiData.meanings);
      console.log(data);
      setMeanings(apiData.meanings); 
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchNameMeanings();
  };

  useEffect(() => {
    setMeanings([]);
    setError(null);
  }, [name]);

  return (
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      <div class="bg-white rounded-lg shadow-lg p-8 w-96">
        <h1 class="text-3xl font-bold text-center mb-6">Find the Meaning</h1>
        <form class="space-y-4" onSubmit={handleSubmit}>
          <label for="name" class="text-gray-700">
            Enter your name:
          </label>
          <div class="relative">
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Your Name"
              class="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-purple-400"
            />
            <button
              type="submit"
              class="right-0 top-0 mt-2 mr-2 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300">
              Find Meaning
            </button>
          </div>
        </form>
        {isLoading && <p class="mt-4 text-gray-700">Loading meanings...</p>}
        {error && <p class="mt-4 text-red-500">Error: {error}</p>}
        {
          <div class="mt-4">
            <h2 class="text-xl font-semibold mb-2 text-gray-700">Meanings</h2>
            <ul class="grid grid-cols-1 gap-4">
              {meanings.map((meaning, index) => (
                <li key={index} class="bg-purple-100 p-4 rounded-lg">{meaning}</li>
              ))}
            </ul>
          </div>
        }
      </div>
    </div>
  );
};

export default NameMeaning;
