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
          "Authorization":
            "Bearer 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",

          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          model: "openai/gpt-3.5-turbo",

          messages: [
            {
              role: "system",
              content:
                "You are Darkverse AI, a futuristic helpful assistant."
            },

            {
              role: "user",
              content: message
            }
          ]

        })

      }
    );

    const data = await response.json();

    console.log(data);

    return res.status(200).json({
      reply:
        data.choices?.[0]?.message?.content ||
        "No reply from AI"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      reply: "Server Error"
    });

  }

}
