// ============================================================
// 1106 檔期 — 一般促銷資料（11/6–11/16）
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
  eyebrow: "限時優惠 · 2026/11/06–11/16",
  heading: "iPhone / Mac / iPad 全面現折",
  desc: "點選價格卡，即可看到完整優惠詳情與加碼好禮。實際庫存、顏色及價格均以門市公告為準。",
  meta: [],
  accent: "amber",
};

const PRODUCTS = [
  {
    category: "iPhone",
    items: [
      { name: "iPhone 18 Pro", spec: "256GB", price: 44900, sale: 43900, note: "現折 1,000", gifts: ["加贈市價 1,280 元 UAG 保護殼"] },
      { name: "iPhone 18 Pro", spec: "512GB", price: 51900, sale: 50674, note: "現折 1,226", gifts: ["加贈市價 1,280 元 UAG 保護殼"] },
      { name: "iPhone 18 Pro Max", spec: "256GB", price: 49900, sale: 48873, note: "現折 1,027", gifts: ["加贈市價 790 元保護貼"] },
      { name: "iPhone 18 Pro Max", spec: "512GB", price: 56900, sale: 55663, note: "現折 1,237", gifts: ["加贈市價 790 元保護貼"] },
      { name: "iPhone Duo", spec: "256GB", price: 74900, gifts: ["新機上市", "消費滿萬元贈 200 元配件金"] },
      { name: "iPhone Duo", spec: "512GB", price: 81900, gifts: ["新機上市", "消費滿萬元贈 200 元配件金"] },
      { name: "iPhone 17e", spec: "256GB", price: 25900, sale: 24605, note: "現折 1,295" },
      { name: "iPhone 17e", spec: "512GB", price: 32900, sale: 31255, note: "現折 1,645" },
      { name: "iPhone 17", spec: "256GB", price: 32900, sale: 31037, note: "現折 1,863", gifts: ["加贈市價 990 元保護貼"] },
      { name: "iPhone 17", spec: "512GB", price: 39900, sale: 37547, note: "現折 2,353", gifts: ["加贈市價 990 元保護貼"] },
      { name: "iPhone 17 Pro", spec: "256GB", price: 39900, sale: 38304, note: "現折 1,596", gifts: ["現有庫存售完為止"] },
      { name: "iPhone 17 Pro Max", spec: "256GB", price: 44900, sale: 43104, note: "現折 1,796", gifts: ["現有庫存售完為止"] },
      { name: "iPhone 17 Pro Max", spec: "512GB", price: 51900, sale: 49824, note: "現折 2,076", gifts: ["現有庫存售完為止"] },
    ],
  },
  {
    category: "Mac",
    items: [
      { name: "MacBook Air 13″", spec: "M5・16GB・512GB", price: 42900, gifts: ["消費滿萬元贈 500 元配件金"] },
      { name: "MacBook Air 15″", spec: "M5・16GB・512GB", price: 49900, sale: 46407, note: "現折 3,493" },
      { name: "MacBook Neo 13″", spec: "A18 Pro・8GB・256GB", price: 23900, sale: 21988, note: "現折 1,912" },
      { name: "MacBook Neo 13″", spec: "A18 Pro・8GB・512GB", price: 26900, sale: 24748, note: "現折 2,152" },
      { name: "iMac 24″", spec: "M6・10CPU・10GPU・16GB・256GB", price: 49900, gifts: ["新機上市", "消費滿萬元贈 300 元配件金"] },
      { name: "Mac mini", spec: "M6・12CPU・12GPU・16GB・256GB", price: 29900, sale: 28900, note: "現折 1,000", gifts: ["加贈市價 1,880 元 Hub"] },
      { name: "Mac mini", spec: "M6・12CPU・12GPU・16GB・512GB", price: 36900, sale: 35367, note: "現折 1,533", gifts: ["加贈市價 1,880 元 Hub"] },
      { name: "Mac mini", spec: "M6・12CPU・12GPU・24GB・512GB", price: 43900, sale: 41877, note: "現折 2,023", gifts: ["加贈市價 1,880 元 Hub"] },
      { name: "Mac mini", spec: "M5 Pro・15CPU・16GPU・24GB・512GB", price: 59900, sale: 56757, note: "現折 3,143", gifts: ["加贈市價 1,880 元 Hub"] },
      { name: "MacBook Pro 14″", spec: "M6・16GB・1TB", price: 64900, gifts: ["新機上市", "消費滿萬元贈 300 元配件金"] },
      { name: "MacBook Pro 14″", spec: "M6・24GB・1TB", price: 71900, gifts: ["新機上市", "消費滿萬元贈 300 元配件金"] },
      { name: "MacBook Pro 14″", spec: "M6・32GB・1TB", price: 78900, gifts: ["新機上市", "消費滿萬元贈 300 元配件金"] },
      { name: "MacBook Pro 14″ Pro LED XDR", spec: "M5 Pro・24GB・1TB", price: 97900, gifts: ["消費滿萬元贈 200 元配件金"] },
      { name: "MacBook Pro 14″ Pro LED XDR", spec: "M5 Pro・48GB・1TB", price: 125900, gifts: ["消費滿萬元贈 200 元配件金"] },
      { name: "MacBook Pro 16″ Pro LED XDR", spec: "M5 Pro・24GB・1TB", price: 114900, gifts: ["消費滿萬元贈 200 元配件金"] },
      { name: "MacBook Pro 16″ Pro LED XDR", spec: "M5 Pro・48GB・1TB", price: 135900, gifts: ["消費滿萬元贈 200 元配件金"] },
    ],
  },
  {
    category: "iPad",
    items: [
      { name: "iPad", spec: "128GB・Wi-Fi", price: 14900, sale: 13708, note: "現折 1,192" },
      { name: "iPad", spec: "256GB・Wi-Fi", price: 18400, sale: 16928, note: "現折 1,472" },
      { name: "iPad", spec: "512GB・Wi-Fi", price: 25400, sale: 23368, note: "現折 2,032" },
      { name: "iPad Air 11″", spec: "M4・128GB・Wi-Fi", price: 24900, sale: 22659, note: "現折 2,241" },
      { name: "iPad Air 11″", spec: "M4・256GB・Wi-Fi", price: 28400, sale: 25844, note: "現折 2,556" },
      { name: "iPad Air 11″", spec: "M4・512GB・Wi-Fi", price: 35400, sale: 32214, note: "現折 3,186" },
      { name: "iPad Air 13″", spec: "M4・128GB・Wi-Fi", price: 31900, sale: 29029, note: "現折 2,871" },
      { name: "iPad Air 13″", spec: "M4・256GB・Wi-Fi", price: 35400, sale: 32214, note: "現折 3,186" },
      { name: "iPad Air 13″", spec: "M4・512GB・Wi-Fi", price: 42400, sale: 38584, note: "現折 3,816" },
      { name: "iPad Pro 11″", spec: "M5・256GB・Wi-Fi", price: 39900, sale: 36309, note: "現折 3,591" },
      { name: "iPad Pro 11″", spec: "M5・512GB・Wi-Fi", price: 46900, sale: 42679, note: "現折 4,221" },
      { name: "iPad Pro 13″", spec: "M5・256GB・Wi-Fi", price: 50900, sale: 46319, note: "現折 4,581" },
      { name: "iPad Pro 13″", spec: "M5・512GB・Wi-Fi", price: 57900, sale: 52689, note: "現折 5,211" },
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
      { name: "AirPods Pro 3", spec: "主動式降噪", price: 7490, sale: 6590, note: "現折 900" },
    ],
  },
];
