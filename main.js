(function () {
  const root = document.documentElement;
  const accentMap = {
    amber: { c: "#E8A23D", d: "#C97F1E" },
    teal: { c: "#0F4C4F", d: "#0A3638" },
  };
  const accent = accentMap[PAGE_META.accent] || accentMap.amber;
  root.style.setProperty("--accent", accent.c);
  root.style.setProperty("--accent-deep", accent.d);

  // ---- header / footer links ----
  document.querySelectorAll("[data-line-url]").forEach((el) => (el.href = STORE_CONFIG.lineUrl));
  document.querySelectorAll("[data-fb-url]").forEach((el) => (el.href = STORE_CONFIG.fbUrl));
  document.querySelectorAll("[data-map-url]").forEach((el) => (el.href = STORE_CONFIG.mapUrl));
  document.querySelectorAll("[data-store-name]").forEach((el) => (el.textContent = STORE_CONFIG.storeName));

  // ---- hero ----
  document.getElementById("hero-eyebrow").textContent = PAGE_META.eyebrow;
  document.getElementById("hero-heading").textContent = PAGE_META.heading;
  document.getElementById("hero-desc").textContent = PAGE_META.desc;
  const metaWrap = document.getElementById("hero-meta");
  if (!PAGE_META.meta || PAGE_META.meta.length === 0) {
    metaWrap.style.display = "none";
  } else {
    PAGE_META.meta.forEach(([label, val]) => {
      const span = document.createElement("span");
      span.innerHTML = `${label} <b>${val}</b>`;
      metaWrap.appendChild(span);
    });
  }
  document.title = `${PAGE_META.title} | ${STORE_CONFIG.storeName}`;

  // ---- tabs ----
  const tabsWrap = document.getElementById("tabs");
  const categories = ["全部", ...PRODUCTS.map((p) => p.category)];
  categories.forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.className = "tab-btn" + (i === 0 ? " active" : "");
    btn.textContent = cat;
    btn.dataset.cat = cat;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".grid-section [data-section]").forEach((sec) => {
        sec.style.display = cat === "全部" || sec.dataset.section === cat ? "" : "none";
      });
    });
    tabsWrap.appendChild(btn);
  });

  // ---- grid ----
  const gridSection = document.getElementById("grid-section");
  const fmt = (n) => n.toLocaleString("en-US");

  PRODUCTS.forEach((group) => {
    const sectionEl = document.createElement("div");
    sectionEl.dataset.section = group.category;

    const titleEl = document.createElement("div");
    titleEl.className = "section-title";
    titleEl.innerHTML = `<h2>${group.category}</h2><span>${group.items.length} 款</span>`;
    sectionEl.appendChild(titleEl);

    const gridEl = document.createElement("div");
    gridEl.className = "grid";

    group.items.forEach((item) => {
      const finalPrice = item.sale ?? item.edu ?? item.price;
      const hasDiscount = finalPrice !== item.price;
      const isEdu = item.edu !== undefined;

      const card = document.createElement("button");
      card.className = "ticket";
      card.type = "button";

      const badges = [];
      if (item.note) badges.push(`<span class="badge promo">${item.note}</span>`);
      if (isEdu) badges.push(`<span class="badge edu">教育價</span>`);
      if (item.gifts && item.gifts.length) badges.push(`<span class="badge gift">好禮</span>`);

      card.innerHTML = `
        <div class="badges">${badges.join("")}</div>
        <h3>${item.name}</h3>
        <div class="spec">${item.spec}</div>
        <div class="perf"></div>
        <div class="price-row">
          <div>
            ${hasDiscount ? `<div class="price-was mono">定價 NT$${fmt(item.price)}</div>` : ""}
            <div class="price-now mono ${isEdu ? "on-edu" : hasDiscount ? "on-sale" : ""}">NT$${fmt(finalPrice)}</div>
          </div>
          <div class="tap-hint">詳情 ›</div>
        </div>
      `;
      card.addEventListener("click", () => openModal(item, finalPrice, isEdu));
      gridEl.appendChild(card);
    });

    sectionEl.appendChild(gridEl);
    gridSection.appendChild(sectionEl);
  });

  // ---- modal ----
  const overlay = document.getElementById("modal-overlay");
  const modalBody = document.getElementById("modal-body");

  function openModal(item, finalPrice, isEdu) {
    const hasDiscount = finalPrice !== item.price;
    modalBody.innerHTML = `
      <div class="modal-top">
        <div>
          <h3>${item.name}</h3>
          <div class="spec">${item.spec}</div>
        </div>
        <button class="modal-close" aria-label="關閉">✕</button>
      </div>
      <div class="modal-price-block">
        <div class="row"><span class="label">定價</span><span class="val ${hasDiscount ? "strike" : ""} mono">NT$${fmt(item.price)}</span></div>
        ${
          hasDiscount
            ? `<div class="row"><span class="label">${isEdu ? "教育價" : "促銷價"}${item.note ? "（" + item.note + "）" : ""}</span><span class="val final ${isEdu ? "edu" : ""} mono">NT$${fmt(finalPrice)}</span></div>`
            : ""
        }
      </div>
      ${
        item.gifts && item.gifts.length
          ? `<ul class="perk-list">${item.gifts
              .map(
                (g) =>
                  `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12v9H4v-9M2 7h20v5H2V7zM12 22V7M12 7C10 3 6 3 6 5.5S9 8 12 7zM12 7c2-4 6-4 6-1.5S15 8 12 7z"/></svg><span>${g}</span></li>`
              )
              .join("")}</ul>`
          : `<p style="color:var(--ink-soft); font-size:13.5px; margin:0 0 18px;">目前無加碼贈品，以定價/${isEdu ? "教育價" : "促銷價"}供應。</p>`
      }
      <div class="modal-cta">
        <a class="cta-line" data-line-url href="${STORE_CONFIG.lineUrl}" target="_blank" rel="noopener">加 LINE@ 問庫存</a>
        <a class="cta-fb" data-fb-url href="${STORE_CONFIG.fbUrl}" target="_blank" rel="noopener">粉專私訊</a>
      </div>
    `;
    modalBody.querySelector(".modal-close").addEventListener("click", closeModal);
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
})();
