import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI();

const allMessages = [];

export async function invoke(prompt) {
  const completion = await openai.beta.chat.completions.parse({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a funny assistant' },
      ...allMessages,
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const text = completion.choices[0].message.content;
  allMessages.push({ role: 'user', content: prompt });
  allMessages.push({ role: 'assistant', content: text });
  return text;
}
