create table if not exists public.daily_ad_stats (
  day date primary key,
  ads_seen bigint not null default 0 check (ads_seen >= 0),
  updated_at timestamptz not null default now()
);

alter table public.daily_ad_stats enable row level security;

drop policy if exists "Public can read daily ad stats" on public.daily_ad_stats;
create policy "Public can read daily ad stats"
  on public.daily_ad_stats
  for select
  using (true);

create or replace function public.increment_daily_ad_views(amount integer default 1)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_total bigint;
  safe_amount integer;
begin
  safe_amount := greatest(1, least(coalesce(amount, 1), 25));

  insert into public.daily_ad_stats (day, ads_seen, updated_at)
  values (current_date, safe_amount, now())
  on conflict (day)
  do update set
    ads_seen = public.daily_ad_stats.ads_seen + excluded.ads_seen,
    updated_at = now()
  returning ads_seen into new_total;

  return new_total;
end;
$$;

grant select on public.daily_ad_stats to anon, authenticated;
grant execute on function public.increment_daily_ad_views(integer) to anon, authenticated;
