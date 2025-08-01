export default async function handler(req, res) {
  const { keyword } = req.body;

  const prompt = `Generate a list of 10 creative Web3 brand names based on the keyword: "${keyword}". Include styles like ENS (.eth), DAOs, token tickers ($XYZ), zk, memes, and wordplay. Respond with ONLY the list of names, one per line, no explanation.`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a naming assistant for Web3 and crypto projects."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  const data = await response.json();
  const output = data.choices?.[0]?.message?.content || 'No results found';

  res.status(200).json({ names: output });
}
