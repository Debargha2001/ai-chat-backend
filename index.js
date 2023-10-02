const express = require ("express");
const cors =  require("cors");
const openAI =  require("./openAIClient");
const chatCompletion = async (request, response) => {
  try {
    const { chats } = request.body;

    const result = await openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a EbereGPT. You can help with graphic design tasks",
        },
        ...chats,
      ],
    });

    return response.status(200).json({
      message: "ok",
      data: result.choices[0].message,
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      message: err.message,
      data: null,
    });
  }
};


const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

app.post("/", chatCompletion)

app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });