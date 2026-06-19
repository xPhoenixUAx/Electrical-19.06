(function () {
  const config = window.SITE_CONFIG || {};
  const services = window.SERVICES || [];
  const body = document.body;
  const root = body.dataset.root || "";
  const page = body.dataset.page || "";

  const bySlug = Object.fromEntries(services.map((service) => [service.slug, service]));
  const serviceUrl = (slug) => `${root}services/${slug}.html`;
  const assetUrl = (path) => `${root}${path}`;
  const audienceGroups = [
    {
      slug: "commercial",
      title: "Commercial",
      image: "img/generated/group-commercial.webp",
      intro: "Electrical service planning for offices, retail spaces, tenant improvements, exterior lighting, equipment circuits, and safety-driven maintenance.",
      serviceSlugs: ["lighting-installation", "wiring-and-rewiring", "electrical-panel-upgrades", "electrical-safety-inspections", "emergency-electrical-repairs", "smart-home-electrical"]
    },
    {
      slug: "industrial",
      title: "Industrial",
      image: "img/generated/group-industrial.webp",
      intro: "Provider matching for heavier electrical needs, backup power readiness, dedicated circuits, panel capacity, inspections, and urgent troubleshooting.",
      serviceSlugs: ["generator-backup-power", "electrical-panel-upgrades", "wiring-and-rewiring", "electrical-safety-inspections", "emergency-electrical-repairs"]
    },
    {
      slug: "residential",
      title: "Residential",
      image: "img/generated/group-residential.webp",
      intro: "Home electrical repair, upgrades, lighting, EV charging, smart controls, inspections, and backup power coordination from one service request.",
      serviceSlugs: ["emergency-electrical-repairs", "electrical-panel-upgrades", "wiring-and-rewiring", "lighting-installation", "ev-charger-installation", "generator-backup-power", "electrical-safety-inspections", "smart-home-electrical"]
    }
  ];

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value || "";
    });
  }

  function setHref(selector, value) {
    document.querySelectorAll(selector).forEach((node) => {
      if (value) node.setAttribute("href", value);
    });
  }

  function icon(name) {
    return `<i data-lucide="${name}" aria-hidden="true"></i>`;
  }

  function groupedServices() {
    return services.reduce((groups, service) => {
      groups[service.category] = groups[service.category] || [];
      groups[service.category].push(service);
      return groups;
    }, {});
  }

  function renderHeader() {
    const target = document.querySelector("[data-site-header]");
    if (!target) return;

    const groups = groupedServices();
    const groupsHtml = Object.entries(groups).map(([category, items]) => `
      <div class="mega-group">
        <div class="mega-group-title">${icon(items[0].icon)}<span>${category}</span></div>
        ${items.map((item) => `<a href="${serviceUrl(item.slug)}">${item.title}</a>`).join("")}
      </div>
    `).join("");

    target.innerHTML = `
      <div class="top-strip">
        <div class="container top-strip-inner">
          <a href="mailto:${config.email}" data-email-link>${icon("mail")}<span data-email-text>${config.email}</span></a>
          <span>${icon("map-pin")}<span data-company-address>${config.addressLine1}, ${config.addressLine2}</span></span>
          <span>${icon("clock-3")}<span data-business-hours>${config.businessHours}</span></span>
        </div>
      </div>
      <header class="site-header" id="siteHeader">
        <div class="container nav-shell">
          <a class="brand" href="${root}index.html" aria-label="${config.companyName} home">
            <span class="brand-mark">${icon("zap")}</span>
            <span class="brand-text" data-company-name>${config.companyName}</span>
          </a>
          <nav class="desktop-nav" aria-label="Primary navigation">
            <a href="${root}index.html">Home</a>
            <div class="nav-dropdown">
              <a href="${root}services.html">Services ${icon("chevron-down")}</a>
              <div class="mega-menu">${groupsHtml}</div>
            </div>
            <a href="${root}about.html">About</a>
            <a href="${root}contact.html">Contact</a>
          </nav>
          <div class="nav-actions">
            <a class="phone-action" href="tel:${config.phone}" data-phone-link aria-label="${config.phoneButtonLabel}">
              ${icon("phone-call")}<span data-phone-text>${config.phoneDisplay}</span>
            </a>
            <a class="btn btn-primary" href="${root}contact.html" data-cta-primary>${icon("bolt")}<span>${config.ctaPrimary}</span></a>
            <button class="menu-toggle" type="button" aria-controls="mobileMenu" aria-expanded="false" aria-label="Open menu">
              ${icon("menu")}
            </button>
          </div>
        </div>
      </header>
      <aside class="mobile-panel" id="mobileMenu" aria-hidden="true">
        <div class="mobile-panel-head">
          <a class="brand" href="${root}index.html">
            <span class="brand-mark">${icon("zap")}</span>
            <span class="brand-text" data-company-name>${config.companyName}</span>
          </a>
          <button class="menu-close" type="button" aria-label="Close menu">${icon("x")}</button>
        </div>
        <div class="mobile-contact">
          <a href="tel:${config.phone}" data-phone-link>${icon("phone")}<span data-phone-text>${config.phoneDisplay}</span></a>
          <a href="mailto:${config.email}" data-email-link>${icon("mail")}<span data-email-text>${config.email}</span></a>
        </div>
        <nav class="mobile-nav" aria-label="Mobile navigation">
          <a href="${root}index.html">Home</a>
          <button class="mobile-accordion" type="button" aria-expanded="false">Services ${icon("chevron-down")}</button>
          <div class="mobile-subnav">
            <div class="mobile-subnav-inner">
              <a class="mobile-all-services" href="${root}services.html">All Services</a>
              ${Object.entries(groups).map(([category, items]) => `
                <strong>${category}</strong>
                ${items.map((item) => `<a href="${serviceUrl(item.slug)}">${item.title}</a>`).join("")}
              `).join("")}
            </div>
          </div>
          <a href="${root}about.html">About</a>
          <a href="${root}contact.html">Contact</a>
        </nav>
      </aside>
      <div class="panel-scrim" data-close-menu></div>
    `;
  }

  function renderFooter() {
    const target = document.querySelector("[data-site-footer]");
    if (!target) return;
    const groups = groupedServices();
    const footerCta = body.dataset.page === "contact" ? "" : `
        <div class="footer-cta">
          <div class="container footer-cta-inner">
            <div>
              <span class="eyebrow">Need electrical help?</span>
              <h2>Your <strong>Best Option</strong> for Electrical Contractors 24/7</h2>
              <p>Our service request flow helps organize repairs, upgrades, inspections, lighting, backup power, and provider follow-up in one place.</p>
            </div>
            <a class="btn btn-primary" href="${root}contact.html">${icon("send")}<span>${config.ctaPrimary}</span></a>
          </div>
        </div>`;
    target.innerHTML = `
      <footer class="footer">
        ${footerCta}
        <div class="container footer-grid">
          <div>
            <a class="brand footer-brand" href="${root}index.html">
              <span class="brand-mark">${icon("zap")}</span>
              <span class="brand-text" data-company-name>${config.companyName}</span>
            </a>
            <p data-footer-text-primary>${config.footerTextPrimary}</p>
            <p class="footer-company-line"><span data-company-name>${config.companyName}</span><span data-company-address>${config.addressLine1}, ${config.addressLine2}</span><span data-company-id>${config.companyId}</span></p>
          </div>
          <div>
            <h3>Services</h3>
            ${Object.keys(groups).map((category) => `<a href="${root}services.html#${slugify(category)}">${category}</a>`).join("")}
          </div>
          <div>
            <h3>Contact</h3>
            <a href="tel:${config.phone}" data-phone-link>${icon("phone")}<span data-phone-text>${config.phoneDisplay}</span></a>
            <a href="mailto:${config.email}" data-email-link>${icon("mail")}<span data-email-text>${config.email}</span></a>
            <a href="https://${config.website}" data-website-link>${icon("globe-2")}<span data-website-text>${config.website}</span></a>
            <span>${icon("clock-3")}<span data-business-hours>${config.businessHours}</span></span>
          </div>
          <div>
            <h3>Legal pages</h3>
            <a href="${root}privacy.html">Privacy Policy</a>
            <a href="${root}terms.html">Terms & Conditions</a>
            <a href="${root}cookie-policy.html">Cookie Policy</a>
          </div>
        </div>
        <div class="container footer-disclaimer">
          <p data-footer-disclaimer>${config.footerDisclaimer}</p>
        </div>
        <div class="footer-bottom">
          <div class="container">
            <span data-copyright-line>&copy; <span data-year></span> ${config.companyName}. ${config.copyrightLine}</span>
          </div>
        </div>
      </footer>
    `;
  }

  function slugify(value) {
    return String(value).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function hydrateConfig() {
    setText("[data-company-name]", config.companyName);
    setText("[data-company-legal-name]", config.companyLegalName);
    setText("[data-company-id]", config.companyId);
    setText("[data-company-address]", `${config.addressLine1}, ${config.addressLine2}`);
    setText("[data-phone-text]", config.phoneDisplay);
    setText("[data-email-text]", config.email);
    setText("[data-website-text]", config.website);
    setText("[data-service-area]", config.serviceArea);
    setText("[data-business-hours]", config.businessHours);
    setText("[data-footer-text-primary]", config.footerTextPrimary);
    setText("[data-footer-text-secondary]", config.footerTextSecondary);
    setText("[data-disclaimer-short]", config.disclaimerShort);
    setText("[data-disclaimer-full]", config.disclaimerFull);
    setText("[data-footer-disclaimer]", config.footerDisclaimer);
    setText("[data-year]", String(new Date().getFullYear()));
    setHref("[data-phone-link]", `tel:${config.phone}`);
    setHref("[data-email-link]", `mailto:${config.email}`);
    setHref("[data-website-link]", `https://${config.website}`);

    document.querySelectorAll("[data-cta-primary]").forEach((node) => {
      if (node.tagName === "A" || node.tagName === "BUTTON") {
        const span = node.querySelector("span");
        if (span) span.textContent = config.ctaPrimary;
        else node.textContent = config.ctaPrimary;
      } else {
        node.textContent = config.ctaPrimary;
      }
    });

    if (document.title.includes("VoltEdge Electrical")) {
      document.title = document.title.replace("VoltEdge Electrical", config.companyName);
    }
  }

  function serviceCard(service, compact) {
    return `
      <article class="service-card reveal" data-category="${slugify(service.category)}">
        <a class="service-card-media" href="${serviceUrl(service.slug)}" aria-label="${service.title}">
          <img src="${assetUrl(service.image)}" alt="${service.title}" loading="lazy">
          <span class="service-card-icon">${icon(service.icon)}</span>
        </a>
        <div class="service-card-body">
          <span class="eyebrow">${service.eyebrow}</span>
          <h3><a href="${serviceUrl(service.slug)}">${service.title}</a></h3>
          <p>${service.short}</p>
          ${compact ? "" : `<a class="text-link" href="${serviceUrl(service.slug)}">More info ${icon("arrow-right")}</a>`}
        </div>
      </article>
    `;
  }

  function renderServices() {
    document.querySelectorAll("[data-services-grid]").forEach((target) => {
      const limit = Number(target.dataset.limit || services.length);
      target.innerHTML = services.slice(0, limit).map((service) => serviceCard(service)).join("");
    });

    const directory = document.querySelector("[data-service-directory]");
    if (directory) {
      const groups = groupedServices();
      directory.innerHTML = Object.entries(groups).map(([category, items]) => `
        <section class="service-group reveal" id="${slugify(category)}">
          <div class="section-kicker">
            <span class="eyebrow">${category}</span>
            <h2>${category}</h2>
          </div>
          <div class="service-grid">
            ${items.map((item) => serviceCard(item)).join("")}
          </div>
        </section>
      `).join("");
    }

    document.querySelectorAll("[data-category-tabs]").forEach((target) => {
      const cats = ["all", ...new Set(services.map((service) => slugify(service.category)))];
      target.innerHTML = cats.map((cat, index) => `<button class="${index === 0 ? "active" : ""}" type="button" data-filter="${cat}">${cat === "all" ? "All" : labelFromSlug(cat)}</button>`).join("");
    });

    document.querySelectorAll("[data-service-audience-groups]").forEach((target) => {
      renderAudienceGroups(target, target.dataset.activeGroup || "");
    });
  }

  function renderAudienceGroups(target, activeSlug, animate) {
    const activeGroup = audienceGroups.find((group) => group.slug === activeSlug);
    const audienceServicesMarkup = (group) => {
      const groupServices = group.serviceSlugs.map((slug) => bySlug[slug]).filter(Boolean);
      return `
        <div class="audience-services-head">
          <div>
            <span class="eyebrow">${group.title} services</span>
            <h3>${group.title} electrical service list</h3>
          </div>
          <p>${group.intro}</p>
        </div>
        <div class="audience-service-list">
          ${groupServices.map((service) => `
            <a class="audience-service-link" href="${serviceUrl(service.slug)}">
              <span class="audience-service-icon">${icon(service.icon)}</span>
              <span>
                <strong>${service.title}</strong>
                <small>${service.short}</small>
              </span>
              ${icon("arrow-right")}
            </a>
          `).join("")}
        </div>
      `;
    };
    target.dataset.activeGroup = activeGroup ? activeGroup.slug : "";
    target.innerHTML = `
      <div class="audience-explorer">
        <div class="audience-panels" role="tablist" aria-label="Service groups">
          ${audienceGroups.map((group) => `
            <article class="audience-panel ${activeGroup && group.slug === activeGroup.slug ? "active" : ""} ${activeGroup && group.slug === activeGroup.slug && !animate ? "services-open" : ""}">
              <img src="${assetUrl(group.image)}" alt="${group.title} electrical services" loading="lazy">
              <button class="audience-trigger" type="button" role="tab" aria-selected="${activeGroup && group.slug === activeGroup.slug ? "true" : "false"}" aria-expanded="${activeGroup && group.slug === activeGroup.slug ? "true" : "false"}" aria-controls="audience-services" data-audience-trigger="${group.slug}">
                <span>${group.title}</span>
                <i data-lucide="${activeGroup && group.slug === activeGroup.slug ? "minus" : "plus"}" aria-hidden="true"></i>
              </button>
              <div class="audience-panel-services" id="audience-services-${group.slug}">
                <div class="audience-services">
                  ${activeGroup && group.slug === activeGroup.slug ? audienceServicesMarkup(group) : ""}
                </div>
              </div>
            </article>
          `).join("")}
        </div>
        <div class="audience-services-wrap ${activeGroup && !animate ? "open" : ""}" id="audience-services">
          <div class="audience-services">
            ${activeGroup ? audienceServicesMarkup(activeGroup) : ""}
          </div>
        </div>
      </div>
    `;
    initIcons();
    if (activeGroup && animate) {
      requestAnimationFrame(() => {
        target.querySelector(".audience-services-wrap")?.classList.add("open");
        target.querySelector(".audience-panel.active")?.classList.add("services-open");
      });
    }
  }

  function labelFromSlug(slug) {
    return slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

  function renderServiceDetail() {
    const target = document.querySelector("[data-service-detail]");
    if (!target) return;
    const slug = body.dataset.serviceSlug;
    const service = bySlug[slug] || services[0];
    const related = service.related.map((itemSlug) => bySlug[itemSlug]).filter(Boolean);
    const storyVisual = { image: service.detailImage || service.image, title: `${service.title} in progress` };

    document.title = `${service.title} | ${config.companyName}`;
    const meta = document.querySelector("meta[name='description']");
    if (meta) meta.setAttribute("content", service.short);

    target.innerHTML = `
      <section class="page-hero service-hero" style="background-image: url('${assetUrl(service.image)}')">
        <div class="container page-hero-inner reveal">
          <span class="eyebrow">${service.eyebrow}</span>
          <h1>${service.title}</h1>
          <p>${service.intro}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="${root}contact.html?service=${encodeURIComponent(service.title)}">${icon("bolt")}<span>${config.ctaPrimary}</span></a>
            <a class="btn btn-ghost" href="tel:${config.phone}" data-phone-link>${icon("phone-call")}<span data-phone-text>${config.phoneDisplay}</span></a>
          </div>
        </div>
      </section>
      <section class="section service-story-section">
        <div class="container service-story-grid">
          <div class="service-story-copy reveal">
            <span class="eyebrow">What is included</span>
            <h2>Service coverage that explains the work before anyone arrives.</h2>
            <p>${service.intro}</p>
            <p>The goal is to turn a vague electrical concern into a clear scope: what is unsafe, what needs capacity planning, what can be repaired, and what might require parts, permits, utility coordination, or follow-up inspection.</p>
            <div class="service-copy-columns">
              <div>
                <h3>What the request captures</h3>
                <p>Symptoms, property type, affected rooms or equipment, project goals, access notes, and the timing that matters to the customer.</p>
              </div>
              <div>
                <h3>What the provider reviews</h3>
                <p>Visible equipment, likely load impact, safety risk, material needs, and whether surrounding electrical work should be planned together.</p>
              </div>
            </div>
          </div>
          <aside class="service-story-media reveal">
            <img src="${assetUrl(storyVisual.image)}" alt="${storyVisual.title}" loading="lazy">
            <div class="story-media-note">
              <strong>Best fit</strong>
              ${service.bestFor.map((item) => `<span>${item}</span>`).join("")}
            </div>
          </aside>
        </div>
      </section>
      <section class="section service-scope-section">
        <div class="container service-scope-grid">
          <div class="service-scope-intro reveal">
            <span class="eyebrow">Options</span>
            <h2>Ways this service can be scoped without turning it into guesswork.</h2>
            <p>Every property is different. These common paths help shape the provider conversation before the first visit and make it easier to combine repair, upgrade, inspection, and maintenance work when needed.</p>
          </div>
          <div class="scope-path-list reveal">
            ${service.options.map((item) => `<article>${icon("arrow-right")}<h3>${item}</h3><p>Reviewed against the existing electrical system, customer goals, safety requirements, and any practical scheduling constraints.</p></article>`).join("")}
          </div>
        </div>
      </section>
      <section class="section service-process-section">
        <div class="container service-process-grid">
          <div class="service-process-heading reveal">
            <span class="eyebrow">Process</span>
            <h2>How the service request moves from concern to completed work</h2>
            <p>The sequence keeps the service conversation practical: identify the concern, understand the property, confirm the scope, complete the right work, and leave the customer with clear next steps.</p>
          </div>
          <div class="process-line service-process-line">
            ${service.process.map((item) => `<article class="process-step reveal"><p>${item}</p></article>`).join("")}
          </div>
        </div>
      </section>
      <section class="section muted-section">
        <div class="container detail-grid">
          <div class="reveal">
            <span class="eyebrow">Details that matter</span>
            <h2>Practical notes before scheduling</h2>
            <ul class="detail-list">${service.details.map((item) => `<li>${item}</li>`).join("")}</ul>
          </div>
          <div class="faq-list reveal">
            <span class="eyebrow">FAQ</span>
            <h2>Common questions</h2>
            ${service.faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="section-heading reveal">
            <span class="eyebrow">Related services</span>
            <h2>Plan the surrounding work at the same time</h2>
          </div>
          <div class="related-service-band">
            ${related.map((item) => `<a class="related-service-link reveal" href="${root}services/${item.slug}.html"><img src="${assetUrl(item.image)}" alt="${item.title}" loading="lazy"><span>${item.eyebrow}</span><strong>${item.title}</strong>${icon("arrow-right")}</a>`).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function setupInteractions() {
    const header = document.getElementById("siteHeader");
    const onScroll = () => {
      if (header) header.classList.toggle("is-sticky", window.scrollY > 90);
      document.querySelector(".back-to-top")?.classList.toggle("show", window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const toggle = document.querySelector(".menu-toggle");
    const close = document.querySelector(".menu-close");
    const panel = document.getElementById("mobileMenu");
    const scrim = document.querySelector("[data-close-menu]");
    const setMenu = (open) => {
      body.classList.toggle("menu-open", open);
      toggle?.setAttribute("aria-expanded", String(open));
      panel?.setAttribute("aria-hidden", String(!open));
    };
    toggle?.addEventListener("click", () => setMenu(true));
    close?.addEventListener("click", () => setMenu(false));
    scrim?.addEventListener("click", () => setMenu(false));

    document.querySelectorAll(".mobile-accordion").forEach((button) => {
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        button.nextElementSibling?.classList.toggle("open", !expanded);
      });
    });

    setupSmoothFaqAccordions();

    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        const filter = button.dataset.filter;
        document.querySelectorAll(".service-card[data-category]").forEach((card) => {
          card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
        });
      });
    });

    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-audience-trigger]");
      if (!trigger) return;
      const target = trigger.closest("[data-service-audience-groups]");
      if (!target) return;
      const current = target.dataset.activeGroup;
      const next = target.dataset.activeGroup === trigger.dataset.audienceTrigger ? "" : trigger.dataset.audienceTrigger;
      if (!next) {
        const wrap = target.querySelector(".audience-services-wrap");
        target.querySelector(".audience-panel.active")?.classList.remove("services-open");
        wrap?.classList.remove("open");
        setTimeout(() => renderAudienceGroups(target, ""), 320);
        return;
      }
      if (current) {
        const wrap = target.querySelector(".audience-services-wrap");
        target.querySelector(".audience-panel.active")?.classList.remove("services-open");
        wrap?.classList.add("is-switching");
        setTimeout(() => {
          renderAudienceGroups(target, next, true);
          const nextWrap = target.querySelector(".audience-services-wrap");
          nextWrap?.classList.add("is-switching");
          requestAnimationFrame(() => {
            nextWrap?.classList.remove("is-switching");
          });
        }, 160);
        return;
      }
      renderAudienceGroups(target, next, true);
    });

    document.querySelectorAll("[data-slider]").forEach((slider) => {
      const slides = Array.from(slider.querySelectorAll("[data-slide]"));
      const dots = slider.querySelector("[data-slider-dots]");
      let index = 0;
      if (dots) {
        dots.innerHTML = slides.map((_, i) => `<button type="button" aria-label="Show slide ${i + 1}" class="${i === 0 ? "active" : ""}"></button>`).join("");
      }
      const show = (next) => {
        index = (next + slides.length) % slides.length;
        slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
        dots?.querySelectorAll("button").forEach((dot, i) => dot.classList.toggle("active", i === index));
      };
      dots?.querySelectorAll("button").forEach((dot, i) => dot.addEventListener("click", () => show(i)));
      if (slides.length > 1) setInterval(() => show(index + 1), 6200);
      show(0);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        const target = Number(node.dataset.count || 0);
        const suffix = node.dataset.suffix ?? "+";
        let start = 0;
        const step = Math.max(1, Math.round(target / 70));
        const tick = () => {
          start = Math.min(target, start + step);
          node.textContent = `${start.toLocaleString()}${suffix}`;
          if (start < target) requestAnimationFrame(tick);
        };
        tick();
        counterObserver.unobserve(node);
      });
    });
    document.querySelectorAll("[data-count]").forEach((node) => counterObserver.observe(node));
  }

  function setupSmoothFaqAccordions() {
    document.querySelectorAll(".faq-list details").forEach((details) => {
      const summary = details.querySelector("summary");
      if (!summary || details.dataset.smoothAccordion === "ready") return;
      details.dataset.smoothAccordion = "ready";

      const answer = document.createElement("div");
      answer.className = "faq-answer";
      const answerNodes = Array.from(details.childNodes).filter((node) => node !== summary);
      answerNodes.forEach((node) => answer.appendChild(node));
      details.appendChild(answer);
      answer.style.height = details.open ? "auto" : "0px";

      summary.addEventListener("click", (event) => {
        event.preventDefault();
        const isOpen = details.open;

        if (isOpen) {
          answer.style.height = `${answer.scrollHeight}px`;
          requestAnimationFrame(() => {
            answer.style.height = "0px";
          });
          answer.addEventListener("transitionend", function closeFaq(event) {
            if (event.propertyName !== "height") return;
            answer.removeEventListener("transitionend", closeFaq);
            details.open = false;
          });
          return;
        }

        details.open = true;
        answer.style.height = "0px";
        requestAnimationFrame(() => {
          answer.style.height = `${answer.scrollHeight}px`;
        });
        answer.addEventListener("transitionend", function openFaq(event) {
          if (event.propertyName !== "height") return;
          answer.removeEventListener("transitionend", openFaq);
          answer.style.height = "auto";
        });
      });
    });
  }

  function setupCookieBanner() {
    const key = `cookie-preference-${config.companyName || "site"}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (localStorage.getItem(key)) return;
    const banner = document.createElement("div");
    banner.className = "cookie-banner";
    document.body.classList.add("has-cookie-banner");
    banner.innerHTML = `
      <p>We use essential cookies and optional analytics-style storage to improve this electrical services website. Read the <a href="${root}cookie-policy.html">Cookie Policy</a>.</p>
      <div>
        <button class="btn btn-ghost" type="button" data-cookie="decline">Decline</button>
        <button class="btn btn-primary" type="button" data-cookie="accept">Accept</button>
      </div>
    `;
    document.body.appendChild(banner);
    banner.querySelectorAll("[data-cookie]").forEach((button) => {
      button.addEventListener("click", () => {
        localStorage.setItem(key, button.dataset.cookie);
        document.body.classList.remove("has-cookie-banner");
        banner.remove();
      });
    });
  }

  function setupForm() {
    const select = document.querySelector("[data-service-select]");
    if (select) {
      select.innerHTML = `<option value="">Select a service</option>${services.map((service) => `<option>${service.title}</option>`).join("")}`;
      const params = new URLSearchParams(window.location.search);
      const requested = params.get("service");
      if (requested) select.value = requested;
    }

    document.querySelectorAll("form[data-contact-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const message = form.querySelector("[data-success-message]");
        if (message) {
          message.textContent = `Thanks. ${config.companyName} received your request and will use ${config.email} for follow-up if email is the best contact method.`;
          message.classList.add("show");
        }
        form.reset();
      });
    });
  }

  function renderLegal() {
    setText("[data-last-updated]", "June 19, 2026");
  }

  function initIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  renderHeader();
  renderFooter();
  hydrateConfig();
  renderServices();
  renderServiceDetail();
  renderLegal();
  setupInteractions();
  setupCookieBanner();
  setupForm();
  initIcons();
})();
