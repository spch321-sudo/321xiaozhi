/* 小智問答・加值功能（xzplus.js，ES5；每個語言頁 </head> 前載入）
   1) 回答裡的經文出處（約翰福音 3:16、John 3:16、요한복음 3:16…七種語言）自動變成連結，
      點一下在小智裡打開 321互動聖經，直接看那一章的上下文（並亮起那一節）。
   2) 每則回答多一個「🏡」按鈕：一鍵把這個回答做成小家討論題（小智產生、可修改），
      送進國度321空中團契的小家聊天室（用這支手機在空中團契的身分與稱呼）。 */
(function () {
  'use strict';
  var BOOKS = [["Genesis",50,["Kejadian","Genesis","Gen","창세기","创世记","創世記","Kej","창","创","創"]],["Exodus",40,["Keluaran","出エジプト記","Exodus","Exodo","出埃及記","출애굽기","出埃及记","Exo","Kel","Ex","出","출"]],["Leviticus",27,["Leviticus","Levitico","Imamat","利未记","レビ記","利未記","레위기","Lev","Im","레","利","レ"]],["Numbers",36,["Bilangan","Numbers","Numeros","民数記","Num","民数记","民數記","Bil","민수기","民","민"]],["Deuteronomy",34,["Deuteronomio","Deuteronomy","Ulangan","Deut","Deu","신명기","申命記","申命记","Ul","申","신"]],["Joshua",24,["Joshua","Yosua","ヨシュア記","Josue","约书亚记","Josh","여호수아","約書亞記","Yos","Jos","ヨシュ","수","書","书"]],["Judges",21,["Mga Maghuhukom","Hakim-hakim","Judges","Judg","Hak","사사기","士師記","士师记","Mag","삿","士"]],["Ruth",4,["Ruth","路得记","ルツ記","Rut","路得記","ルツ","룻기","룻","得"]],["1Samuel",31,["1 Samuel","1Samuel","サムエル記上","撒母耳记上","1 Sam","撒母耳記上","사무엘상","1Sam","サム上","撒上","삼상"]],["2Samuel",24,["2 Samuel","2Samuel","サムエル記下","2 Sam","撒母耳记下","撒母耳記下","사무엘하","2Sam","サム下","撒下","삼하"]],["1Kings",22,["1 Raja-raja","1Raja-raja","1 Mga Hari","1Mga Hari","1 Kings","1Kings","1 Har","1 Kgs","1 Raj","1Har","列王纪上","1Kgs","열왕기상","1Raj","列王紀上","왕상","王上"]],["2Kings",25,["2 Raja-raja","2Raja-raja","2 Mga Hari","2Mga Hari","2 Kings","2Kings","2 Raj","2 Kgs","2 Har","열왕기하","2Kgs","列王紀下","2Har","列王纪下","2Raj","王下","왕하"]],["1Chronicles",29,["1 Mga Cronica","1Mga Cronica","1 Chronicles","1Chronicles","1 Tawarikh","1Tawarikh","1 Cro","1 Taw","1 Chr","歴代志上","1Chr","历代志上","1Taw","歷代志上","1Cro","역대상","代上","대상"]],["2Chronicles",36,["2 Mga Cronica","2Mga Cronica","2 Chronicles","2Chronicles","2 Tawarikh","2Tawarikh","2 Chr","2 Taw","2 Cro","2Taw","2Cro","历代志下","歴代志下","歷代志下","2Chr","역대하","대하","代下"]],["Ezra",10,["Esdras","Ezra","以斯拉記","以斯拉记","エズラ記","Esd","Ezr","에스라","エズ","拉","스"]],["Nehemiah",13,["Nehemias","Nehemiah","Nehemia","ネヘミヤ記","尼希米记","느헤미야","尼希米記","Neh","ネヘ","느","尼"]],["Esther",10,["Esther","エステル記","Ester","以斯帖记","以斯帖記","에스더","Est","エス","斯","에"]],["Job",42,["Ayub","ヨブ記","約伯記","约伯记","Ayb","Job","욥기","ヨブ","욥","伯"]],["Psalms",150,["Mga Salmo","Psalms","Mazmur","Psalm","Mzm","Sal","Psa","Ps","시편","詩篇","诗篇","시","詩","诗"]],["Proverbs",31,["Mga Panultihon","Proverbs","Amsal","Prov","Ams","Pan","箴言","잠언","箴","잠"]],["Ecclesiastes",12,["Ecclesiastes","Pengkhotbah","Magwawali","伝道の書","Eccl","Magw","Pkh","전도서","传道书","傳道書","傳","전","伝","传"]],["SongofSolomon",8,["Song of Solomon","Awit ni Solomon","Song of Songs","Kidung Agung","Song","Awit","Kid","아가","雅歌","아","歌","雅"]],["Isaiah",66,["Isaias","Yesaya","Isaiah","以賽亞書","以赛亚书","イザヤ書","Isa","Yes","이사야","イザ","賽","사","赛"]],["Jeremiah",52,["Jeremiah","Jeremias","Yeremia","エレミヤ書","耶利米书","예레미야","耶利米書","Jer","Yer","エレ","렘","耶"]],["Lamentations",5,["Mga Pagbangotan","Lamentations","Ratapan","예레미야애가","耶利米哀歌","Pag","Lam","Rat","哀歌","哀","애"]],["Ezekiel",48,["Yehezkiel","Ezequiel","Ezekiel","エゼキエル書","Ezek","以西结书","以西結書","Eze","Yeh","에스겔","エゼ","겔","結","结"]],["Daniel",12,["Daniel","ダニエル書","但以理書","但以理书","다니엘","Dan","ダニ","但","단"]],["Hosea",14,["Oseas","Hosea","ホセア書","何西阿书","何西阿書","Hos","Ose","호세아","ホセ","何","호"]],["Joel",3,["Joel","Yoel","ヨエル書","约珥书","約珥書","요엘","Yl","ヨエ","珥","욜"]],["Amos",9,["Amos","阿摩司书","アモス書","阿摩司書","아모스","Amo","アモ","Am","암","摩"]],["Obadiah",1,["Obadias","Obadiah","俄巴底亚书","オバデヤ書","俄巴底亞書","Obaja","Obad","오바댜","Oba","Ob","オバ","옵","俄"]],["Jonah",4,["Yunus","Jonah","Jonas","ヨナ書","Yun","約拿書","Jon","约拿书","ヨナ","요나","욘","拿"]],["Micah",7,["Miqueas","Mikha","Micah","弥迦书","Mic","彌迦書","ミカ書","Miq","미가","Mi","ミカ","弥","미","彌"]],["Nahum",3,["Nahum","ナホム書","那鴻書","Nah","那鸿书","ナホ","나훔","鸿","鴻","나"]],["Habakkuk",3,["Habakkuk","Habakuk","ハバクク書","哈巴谷書","哈巴谷书","Hab","하박국","ハバ","哈","합"]],["Zephaniah",3,["Zephaniah","Zefanias","Zefanya","ゼパニヤ書","西番雅书","西番雅書","Zeph","스바냐","Zef","ゼパ","습","番"]],["Haggai",2,["Haggai","Hageo","Hagai","ハガイ書","Hag","哈該書","哈该书","학개","ハガ","학","該","该"]],["Zechariah",14,["Zechariah","Zakharia","Zacarias","撒迦利亞書","撒迦利亚书","ゼカリヤ書","Zech","스가랴","Zac","Za","ゼカ","亞","亚","슥"]],["Malachi",4,["Malaquias","Maleakhi","Malachi","瑪拉基書","玛拉基书","マラキ書","말라기","Mal","マラ","말","瑪","玛"]],["Matthew",28,["マタイによる福音書","Matthew","Matius","Mateo","마태복음","馬太福音","Matt","马太福音","マタイ","Mat","マタ","太","마"]],["Mark",16,["マルコによる福音書","Markus","Marcos","마가복음","馬可福音","Mark","马可福音","Mar","マルコ","Mrk","マコ","막","可"]],["Luke",24,["ルカによる福音書","Lukas","Lucas","Luke","누가복음","路加福音","Luc","Luk","ルカ","路","눅"]],["John",21,["ヨハネによる福音書","Yohanes","約翰福音","John","요한복음","Juan","约翰福音","ヨハネ","Yoh","ヨハ","요","約","约"]],["Acts",28,["Kisah Para Rasul","Mga Buhat","Acts","사도행전","使徒行傳","使徒行伝","使徒行传","Kis","Buh","행","徒","使"]],["Romans",16,["ローマ人への手紙","Romans","Roma","로마서","ローマ","羅馬書","Rom","罗马书","ロマ","羅","롬","罗"]],["1Corinthians",16,["1 Corinthians","1Corinthians","コリント人への第一の手紙","1 Korintus","1 Corinto","1Korintus","1Corinto","哥林多前书","哥林多前書","고린도전서","1 Cor","1 Kor","コリント","1Kor","1Cor","1コリ","고전","林前"]],["2Corinthians",13,["2 Corinthians","コリント人への第二の手紙","2Corinthians","2 Korintus","2 Corinto","2Korintus","2Corinto","고린도후서","哥林多後書","2 Cor","哥林多后书","2 Kor","2Kor","2Cor","2コリ","林後","林后","고후"]],["Galatians",6,["ガラテヤ人への手紙","Galatians","Galacia","Galatia","갈라디아서","加拉太书","ガラテヤ","加拉太書","Gal","ガラ","갈","加"]],["Ephesians",6,["Ephesians","エペソ人への手紙","Efesus","Efeso","以弗所书","에베소서","以弗所書","Eph","エペソ","Efe","エペ","Ef","弗","엡"]],["Philippians",4,["Philippians","ピリピ人への手紙","Filipos","Filipi","Filip","腓立比书","Phil","빌립보서","腓立比書","Flp","ピリピ","ピリ","빌","腓"]],["Colossians",4,["Colossians","コロサイ人への手紙","Colosas","Kolose","歌羅西書","골로새서","コロサイ","歌罗西书","Kol","Col","コロ","西","골"]],["1Thessalonians",5,["1 Thessalonians","1Thessalonians","テサロニケ人への第一の手紙","1 Tesalonika","1 Tesalonica","1Tesalonika","1Tesalonica","帖撒罗尼迦前书","1 Thess","데살로니가전서","帖撒羅尼迦前書","1Thess","テサロニケ","1 Tes","1Tes","1テサ","살전","帖前"]],["2Thessalonians",3,["2 Thessalonians","2Thessalonians","テサロニケ人への第二の手紙","2 Tesalonika","2 Tesalonica","2Tesalonika","2Tesalonica","2 Thess","데살로니가후서","帖撒羅尼迦後書","帖撒罗尼迦后书","2Thess","2 Tes","2Tes","2テサ","帖後","살후","帖后"]],["1Timothy",6,["1 Timotius","テモテへの第一の手紙","1Timotius","1 Timoteo","1 Timothy","1Timothy","1Timoteo","1 Tim","提摩太前書","디모데전서","提摩太前书","1Tim","1テモ","딤전","提前"]],["2Timothy",4,["テモテへの第二の手紙","2 Timotius","2Timotius","2 Timoteo","2 Timothy","2Timoteo","2Timothy","提摩太後書","디모데후서","提摩太后书","2 Tim","2Tim","2テモ","提后","提後","딤후"]],["Titus",3,["テトスへの手紙","Titus","Tito","디도서","Tit","提多書","提多书","テト","딛","多"]],["Philemon",1,["ピレモンへの手紙","Philemon","Filemon","Filem","Phlm","腓利门书","빌레몬서","腓利門書","Flm","ピレ","门","몬","門"]],["Hebrews",13,["ヘブル人への手紙","Hebrews","Hebreo","Ibrani","히브리서","希伯来书","希伯來書","ヘブル","Heb","Ibr","ヘブ","히","來","来"]],["James",5,["Santiago","Yakobus","ヤコブの手紙","James","Sant","야고보서","Yak","雅各書","雅各书","Jas","ヤコ","약","雅"]],["1Peter",5,["ペテロの第一の手紙","1 Petrus","1 Peter","1Petrus","1 Pedro","1Peter","1Pedro","1 Ped","베드로전서","1 Ptr","1 Pet","彼得前书","1Ped","1Pet","彼得前書","1Ptr","1ペテ","彼前","벧전"]],["2Peter",3,["ペテロの第二の手紙","2 Petrus","2 Peter","2Petrus","2 Pedro","2Pedro","2Peter","베드로후서","2 Pet","2 Ped","2 Ptr","2Pet","彼得後書","2Ped","彼得后书","2Ptr","2ペテ","彼后","彼後","벧후"]],["1John",5,["ヨハネの第一の手紙","1 Yohanes","1Yohanes","1 John","1 Juan","1John","1 Yoh","1Juan","约翰一书","約翰一書","요한일서","1Yoh","1 Jn","1Jn","1ヨハ","요일","约一","約一"]],["2John",1,["2 Yohanes","ヨハネの第二の手紙","2Yohanes","2 Juan","2 John","2Juan","2John","2 Yoh","約翰二書","요한이서","约翰二书","2 Jn","2Yoh","2ヨハ","2Jn","约二","約二","요이"]],["3John",1,["3 Yohanes","ヨハネの第三の手紙","3Yohanes","3 Juan","3 John","3 Yoh","3John","3Juan","3 Jn","約翰三書","约翰三书","3Yoh","요한삼서","3Jn","3ヨハ","約三","요삼","约三"]],["Jude",1,["ユダの手紙","Judas","Yudas","Jude","犹大书","유다서","Yud","Jud","猶大書","ユダ","猶","犹","유"]],["Revelation",22,["Revelation","Pinadayag","ヨハネの黙示録","요한계시록","Wahyu","Pin","啟示錄","Why","启示录","Rev","啟","黙","启","계"]]];
  var PROXY = 'https://xiaozhi-proxy.spch321.workers.dev', MODEL = 'claude-sonnet-4-6';
  var CHAT = 'https://church-chat.spch321.workers.dev', MAXT = 590;
  var BIBLE = '/bible/', FEL = '/321fellowship/';
  var PAGES = { zh: 1, zs: 1, en: 1, ko: 1, ja: 1, id: 1, ceb: 1 };
  function L() {
    var l = window.XZ_LANG || window.XZ_PAGE_LANG; if (PAGES[l]) return l;
    try { var v = JSON.parse(localStorage.getItem('xz321_lang')); if (PAGES[v]) return v; } catch (e) { }
    return 'zh';
  }
  var TX = {
    zh: { toGrp: '🏡 送進小家', tooLong: '內容太長（超過 20 則），請先刪減再送出', open: '在互動聖經開啟', close: '關閉', grp: '做成小家討論題', gh: '🏡 做成小家討論題', gen: '小智正在整理討論題…', genFail: '整理失敗，請再試一次', retry: '重新產生', to: '送到哪一個小家？', none: '這支手機還沒有加入空中團契的小家。先到空中團契「小家」加入或建立一個小家，再回來送出。', goFel: '打開空中團契小家', nick: '你在小家的稱呼', nickPh: '例如：主耀', send: '送出', sending: '送出中…', sent: '已送到「{0}」', openChat: '打開小家聊天室', fail: '沒有送出，請檢查網路再試一次', edit: '可以先修改再送出', head: '🏡 小家討論題', from: '（整理自小智問答）', needNick: '請先填你的稱呼' },
    zs: { toGrp: '🏡 送进小家', tooLong: '内容太长（超过 20 条），请先删减再送出', open: '在互动圣经打开', close: '关闭', grp: '做成小家讨论题', gh: '🏡 做成小家讨论题', gen: '小智正在整理讨论题…', genFail: '整理失败，请再试一次', retry: '重新产生', to: '送到哪一个小家？', none: '这支手机还没有加入空中团契的小家。先到空中团契“小家”加入或建立一个小家，再回来送出。', goFel: '打开空中团契小家', nick: '你在小家的称呼', nickPh: '例如：主耀', send: '送出', sending: '送出中…', sent: '已送到“{0}”', openChat: '打开小家聊天室', fail: '没有送出，请检查网络再试一次', edit: '可以先修改再送出', head: '🏡 小家讨论题', from: '（整理自小智问答）', needNick: '请先填你的称呼' },
    en: { toGrp: '🏡 Send to a small group', tooLong: 'Too long (over 20 messages) — please shorten it first', open: 'Open in Interactive Bible', close: 'Close', grp: 'Make small-group questions', gh: '🏡 Small-group discussion', gen: 'Xiaozhi is preparing the questions…', genFail: 'Couldn’t prepare them — please try again', retry: 'Regenerate', to: 'Send to which small group?', none: 'This phone hasn’t joined a small group in the Kingdom 321 fellowship app yet. Join or create one under “Small Group” there, then come back.', goFel: 'Open fellowship small groups', nick: 'Your name in the group', nickPh: 'e.g. John', send: 'Send', sending: 'Sending…', sent: 'Sent to “{0}”', openChat: 'Open the group chat', fail: 'Not sent — check your connection and try again', edit: 'You can edit before sending', head: '🏡 Small-group discussion', from: '(prepared from Xiaozhi Q&A)', needNick: 'Please enter your name first' },
    ko: { toGrp: '🏡 소그룹으로 보내기', tooLong: '너무 길어요(20개 초과). 줄인 뒤 보내 주세요', open: '인터랙티브 성경에서 열기', close: '닫기', grp: '소그룹 나눔 질문 만들기', gh: '🏡 소그룹 나눔 질문', gen: '샤오즈가 나눔 질문을 정리하고 있어요…', genFail: '정리하지 못했어요. 다시 시도해 주세요', retry: '다시 만들기', to: '어느 소그룹으로 보낼까요?', none: '이 휴대폰은 아직 공동체 앱의 소그룹에 들어가 있지 않아요. 공동체 앱의 「소그룹」에서 가입하거나 만든 뒤 다시 와 주세요.', goFel: '공동체 소그룹 열기', nick: '소그룹에서 쓰는 이름', nickPh: '예: 요한', send: '보내기', sending: '보내는 중…', sent: '「{0}」에 보냈어요', openChat: '소그룹 채팅 열기', fail: '보내지 못했어요. 네트워크를 확인하고 다시 시도해 주세요', edit: '보내기 전에 고칠 수 있어요', head: '🏡 소그룹 나눔 질문', from: '(샤오즈 문답에서 정리)', needNick: '먼저 이름을 입력해 주세요' },
    ja: { toGrp: '🏡 小グループに送る', tooLong: '長すぎます（20 件超）。短くしてから送ってください', open: 'インタラクティブ聖書で開く', close: '閉じる', grp: '小グループの分かち合いの質問にする', gh: '🏡 小グループの分かち合い', gen: 'シャオジーが質問をまとめています…', genFail: 'まとめられませんでした。もう一度お試しください', retry: 'もう一度作る', to: 'どの小グループに送りますか？', none: 'このスマホはまだオンライン教会アプリの小グループに入っていません。アプリの「グループ」で参加または作成してから、もう一度お試しください。', goFel: '小グループを開く', nick: 'グループでの呼び名', nickPh: '例：ヨハネ', send: '送信', sending: '送信中…', sent: '「{0}」に送りました', openChat: 'グループのチャットを開く', fail: '送信できませんでした。通信状況を確認して、もう一度お試しください', edit: '送る前に修正できます', head: '🏡 小グループの分かち合い', from: '（シャオジーQ&Aから）', needNick: 'まず呼び名を入力してください' },
    id: { toGrp: '🏡 Kirim ke kelompok kecil', tooLong: 'Terlalu panjang (lebih dari 20 pesan) — persingkat dulu', open: 'Buka di Alkitab Interaktif', close: 'Tutup', grp: 'Jadikan pertanyaan diskusi kelompok', gh: '🏡 Diskusi kelompok kecil', gen: 'Xiaozhi sedang menyusun pertanyaan…', genFail: 'Gagal menyusun — silakan coba lagi', retry: 'Buat ulang', to: 'Kirim ke kelompok kecil mana?', none: 'Ponsel ini belum bergabung dengan kelompok kecil di aplikasi persekutuan. Bergabunglah atau buat kelompok di menu “Kelompok”, lalu kembali ke sini.', goFel: 'Buka kelompok kecil', nick: 'Nama Anda di kelompok', nickPh: 'mis. Yohanes', send: 'Kirim', sending: 'Mengirim…', sent: 'Terkirim ke “{0}”', openChat: 'Buka obrolan kelompok', fail: 'Gagal terkirim — periksa koneksi lalu coba lagi', edit: 'Anda bisa mengubahnya sebelum dikirim', head: '🏡 Diskusi kelompok kecil', from: '(disusun dari Tanya Jawab Xiaozhi)', needNick: 'Isi nama Anda terlebih dahulu' },
    ceb: { toGrp: '🏡 Ipadala sa gamay nga grupo', tooLong: 'Taas kaayo (labaw 20 ka mensahe) — paubsa una', open: 'Ablihi sa Interactive Bible', close: 'Isira', grp: 'Himoa nga pangutana sa gamay nga grupo', gh: '🏡 Panaghisgot sa gamay nga grupo', gen: 'Gi-andam ni Xiaozhi ang mga pangutana…', genFail: 'Wala maandam — palihug sulayi pag-usab', retry: 'Himoa pag-usab', to: 'Ipadala sa asa nga gamay nga grupo?', none: 'Kini nga cellphone wala pa moapil sa gamay nga grupo sa app sa panag-uban. Apil o paghimo og grupo didto sa “Grupo”, unya balik dinhi.', goFel: 'Ablihi ang gamay nga grupo', nick: 'Imong ngalan sa grupo', nickPh: 'pananglitan: Juan', send: 'Ipadala', sending: 'Gipadala…', sent: 'Napadala sa “{0}”', openChat: 'Ablihi ang chat sa grupo', fail: 'Wala mapadala — susiha ang koneksyon ug sulayi pag-usab', edit: 'Mahimo nimo kining usbon una ipadala', head: '🏡 Panaghisgot sa gamay nga grupo', from: '(gikan sa Pangutana ug Tubag ni Xiaozhi)', needNick: 'Isulat una ang imong ngalan' }
  };
  function T(k, a) { var s = (TX[L()] || TX.zh)[k] || TX.zh[k] || k; return a != null ? s.replace('{0}', a) : s; }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function lj(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function lg(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function ls(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }

  /* ---------- 1. 經文出處連結 ---------- */
  var NAME = {}, list = [];
  BOOKS.forEach(function (b) { b[2].forEach(function (n) { if (!NAME[n]) { NAME[n] = b; list.push(n); } }); });
  list.sort(function (a, b) { return b.length - a.length; });
  function reEsc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  var NUM = '(\\d{1,3})', SEP = '\\s*[:：]\\s*', RNG = '(?:\\s*[-–—~～至到]\\s*(\\d{1,3}))?';
  var RE = new RegExp('(' + list.map(reEsc).join('|') + ')\\s*(?:第\\s*)?' + NUM + '(?:' + SEP + NUM + RNG + '|\\s*(?:章|장)\\s*(?:第\\s*)?(\\d{1,3})\\s*(?:節|节|절)' + RNG + ')', 'g');
  var LATIN = /[A-Za-z]/, WORDC = /[A-Za-z0-9À-ɏ]/, OKPRE = /[\s(（\[「『【〔,，、;；:：.。—\-]/;
  function linkify(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false), nodes = [], n;
    while ((n = w.nextNode())) { if (n.parentNode && !(n.parentNode.closest && n.parentNode.closest('a,button,code,pre,.xzref'))) nodes.push(n); }
    nodes.forEach(function (t) {
      var s = t.nodeValue, m, last = 0, frag = null; RE.lastIndex = 0;
      while ((m = RE.exec(s))) {
        var name = m[1], b = NAME[name], pre = m.index > 0 ? s.charAt(m.index - 1) : '';
        if (!b) continue;
        if (LATIN.test(name.charAt(0)) && pre && WORDC.test(pre)) continue;
        if (name.length === 1 && pre && !OKPRE.test(pre) && !(m[3] && /[\u3400-\u9fff\uac00-\ud7af]/.test(pre))) continue;
        var ch = +m[2], v = +(m[3] || m[5] || 0);
        if (!(ch >= 1 && ch <= b[1])) continue;
        if (b[1] === 1 && !m[3] && !m[5]) continue;
        if (!frag) frag = document.createDocumentFragment();
        if (m.index > last) frag.appendChild(document.createTextNode(s.slice(last, m.index)));
        var a = document.createElement('a'); a.className = 'xzref'; a.href = 'javascript:void 0';
        a.setAttribute('data-b', b[0]); a.setAttribute('data-c', ch); if (v) a.setAttribute('data-v', v); var v2 = +(m[4] || m[6] || 0); if (v && v2 > v && v2 - v < 60) a.setAttribute('data-v2', v2);
        a.textContent = m[0]; frag.appendChild(a); last = m.index + m[0].length;
      }
      if (frag) { if (last < s.length) frag.appendChild(document.createTextNode(s.slice(last))); t.parentNode.replaceChild(frag, t); }
    });
  }
  function scan() {
    var bs = document.querySelectorAll('.msg.ai .body');
    for (var i = 0; i < bs.length; i++) {
      var b = bs[i]; if (b.querySelector('.typing')) continue;
      var sig = b.textContent.length + ':' + b.childNodes.length;
      if (b.getAttribute('data-xzp') === sig && b.querySelector('.xzref') !== null) continue;
      if (b.getAttribute('data-xzp') === sig) continue;
      linkify(b); b.setAttribute('data-xzp', b.textContent.length + ':' + b.childNodes.length);
      if (!b._xzck) { b._xzck = 1; vcheck(b); }
    }
    var as = document.querySelectorAll('.msg.ai:not(.err):not(.crisis) .acts');
    for (var k = 0; k < as.length; k++) {
      if (as[k].querySelector('.xzp-grp')) continue;
      var btn = document.createElement('button'); btn.className = 'ib xzp-grp'; btn.type = 'button';
      btn.title = T('grp'); btn.setAttribute('aria-label', T('grp')); btn.textContent = '🏡';
      var del = as[k].querySelector('[data-act="del"]'); as[k].insertBefore(btn, del || null);
    }
  }
  var tmr = 0;
  function later() { clearTimeout(tmr); tmr = setTimeout(scan, 250); }


  /* ---------- 3. 經文核對：回答裡引用的經文，逐一和互動聖經的經文比對 ---------- */
  var CK = {
    zh: { ver: '和合本', ok: '✓ 和{0}相符', near: '⚠ 和{0}的字句略有不同', loc: '⚠ 這段經文在 {0}，不是 {1}', bad: '⚠ 和{0}的經文對不上，請以聖經為準', h: '📖 經文核對', xz: '小智引用的', bible: '聖經原文（{0}）', sum: '📖 經文核對（{0}）：✓ {1} 處相符', sumW: '・⚠ {0} 處要留意', note: '核對只比對字句是否一致，不代表解釋一定正確；請以聖經為準。' },
    zs: { ver: '和合本', ok: '✓ 和{0}相符', near: '⚠ 和{0}的字句略有不同', loc: '⚠ 这段经文在 {0}，不是 {1}', bad: '⚠ 和{0}的经文对不上，请以圣经为准', h: '📖 经文核对', xz: '小智引用的', bible: '圣经原文（{0}）', sum: '📖 经文核对（{0}）：✓ {1} 处相符', sumW: '・⚠ {0} 处要留意', note: '核对只比对字句是否一致，不代表解释一定正确；请以圣经为准。' },
    en: { ver: 'WEB', ok: '✓ Matches the {0}', near: '⚠ Wording differs slightly from the {0}', loc: '⚠ This is {0}, not {1}', bad: '⚠ Doesn’t match the {0} — please check your Bible', h: '📖 Scripture check', xz: 'Xiaozhi quoted', bible: 'Bible text ({0})', sum: '📖 Scripture check ({0}): ✓ {1} match', sumW: ' · ⚠ {0} to review', note: 'This only compares wording; it doesn’t prove the interpretation is right. Scripture is the standard.' },
    ko: { ver: '개역한글', ok: '✓ {0}과 일치', near: '⚠ {0}과 표현이 조금 달라요', loc: '⚠ 이 말씀은 {0}이고 {1}이 아니에요', bad: '⚠ {0}과 맞지 않아요. 성경을 확인하세요', h: '📖 성경 구절 확인', xz: '샤오즈가 인용한 말씀', bible: '성경 본문({0})', sum: '📖 성경 구절 확인({0}): ✓ {1}곳 일치', sumW: ' · ⚠ {0}곳 확인 필요', note: '표현이 같은지만 비교해요. 해석이 옳다는 뜻은 아니에요. 성경이 기준이에요.' },
    ja: { ver: '口語訳', ok: '✓ {0}と一致', near: '⚠ {0}と表現が少し違います', loc: '⚠ この聖句は {0} で、{1} ではありません', bad: '⚠ {0}と一致しません。聖書で確かめてください', h: '📖 聖句チェック', xz: 'シャオジーの引用', bible: '聖書本文（{0}）', sum: '📖 聖句チェック（{0}）：✓ {1} か所一致', sumW: '・⚠ {0} か所要確認', note: '言葉が一致しているかだけを確認しています。解釈の正しさを保証するものではありません。' },
    id: { ver: 'TB', ok: '✓ Sesuai {0}', near: '⚠ Kata-katanya sedikit berbeda dari {0}', loc: '⚠ Ayat ini ada di {0}, bukan {1}', bad: '⚠ Tidak cocok dengan {0} — periksa Alkitab Anda', h: '📖 Cek ayat', xz: 'Kutipan Xiaozhi', bible: 'Teks Alkitab ({0})', sum: '📖 Cek ayat ({0}): ✓ {1} sesuai', sumW: ' · ⚠ {0} perlu dicek', note: 'Ini hanya membandingkan kata-kata; bukan jaminan tafsirannya benar. Alkitab adalah patokannya.' },
    ceb: { ver: 'Ang Pulong sa Dios', ok: '✓ Uyon sa {0}', near: '⚠ Gamay nga kalainan sa pulong gikan sa {0}', loc: '⚠ Kini anaa sa {0}, dili {1}', bad: '⚠ Dili mohaum sa {0} — susiha ang imong Biblia', h: '📖 Pagsusi sa bersikulo', xz: 'Gikutlo ni Xiaozhi', bible: 'Teksto sa Biblia ({0})', sum: '📖 Pagsusi ({0}): ✓ {1} ang uyon', sumW: ' · ⚠ {0} susihon', note: 'Gitandi ra ang mga pulong; dili kini garantiya nga sakto ang paghubad. Ang Biblia ang sukdanan.' }
  };
  function K(k) { var d = CK[L()] || CK.en, s = d[k] == null ? CK.en[k] : d[k], a = [].slice.call(arguments, 1); for (var i = 0; i < a.length; i++) s = s.replace('{' + i + '}', a[i]); return s; }
  var TOC = null, SHP = {}, CKR = [];
  function getToc() { if (!TOC) TOC = fetch(BIBLE + 'toc.json').then(function (r) { return r.json(); }).then(function (t) { var o = {}; t.forEach(function (b) { o[b.id] = b; }); return o; }); return TOC; }
  function getShard(lg, sh) { var k = lg + '.' + sh; if (!SHP[k]) SHP[k] = fetch(BIBLE + 'bible.' + k + '.json').then(function (r) { if (!r.ok) throw new Error('nf'); return r.json(); }); SHP[k].catch(function () { delete SHP[k]; }); return SHP[k]; }
  function chapter(lg, book, ch) {
    return getToc().then(function (T) { var b = T[book]; if (!b) throw new Error('nb'); return getShard(lg, b.shard); }).then(function (d) {
      var c = (d[book] || [])[ch - 1]; if (!c) return null; var V = {}, cur = 0;
      c.forEach(function (p) { if (!p || p.length < 3) return; for (var i = 1; i + 1 < p.length; i += 2) { var n = p[i], t = p[i + 1]; if (typeof n !== 'number') continue; if (n > 0) cur = n; V[cur] = (V[cur] ? V[cur] + (/[㐀-鿿]$/.test(V[cur]) ? '' : ' ') : '') + t; } });
      return V;
    });
  }
  var VAR = { '裏': '裡', '着': '著', '爲': '為', '祂': '他', '牠': '它', '於': '于', '啊': '阿', '甚': '什', '麼': '么', '么': '么', '嗎': '吗' };
  function norm(s) {
    s = String(s || '').replace(/〔[^〕]*〕|\[[^\]]*\]/g, '').replace(/上帝/g, '神').toLowerCase();
    s = s.replace(/[裏着爲祂牠於啊甚麼么嗎]/g, function (c) { return VAR[c] || c; });
    return s.replace(/[\s　-〿＀-／：-＠［-｀｛-･ -⁯!-\/:-@\[-`{-~·•]/g, '');
  }
  function grams(s) { var o = {}, w = /[a-zÀ-ɏ0-9]/.test(s) && !/[぀-鿿가-힯]/.test(s); if (w) { return null; } for (var i = 0; i + 1 < s.length; i++) o[s.substr(i, 2)] = 1; return o; }
  function contain(q, t) {
    var qs = q.replace(/[…]|\.\.\./g, ' ').trim();
    if (/[぀-鿿가-힯]/.test(qs)) { var a = grams(norm(qs)), b = grams(norm(t)), n = 0, h = 0; for (var k in a) { n++; if (b[k]) h++; } return n ? h / n : 0; }
    var wq = String(qs).toLowerCase().match(/[a-zÀ-ɏ0-9']+/g) || [], wt = {}; (String(t).toLowerCase().match(/[a-zÀ-ɏ0-9']+/g) || []).forEach(function (w) { wt[w] = 1; });
    var hh = 0; wq.forEach(function (w) { if (wt[w]) hh++; }); return wq.length ? hh / wq.length : 0;
  }
  function piecesIn(q, t) { var ps = String(q).split(/……|…|\.\.\.|⋯/), nt = norm(t), ok = 0, all = 0; for (var i = 0; i < ps.length; i++) { var p = norm(ps[i]); if (p.length < 3) continue; all++; if (nt.indexOf(p) >= 0) ok++; } return all > 0 && ok === all; }
  var QRE = /「([^「」]{3,})」|『([^『』]{3,})』|“([^“”]{3,})”|"([^"]{3,})"|‘([^‘’]{8,})’/g;
  function quoteFor(a) {
    var blk = a.closest('p,li,blockquote,td,h3,h4,h5') || a.parentNode, full = '', pos = -1, end = -1;
    var w = document.createTreeWalker(blk, NodeFilter.SHOW_TEXT, null, false), n;
    while ((n = w.nextNode())) { if (n.parentNode.closest && n.parentNode.closest('.xzck')) continue; if (a.contains(n)) { if (pos < 0) pos = full.length; full += n.nodeValue; end = full.length; } else full += n.nodeValue; }
    if (pos < 0) return '';
    var best = '', bd = 99, m; QRE.lastIndex = 0;
    while ((m = QRE.exec(full))) { var q = m[1] || m[2] || m[3] || m[4] || m[5], qs = m.index, qe = m.index + m[0].length, gap;
      if (qe <= pos) { gap = full.slice(qe, pos); if (/^[\s（(—\-–:：,，]*$/.test(gap) && gap.length < 8 && gap.length < bd) { best = q; bd = gap.length; } }
      else if (qs >= end) { gap = full.slice(end, qs); if (gap.length <= 10 && /^[\s)）:：,，—\-–說说曰云写寫記記载載道]*$/.test(gap) && gap.length < bd) { best = q; bd = gap.length; } }
    }
    if (!best && blk.tagName === 'BLOCKQUOTE') { best = full.slice(0, pos).replace(/[\s（(—\-–]+$/, '') + full.slice(end).replace(/^[\s)）—\-–]+/, ''); best = best.replace(/^[「“"『]|[」”"』]$/g, ''); if (best.length < 4) best = ''; }
    return best;
  }
  function refName(b, c, v) { var a = document.querySelector('a.xzref[data-b="' + b + '"][data-c="' + c + '"]'); var nm = a ? a.textContent.replace(/\s*\d.*$/, '').replace(/第\s*$/, '') : b; return nm + ' ' + c + ':' + v; }
  function vcheck(body) {
    var refs = body.querySelectorAll('a.xzref[data-v]'), lg = L(), jobs = [];
    for (var i = 0; i < refs.length; i++) (function (a) {
      var q = quoteFor(a); if (!q) return;
      var b = a.getAttribute('data-b'), c = +a.getAttribute('data-c'), v = +a.getAttribute('data-v'), v2 = +(a.getAttribute('data-v2') || v);
      jobs.push(chapter(lg, b, c).then(function (V) {
        if (!V) return null; var rng = []; for (var k = v; k <= v2; k++) if (V[k]) rng.push(V[k]); var rt = rng.join(''), st, at = '';
        if (!rt) return null;
        if (piecesIn(q, rt)) st = 'ok';
        else { var hit = 0; for (var x in V) { if (+x > 0 && piecesIn(q, V[x] + (V[+x + 1] || ''))) { hit = +x; break; } }
          if (hit && (hit < v || hit > v2)) { st = 'loc'; at = hit; }
          else st = contain(q, rt) >= 0.72 ? 'near' : 'bad'; }
        var r = { a: a, q: q, b: b, c: c, v: v, v2: v2, t: rng.map(function (s, j) { return (v + j) + ' ' + s; }).join('\n'), st: st, at: at };
        r.id = CKR.push(r) - 1; return r;
      }).catch(function () { return null; }));
    })(refs[i]);
    if (!jobs.length) return;
    Promise.all(jobs).then(function (rs) {
      rs = rs.filter(Boolean); if (!rs.length || !body.isConnected) return;
      var ok = 0, w = 0, ids = [];
      rs.forEach(function (r) { if (r.st === 'ok') ok++; else w++; ids.push(r.id);
        var bt = document.createElement('button'); bt.type = 'button'; bt.className = 'xzck ' + r.st; bt.setAttribute('data-ck', r.id); bt.textContent = r.st === 'ok' ? '✓' : '⚠'; bt.title = ckMsg(r);
        r.a.parentNode.insertBefore(bt, r.a.nextSibling); });
      var sm = document.createElement('button'); sm.type = 'button'; sm.className = 'xzck-sum' + (w ? ' w' : ''); sm.setAttribute('data-cks', ids.join(','));
      sm.textContent = K('sum', K('ver'), ok) + (w ? K('sumW', w) : ''); body.appendChild(sm);
    });
  }
  function ckMsg(r) { var V = K('ver'); return r.st === 'ok' ? K('ok', V) : r.st === 'near' ? K('near', V) : r.st === 'loc' ? K('loc', r.c + ':' + r.at, r.c + ':' + r.v + (r.v2 > r.v ? '-' + r.v2 : '')) : K('bad', V); }
  function openCk(ids) {
    var h = '<div class="xzp-bd">';
    ids.forEach(function (id) { var r = CKR[id]; if (!r) return; var url = BIBLE + '?lang321=' + L() + '#/read/' + r.b + '/' + r.c + '/' + (r.at || r.v);
      h += '<div class="xzck-item ' + r.st + '"><div class="xzck-st">' + esc(ckMsg(r)) + '</div><div class="xzck-ref">' + esc(r.a.textContent) + '</div><div class="xzck-lb">' + esc(K('xz')) + '</div><div class="xzck-q">「' + esc(r.q) + '」</div><div class="xzck-lb">' + esc(K('bible', K('ver'))) + '</div><div class="xzck-t">' + esc(r.t).replace(/\n/g, '<br>') + '</div><a class="xzp-sec" href="' + esc(url) + '" data-xzopen="1" data-t="' + esc(r.a.textContent) + '">' + esc(T('open')) + ' ›</a></div>'; });
    h += '<p class="xzp-note">' + esc(K('note')) + '</p></div>';
    sheet('<b>' + esc(K('h')) + '</b>', h, true);
  }

  /* ---------- 共用：底部視窗 ---------- */
  var CSS = '.xzref{color:var(--accent,#1E3F8F);text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px;cursor:pointer;font-weight:600}' +
    '.xzp-grp{font-size:17px;line-height:1;filter:saturate(1.1)}' +
    '#xzpMask{position:fixed;inset:0;z-index:2147482000;background:rgba(10,20,40,.45);display:flex;align-items:flex-end;justify-content:center}' +
    '#xzpMask .xzp-sh{width:100%;max-width:720px;height:calc(100% - 46px - env(safe-area-inset-top,0px));background:var(--page,#fff);border-radius:18px 18px 0 0;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 -8px 30px rgba(0,0,0,.25);animation:xzpUp .25s ease-out}' +
    '#xzpMask .xzp-sh.auto{height:auto;max-height:calc(100% - 46px - env(safe-area-inset-top,0px))}' +
    '@keyframes xzpUp{from{transform:translateY(40px);opacity:.4}to{transform:none;opacity:1}}' +
    '#xzpMask .xzp-hd{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid var(--line,rgba(0,0,0,.08));font-weight:800;font-size:17px;color:var(--ink,#1D1F24)}' +
    '#xzpMask .xzp-hd b{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '#xzpMask .xzp-hd a,#xzpMask .xzp-hd button{font-size:14px;font-weight:700;padding:7px 11px;border-radius:999px;border:1px solid rgba(0,0,0,.12);background:transparent;color:inherit;text-decoration:none;white-space:nowrap}' +
    '#xzpMask iframe{flex:1;width:100%;border:0;background:#fff}' +
    '#xzpMask .xzp-bd{padding:14px 16px calc(18px + env(safe-area-inset-bottom,0px));overflow:auto;font-size:16px;line-height:1.6;color:var(--ink,#1D1F24)}' +
    '#xzpMask textarea,#xzpMask input{width:100%;box-sizing:border-box;font:inherit;font-size:16px;padding:11px 12px;border:1.5px solid rgba(0,0,0,.15);border-radius:12px;background:var(--soft,#f6f7f9);color:inherit}' +
    '#xzpMask textarea{min-height:230px;line-height:1.65}' +
    '#xzpMask .xzp-note{font-size:13.5px;opacity:.7;margin:4px 2px 10px}' +
    '#xzpMask .xzp-lab{font-weight:800;margin:14px 2px 8px}' +
    '#xzpMask .xzp-g{display:flex;flex-wrap:wrap;gap:8px}' +
    '#xzpMask .xzp-g button{padding:10px 14px;border-radius:12px;border:1.5px solid rgba(0,0,0,.14);background:var(--soft,#f6f7f9);font:inherit;font-size:15.5px;color:inherit}' +
    '#xzpMask .xzp-g button.on{border-color:var(--accent,#1E3F8F);background:var(--accent,#1E3F8F);color:#fff}' +
    '#xzpMask .xzp-go{margin-top:16px;width:100%;padding:13px;border:0;border-radius:14px;font:inherit;font-size:17px;font-weight:800;color:#fff;background:var(--accent,#1E3F8F)}' +
    '#xzpMask .xzp-go[disabled]{opacity:.5}' +
    '#xzpMask .xzp-msg{margin-top:10px;font-weight:700}#xzpMask .xzp-msg.ok{color:#2F7D32}#xzpMask .xzp-msg.bad{color:#C0392B}' +
    '#xzpMask .xzp-sec{display:inline-block;margin-top:10px;padding:9px 14px;border-radius:12px;border:1.5px solid rgba(0,0,0,.14);color:inherit;text-decoration:none;font-weight:700}' +
    '.xzck{display:inline-grid;place-items:center;min-width:20px;height:20px;margin:0 2px;padding:0 4px;border:0;border-radius:10px;font-size:12px;font-weight:800;vertical-align:1px;line-height:1;cursor:pointer}' +
    '.xzck.ok{background:rgba(47,125,50,.14);color:#2F7D32}.xzck.near,.xzck.loc{background:rgba(184,134,46,.18);color:#8A5F12}.xzck.bad{background:rgba(194,69,61,.14);color:#C2453D}' +
    '.xzck-sum{display:block;margin:12px 0 0;border:1px solid rgba(47,125,50,.35);background:rgba(47,125,50,.06);color:#2F7D32;border-radius:12px;padding:7px 12px;font-size:.82em;text-align:left;width:auto}.xzck-sum.w{border-color:rgba(184,134,46,.5);background:rgba(184,134,46,.08);color:#8A5F12}' +
    '.xzck-item{border:1px solid var(--line,#e5e6ea);border-radius:14px;padding:12px 14px;margin:0 0 12px}.xzck-item.ok{border-color:rgba(47,125,50,.4)}.xzck-item.bad{border-color:rgba(194,69,61,.45)}.xzck-item.near,.xzck-item.loc{border-color:rgba(184,134,46,.5)}' +
    '.xzck-st{font-weight:800;margin-bottom:4px}.xzck-item.ok .xzck-st{color:#2F7D32}.xzck-item.bad .xzck-st{color:#C2453D}.xzck-item.near .xzck-st,.xzck-item.loc .xzck-st{color:#8A5F12}' +
    '.xzck-ref{font-weight:700;margin-bottom:6px}.xzck-lb{font-size:.78em;opacity:.65;margin-top:6px}.xzck-q{line-height:1.6}.xzck-t{line-height:1.7;background:rgba(127,127,127,.08);border-radius:10px;padding:8px 10px;margin-top:2px}.xzp-note{font-size:13px;opacity:.7}' +
    '#xzpMask .xzp-spin{display:inline-block;width:16px;height:16px;border:2px solid rgba(0,0,0,.2);border-top-color:var(--accent,#1E3F8F);border-radius:50%;animation:xzpS .8s linear infinite;vertical-align:-3px;margin-right:6px}@keyframes xzpS{to{transform:rotate(360deg)}}';
  function css() { if (document.getElementById('xzpcss')) return; var s = document.createElement('style'); s.id = 'xzpcss'; s.appendChild(document.createTextNode(CSS)); document.head.appendChild(s); }
  function closeSheet() { var m = document.getElementById('xzpMask'); if (m && m.parentNode) m.parentNode.removeChild(m); }
  function sheet(head, body, auto) {
    closeSheet(); css();
    var m = document.createElement('div'); m.id = 'xzpMask';
    m.innerHTML = '<div class="xzp-sh' + (auto ? ' auto' : '') + '" role="dialog" aria-modal="true"><div class="xzp-hd">' + head + '<button type="button" data-xzp="close">' + esc(T('close')) + '</button></div>' + body + '</div>';
    m.addEventListener('click', function (e) { if (e.target === m || (e.target.getAttribute && e.target.getAttribute('data-xzp') === 'close')) closeSheet(); });
    document.body.appendChild(m); return m;
  }

  /* ---------- 1b. 打開互動聖經 ---------- */
  function openUrl(url, title) {
    sheet('<b>📖 ' + esc(title || '') + '</b><a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(T('open')) + ' ↗</a>', '<iframe src="' + esc(url) + '" allow="autoplay; clipboard-write"></iframe>');
  }
  function openRef(a) {
    var b = a.getAttribute('data-b'), c = a.getAttribute('data-c'), v = a.getAttribute('data-v');
    var url = BIBLE + '?lang321=' + L() + '#/read/' + b + '/' + c + (v ? '/' + v : '');
    sheet('<b>📖 ' + esc(a.textContent) + '</b><a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(T('open')) + ' ↗</a>', '<iframe src="' + esc(url) + '" title="' + esc(a.textContent) + '" allow="autoplay; clipboard-write"></iframe>');
  }

  /* ---------- 2. 做成小家討論題 ---------- */
  function msgOf(btn) {
    var m = btn.closest('.msg.ai'); if (!m) return null;
    var body = m.querySelector('.body'), ans = body ? (body.innerText || body.textContent || '') : '';
    var q = '', p = m.previousElementSibling;
    while (p && !(p.classList && p.classList.contains('user'))) p = p.previousElementSibling;
    if (p) q = (p.innerText || p.textContent || '').trim();
    return { q: q, a: ans.trim() };
  }
  var LNAME = { zh: '繁體中文（台灣用語，引用經文用和合本）', zs: '简体中文（引用经文用和合本）', en: 'English (quote Scripture from the World English Bible)', ko: '한국어 (성경 인용은 개역한글)', ja: '日本語（聖書の引用は口語訳）', id: 'Bahasa Indonesia (kutip Alkitab dari AYT)', ceb: 'Cebuano (kutlo sa Biblia gikan sa Balaan nga Bibliya)' };
  function prompt(d) {
    return 'Below is a question someone asked Xiaozhi (an AI companion of the Kingdom 321 Online Fellowship) and Xiaozhi\'s answer. Turn it into material for a small-group ("小家") discussion.\n' +
      'Write ONLY in ' + LNAME[L()] + '.\n' +
      'Format exactly (plain text, no Markdown, no ** or #):\n' +
      'Line 1: a short topic title (max 18 characters/5 words).\n' +
      'Line 2: one key Bible verse with its reference (short).\n' +
      'Then 4 numbered discussion questions, one per line, warm and personal, in this order: 1 observe (what does it say), 2 receive (what touched me / what God shows me), 3 practice (one concrete step this week), 4 walk together (how we can pray for / support each other). Fit the 321 spirit: Jesus is our model, the Bible our standard, the Holy Spirit our guide; let Jesus be King.\n' +
      'Keep the whole thing under 420 characters in total. Do not add anything else.\n\n' +
      'QUESTION:\n' + (d.q || '(none)') + '\n\nANSWER:\n' + d.a.slice(0, 3500);
  }
  function extract(d) {
    if (!d) return '';
    if (typeof d.text === 'string') return d.text;
    if (d.content && d.content.length) return d.content.map(function (x) { return x && x.text || ''; }).join('');
    if (d.choices && d.choices[0]) return (d.choices[0].message && d.choices[0].message.content) || '';
    return '';
  }
  function genQ(d, cb) {
    var x = new XMLHttpRequest();
    try { x.open('POST', PROXY, true); } catch (e) { cb(''); return; }
    x.setRequestHeader('Content-Type', 'application/json'); x.timeout = 60000;
    x.onreadystatechange = function () { if (x.readyState !== 4) return; var j = null; try { j = JSON.parse(x.responseText); } catch (e) { } cb(x.status >= 200 && x.status < 300 ? extract(j).replace(/\*\*/g, '').replace(/^#+\s*/gm, '').trim() : ''); };
    x.ontimeout = function () { cb(''); };
    x.send(JSON.stringify({ model: MODEL, max_tokens: 900, system: 'You prepare concise, warm small-group discussion material for a Christian fellowship. Follow the requested language and format exactly.', messages: [{ role: 'user', content: prompt(d) }] }));
  }
  function groups() { var g = lj('fl321_xjs', []) || []; return g.filter(function (x) { return x && x.code; }); }
  function devId() { var d = lg('fl321_xjdev'); if (!d) { d = 'f' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10); ls('fl321_xjdev', d); } return d; }
  function chunks(t) {
    var out = [], cur = '', ps = String(t).split(/\n/);
    for (var i = 0; i < ps.length; i++) {
      var p = ps[i]; if (p.length > MAXT) { if (cur) { out.push(cur); cur = ''; } for (var k = 0; k < p.length; k += MAXT) out.push(p.slice(k, k + MAXT)); continue; }
      if ((cur ? cur.length + 1 : 0) + p.length > MAXT) { out.push(cur); cur = p; } else cur = cur ? cur + '\n' + p : p;
    }
    if (cur) out.push(cur); return out.filter(function (s) { return s.trim(); });
  }
  function post(code, body, cb, n) {
    var x = new XMLHttpRequest(); n = n || 0;
    try { x.open('POST', CHAT + '/c/' + code + '/send', true); } catch (e) { cb(false); return; }
    x.setRequestHeader('Content-Type', 'application/json'); x.timeout = 15000;
    x.onreadystatechange = function () {
      if (x.readyState !== 4) return; var j = null; try { j = JSON.parse(x.responseText); } catch (e) { }
      if (j && j.ok) { cb(true); return; }
      var er = j && j.err || ('http' + x.status);
      if ((er === 'slow' || er === 'http429') && n < 3) { setTimeout(function () { post(code, body, cb, n + 1); }, 1700); return; }
      cb(false);
    };
    x.ontimeout = function () { cb(false); };
    x.send(JSON.stringify(body));
  }
  function openGroup(btn, preset) {
    var d = preset ? { q: '', a: preset } : msgOf(btn); if (!d || !d.a) return;
    var gl = groups(), sel = gl.length ? lg('fl321_xjcur') : '';
    if (sel && !gl.some(function (g) { return g.code === sel; })) sel = '';
    if (!sel && gl.length) sel = gl[0].code;
    var m = sheet('<b>' + esc(preset ? T('toGrp') : T('gh')) + '</b>', '<div class="xzp-bd"><div id="xzpTxtBox"><span class="xzp-spin"></span>' + esc(T('gen')) + '</div><div id="xzpRest"></div></div>', true);
    function rest() {
      var h = '';
      if (!gl.length) {
        h = '<p class="xzp-msg bad" style="font-weight:600">' + esc(T('none')) + '</p><a class="xzp-sec" href="' + FEL + '?lang321=' + L() + '#/xjchat" target="_blank" rel="noopener">' + esc(T('goFel')) + ' ↗</a>';
      } else {
        h = '<div class="xzp-lab">' + esc(T('to')) + '</div><div class="xzp-g">';
        gl.forEach(function (g) { h += '<button type="button" data-code="' + esc(g.code) + '" class="' + (g.code === sel ? 'on' : '') + '">🏡 ' + esc(g.name || g.code) + '</button>'; });
        h += '</div>';
        var nk = (lg('fl321_xjnick') || '').trim();
        if (!nk) h += '<div class="xzp-lab">' + esc(T('nick')) + '</div><input id="xzpNick" maxlength="20" placeholder="' + esc(T('nickPh')) + '">';
        h += '<button type="button" class="xzp-go" id="xzpGo">' + esc(T('send')) + '</button><div class="xzp-msg" id="xzpMsg"></div>';
      }
      document.getElementById('xzpRest').innerHTML = h;
      var g = m.querySelector('.xzp-g');
      if (g) g.addEventListener('click', function (e) { var b = e.target.closest('button[data-code]'); if (!b) return; sel = b.getAttribute('data-code'); var all = g.querySelectorAll('button'); for (var i = 0; i < all.length; i++) all[i].className = all[i] === b ? 'on' : ''; });
      var go = document.getElementById('xzpGo'); if (go) go.onclick = send;
    }
    function fill(txt, raw) {
      var box = document.getElementById('xzpTxtBox'); if (!box) return;
      if (!txt) { box.innerHTML = '<p class="xzp-msg bad">' + esc(T('genFail')) + '</p><button type="button" class="xzp-sec" id="xzpRe">' + esc(T('retry')) + '</button>'; document.getElementById('xzpRe').onclick = function () { box.innerHTML = '<span class="xzp-spin"></span>' + esc(T('gen')); genQ(d, fill); }; return; }
      box.innerHTML = '<div class="xzp-note">' + esc(T('edit')) + '</div><textarea id="xzpTxt"></textarea><button type="button" class="xzp-sec" id="xzpRe">↻ ' + esc(T('retry')) + '</button>';
      document.getElementById('xzpTxt').value = raw ? txt : T('head') + '\n' + txt + '\n' + T('from');
      document.getElementById('xzpRe').onclick = function () { box.innerHTML = '<span class="xzp-spin"></span>' + esc(T('gen')); genQ(d, fill); };
    }
    function send() {
      var ta = document.getElementById('xzpTxt'), msg = document.getElementById('xzpMsg'), go = document.getElementById('xzpGo');
      if (!ta || !ta.value.trim() || !sel) return;
      var ni = document.getElementById('xzpNick'), nk = (lg('fl321_xjnick') || '').trim();
      if (ni) { nk = ni.value.trim().slice(0, 20); if (!nk) { msg.className = 'xzp-msg bad'; msg.textContent = T('needNick'); ni.focus(); return; } ls('fl321_xjnick', nk); }
      var parts = chunks(ta.value.trim()), i = 0, dv = devId(), name = '';
      if (parts.length > 20) { msg.className = 'xzp-msg bad'; msg.textContent = T('tooLong'); return; }
      gl.forEach(function (g) { if (g.code === sel) name = g.name || g.code; });
      go.disabled = true; go.textContent = T('sending'); msg.className = 'xzp-msg'; msg.textContent = '';
      (function next() {
        if (i >= parts.length) {
          go.textContent = '✓'; msg.className = 'xzp-msg ok'; msg.textContent = T('sent', name);
          var a = document.createElement('a'); a.className = 'xzp-sec'; a.target = '_blank'; a.rel = 'noopener'; a.href = FEL + '?lang321=' + L() + '#/xjchat'; a.textContent = T('openChat') + ' ↗';
          a.onclick = function () { ls('fl321_xjcur', sel); };
          msg.parentNode.appendChild(a); return;
        }
        post(sel, { text: parts[i], dev: dv, nick: nk, re: 0, after: 0 }, function (ok) {
          if (!ok) { go.disabled = false; go.textContent = T('send'); msg.className = 'xzp-msg bad'; msg.textContent = T('fail'); parts = parts.slice(i); i = 0; return; }
          i++; setTimeout(next, 1600);
        });
      })();
    }
    rest(); if (preset) fill(preset, 1); else genQ(d, fill);
  }

  /* ---------- 事件 ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target : null; if (!t) return;
    var a = t.closest('a.xzref');
    if (a) { e.preventDefault(); e.stopPropagation(); openRef(a); return; }
    var ck = t.closest('.xzck,.xzck-sum');
    if (ck) { e.preventDefault(); e.stopPropagation(); openCk(ck.classList.contains('xzck-sum') ? ck.getAttribute('data-cks').split(',') : [ck.getAttribute('data-ck')]); return; }
    var xo = t.closest('a[data-xzopen]');
    if (xo) { e.preventDefault(); openUrl(xo.getAttribute('href'), xo.getAttribute('data-t')); return; }
    var g = t.closest('.xzp-grp');
    if (g) { e.preventDefault(); e.stopPropagation(); openGroup(g); }
  }, true);
  function start() {
    css(); scan();
    try { new MutationObserver(later).observe(document.body, { childList: true, subtree: true, characterData: true }); } catch (e) { setInterval(scan, 1500); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  function parseRef(s) {
    s = String(s || ''); RE.lastIndex = 0; var m = RE.exec(s); if (!m) { var mm = /^\s*(\S+?)\s*(\d{1,3})\s*$/.exec(s); if (mm && NAME[mm[1]] && +mm[2] <= NAME[mm[1]][1]) return { b: NAME[mm[1]][0], c: +mm[2], v: 0, v2: 0 }; return null; }
    var b = NAME[m[1]]; if (!b) return null; var ch = +m[2], v = +(m[3] || m[5] || 0), v2 = +(m[4] || m[6] || 0);
    if (!(ch >= 1 && ch <= b[1])) return null; return { b: b[0], c: ch, v: v, v2: v2 > v ? v2 : v };
  }
  window.XZPLUS = { scan: scan, linkify: linkify, RE: RE, toGroup: function (text) { openGroup(null, String(text || '')); }, parse: parseRef, chapter: chapter };
})();
