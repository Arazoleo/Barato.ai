import "server-only";

async function evolutionPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${process.env.EVOLUTION_API_URL}${path}/${process.env.EVOLUTION_INSTANCE}`, {
    method: "POST",
    headers: { apikey: process.env.EVOLUTION_API_KEY!, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Evolution API error ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

export function sendText(number: string, text: string) {
  return evolutionPost("/message/sendText", { number, text });
}

export async function getMediaBase64(messageId: string) {
  const { base64, mimetype } = await evolutionPost<{ base64: string; mimetype: string }>(
    "/chat/getBase64FromMediaMessage",
    { message: { key: { id: messageId } }, convertToMp4: false },
  );
  return { buffer: Buffer.from(base64, "base64"), mimetype };
}
