export default async function handler(req, res) {
  const { keyword } = req.body;

  const prompt = `Придумай 10 креативных Web3 названий по слову: "${keyword}". Используй стиль ENS (.eth), DAO, токены ($ABC), zk, мемы. Только список.`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "openai/gpt-4o",
      messages: [
        { role: "system", content: "Ты — генератор Web3 брендов" },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  const output = data.choices?.[0]?.message?.content || 'Ничего не найдено';

  res.status(200).json({ names: output });
}
