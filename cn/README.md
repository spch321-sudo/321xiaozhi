# 小智问答・大陆版

網址：https://spch321-sudo.github.io/321xiaozhi/cn/

- 只有簡體中文，範例問題只有「信仰與生命」「婚姻與家庭」兩組（15 個範疇，每個 24 題，還可以按「更多題目」）。
- 內建「實用工具」10 項（禱告範例、一分鐘講福音、初信第一週、每天15分鐘靈修、家庭禮拜五步、夫妻每日十分鐘、吵架後和好四步、祝福孩子、90天讀經入門、認識321理念）和每日經文，全部離線可讀。
- 不連 Google 字體、workers.dev、Zoom、YouTube，也不使用 Claude。朗讀用手機內建語音。
- 對話紀錄和主版本小智分開存。

## 開通步驟（只要做一次）

### 1. 申請 AI 模型的 API 金鑰（擇一）
- **DeepSeek**：到 platform.deepseek.com 註冊 → 充值 → 「API keys」建立金鑰（sk- 開頭）。
- **通義千問**：到阿里雲百煉（bailian.console.aliyun.com）開通 → 建立 API-KEY。

### 2. 建立服務（Cloudflare Worker）
1. Cloudflare → Workers & Pages → Create → Worker，名稱例如 `xiaozhi-cn` → Deploy。
2. 按「Edit code」，把 `worker/cn-worker.js` 全部貼上 → Deploy。
3. Settings → Variables and Secrets，新增：
   - `API_KEY`（類型選 Secret）：第 1 步的金鑰
   - `API_BASE`：DeepSeek 填 `https://api.deepseek.com`；通義千問填 `https://dashscope.aliyuncs.com/compatible-mode/v1`
   - `MODEL`：DeepSeek 填 `deepseek-chat`；通義千問填 `qwen-plus`
   - `ALLOW_ORIGINS`：`https://spch321-sudo.github.io`
4. （建議）Settings → Domains & Routes → 加一個自己的網域，例如 `cn-ai.你的網域.com`。
   `*.workers.dev` 在大陸經常被擋，自己的網域比較穩定。
5. （可選）防止被濫用：建立 KV，綁定名稱 `RL`，再加變數 `DAILY_LIMIT`（每個 IP 每天次數，預設 300）。

### 3. 把服務網址填進 App
打開這個 repo 的 `cn/config.js`，把 `api: ''` 改成你的服務網址，例如：

```js
window.XZ_CN = {
  api: 'https://cn-ai.你的網域.com'
};
```

存檔後，手機重新打開小智問答就會使用。

## 提醒
- GitHub Pages（github.io）在大陸大多數時候打得開，但偶爾會慢或連不上；若常打不開，可把 `cn` 資料夾整個上傳到香港主機或其他大陸連得到的空間。
- 大陸的模型對宗教話題有自己的審查，個別問題可能回答得比較保守或不回答。
- 網址只分享給需要的家人，低調使用。
