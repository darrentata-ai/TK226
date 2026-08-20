// ============================================================
// 大專院校教育優惠 — 資料
// 教育價來自「大專院校優惠操作手冊」，加碼好禮來自「Back to School」檔期。
// 之後換檔期一樣：把兩份 PDF 內容告訴 Claude，重新產生這個檔案即可。
// 欄位說明同 data-promo.js，price 為定價（會員價），edu 為教育價。
// ============================================================
const PAGE_META = {
  title: "教育優惠",
  eyebrow: "學生 / 教職員限定 · Back to School",
  heading: "大專院校教育價 + 加碼好禮",
  desc: "點選價格卡，即可看到教育價詳情與開學加碼好禮。需出示有效學生 / 教職員證件現場核章購買，實際庫存、顏色及價格均以門市公告為準。",
  meta: [["對象", "大專院校學生・教職員"], ["範圍", "MacBook Air・MacBook Pro・iPad Air・iPad Pro"]],
  accent: "teal",
};

const PRODUCTS = [
  {
    category: "Mac",
    items: [
      { name: "MacBook Air 13\u2033", spec: "M5・16GB・512GB", price: 42900, edu: 39590, gifts: ["開學加碼送市價 6,869 元好禮"] },
      { name: "MacBook Air 15\u2033", spec: "M5・16GB・512GB", price: 49900, edu: 46590, gifts: ["開學加碼送市價 6,969 元好禮"] },
      { name: "MacBook Pro 14\u2033", spec: "M5・16GB・1TB", price: 64900, edu: 61690 },
      { name: "MacBook Pro 14\u2033", spec: "M5・24GB・1TB", price: 71900, edu: 68690 },
      { name: "MacBook Pro 14\u2033", spec: "M5・32GB・1TB", price: 78900, edu: 75690 },
      { name: "MacBook Pro 14\u2033", spec: "M5 Pro・24GB・1TB", price: 84900, edu: 79790 },
      { name: "MacBook Pro 16\u2033", spec: "M5 Pro・24GB・1TB", price: 99900, edu: 93190, gifts: ["開學加碼送市價 5,990 元 AirPods 4（主動式降噪）"] },
      { name: "MacBook Pro 16\u2033", spec: "M5 Pro・48GB・1TB", price: 120900, edu: 114190, gifts: ["開學加碼送市價 5,990 元 AirPods 4（主動式降噪）"] },
    ],
  },
  {
    category: "iPad",
    items: [
      { name: "iPad Air 11\u2033", spec: "M4・128GB・Wi-Fi", price: 24900, edu: 23200, gifts: ["開學加碼送市價 4,440 元好禮"] },
      { name: "iPad Air 11\u2033", spec: "M4・256GB・Wi-Fi", price: 28400, edu: 26700, gifts: ["開學加碼送市價 4,440 元好禮"] },
      { name: "iPad Air 11\u2033", spec: "M4・512GB・Wi-Fi", price: 35400, edu: 33700, gifts: ["開學加碼送市價 4,440 元好禮"] },
      { name: "iPad Air 13\u2033", spec: "M4・128GB・Wi-Fi", price: 31900, edu: 30200, gifts: ["開學加碼送市價 4,939 元好禮"] },
      { name: "iPad Air 13\u2033", spec: "M4・256GB・Wi-Fi", price: 35400, edu: 33700, gifts: ["開學加碼送市價 4,939 元好禮"] },
      { name: "iPad Air 13\u2033", spec: "M4・512GB・Wi-Fi", price: 42400, edu: 40700, gifts: ["開學加碼送市價 4,939 元好禮"] },
      { name: "iPad Pro 11\u2033", spec: "M5・256GB・Wi-Fi", price: 39900, edu: 36600, gifts: ["開學加碼送市價 5,850 元好禮"] },
      { name: "iPad Pro 11\u2033", spec: "M5・512GB・Wi-Fi", price: 46900, edu: 43600, gifts: ["開學加碼送市價 5,850 元好禮"] },
      { name: "iPad Pro 13\u2033", spec: "M5・256GB・Wi-Fi", price: 50900, edu: 47500, gifts: ["開學加碼送市價 5,950 元好禮"] },
      { name: "iPad Pro 13\u2033", spec: "M5・512GB・Wi-Fi", price: 57900, edu: 54500, gifts: ["開學加碼送市價 5,950 元好禮"] },
    ],
  },
];
