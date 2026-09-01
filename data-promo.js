// ============================================================
// 0901 檔期 — 一般促銷資料（9/1–9/15）
// 之後換檔期只要把新 PDF 內容告訴 Claude，重新產生這個檔案即可，
// 頁面結構與樣式完全不用動。
// 欄位說明：
//   name   商品名稱（不含型號/顏色）
//   spec   規格（容量 / CPU / RAM，不顯示核心數）
// price  定價（PDF 會員價）
// sale   促銷後價格（沒有促銷則省略）
// note   折扣說明，例如「現折920」
// gifts  第二頁顯示的贈品/加碼內容（陣列，可省略）
// ============================================================
const PAGE_META = {
  title: "限時優惠",
  eyebrow: "限時優惠 · 2026/09/01–09/15",
  heading: "iPhone / Mac / iPad 全面現折",
  desc: "點選價格卡，即可看到完整優惠詳情與加碼好禮。實際庫存、顏色及價格均以門市公告為準。",
  meta: [],
  accent: "amber",
};

const PRODUCTS = [
  {
    category: "iPhone",
    items: [
      { name: "iPhone 17e", spec: "256GB", price: 21900, gifts: ["消費滿萬元贈 500 元配件金"] },
      { name: "iPhone 17e", spec: "512GB", price: 28900, gifts: ["消費滿萬元贈 500 元配件金"] },
      { name: "iPhone 17", spec: "256GB", price: 29900, gifts: ["消費滿萬元贈 500 元配件金", "限現貨，暫不開放預訂"] },
      { name: "iPhone 17", spec: "512GB", price: 36900, gifts: ["消費滿萬元贈 500 元配件金", "限現貨，暫不開放預訂"] },
      { name: "iPhone 17 Pro", spec: "256GB", price: 39900, sale: 38994, note: "現折 906", gifts: ["加贈市價 1,290 元保護貼", "現貨售完為止"] },
      { name: "iPhone 17 Pro", spec: "512GB", price: 46900, sale: 45749, note: "現折 1,151", gifts: ["加贈市價 1,290 元保護貼", "現貨售完為止"] },
      { name: "iPhone 17 Pro Max", spec: "256GB", price: 44900, sale: 43729, note: "現折 1,171", gifts: ["加贈市價 990 元保護貼"] },
      { name: "iPhone 17 Pro Max", spec: "512GB", price: 51900, sale: 50484, note: "現折 1,416", gifts: ["加贈市價 990 元保護貼"] },
    ],
  },
  {
    category: "Mac",
    items: [
      { name: "MacBook Air 13\u2033", spec: "M5・16GB・512GB", price: 42900, gifts: ["消費滿萬元贈 400 元配件金"] },
      { name: "MacBook Air 15\u2033", spec: "M5・16GB・512GB", price: 49900, gifts: ["消費滿萬元贈 500 元配件金"] },
      { name: "MacBook Neo 13\u2033", spec: "A18 Pro・8GB・256GB", price: 22900, sale: 22500, note: "現折 400", gifts: ["加贈市價 1,280 元保護貼"] },
      { name: "MacBook Neo 13\u2033", spec: "A18 Pro・8GB・512GB", price: 25900, sale: 25500, note: "現折 400", gifts: ["加贈市價 1,280 元保護貼"] },
      { name: "iMac 24\u2033", spec: "M4・8CPU・8GPU・16GB・256GB", price: 49900, sale: 46906, note: "現折 2,994" },
      { name: "Mac mini", spec: "M6・12CPU・12GPU・16GB・256GB", price: 29900, gifts: ["8/27–9/20 預購送市價 1,880 元集線器（專櫃門市限定）"] },
      { name: "Mac mini", spec: "M6・12CPU・12GPU・16GB・512GB", price: 36900, gifts: ["8/27–9/20 預購送市價 1,880 元集線器（專櫃門市限定）"] },
      { name: "Mac mini", spec: "M6・12CPU・12GPU・24GB・512GB", price: 43900, gifts: ["8/27–9/20 預購送市價 1,880 元集線器（專櫃門市限定）"] },
      { name: "MacBook Pro 14\u2033", spec: "M5・16GB・1TB", price: 64900, sale: 61006, note: "現折 3,894" },
      { name: "MacBook Pro 14\u2033", spec: "M5・24GB・1TB", price: 71900, sale: 67586, note: "現折 4,314" },
      { name: "MacBook Pro 14\u2033", spec: "M5・32GB・1TB", price: 78900, sale: 74166, note: "現折 4,734" },
      { name: "MacBook Pro 14\u2033", spec: "M5 Pro・24GB・1TB", price: 84900, sale: 79806, note: "現折 5,094" },
      { name: "MacBook Pro 16\u2033", spec: "M5 Pro・24GB・1TB", price: 99900, sale: 93906, note: "現折 5,994" },
      { name: "MacBook Pro 16\u2033", spec: "M5 Pro・48GB・1TB", price: 120900, sale: 113646, note: "現折 7,254" },
    ],
  },
  {
    category: "iPad",
    items: [
      { name: "iPad", spec: "128GB・Wi-Fi", price: 14900, sale: 14197, note: "現折 703", gifts: ["加贈市價 790 元保護貼"] },
      { name: "iPad", spec: "256GB・Wi-Fi", price: 18400, sale: 17452, note: "現折 948", gifts: ["加贈市價 790 元保護貼"] },
      { name: "iPad", spec: "512GB・Wi-Fi", price: 25400, sale: 23962, note: "現折 1,438", gifts: ["加贈市價 790 元保護貼"] },
      { name: "iPad mini", spec: "128GB・Wi-Fi", price: 19900, sale: 18706, note: "現折 1,194" },
      { name: "iPad mini", spec: "256GB・Wi-Fi", price: 23400, sale: 21996, note: "現折 1,404" },
      { name: "iPad mini", spec: "512GB・Wi-Fi", price: 30400, sale: 28576, note: "現折 1,824" },
      { name: "iPad Air 11\u2033", spec: "M4・128GB・Wi-Fi", price: 24900, sale: 24400, note: "現折 500", gifts: ["加贈市價 3,090 元 Office 365 一年"] },
      { name: "iPad Air 11\u2033", spec: "M4・256GB・Wi-Fi", price: 28400, sale: 27900, note: "現折 500", gifts: ["加贈市價 3,090 元 Office 365 一年"] },
      { name: "iPad Air 11\u2033", spec: "M4・512GB・Wi-Fi", price: 35400, sale: 34900, note: "現折 500", gifts: ["加贈市價 3,090 元 Office 365 一年"] },
      { name: "iPad Air 13\u2033", spec: "M4・128GB・Wi-Fi", price: 31900, sale: 31100, note: "現折 800", gifts: ["加贈市價 3,090 元 Office 365 一年"] },
      { name: "iPad Air 13\u2033", spec: "M4・256GB・Wi-Fi", price: 35400, sale: 34600, note: "現折 800", gifts: ["加贈市價 3,090 元 Office 365 一年"] },
      { name: "iPad Air 13\u2033", spec: "M4・512GB・Wi-Fi", price: 42400, sale: 41600, note: "現折 800", gifts: ["加贈市價 3,090 元 Office 365 一年"] },
      { name: "iPad Pro 11\u2033", spec: "M5・256GB・Wi-Fi", price: 39900, sale: 37905, note: "現折 1,995", gifts: ["加贈市價 3,090 元 Office 365 一年"] },
      { name: "iPad Pro 11\u2033", spec: "M5・512GB・Wi-Fi", price: 46900, sale: 44555, note: "現折 2,345", gifts: ["加贈市價 3,090 元 Office 365 一年"] },
      { name: "iPad Pro 13\u2033", spec: "M5・256GB・Wi-Fi", price: 50900, sale: 48355, note: "現折 2,545", gifts: ["加贈市價 3,090 元 Office 365 一年"] },
      { name: "iPad Pro 13\u2033", spec: "M5・512GB・Wi-Fi", price: 57900, sale: 55005, note: "現折 2,895", gifts: ["加贈市價 3,090 元 Office 365 一年"] },
    ],
  },
  {
    category: "Apple Watch",
    items: [
      { name: "Apple Watch SE 3", spec: "40mm・GPS", price: 7900, sale: 7347, note: "現折 553" },
      { name: "Apple Watch SE 3", spec: "44mm・GPS", price: 8900, sale: 8277, note: "現折 623" },
      { name: "Apple Watch S11", spec: "42mm・GPS", price: 12900, sale: 11997, note: "現折 903" },
      { name: "Apple Watch S11", spec: "46mm・GPS", price: 13900, sale: 12927, note: "現折 973" },
      { name: "Apple Watch Ultra 3", spec: "49mm・鈦金屬", price: 26900, sale: 24748, note: "現折 2,152" },
    ],
  },
  {
    category: "AirPods",
    items: [
      { name: "AirPods 4", spec: "標準款", price: 4490, sale: 3990, note: "現折 500" },
      { name: "AirPods 4", spec: "主動式降噪", price: 5990, sale: 5390, note: "現折 600" },
      { name: "AirPods Pro 3", spec: "主動式降噪", price: 7490, sale: 6690, note: "現折 800" },
    ],
  },
];
