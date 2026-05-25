# Tibia Session Tracker

## Instalar

npm install

## Rodar local

npm run dev

## Criar tabela no Supabase

CREATE TABLE sessions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  session_date DATE,
  raw_xp_gain BIGINT,
  xp_gain BIGINT
);

## Variáveis .env.local

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
