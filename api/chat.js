export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method not allowed"
    });
  }

  try {

    const { message } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data);

    // Debug response
    if (data.error) {
      return res.status(200).json({
        reply: "Gemini Error: " + data.error.message
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(200).json({
        reply: "No text reply from Gemini"
      });
    }

    return res.status(200).json({
      reply
    });

  } catch (error) {

    return res.status(500).json({
      reply: "Server Error: " + error.message
    });

  }

}
