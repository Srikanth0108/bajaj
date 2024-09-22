const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "10mb" }));

// Helper function to separate numbers and alphabets
function separateData(data) {
  const numbers = [];
  const alphabets = [];
  let highestLowerCase = null;

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === "string") {
      alphabets.push(item);
      if (item === item.toLowerCase()) {
        if (!highestLowerCase || item > highestLowerCase) {
          highestLowerCase = item;
        }
      }
    }
  });

  return { numbers, alphabets, highestLowerCase };
}

// POST method to handle the logic
app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid data" });
  }

  // Separate numbers and alphabets
  const { numbers, alphabets, highestLowerCase } = separateData(data);

  // File handling (dummy validation for this example)
  const fileValid = file_b64 ? true : false;
  const fileMimeType = file_b64 ? "image/png" : null; // This can be dynamic with real validation
  const fileSizeKB = file_b64 ? Math.ceil((file_b64.length * 3) / 4 / 1024) : 0;

  // Create the response
  const response = {
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowerCase ? [highestLowerCase] : [],
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB,
  };

  res.json(response);
});

// GET method to return operation_code
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
