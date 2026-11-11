# 小智問答（v2026.1111.1718）

上傳到 GitHub（例如 spch321-sudo/xiaozhi），把這個資料夾裡的全部檔案放在 repo 根目錄，啟用 GitHub Pages。

- 主畫面圖示：icon-180.png（iPhone）、icon-192／512.png（Android）、maskable 版給 Android 圓形圖示用。
- 每次更新請整批上傳覆蓋，特別是 index.html、sw.js、version.json 三個檔；三處版本號一致才會自動換新。
- 小智連線：https://xiaozhi-proxy.spch321.workers.dev
- 繁體：index.html　简体：sc.html　English：en.html（App 內也可隨時切換語言）
- 收藏存在手機瀏覽器裡，三種語言共用一份。
- 한국어：ko.html　日本語：ja.html（經文：개역한글 1961／口語訳 1955，與321互動聖經相同）
- Bahasa Indonesia：id.html（AYT／Terjemahan Baru）　Cebuano：ceb.html（Ang Pulong sa Dios／Balaan nga Bibliya），與321互動聖經相同


## 授權碼開通（v2026.1111.2130）
- 新增 `k321gate.js`：開啟時先要求輸入授權碼，與國度321空中團契共用同一組授權碼與記錄（同網域 `k321_auth`）；已在空中團契開通的手機自動通過。
- 開通後播放小智專屬慶祝動畫（小智圖示從光中彈出、金色光芒旋轉、光環擴散、星光迸發，約 5 秒，點一下略過），七種語言。
- **之後整批上傳新版時，請保留 `k321gate.js`，並在每個 .html 的 `</head>` 前保留這一行：** `<script src="k321gate.js?v=版本"></script>`。
