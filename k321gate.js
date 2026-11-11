/* 小智問答 · 授權碼開通＋開通慶祝動畫（ES5，獨立檔；每個語言頁的 <head> 第一個 script 載入）
   ‧ 與國度321空中團契共用同一組授權碼與記錄（k321_auth，同網域共用）：
     已在空中團契 App 開通過的手機，打開小智問答會直接通過，不必再輸入。
   ‧ 雜湊：fnv('321|' + 正規化代碼)，正規化 = 去空白與連字號、轉大寫（與空中團契、321學神院相同）。
   ‧ 換授權碼：把下面 hash 改成空中團契「設定 → 授權碼 → 同工專用」產生的新雜湊值。 */
/* -lg1111：語言同步
   ‧ 收：網址帶 ?lang321=zh|zs|en|ko|ja|id|ceb（由空中團契等 321 App 帶入）→ 記住這個語言，並轉到對應語言頁。
   ‧ 送：點小智裡連到其他 321 App 的連結時，自動加上 lang321=目前語言，讓對方用同一種語言打開。 */
(function () {
  var PAGES = { zh: 'index.html', zs: 'sc.html', en: 'en.html', ko: 'ko.html', ja: 'ja.html', id: 'id.html', ceb: 'ceb.html' };
  try {
    var m = location.search.match(/[?&]lang321=([a-z]+)/);
    if (m && PAGES[m[1]]) {
      var code = m[1], q = location.search.replace(/([?&])lang321=[^&]*&?/, '$1').replace(/[?&]$/, '');
      try { localStorage.setItem('xz321_lang', JSON.stringify(code)); } catch (e) { }
      var file = location.pathname.replace(/^.*\//, '') || 'index.html', dir = location.pathname.replace(/[^\/]*$/, '');
      if (file !== PAGES[code]) { location.replace(dir + (code === 'zh' ? '' : PAGES[code]) + q + location.hash); return; }
      history.replaceState(history.state, '', location.pathname + q + location.hash);
    }
  } catch (e) { }
  function curCode() {
    var l = window.LANG; if (PAGES[l]) return l;
    var p = window.XZ_PAGE_LANG; if (PAGES[p]) return p;
    try { var v = JSON.parse(localStorage.getItem('xz321_lang')); if (PAGES[v]) return v; } catch (e) { }
    return 'zh';
  }
  function tag(a) {
    var u = a.getAttribute('href') || '';
    if (!/^https:\/\/spch321-sudo\.github\.io\//.test(u) || /\/321xiaozhi\//.test(u)) return;
    var h = '', i = u.indexOf('#'); if (i >= 0) { h = u.slice(i); u = u.slice(0, i); }
    u = u.replace(/([?&])lang321=[^&]*&?/, '$1').replace(/[?&]$/, '');
    a.setAttribute('href', u + (u.indexOf('?') >= 0 ? '&' : '?') + 'lang321=' + curCode() + h);
  }
  function onAct(e) { var t = e.target; while (t && t.nodeName !== 'A') t = t.parentNode; if (t && t.getAttribute) tag(t); }
  document.addEventListener('click', onAct, true);
  document.addEventListener('touchstart', onAct, true);
  document.addEventListener('contextmenu', onAct, true);
  var oo = window.open;
  if (oo) window.open = function (u) { try { if (typeof u === 'string' && /^https:\/\/spch321-sudo\.github\.io\//.test(u) && !/\/321xiaozhi\//.test(u)) { var a = document.createElement('a'); a.setAttribute('href', u); tag(a); arguments[0] = a.getAttribute('href'); } } catch (e) { } return oo.apply(window, arguments); };
})();

(function () {
  var G = { hash: 'dbd788bb', key: 'k321_auth' }, ok = false;
  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function fnv(str) { var h = 0x811c9dc5; str = unescape(encodeURIComponent('321|' + str)); for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0; } return ('0000000' + h.toString(16)).slice(-8); }
  function norm(s) { return String(s || '').replace(/[\s\-－—_]/g, '').toUpperCase(); }
  window.K321XZ = { ok: function () { return ok || lsGet(G.key) === G.hash; } };
  if (window.K321XZ.ok()) return;

  var LANGS = ['zh', 'zs', 'en', 'ko', 'ja', 'id', 'ceb'];
  function lang() {
    var p = window.XZ_PAGE_LANG || '';
    if (LANGS.indexOf(p) >= 0) return p;
    var v = lsGet('xz321_lang'); try { v = JSON.parse(v); } catch (e) { }
    return LANGS.indexOf(v) >= 0 ? v : 'zh';
  }
  var TX = {
    zh: { title: '小智問答', sub: '請輸入授權碼開通', ph: '請輸入授權碼', btn: '開通', empty: '請先輸入授權碼', bad: '授權碼不正確，請再確認一次', bad3: '授權碼還是不正確。請向邀請你的同工或小組長確認。',
      help: '授權碼請向邀請你的同工或小組長索取。已在「國度321空中團契」App 開通的手機，會自動開通。',
      verse: '你們中間若有缺少智慧的，應當求那厚賜與眾人、也不斥責人的神，主就必賜給他。', ref: '雅各書 1:5',
      c: ['哈利路亞！', '小智開通了！', '願主賜你智慧的靈，天天與你同行', '點一下開始提問'] },
    zs: { title: '小智问答', sub: '请输入授权码开通', ph: '请输入授权码', btn: '开通', empty: '请先输入授权码', bad: '授权码不正确，请再确认一次', bad3: '授权码还是不正确。请向邀请你的同工或小组长确认。',
      help: '授权码请向邀请你的同工或小组长索取。已在“国度321空中团契”App 开通的手机，会自动开通。',
      verse: '你们中间若有缺少智慧的，应当求那厚赐与众人、也不斥责人的神，主就必赐给他。', ref: '雅各书 1:5',
      c: ['哈利路亚！', '小智开通了！', '愿主赐你智慧的灵，天天与你同行', '点一下开始提问'] },
    en: { title: 'Xiaozhi Q&A', sub: 'Enter your access code to activate', ph: 'Enter access code', btn: 'Activate', empty: 'Please enter the access code', bad: 'That code isn’t right — please check and try again', bad3: 'Still not right. Please check with the co-worker or small-group leader who invited you.',
      help: 'Ask the co-worker or small-group leader who invited you for the access code. Phones already activated in the Kingdom 321 Online Fellowship app are activated automatically.',
      verse: 'But if any of you lacks wisdom, let him ask of God, who gives to all liberally and without reproach, and it will be given to him.', ref: 'James 1:5',
      c: ['Hallelujah!', 'Xiaozhi is ready!', 'May the Lord give you a spirit of wisdom and walk with you every day', 'Tap to start asking'] },
    ko: { title: '샤오즈 문답', sub: '이용 코드를 입력해 활성화하세요', ph: '이용 코드 입력', btn: '활성화', empty: '이용 코드를 먼저 입력해 주세요', bad: '이용 코드가 맞지 않아요. 다시 확인해 주세요', bad3: '아직 맞지 않아요. 초대해 준 동역자나 소그룹 리더에게 확인해 주세요.',
      help: '이용 코드는 초대해 준 동역자나 소그룹 리더에게 받으세요. 「하나님 나라 321 온라인 공동체」 앱에서 이미 활성화한 휴대폰은 자동으로 활성화돼요.',
      verse: '너희 중에 누구든지 지혜가 부족하거든 모든 사람에게 후히 주시고 꾸짖지 아니하시는 하나님께 구하라 그리하면 주시리라.', ref: '야고보서 1:5',
      c: ['할렐루야!', '샤오즈가 열렸어요!', '주님께서 지혜의 영을 주시고 날마다 함께하시길', '눌러서 질문 시작하기'] },
    ja: { title: 'シャオジー Q&A', sub: 'アクセスコードを入力して開通してください', ph: 'アクセスコードを入力', btn: '開通する', empty: 'まずアクセスコードを入力してください', bad: 'アクセスコードが正しくありません。もう一度ご確認ください', bad3: 'まだ正しくありません。招いてくれた同労者や小グループのリーダーにご確認ください。',
      help: 'アクセスコードは、招いてくれた同労者や小グループのリーダーにお尋ねください。「神の国321オンライン教会」アプリで開通済みのスマホは、自動的に開通します。',
      verse: 'あなたがたのうち、知恵に不足している者があれば、その人は、とがめもせずに惜しみなくすべての人に与える神に、願い求めるがよい。そうすれば、与えられるであろう。', ref: 'ヤコブの手紙 1:5',
      c: ['ハレルヤ！', 'シャオジーが開通しました！', '主が知恵の霊を与え、毎日共に歩んでくださいますように', 'タップして質問を始める'] },
    id: { title: 'Tanya Jawab Xiaozhi', sub: 'Masukkan kode akses untuk mengaktifkan', ph: 'Masukkan kode akses', btn: 'Aktifkan', empty: 'Silakan masukkan kode akses terlebih dahulu', bad: 'Kode akses tidak tepat. Silakan periksa kembali', bad3: 'Kode masih belum tepat. Silakan tanyakan kepada rekan pelayanan atau pemimpin kelompok kecil yang mengundang Anda.',
      help: 'Mintalah kode akses kepada rekan pelayanan atau pemimpin kelompok kecil yang mengundang Anda. Ponsel yang sudah diaktifkan di aplikasi Persekutuan Daring Kerajaan 321 akan aktif secara otomatis.',
      verse: 'Akan tetapi, jika di antara kamu ada yang kekurangan hikmat, hendaklah dia memintanya kepada Allah, yang dengan murah hati memberi kepada semua orang tanpa mencela, dan itu akan diberikan kepadanya.', ref: 'Yakobus 1:5',
      c: ['Haleluya!', 'Xiaozhi sudah aktif!', 'Kiranya Tuhan memberi Anda roh hikmat dan menyertai Anda setiap hari', 'Ketuk untuk mulai bertanya'] },
    ceb: { title: 'Pangutana ug Tubag ni Xiaozhi', sub: 'Isulod ang access code aron ma-activate', ph: 'Isulod ang access code', btn: 'I-activate', empty: 'Palihug isulod una ang access code', bad: 'Dili husto ang access code. Palihug susiha pag-usab', bad3: 'Dili gihapon husto. Palihug pangutan-a ang kauban sa pag-alagad o lider sa gamay nga grupo nga nagdapit kaninyo.',
      help: 'Pangayo sa access code sa kauban sa pag-alagad o lider sa gamay nga grupo nga nagdapit kaninyo. Ang cellphone nga na-activate na sa app sa Online nga Panag-uban sa Gingharian 321 awtomatikong ma-activate.',
      verse: 'Apan kung adunay usa kaninyo nga nanginahanglan ug kaalam, pangayo niini gikan sa Dios, ang usa nga mohatag nga madagayaon ug walay pagbadlong sa tanan nga mangayo, ug siya mohatag niini.', ref: 'Santiago 1:5',
      c: ['Aleluya!', 'Andam na si Xiaozhi!', 'Hinaut nga ang Ginoo mohatag kaninyo og espiritu sa kaalam ug mouban kaninyo matag adlaw', 'Pindota aron magsugod sa pagpangutana'] }
  };
  function tx() { return TX[lang()] || TX.zh; }

  var CSS =
    'html[data-k321lock] body>*:not(#k321gate):not(#k321cel){display:none!important}' +
    'html[data-k321lock],html[data-k321lock] body{overflow:hidden!important;height:100%}' +
    '#k321gate{position:fixed;inset:0;z-index:2147483000;overflow:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(120% 80% at 50% 0%,#EAF4FF 0%,#F7FBFF 45%,#FFFFFF 100%);font-family:-apple-system,"PingFang TC","Noto Sans TC","Microsoft JhengHei",sans-serif;color:#12285C;text-align:center;padding:calc(34px + env(safe-area-inset-top,0px)) 20px calc(30px + env(safe-area-inset-bottom,0px));box-sizing:border-box}' +
    '#k321gate .g-icon{width:108px;height:108px;border-radius:26px;box-shadow:0 10px 30px rgba(18,40,92,.18),0 0 0 4px rgba(232,176,74,.25)}' +
    '#k321gate h1{font-size:28px;margin:16px 0 4px;letter-spacing:.04em}' +
    '#k321gate .g-sub{font-size:17px;color:#4A5A7A;margin-bottom:18px}' +
    '#k321gate form{max-width:380px;margin:0 auto;background:#fff;border-radius:20px;padding:20px 18px;box-shadow:0 8px 28px rgba(18,40,92,.10);border:1px solid #E3EAF5}' +
    '#k321gate input{width:100%;box-sizing:border-box;font-size:22px;letter-spacing:.12em;text-align:center;padding:14px 12px;border:2px solid #C9D6EE;border-radius:14px;outline:none;color:#12285C;background:#FBFDFF}' +
    '#k321gate input:focus{border-color:#E8B04A;box-shadow:0 0 0 4px rgba(232,176,74,.2)}' +
    '#k321gate .g-btn{margin-top:14px;width:100%;font-size:20px;font-weight:800;padding:14px;border:0;border-radius:14px;color:#fff;background:linear-gradient(135deg,#1C4FA0,#12285C);box-shadow:0 6px 16px rgba(18,40,92,.25)}' +
    '#k321gate .g-msg{min-height:24px;margin-top:10px;font-size:16px;color:#C0392B}' +
    '#k321gate .g-msg.ok{color:#2F7D32;font-weight:800}' +
    '#k321gate .g-help{font-size:15px;line-height:1.6;color:#5C6B88;margin-top:6px}' +
    '#k321gate .g-verse{max-width:420px;margin:22px auto 0;font-size:15.5px;line-height:1.75;color:#3C4C6C}' +
    '#k321gate .g-verse b{display:block;margin-top:4px;color:#B07D1E;font-size:14px}' +
    '#k321gate form.shake{animation:k3shake .42s}' +
    '@keyframes k3shake{0%,100%{transform:none}20%,60%{transform:translateX(-9px)}40%,80%{transform:translateX(9px)}}' +
    /* 慶祝畫面 */
    '#k321cel{position:fixed;inset:0;z-index:2147483600;overflow:hidden;background:radial-gradient(circle at 50% 42%,#1E4E9C 0%,#0E2350 55%,#06122B 100%);opacity:0;transition:opacity .35s;cursor:pointer;font-family:-apple-system,"PingFang TC","Noto Sans TC",sans-serif}' +
    '#k321cel.in{opacity:1}#k321cel.out{opacity:0;transition:opacity .45s}' +
    '#k321cel canvas{position:absolute;inset:0}' +
    '#k321cel .c-rays{position:absolute;left:50%;top:38%;width:780px;height:780px;margin:-390px 0 0 -390px;border-radius:50%;background:repeating-conic-gradient(from 0deg,rgba(255,226,140,.20) 0deg 7deg,rgba(255,226,140,0) 7deg 20deg);-webkit-mask:radial-gradient(circle,#000 0,#000 18%,transparent 62%);mask:radial-gradient(circle,#000 0,#000 18%,transparent 62%);animation:k3spin 14s linear infinite;opacity:0;transition:opacity 1s .2s}' +
    '#k321cel.in .c-rays{opacity:1}' +
    '#k321cel .c-orb{position:absolute;left:50%;top:38%;width:150px;height:150px;margin:-75px 0 0 -75px}' +
    '#k321cel .c-orb img{position:relative;z-index:2;width:150px;height:150px;border-radius:36px;box-shadow:0 0 0 5px rgba(255,214,120,.65),0 0 46px 14px rgba(255,205,100,.55);transform:scale(.2) rotate(-12deg);opacity:0}' +
    '#k321cel.in .c-orb img{animation:k3pop 1s cubic-bezier(.2,1.5,.4,1) .15s forwards,k3glow 2.4s ease-in-out 1.2s infinite}' +
    '#k321cel .c-ring{position:absolute;left:50%;top:50%;border:2px solid rgba(255,220,140,.8);border-radius:50%;transform:translate(-50%,-50%) scale(.4);opacity:0}' +
    '#k321cel.in .c-ring{animation:k3ring 1.8s ease-out .55s infinite}' +
    '#k321cel.in .c-ring.r2{animation-delay:1.15s}' +
    '#k321cel .c-orbit{position:absolute;left:50%;top:50%;width:230px;height:230px;margin:-115px 0 0 -115px;border-radius:50%;border:2px solid rgba(255,210,110,.55);border-left-color:transparent;border-bottom-color:transparent;transform:rotateX(68deg) rotate(0);opacity:0}' +
    '#k321cel.in .c-orbit{animation:k3orbit 2.6s linear .5s infinite;opacity:1;transition:opacity .6s .5s}' +
    '#k321cel .c-box{position:absolute;left:0;right:0;top:calc(38% + 108px);padding:0 22px;text-align:center;color:#fff}' +
    '#k321cel .c-h1,#k321cel .c-h2,#k321cel .c-sub,#k321cel .c-tap{opacity:0;transform:translateY(14px)}' +
    '#k321cel .c-h1{font-size:40px;font-weight:900;letter-spacing:.06em;color:#FFE08A;text-shadow:0 0 18px rgba(255,200,90,.75),0 2px 0 rgba(0,0,0,.25)}' +
    '#k321cel .c-h2{font-size:27px;font-weight:800;margin-top:6px}' +
    '#k321cel .c-sub{font-size:17px;line-height:1.6;margin-top:12px;color:#DCE8FF}' +
    '#k321cel .c-tap{font-size:14px;margin-top:22px;color:rgba(255,255,255,.7)}' +
    '#k321cel.in .c-h1{animation:k3up .6s ease-out .75s forwards}' +
    '#k321cel.in .c-h2{animation:k3up .6s ease-out 1.05s forwards}' +
    '#k321cel.in .c-sub{animation:k3up .6s ease-out 1.4s forwards}' +
    '#k321cel.in .c-tap{animation:k3up .6s ease-out 2.1s forwards,k3blink 1.6s ease-in-out 2.8s infinite}' +
    '@keyframes k3spin{to{transform:rotate(360deg)}}' +
    '@keyframes k3pop{0%{transform:scale(.2) rotate(-12deg);opacity:0}60%{opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}' +
    '@keyframes k3glow{0%,100%{box-shadow:0 0 0 5px rgba(255,214,120,.65),0 0 40px 10px rgba(255,205,100,.45)}50%{box-shadow:0 0 0 6px rgba(255,230,150,.9),0 0 70px 24px rgba(255,215,120,.7)}}' +
    '@keyframes k3ring{0%{width:150px;height:150px;opacity:.9;transform:translate(-50%,-50%) scale(1)}100%{width:150px;height:150px;opacity:0;transform:translate(-50%,-50%) scale(2.6)}}' +
    '@keyframes k3orbit{to{transform:rotateX(68deg) rotate(360deg)}}' +
    '@keyframes k3up{to{opacity:1;transform:none}}' +
    '@keyframes k3blink{0%,100%{opacity:.75}50%{opacity:.35}}' +
    '@media (prefers-reduced-motion:reduce){#k321cel *{animation-duration:.01s!important;animation-iteration-count:1!important}}';

  var root = document.documentElement, fails = 0;
  root.setAttribute('data-k321lock', '1');
  var st = document.createElement('style'); st.id = 'k321gatecss'; st.appendChild(document.createTextNode(CSS));
  (document.head || root).appendChild(st);

  function icon() { return 'icon-192.png'; }
  function build() {
    if (document.getElementById('k321gate')) return;
    var t = tx(), el = document.createElement('div'); el.id = 'k321gate';
    el.innerHTML =
      '<img class="g-icon" src="' + icon() + '" alt="">' +
      '<h1>' + t.title + '</h1><div class="g-sub">' + t.sub + '</div>' +
      '<form id="k321form" autocomplete="off">' +
        '<input id="k321code" type="text" inputmode="numeric" autocomplete="one-time-code" autocapitalize="characters" spellcheck="false" maxlength="16" placeholder="' + t.ph + '">' +
        '<button class="g-btn" type="submit">' + t.btn + '</button>' +
        '<div class="g-msg" id="k321msg"></div>' +
        '<div class="g-help">' + t.help + '</div></form>' +
      '<div class="g-verse">「' + t.verse + '」<b>' + t.ref + '</b></div>';
    document.body.appendChild(el);
    document.getElementById('k321form').onsubmit = submit;
  }
  function submit(e) {
    if (e && e.preventDefault) e.preventDefault();
    var t = tx(), inp = document.getElementById('k321code'), msg = document.getElementById('k321msg'), card = document.getElementById('k321form');
    var code = norm(inp.value);
    msg.className = 'g-msg';
    if (!code) { msg.innerHTML = t.empty; inp.focus(); return false; }
    if (fnv(code) !== G.hash) {
      fails++; msg.innerHTML = fails >= 3 ? t.bad3 : t.bad;
      card.className = ''; void card.offsetWidth; card.className = 'shake';
      inp.select(); return false;
    }
    if (!lsSet(G.key, G.hash)) ok = true;
    msg.className = 'g-msg ok'; msg.innerHTML = '✓';
    if (inp.blur) inp.blur();
    setTimeout(function () { celebrate(unlock); }, 300);
    return false;
  }
  function unlock() {
    var el = document.getElementById('k321gate'); if (el && el.parentNode) el.parentNode.removeChild(el);
    root.removeAttribute('data-k321lock');
    try { window.scrollTo(0, 0); window.dispatchEvent(new Event('resize')); } catch (x) { }
  }

  /* 開通慶祝：小智圖示從光中彈出、金色光芒旋轉、光環擴散、智慧星光迸發，約 4.8 秒，點一下可略過 */
  function celebrate(done) {
    var L = tx().c, finished = false, raf = 0, timer = 0;
    var ov = document.createElement('div'); ov.id = 'k321cel';
    ov.innerHTML = '<canvas id="k321fx"></canvas><div class="c-rays"></div>' +
      '<div class="c-orb"><div class="c-orbit"></div><div class="c-ring"></div><div class="c-ring r2"></div><img src="' + icon() + '" alt=""></div>' +
      '<div class="c-box"><div class="c-h1">' + L[0] + '</div><div class="c-h2">' + L[1] + '</div><div class="c-sub">' + L[2] + '</div><div class="c-tap">' + L[3] + '</div></div>';
    document.body.appendChild(ov);
    var reduce = false; try { reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (x) { }
    function end() {
      if (finished) return; finished = true;
      if (raf && window.cancelAnimationFrame) window.cancelAnimationFrame(raf);
      clearTimeout(timer); ov.className = 'in out';
      done();
      setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 480);
    }
    ov.onclick = end;
    timer = setTimeout(end, reduce ? 2800 : 4800);
    setTimeout(function () { ov.className = 'in'; }, 20);
    try { if (navigator.vibrate) navigator.vibrate([50, 40, 50, 40, 120]); } catch (x) { }
    var cv = document.getElementById('k321fx'), cx = cv && cv.getContext && cv.getContext('2d');
    if (!cx || reduce || !window.requestAnimationFrame) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2), W = window.innerWidth, H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px'; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var CX = W / 2, CY = H * 0.38, P = [], COL = ['#FFE08A', '#FFF4CC', '#FFFFFF', '#F6C453', '#9FD2FF', '#CFE6FF'], t0 = Date.now(), waves = 0;
    function star(x, y, r, rot) { cx.beginPath(); for (var i = 0; i < 8; i++) { var rr = i % 2 ? r * 0.38 : r, a = rot + i * Math.PI / 4; cx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } cx.closePath(); cx.fill(); }
    function wave(n, sp) {
      for (var i = 0; i < n; i++) {
        var a = Math.random() * Math.PI * 2, v = sp * (0.45 + Math.random() * 0.75);
        P.push({ x: CX, y: CY, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, d: 0.008 + Math.random() * 0.01, s: 2 + Math.random() * 4.5, c: COL[(Math.random() * COL.length) | 0], st: Math.random() < 0.45, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.2, g: 0.02 });
      }
    }
    function rise() { P.push({ x: Math.random() * W, y: H + 10, vx: (Math.random() - 0.5) * 0.4, vy: -(0.8 + Math.random() * 1.6), life: 1, d: 0.004 + Math.random() * 0.004, s: 1.2 + Math.random() * 2.4, c: COL[(Math.random() * COL.length) | 0], st: false, rot: 0, vr: 0, g: 0 }); }
    function frame() {
      if (finished) return;
      var el = Date.now() - t0;
      if (waves === 0 && el > 350) { wave(120, 7.5); waves++; }
      if (waves === 1 && el > 1250) { wave(90, 6); waves++; }
      if (waves === 2 && el > 2300) { wave(70, 5); waves++; }
      if (el < 4400 && Math.random() < 0.6) rise();
      cx.clearRect(0, 0, W, H);
      cx.globalCompositeOperation = 'lighter';
      for (var i = P.length - 1; i >= 0; i--) {
        var p = P[i]; p.vx *= 0.985; p.vy = p.vy * 0.985 + p.g; p.x += p.vx; p.y += p.vy; p.life -= p.d; p.rot += p.vr;
        if (p.life <= 0) { P.splice(i, 1); continue; }
        cx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.3)); cx.fillStyle = p.c;
        if (p.st) star(p.x, p.y, p.s * 1.6, p.rot); else { cx.beginPath(); cx.arc(p.x, p.y, p.s * 0.6, 0, Math.PI * 2); cx.fill(); }
      }
      cx.globalAlpha = 1; cx.globalCompositeOperation = 'source-over';
      raf = window.requestAnimationFrame(frame);
    }
    raf = window.requestAnimationFrame(frame);
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
