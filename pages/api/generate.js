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
