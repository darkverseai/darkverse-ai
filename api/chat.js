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

          model:
            "openai/gpt-3.5-turbo",

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

    const reply =
      data.choices?.[0]?.message?.content
      || "No AI reply";

    res.status(200).json({
      reply
    });

  }

  catch (error) {

    res.status(500).json({
      reply: "Server Error"
    });

  }

}
