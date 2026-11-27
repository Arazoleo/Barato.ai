import crypto from "node:crypto";
import { after, type NextRequest } from "next/server";
import { handleMessage, type EvolutionMessageData } from "@/lib/whatsapp/handle-message";

export const runtime = "nodejs";

type EvolutionWebhookBody = {
  event?: string;
  instance?: string;
  data?: EvolutionMessageData;
};

function isValidSecret(received: string | null) {
  const expected = Buffer.from(process.env.EVOLUTION_WEBHOOK_SECRET ?? "");
  const actual = Buffer.from(received ?? "");
  // timingSafeEqual lança erro com tamanhos diferentes, então a checagem de tamanho vem antes.
  return (
    expected.length > 0 &&
    actual.length === expected.length &&
    crypto.timingSafeEqual(actual, expected)
  );
}

function isIgnoredChat(remoteJid: string) {
  return remoteJid.endsWith("@g.us") || remoteJid === "status@broadcast";
}

export async function POST(req: NextRequest) {
  if (!isValidSecret(req.headers.get("x-webhook-secret"))) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = (await req.json()) as EvolutionWebhookBody;
  // O evento pode chegar como "messages.upsert" ou "MESSAGES_UPSERT", dependendo da configuração da instância.
  const event = body.event?.toLowerCase().replace("_", ".");
  const data = body.data;
  if (event !== "messages.upsert" || !data?.key) {
    return new Response("OK", { status: 200 });
  }

  // Sem o filtro de fromMe o bot responderia às próprias mensagens em loop.
  if (data.key.fromMe === true || isIgnoredChat(data.key.remoteJid)) {
    return new Response("OK", { status: 200 });
  }

  // Responde logo para a Evolution não ficar esperando; o processamento roda depois da resposta.
  after(async () => {
    try {
      await handleMessage(data);
    } catch (error) {
      console.error(`[whatsapp] falha ao processar ${data.key.id}`, error);
    }
  });

  return new Response("OK", { status: 200 });
}
