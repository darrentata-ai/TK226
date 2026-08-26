// ============================================================
// 72小時激安限購 檔期 — 一般促銷資料（8/28–8/30）
// 折扣方式改成「定價 × 折扣％」，％數來自門市活動公告，
// 換算後金額有小數一律無條件進位。
// 之後換檔期只要把新內容告訴 Claude，重新產生這個檔案即可，
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
  title: "72小時激安限購",
  eyebrow: "72小時激安限購 · 2026/08/28–08/30",
  heading: "iPhone / Mac / iPad 全面激安價",
  desc: "點選價格卡，即可看到完整優惠詳情。客訂商品依訂購順序出貨、無交貨日期；每人每卡限購 2 台，恕不接受大宗採購。",
  meta: [],
  accent: "amber",
};

const PRODUCTS = [
  {
    category: "iPhone",
    items: [
      { name: "iPhone 17e", spec: "256GB", price: 21900, sale: 20586, note: "現折 6%" },
      { name: "iPhone 17e", spec: "512GB", price: 28900, sale: 27166, note: "現折 6%" },
      { name: "iPhone 17", spec: "256GB", price: 29900, sale: 28704, note: "現折 4%", gifts: ["限現貨，暫不開放預訂"] },
      { name: "iPhone 17", spec: "512GB", price: 36900, sale: 35424, note: "現折 4%", gifts: ["限現貨，暫不開放預訂"] },
      { name: "iPhone Air", spec: "512GB", price: 43900, sale: 40388, note: "現折 8%" },
      { name: "iPhone 17 Pro", spec: "256GB", price: 39900, sale: 38304, note: "現折 4%" },
      { name: "iPhone 17 Pro", spec: "512GB", price: 46900, sale: 45024, note: "現折 4%" },
      { name: "iPhone 17 Pro Max", spec: "256GB", price: 44900, sale: 43104, note: "現折 4%" },
      { name: "iPhone 17 Pro Max", spec: "512GB", price: 51900, sale: 49824, note: "現折 4%" },
    ],
  },
  {
    category: "Mac",
    items: [
      { name: "MacBook Air 13\u2033", spec: "M5・16GB・512GB", price: 42900, sale: 41184, note: "現折 4%" },
      { name: "MacBook Air 15\u2033", spec: "M5・16GB・512GB", price: 49900, sale: 47904, note: "現折 4%" },
      { name: "MacBook Neo 13\u2033", spec: "A18 Pro・8GB・256GB", price: 22900, gifts: ["消費滿萬元贈 500 元配件金"] },
      { name: "MacBook Neo 13\u2033", spec: "A18 Pro・8GB・512GB", price: 25900, gifts: ["消費滿萬元贈 500 元配件金"] },
      { name: "iMac 24\u2033", spec: "M4・8CPU・8GPU・16GB・256GB", price: 49900, sale: 46906, note: "現折 6%" },
      { name: "Mac mini", spec: "M4・10CPU・10GPU・16GB・512GB", price: 33900, sale: 32544, note: "現折 4%", gifts: ["限現貨款式"] },
      { name: "MacBook Pro 14\u2033", spec: "M5・16GB・1TB", price: 64900, sale: 60357, note: "現折 7%" },
      { name: "MacBook Pro 14\u2033", spec: "M5・24GB・1TB", price: 71900, sale: 66867, note: "現折 7%" },
      { name: "MacBook Pro 14\u2033", spec: "M5・32GB・1TB", price: 78900, sale: 73377, note: "現折 7%" },
      { name: "MacBook Pro 14\u2033", spec: "M5 Pro・24GB・1TB", price: 84900, sale: 78957, note: "現折 7%" },
      { name: "MacBook Pro 16\u2033", spec: "M5 Pro・24GB・1TB", price: 99900, sale: 92907, note: "現折 7%" },
      { name: "MacBook Pro 16\u2033", spec: "M5 Pro・48GB・1TB", price: 120900, sale: 112437, note: "現折 7%" },
    ],
  },
  {
    category: "iPad",
    items: [
      { name: "iPad", spec: "128GB・Wi-Fi", price: 14900, sale: 13708, note: "現折 8%" },
      { name: "iPad", spec: "256GB・Wi-Fi", price: 18400, sale: 16928, note: "現折 8%" },
      { name: "iPad", spec: "512GB・Wi-Fi", price: 25400, sale: 23368, note: "現折 8%" },
      { name: "iPad mini", spec: "128GB・Wi-Fi", price: 19900, sale: 18507, note: "現折 7%" },
      { name: "iPad mini", spec: "256GB・Wi-Fi", price: 23400, sale: 21762, note: "現折 7%" },
      { name: "iPad mini", spec: "512GB・Wi-Fi", price: 30400, sale: 28272, note: "現折 7%" },
      { name: "iPad Air 11\u2033", spec: "M4・128GB・Wi-Fi", price: 24900, sale: 22908, note: "現折 8%" },
      { name: "iPad Air 11\u2033", spec: "M4・256GB・Wi-Fi", price: 28400, sale: 26128, note: "現折 8%" },
      { name: "iPad Air 11\u2033", spec: "M4・512GB・Wi-Fi", price: 35400, sale: 32568, note: "現折 8%" },
      { name: "iPad Air 13\u2033", spec: "M4・128GB・Wi-Fi", price: 31900, sale: 29348, note: "現折 8%" },
      { name: "iPad Air 13\u2033", spec: "M4・256GB・Wi-Fi", price: 35400, sale: 32568, note: "現折 8%" },
      { name: "iPad Air 13\u2033", spec: "M4・512GB・Wi-Fi", price: 42400, sale: 39008, note: "現折 8%" },
      { name: "iPad Pro 11\u2033", spec: "M5・256GB・Wi-Fi", price: 39900, sale: 36309, note: "現折 9%" },
      { name: "iPad Pro 11\u2033", spec: "M5・512GB・Wi-Fi", price: 46900, sale: 42679, note: "現折 9%" },
      { name: "iPad Pro 13\u2033", spec: "M5・256GB・Wi-Fi", price: 50900, sale: 46319, note: "現折 9%" },
      { name: "iPad Pro 13\u2033", spec: "M5・512GB・Wi-Fi", price: 57900, sale: 52689, note: "現折 9%" },
    ],
  },
  {
    category: "Apple Watch",
    items: [
      { name: "Apple Watch SE 3", spec: "40mm・GPS", price: 7900, sale: 7268, note: "現折 8%" },
      { name: "Apple Watch SE 3", spec: "44mm・GPS", price: 8900, sale: 8188, note: "現折 8%" },
      { name: "Apple Watch S11", spec: "42mm・GPS", price: 12900, sale: 11868, note: "現折 8%" },
      { name: "Apple Watch S11", spec: "46mm・GPS", price: 13900, sale: 12788, note: "現折 8%" },
      { name: "Apple Watch Ultra 3", spec: "49mm・鈦金屬", price: 26900, sale: 24479, note: "現折 9%" },
    ],
  },
  {
    category: "AirPods",
    items: [
      { name: "AirPods 4", spec: "標準款", price: 4490, sale: 3980, note: "限購價" },
      { name: "AirPods 4", spec: "主動式降噪", price: 5990, sale: 5280, note: "限購價" },
      { name: "AirPods Pro 3", spec: "主動式降噪", price: 7490, sale: 6590, note: "限購價" },
    ],
  },
];
