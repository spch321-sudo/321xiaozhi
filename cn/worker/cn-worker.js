/* 小智问答・大陆版 服务（Cloudflare Worker）
   把 App 送来的问题转给「在中国大陆合法提供服务」的 AI 模型（预设 DeepSeek，也可换通义千问）。
   App 的格式：{ system, messages:[{role,content}], max_tokens }
   回给 App： { content:[{type:'text', text}], stop_reason }

   需要设定的变数（Cloudflare → Workers → 这个 Worker → Settings → Variables）：
     API_KEY        （秘密，Secret）模型公司给你的 API 金钥
     API_BASE        DeepSeek：https://api.deepseek.com
                     通义千问：https://dashscope.aliyuncs.com/compatible-mode/v1
     MODEL           DeepSeek：deepseek-chat      通义千问：qwen-plus
     ALLOW_ORIGINS   允许的网页来源，逗号分隔，例如 https://spch321-sudo.github.io
     MAX_TOKENS      （可不填）单次回答上限，预设 4000
     DAILY_LIMIT     （可不填）每个 IP 每天最多几次，预设 300；要用这项需绑定 KV 名称 RL
*/
export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const allow = String(env.ALLOW_ORIGINS || '*').split(',').map(s => s.trim()).filter(Boolean);
    const okOrigin = allow.includes('*') || allow.includes(origin);
    const cors = {
      'Access-Control-Allow-Origin': okOrigin ? (origin || '*') : 'null',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin'
    };
    const out = (obj, status) => new Response(JSON.stringify(obj), { status: status || 200, headers: Object.assign({ 'Content-Type': 'application/json; charset=utf-8' }, cors) });

    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST') return out({ ok: true, service: 'xiaozhi-cn' });
    if (!okOrigin) return out({ error: 'origin not allowed' }, 403);
    if (!env.API_KEY) return out({ error: 'API_KEY not set' }, 500);

    // 简单的每日次数限制（可选）
    if (env.RL) {
      const ip = req.headers.get('CF-Connecting-IP') || 'x';
      const day = new Date().toISOString().slice(0, 10);
      const key = day + ':' + ip;
      const n = parseInt((await env.RL.get(key)) || '0', 10);
      if (n >= (parseInt(env.DAILY_LIMIT || '300', 10))) return out({ error: 'daily limit' }, 429);
      await env.RL.put(key, String(n + 1), { expirationTtl: 90000 });
    }

    let b;
    try { b = await req.json(); } catch (e) { return out({ error: 'bad json' }, 400); }
    const text = c => typeof c === 'string' ? c : (Array.isArray(c) ? c.map(x => (x && x.text) || '').join('') : '');
    const msgs = (Array.isArray(b.messages) ? b.messages : []).slice(-24)
      .map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: text(m.content).slice(0, 12000) }))
      .filter(m => m.content);
    if (!msgs.length) return out({ error: 'no messages' }, 400);
    const sys = text(b.system).slice(0, 24000);
    const cap = parseInt(env.MAX_TOKENS || '4000', 10);
    const body = {
      model: env.MODEL || 'deepseek-chat',
      max_tokens: Math.max(256, Math.min(parseInt(b.max_tokens, 10) || 1500, cap)),
      temperature: 0.7,
      messages: (sys ? [{ role: 'system', content: sys }] : []).concat(msgs)
    };
    const base = String(env.API_BASE || 'https://api.deepseek.com').replace(/\/+$/, '');
    let r;
    try {
      r = await fetch(base + '/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + env.API_KEY },
        body: JSON.stringify(body)
      });
    } catch (e) { return out({ error: 'upstream unreachable' }, 502); }
    if (!r.ok) return out({ error: 'upstream', status: r.status, detail: (await r.text()).slice(0, 300) }, 502);
    const d = await r.json();
    const c = d && d.choices && d.choices[0];
    const reply = (c && c.message && c.message.content) || '';
    return out({ content: [{ type: 'text', text: reply }], stop_reason: c && c.finish_reason === 'length' ? 'max_tokens' : 'end_turn' });
  }
};
