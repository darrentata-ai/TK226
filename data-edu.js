// ============================================================
// 大專院校教育優惠 — 資料（依 2026/11/07 大專院校優惠操作手冊 Ver8.9.3 更新）
// 教育價來自「大專院校優惠操作手冊」。Back to School 開學季加碼已結束，
// 這次手冊沒有附加碼好禮資訊，故本期不顯示 gifts。
// 之後換檔期一樣：把新版手冊內容告訴 Claude，重新產生這個檔案即可。
// 欄位說明同 data-promo.js，price 為定價（會員價），edu 為教育價。
// ============================================================
const PAGE_META = {
  title: "教育優惠",
  eyebrow: "學生 / 教職員限定",
  heading: "大專院校教育價",
  desc: "點選價格卡，即可看到教育價詳情。需出示有效學生 / 教職員證件現場核章購買，實際庫存、顏色及價格均以門市公告為準。",
  meta: [["對象", "大專院校學生・教職員"], ["範圍", "Mac・iPad"]],
  accent: "teal",
};

const PRODUCTS = [
  {
    category: "Mac",
    items: [
      { name: "MacBook Air 13″", spec: "M5・16GB・512GB", price: 42900, edu: 39590 },
      { name: "MacBook Air 15″", spec: "M5・16GB・512GB", price: 49900, edu: 46590 },
      { name: "MacBook Neo 13″", spec: "A18 Pro・8GB・256GB", price: 23900, edu: 21900 },
      { name: "MacBook Neo 13″", spec: "A18 Pro・8GB・512GB", price: 26900, edu: 24900 },
      { name: "iMac 24″", spec: "M6・10CPU・10GPU・16GB・256GB", price: 49900, edu: 47900 },
      { name: "Mac mini", spec: "M6・12CPU・12GPU・16GB・256GB", price: 29900, edu: 26590 },
      { name: "Mac mini", spec: "M6・12CPU・12GPU・16GB・512GB", price: 36900, edu: 33590 },
      { name: "Mac mini", spec: "M6・12CPU・12GPU・24GB・512GB", price: 43900, edu: 40590 },
      { name: "Mac mini", spec: "M5 Pro・15CPU・16GPU・24GB・512GB", price: 59900, edu: 56390 },
      { name: "MacBook Pro 14″", spec: "M6・16GB・1TB", price: 64900, edu: 61900 },
      { name: "MacBook Pro 14″", spec: "M6・24GB・1TB", price: 71900, edu: 68900 },
      { name: "MacBook Pro 14″", spec: "M6・32GB・1TB", price: 78900, edu: 75900 },
      { name: "MacBook Pro 14″ Pro LED XDR", spec: "M5 Pro・24GB・1TB", price: 97900, edu: 92900 },
      { name: "MacBook Pro 14″ Pro LED XDR", spec: "M5 Pro・48GB・1TB", price: 125900, edu: 118800 },
      { name: "MacBook Pro 16″ Pro LED XDR", spec: "M5 Pro・24GB・1TB", price: 114900, edu: 107900 },
      { name: "MacBook Pro 16″ Pro LED XDR", spec: "M5 Pro・48GB・1TB", price: 135900, edu: 128900 },
    ],
  },
  {
    category: "iPad",
    items: [
      { name: "iPad", spec: "128GB・Wi-Fi", price: 14900, edu: 14200 },
      { name: "iPad", spec: "256GB・Wi-Fi", price: 18400, edu: 17700 },
      { name: "iPad", spec: "512GB・Wi-Fi", price: 25400, edu: 24700 },
      { name: "iPad Air 11″", spec: "M4・128GB・Wi-Fi", price: 24900, edu: 23200 },
      { name: "iPad Air 11″", spec: "M4・256GB・Wi-Fi", price: 28400, edu: 26700 },
      { name: "iPad Air 11″", spec: "M4・512GB・Wi-Fi", price: 35400, edu: 33700 },
      { name: "iPad Air 13″", spec: "M4・128GB・Wi-Fi", price: 31900, edu: 30200 },
      { name: "iPad Air 13″", spec: "M4・256GB・Wi-Fi", price: 35400, edu: 33700 },
      { name: "iPad Air 13″", spec: "M4・512GB・Wi-Fi", price: 42400, edu: 40700 },
      { name: "iPad Pro 11″", spec: "M5・256GB・Wi-Fi", price: 39900, edu: 36600 },
      { name: "iPad Pro 11″", spec: "M5・512GB・Wi-Fi", price: 46900, edu: 43600 },
      { name: "iPad Pro 13″", spec: "M5・256GB・Wi-Fi", price: 50900, edu: 47500 },
      { name: "iPad Pro 13″", spec: "M5・512GB・Wi-Fi", price: 57900, edu: 54500 },
    ],
  },
];
