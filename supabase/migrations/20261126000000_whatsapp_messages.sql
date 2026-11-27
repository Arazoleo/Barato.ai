create table whatsapp_messages (
  id uuid primary key default gen_random_uuid(),
  message_id text unique not null,   -- data.key.id
  remote_jid text not null,          -- data.key.remoteJid (pode ser @s.whatsapp.net ou @lid)
  phone_jid text,                    -- telefone alternativo, quando o payload trouxer
  push_name text,
  type text not null,                -- data.messageType
  text_content text,
  media_mime_type text,
  media_path text,
  payload jsonb not null,
  created_at timestamptz not null default now()
);
alter table whatsapp_messages enable row level security;
-- Projetos novos do Supabase não concedem acesso automático às roles da API em tabelas novas.
grant select, insert, update on whatsapp_messages to service_role;

insert into storage.buckets (id, name, public)
values ('whatsapp-media', 'whatsapp-media', false)
on conflict (id) do nothing;
