// ============================================================
// 0801 檔期 — 一般促銷資料
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
  title: "夏季促銷",
  eyebrow: "限時優惠 · 2026/08/01–08/16",
  heading: "iPhone / Mac / iPad 全面現折",
  desc: "點選價格卡，即可看到完整優惠詳情與加碼好禮。實際庫存、顏色及價格均以門市公告為準。",
  meta: [],
  accent: "amber",
};

const PRODUCTS = [
  {
    category: "iPhone",
    items: [
      { name: "iPhone 17e", spec: "256GB", price: 21900, sale: 21068, note: "現折 834", gifts: ["加贈市價 1,280 元保護貼"] },
      { name: "iPhone 17e", spec: "512GB", price: 28900, sale: 27646, note: "現折 1,254", gifts: ["加贈市價 1,280 元保護貼"] },
      { name: "iPhone 17", spec: "256GB", price: 29900, gifts: ["消費滿萬元贈 500 元配件金", "限現貨，暫不開放預訂"] },
      { name: "iPhone 17", spec: "512GB", price: 36900, gifts: ["消費滿萬元贈 500 元配件金", "限現貨，暫不開放預訂"] },
      { name: "iPhone Air", spec: "256GB", price: 36900, sale: 34317, note: "現折 2,583", gifts: ["現貨售完為止"] },
      { name: "iPhone Air", spec: "512GB", price: 43900, sale: 40827, note: "現折 3,073", gifts: ["現貨售完為止"] },
      { name: "iPhone 17 Pro", spec: "256GB", price: 39900, sale: 39144, note: "現折 756", gifts: ["加贈市價 1,499 元防護殼貼組"] },
      { name: "iPhone 17 Pro", spec: "512GB", price: 46900, sale: 45864, note: "現折 1,036", gifts: ["加贈市價 1,499 元防護殼貼組"] },
      { name: "iPhone 17 Pro Max", spec: "256GB", price: 44900, sale: 43759, note: "現折 1,141", gifts: ["加贈市價 980 元保護殼"] },
      { name: "iPhone 17 Pro Max", spec: "512GB", price: 51900, sale: 50514, note: "現折 1,386", gifts: ["加贈市價 980 元保護殼"] },
    ],
  },
  {
    category: "Mac",
    items: [
      { name: "MacBook Air 13\u2033", spec: "M5・16GB・512GB", price: 42900, gifts: ["消費滿萬元贈 400 元配件金"] },
      { name: "MacBook Air 15\u2033", spec: "M5・16GB・512GB", price: 49900, sale: 48900, note: "現折 1,000", gifts: ["加贈市價 3,090 元 Office 365 一年"] },
      { name: "MacBook Neo 13\u2033", spec: "A18 Pro・8GB・256GB", price: 22900, sale: 22500, note: "現折 400", gifts: ["加贈市價 1,280 元保護貼"] },
      { name: "MacBook Neo 13\u2033", spec: "A18 Pro・8GB・512GB", price: 25900, sale: 25500, note: "現折 400", gifts: ["加贈市價 1,280 元保護貼"] },
      { name: "iMac 24\u2033", spec: "M4・8CPU・8GPU・16GB・256GB", price: 49900, sale: 47405, note: "現折 5%" },
      { name: "iMac 24\u2033", spec: "M4・10CPU・10GPU・16GB・256GB", price: 57900, sale: 55005, note: "現折 5%" },
      { name: "iMac 24\u2033", spec: "M4・10CPU・10GPU・16GB・512GB", price: 64900, sale: 61655, note: "現折 5%" },
      { name: "iMac 24\u2033", spec: "M4・10CPU・10GPU・24GB・512GB", price: 71900, sale: 68305, note: "現折 5%" },
      { name: "Mac mini", spec: "M4・10CPU・10GPU・16GB・512GB", price: 33900, gifts: ["原價供應，貨況即時異動"] },
      { name: "Mac mini", spec: "M4・10CPU・10GPU・24GB・512GB", price: 40900, gifts: ["原價供應，貨況即時異動"] },
      { name: "Mac mini", spec: "M4 Pro・12CPU・16GPU・24GB・512GB", price: 54900, gifts: ["原價供應，貨況即時異動"] },
      { name: "MacBook Pro 14\u2033", spec: "M5・16GB・1TB", price: 64900, sale: 61655, note: "現折 3,245" },
      { name: "MacBook Pro 14\u2033", spec: "M5・24GB・1TB", price: 71900, sale: 68305, note: "現折 3,595" },
      { name: "MacBook Pro 14\u2033", spec: "M5・32GB・1TB", price: 78900, sale: 74955, note: "現折 3,945" },
      { name: "MacBook Pro 14\u2033", spec: "M5 Pro・24GB・1TB", price: 84900, sale: 80655, note: "現折 4,245" },
      { name: "MacBook Pro 16\u2033", spec: "M5 Pro・24GB・1TB", price: 99900, sale: 94905, note: "現折 4,995" },
      { name: "MacBook Pro 16\u2033", spec: "M5 Pro・48GB・1TB", price: 120900, sale: 114855, note: "現折 6,045" },
    ],
  },
  {
    category: "iPad",
    items: [
      { name: "iPad", spec: "128GB・Wi-Fi", price: 14900, sale: 14308, note: "現折 592", gifts: ["加贈市價 980 元保護套"] },
      { name: "iPad", spec: "256GB・Wi-Fi", price: 18400, sale: 17528, note: "現折 872", gifts: ["加贈市價 980 元保護套"] },
      { name: "iPad", spec: "512GB・Wi-Fi", price: 25400, sale: 23968, note: "現折 1,432", gifts: ["加贈市價 980 元保護套"] },
      { name: "iPad mini", spec: "128GB・Wi-Fi", price: 19900, sale: 18905, note: "現折 995" },
      { name: "iPad mini", spec: "256GB・Wi-Fi", price: 23400, sale: 22230, note: "現折 1,170" },
      { name: "iPad mini", spec: "512GB・Wi-Fi", price: 30400, sale: 28880, note: "現折 1,520" },
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
      { name: "Apple Watch Ultra 3", spec: "49mm・鈦金屬米蘭錶環款", price: 29900, sale: 27508, note: "現折 2,392" },
    ],
  },
  {
    category: "AirPods",
    items: [
      { name: "AirPods 4", spec: "標準款", price: 4490, sale: 3990, note: "現折 500" },
      { name: "AirPods 4", spec: "主動式降噪", price: 5990, sale: 5390, note: "現折 600" },
      { name: "AirPods Pro 3", spec: "主動式降噪", price: 7490, sale: 6690, note: "現折 800" },
      { name: "AirPods Max 2", spec: "耳罩式", price: 17990, sale: 17091, note: "現折 899" },
    ],
  },
];
