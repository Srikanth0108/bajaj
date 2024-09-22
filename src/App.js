import React, { useState } from "react";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await fetch("https://your-backend-api-url/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsedInput.data }),
      });

      const data = await response.json();
      setResponseData(data);
    } catch (err) {
      setError("Invalid JSON input");
    }
  };

  const handleSelectChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!responseData) return null;
    return (
      <div>
        {selectedOptions.includes("Alphabets") && (
          <p>Alphabets: {JSON.stringify(responseData.alphabets)}</p>
        )}
        {selectedOptions.includes("Numbers") && (
          <p>Numbers: {JSON.stringify(responseData.numbers)}</p>
        )}
        {selectedOptions.includes("Highest lowercase alphabet") && (
          <p>
            Highest Lowercase Alphabet:{" "}
            {JSON.stringify(responseData.highest_lowercase_alphabet)}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Challenge</h1>
      <textarea
        placeholder="Enter JSON input"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows="5"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {responseData && (
        <>
          <h2>Filter Response</h2>
          <select multiple onChange={handleSelectChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">
              Highest lowercase alphabet
            </option>
          </select>
        </>
      )}

      {renderResponse()}
    </div>
  );
}

export default App;
