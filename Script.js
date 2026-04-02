script.js
document.getElementById("year").textContent = new Date().getFullYear();

// WhatsApp
const WHATSAPP_NUMBER_INTERNATIONAL = "2348155918065";
const waText = encodeURIComponent(
  "Hello Femitech Empire, I’d like to book a service (Graphic Design / Video Editing)."
);

const whatsappLink = document.getElementById("whatsappLink");
whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER_INTERNATIONAL}?text=${waText}`;

// Top “Book Now” + Hero “Get a Quote” -> WhatsApp
const bookNowBtn = document.getElementById("bookNowBtn");
bookNowBtn.href = whatsappLink.href;

const quoteBtn = document.getElementById("quoteBtn");
quoteBtn.href = whatsappLink.href;

// Free contact form: opens user's email app with a pre-filled message
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const name = data.get("name");
  const email = data.get("email");
  const service = data.get("service");
  const message = data.get("message");

  const subject = encodeURIComponent(`Femitech Empire Inquiry: ${service}`);
  const body = encodeURIComponent(
`Name: ${name}
Email: ${email}
Service: ${service}

Message:
${message}`
  );

  window.location.href = `mailto:femitech924@gmail.com?subject=${subject}&body=${body}`;
});

// -------- Portfolio filter + modal --------
const pills = document.querySelectorAll(".pill");
const items = document.querySelectorAll(".pf-item");

pills.forEach(p => {
  p.addEventListener("click", () => {
    pills.forEach(x => x.classList.remove("active"));
    p.classList.add("active");

    const f = p.dataset.filter;
    items.forEach(it => {
      const cat = it.dataset.category || "all";
      const show = (f === "all") || (cat === f);
      it.style.display = show ? "" : "none";
    });
  });
});

const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalMedia = document.getElementById("modalMedia");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

function openModal({ type, src, title, desc }) {
  modalTitle.textContent = title || "";
  modalDesc.textContent = desc || "";
  modalMedia.innerHTML = "";

  if (type === "image") {
    const img = document.createElement("img");
    img.src = src;
    img.alt = title || "Portfolio image";
    modalMedia.appendChild(img);
  } else if (type === "video") {
    const video = document.createElement("video");
    video.src = src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    modalMedia.appendChild(video);
  } else if (type === "youtube") {
    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    modalMedia.appendChild(iframe);
  }

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  modalMedia.innerHTML = "";
  document.body.style.overflow = "";
}

document.querySelectorAll(".pf-item").forEach(el => {
  if (el.tagName.toLowerCase() === "a") return; // external links
  el.addEventListener("click", () => {
    openModal({
      type: el.dataset.type,
      src: el.dataset.src,
      title: el.dataset.title,
      desc: el.dataset.desc
    });
  });
});

modalBackdrop.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
