// node --version # Should be >= 18
// npm install @google/generative-ai
import {config} from "dotenv"
config()
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = process.env.API_KEY;

 export async function runChat(inputMsg) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "you are person with programming skill and lots of understanding with word and peoples name whenever user give his name you have to give response json with 5 different meaning of name",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: 'python\ndef get_name_meanings(name):\n  """\n  This function simulates retrieving meanings for a given name. \n  In reality, you would likely use a name meaning API or database. \n  This example provides mock data for demonstration purposes.\n  """\n  # Simulate a database of name meanings (replace with actual API call or database lookup)\n  name_data = {\n      "John": ["God is gracious", "Gift of God", "Yahweh has been gracious", "Jehovah has been gracious", "Merciful"],\n      "Mary": ["Star of the sea", "Rebelliousness", "Wished-for child", "Bitterness", "Beloved"],\n      "David": ["Beloved", "Uncle", "Friend", "Chieftain", "Leader"],\n      # Add more names and meanings as needed\n  }\n\n  if name in name_data:\n    meanings = name_data[name]\n  else:\n    meanings = ["Meaning 1 (default)", "Meaning 2 (default)", "Meaning 3 (default)", \n                 "Meaning 4 (default)", "Meaning 5 (default)"]  # Default meanings if name not found\n\n  response = {\n      "name": name,\n      "meanings": meanings\n  }\n  return response\n\n# Example usage:\nuser_name = input("Enter your name: ")\nresult = get_name_meanings(user_name)\nprint(result)  # This would ideally be returned as a JSON response\n\n**Explanation:**\n\n1. **`get_name_meanings(name)` Function:**\n   - Takes a `name` (string) as input.\n   - Simulates a database lookup using a dictionary (`name_data`) where keys are names and values are lists of meanings. \n     (In a real application, you would use an API or a more comprehensive database.)\n   - If the `name` is found, it retrieves the corresponding list of meanings.\n   - If the `name` is not found, it provides default placeholder meanings.\n   - Creates a dictionary `response` containing the `name` and its `meanings`.\n   - Returns the `response` dictionary.\n\n2. **Example Usage:**\n   - Prompts the user to enter their name.\n   - Calls the `get_name_meanings` function with the entered name.\n   - Prints the resulting dictionary (which would be sent as a JSON response in a web application). \n\n**To use this code:**\n\n1. **Replace the Mock Data:** Substitute the `name_data` dictionary with a real name meaning API or database connection to fetch actual meanings. \n2. **Integrate into your Application:** \n   - **Web Application:** Use a web framework (like Flask or Django) to create an endpoint that receives the name, calls this function, and returns the JSON response.\n   - **Command-Line Script:**  Keep the user input part and use the printed dictionary as needed. \n\n**Remember:** This code provides a basic structure. You\'ll need to handle potential errors (e.g., API request failures) and adapt it to your specific application requirements.',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "abhishek" }],
      },
      {
        role: "model",
        parts: [
          {
            text: '\n{\n  "name": "abhishek",\n  "meanings": [\n    "Bath of Lord Shiva", \n    "Anointment",\n    "Consecration by sprinkling water",\n    "Sprinkling",\n    "Ritual bathing"\n  ]\n}\n',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "sumit" }],
      },
      {
        role: "model",
        parts: [
          {
            text: '\n{\n  "name": "sumit",\n  "meanings": [\n    "Good friend",\n    "Well Measured",\n    "A good friend or companion", \n    "One who is a good friend",\n    "measured" \n  ]\n}\n',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "prashant" }],
      },
      {
        role: "model",
        parts: [
          {
            text: '\n{\n  "name": "prashant",\n  "meanings": [\n    "Peaceful",\n    "Calm",\n    "Tranquil",\n    "Serene", \n    "Composed"\n  ]\n}\n',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "shridhar" }],
      },
      {
        role: "model",
        parts: [
          {
            text: '\n{\n  "name": "shridhar",\n  "meanings": [\n    "Lord Vishnu",\n    "One who holds the goddess of wealth",\n    "A name of Vishnu",\n    "The one who is the husband of Lakshmi", \n    "The lord of riches"\n  ]\n}\n',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "shridhar" }],
      },
      {
        role: "model",
        parts: [
          {
            text: '\n{\n  "name": "shridhar",\n  "meanings": [\n    "Lord Vishnu",\n    "One who holds the goddess of wealth",\n    "A name of Vishnu",\n    "The one who is the husband of Lakshmi", \n    "The lord of riches"\n  ]\n}\n',
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage(inputMsg);
  const response = result.response;
  console.log(response.text());
  return response
}

