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
          "Authorization": "Bearer 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
          "Content-Type": "application/json",
          "HTTP-Referer": "https://darkverse-ai.vercel.app",
          "X-Title": "Darkverse AI"
        },

        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",

          messages: [
            {
              role: "system",
              content: "You are Darkverse AI, a smart futuristic assistant."
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

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({
        reply: "No reply from AI"
      });
    }

    return res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      reply: "Server Error ❌"
    });
  }
}
