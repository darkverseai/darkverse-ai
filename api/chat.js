export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method not allowed"
    });
  }

  try {

    const { message } = req.body;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",

          messages: [
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    return res.status(200).json({
      reply: JSON.stringify(data)
    });

  } catch (err) {

    return res.status(500).json({
      reply: err.message
    });

  }
}
