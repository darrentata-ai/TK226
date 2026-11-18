// ============================================================
// 1117 檔期 — 一般促銷資料（11/17–12/6）
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
  eyebrow: "限時優惠 · 2026/11/17–12/06",
  heading: "iPhone / Mac / iPad 全面現折",
  desc: "點選價格卡，即可看到完整優惠詳情與加碼好禮。實際庫存、顏色及價格均以門市公告為準。",
  meta: [],
  accent: "amber",
};

const PRODUCTS = [
  {
    category: "iPhone",
    items: [
      { name: "iPhone 18 Pro", spec: "256GB", price: 44900, sale: 43993, note: "現折 907", gifts: ["加贈市價 990 元保護貼"] },
      { name: "iPhone 18 Pro", spec: "512GB", price: 51900, sale: 50783, note: "現折 1,117", gifts: ["加贈市價 990 元保護貼"] },
      { name: "iPhone 18 Pro Max", spec: "256GB", price: 49900, sale: 48993, note: "現折 907", gifts: ["加贈市價 1,290 元保護貼"] },
      { name: "iPhone 18 Pro Max", spec: "512GB", price: 56900, sale: 55783, note: "現折 1,117", gifts: ["加贈市價 1,290 元保護貼"] },
      { name: "iPhone Duo", spec: "256GB", price: 74900, gifts: ["新機上市", "消費滿萬元贈 200 元配件金"] },
      { name: "iPhone Duo", spec: "512GB", price: 81900, gifts: ["新機上市", "消費滿萬元贈 200 元配件金"] },
      { name: "iPhone 17e", spec: "256GB", price: 25900, sale: 24864, note: "現折 1,036" },
      { name: "iPhone 17e", spec: "512GB", price: 32900, sale: 31584, note: "現折 1,316" },
      { name: "iPhone 17", spec: "256GB", price: 32900, sale: 31092, note: "現折 1,808", gifts: ["加贈市價 650 元充電器"] },
      { name: "iPhone 17", spec: "512GB", price: 39900, sale: 37637, note: "現折 2,263", gifts: ["加贈市價 650 元充電器"] },
      { name: "iPhone 17 Pro", spec: "256GB", price: 39900, sale: 38304, note: "現折 1,596", gifts: ["現有庫存售完為止"] },
      { name: "iPhone 17 Pro Max", spec: "256GB", price: 44900, sale: 43104, note: "現折 1,796", gifts: ["現有庫存售完為止"] },
      { name: "iPhone 17 Pro Max", spec: "512GB", price: 51900, sale: 49824, note: "現折 2,076", gifts: ["現有庫存售完為止"] },
    ],
  },
  {
    category: "Mac",
    items: [
      { name: "MacBook Air 13″", spec: "M5・16GB・512GB", price: 42900, gifts: ["消費滿萬元贈 400 元配件金"] },
      { name: "MacBook Air 15″", spec: "M5・16GB・512GB", price: 49900, sale: 46906, note: "現折 2,994" },
      { name: "MacBook Neo 13″", spec: "A18 Pro・8GB・256GB", price: 23900, sale: 22227, note: "現折 1,673" },
      { name: "MacBook Neo 13″", spec: "A18 Pro・8GB・512GB", price: 26900, sale: 25017, note: "現折 1,883" },
      { name: "iMac 24″", spec: "M6・10CPU・10GPU・16GB・256GB", price: 49900, gifts: ["消費滿萬元贈 300 元配件金"] },
      { name: "Mac mini", spec: "M6・12CPU・12GPU・16GB・256GB", price: 29900, sale: 28106, note: "現折 1,794" },
      { name: "Mac mini", spec: "M6・12CPU・12GPU・16GB・512GB", price: 36900, sale: 34686, note: "現折 2,214" },
      { name: "Mac mini", spec: "M6・12CPU・12GPU・24GB・512GB", price: 43900, sale: 41266, note: "現折 2,634" },
      { name: "Mac mini", spec: "M5 Pro・15CPU・16GPU・24GB・512GB", price: 59900, sale: 56306, note: "現折 3,594" },
      { name: "MacBook Pro 14″", spec: "M6・16GB・1TB", price: 64900, gifts: ["消費滿萬元贈 300 元配件金"] },
      { name: "MacBook Pro 14″", spec: "M6・24GB・1TB", price: 71900, gifts: ["消費滿萬元贈 300 元配件金"] },
      { name: "MacBook Pro 14″", spec: "M6・32GB・1TB", price: 78900, gifts: ["消費滿萬元贈 300 元配件金"] },
      { name: "MacBook Pro 14″ Pro LED XDR", spec: "M5 Pro・24GB・1TB", price: 97900, gifts: ["消費滿萬元贈 200 元配件金"] },
      { name: "MacBook Pro 14″ Pro LED XDR", spec: "M5 Pro・48GB・1TB", price: 125900, gifts: ["消費滿萬元贈 200 元配件金"] },
      { name: "MacBook Pro 16″ Pro LED XDR", spec: "M5 Pro・24GB・1TB", price: 114900, gifts: ["消費滿萬元贈 200 元配件金"] },
      { name: "MacBook Pro 16″ Pro LED XDR", spec: "M5 Pro・48GB・1TB", price: 135900, gifts: ["消費滿萬元贈 200 元配件金"] },
    ],
  },
  {
    category: "iPad",
    items: [
      { name: "iPad", spec: "128GB・Wi-Fi", price: 14900, sale: 13964, note: "現折 936", gifts: ["加贈市價 790 元保護貼"] },
      { name: "iPad", spec: "256GB・Wi-Fi", price: 18400, sale: 17166, note: "現折 1,234", gifts: ["加贈市價 790 元保護貼"] },
      { name: "iPad", spec: "512GB・Wi-Fi", price: 25400, sale: 23571, note: "現折 1,829", gifts: ["加贈市價 790 元保護貼"] },
      { name: "iPad Air 11″", spec: "M4・128GB・Wi-Fi", price: 24900, sale: 22908, note: "現折 1,992" },
      { name: "iPad Air 11″", spec: "M4・256GB・Wi-Fi", price: 28400, sale: 26128, note: "現折 2,272" },
      { name: "iPad Air 11″", spec: "M4・512GB・Wi-Fi", price: 35400, sale: 32568, note: "現折 2,832" },
      { name: "iPad Air 13″", spec: "M4・128GB・Wi-Fi", price: 31900, sale: 29348, note: "現折 2,552" },
      { name: "iPad Air 13″", spec: "M4・256GB・Wi-Fi", price: 35400, sale: 32568, note: "現折 2,832" },
      { name: "iPad Air 13″", spec: "M4・512GB・Wi-Fi", price: 42400, sale: 39008, note: "現折 3,392" },
      { name: "iPad Pro 11″", spec: "M5・256GB・Wi-Fi", price: 39900, sale: 36708, note: "現折 3,192" },
      { name: "iPad Pro 11″", spec: "M5・512GB・Wi-Fi", price: 46900, sale: 43148, note: "現折 3,752" },
      { name: "iPad Pro 13″", spec: "M5・256GB・Wi-Fi", price: 50900, sale: 46828, note: "現折 4,072" },
      { name: "iPad Pro 13″", spec: "M5・512GB・Wi-Fi", price: 57900, sale: 53268, note: "現折 4,632" },
    ],
  },
  {
    category: "Apple Watch",
    items: [
      { name: "Apple Watch SE 3", spec: "40mm・GPS", price: 7900, sale: 7505, note: "現折 395" },
      { name: "Apple Watch SE 3", spec: "44mm・GPS", price: 8900, sale: 8455, note: "現折 445" },
      { name: "Apple Watch S12", spec: "42mm・GPS", price: 13900, sale: 13344, note: "現折 556" },
      { name: "Apple Watch S12", spec: "46mm・GPS", price: 15400, sale: 14784, note: "現折 616" },
      { name: "Apple Watch Ultra 4", spec: "49mm・鈦金屬", price: 27900, sale: 26784, note: "現折 1,116" },
    ],
  },
  {
    category: "AirPods",
    items: [
      { name: "AirPods 5", spec: "標準款", price: 4490, sale: 4190, note: "現折 300" },
      { name: "AirPods 5", spec: "無線充電盒", price: 5190, sale: 4890, note: "現折 300" },
      { name: "AirPods Pro 3", spec: "主動式降噪", price: 7490, sale: 6690, note: "現折 800" },
    ],
  },
];
