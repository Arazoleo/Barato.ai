import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getMediaBase64, sendText } from "@/lib/whatsapp/evolution";

type MediaContent = { mimetype?: string; caption?: string; fileName?: string };

export type EvolutionMessageData = {
  key: {
    id: string;
    remoteJid: string;
    fromMe?: boolean;
    remoteJidAlt?: string;
    senderPn?: string;
  };
  pushName?: string;
  messageType: string;
  message?: {
    conversation?: string;
    extendedTextMessage?: { text?: string };
    imageMessage?: MediaContent;
    audioMessage?: MediaContent;
    documentMessage?: MediaContent;
    documentWithCaptionMessage?: { message?: { documentMessage?: MediaContent } };
  };
};

const TYPE_LABELS: Record<string, string> = {
  conversation: "texto",
  extendedTextMessage: "texto",
  imageMessage: "imagem",
  audioMessage: "áudio",
  documentMessage: "documento",
  documentWithCaptionMessage: "documento",
};

function extractContent(message: EvolutionMessageData["message"]) {
  const media =
    message?.imageMessage ??
    message?.audioMessage ??
    message?.documentMessage ??
    message?.documentWithCaptionMessage?.message?.documentMessage;

  return {
    text: message?.conversation ?? message?.extendedTextMessage?.text ?? media?.caption ?? null,
    media,
  };
}

/** "audio/ogg; codecs=opus" -> "ogg" */
function extensionFromMime(mimetype: string) {
  return mimetype.split(";")[0].split("/")[1] ?? "bin";
}

export async function handleMessage(data: EvolutionMessageData) {
  const { key } = data;
  const { text, media } = extractContent(data.message);

  // A Evolution pode reenviar o mesmo evento; o message_id único garante que cada mensagem é processada uma vez.
  const { data: inserted, error } = await supabaseAdmin
    .from("whatsapp_messages")
    .upsert(
      {
        message_id: key.id,
        remote_jid: key.remoteJid,
        // Quando o remoteJid vem como @lid, o telefone real só aparece nesses campos alternativos.
        phone_jid: key.remoteJidAlt ?? key.senderPn ?? null,
        push_name: data.pushName ?? null,
        type: data.messageType,
        text_content: text,
        media_mime_type: media?.mimetype ?? null,
        payload: data,
      },
      { onConflict: "message_id", ignoreDuplicates: true },
    )
    .select("id");
  if (error) throw error;
  if (!inserted?.length) return;

  if (media) {
    const { buffer, mimetype } = await getMediaBase64(key.id);
    const path = `${key.id}.${extensionFromMime(mimetype)}`;

    const upload = await supabaseAdmin.storage
      .from("whatsapp-media")
      .upload(path, buffer, { contentType: mimetype, upsert: true });
    if (upload.error) throw upload.error;

    const update = await supabaseAdmin
      .from("whatsapp_messages")
      .update({ media_path: path, media_mime_type: mimetype })
      .eq("id", inserted[0].id);
    if (update.error) throw update.error;
  }

  // Resposta provisória só para validar o fluxo ponta a ponta; o agente de cotações substitui isto.
  const label = TYPE_LABELS[data.messageType] ?? data.messageType;
  await sendText(key.remoteJid, `Recebi sua mensagem de ${label}`);
}
