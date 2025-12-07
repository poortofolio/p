// Simple interactions: theme toggle, mobile nav, contact form demo


const texts = [
  "Network Administrator ",
  "Web Developer ",
  "Network Administrator Web Developer"
];

const el = document.getElementById("typewriter");

let idx = 0;       // index teks
let char = 0;      // index huruf
let deleting = false;
let done = false;

function type() {
  if (done) return;

  let current = texts[idx];

  if (!deleting) {
    // proses ngetik
    el.textContent = current.substring(0, char + 1);
    char++;

    if (char === current.length) {
      if (idx === texts.length - 1) {
        // teks terakhir → berhenti
        done = true;
        return;
      }
      setTimeout(() => deleting = true, ); // jeda sebelum hapus
    }
  } else {
    // proses hapus
    el.textContent = current.substring(0, char - 1);
    char--;

    if (char === 0) {
      deleting = false;
      idx++; // lanjut ke teks berikutnya
    }
  }

  setTimeout(type, deleting ? 80: 80); // speed ketik/hapus
}

type();

/* =============== LINGKARAN ANIMASI =============== */
const circles = document.querySelectorAll(".outer-circle");

circles.forEach(circle => {
    let percent = circle.getAttribute("data-percent");
    let degree = percent * 3.6; // ubah % → derajat

    let current = 0;  
    let speed = 30;  // makin kecil makin cepat

    let anim = setInterval(() => {
        current++;

        let smallBlue = Math.min(current * 3.6, degree); 
        // warna biru muda gue kecilin area-nya

        circle.style.background = `
            conic-gradient(
                #4dc2ff ${smallBlue}deg,
                #1b1b1b ${smallBlue}deg
            )
        `;

        if (current >= percent) {
            clearInterval(anim);
        }
    }, speed);
});


/* =============== BAR ANIMASI =============== */
const fills = document.querySelectorAll(".fill");

fills.forEach(fill => {
    let target = fill.getAttribute("data-fill");

    setTimeout(() => {
        fill.style.width = target + "%";
    }, 200);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
});

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  const token = "8460626408:AAH1-67wDVP06frJylVhwLBj2F6Ep7lUtvU"; // Ganti dengan token dari BotFather
  const chat_id = "7508766509";  // Ganti dengan chat_id Telegram tujuan

  document.getElementById("sendBtn").addEventListener("click", async () => {
    const name = document.getElementById("nameInput").value.trim();
    const message = document.getElementById("messageInput").value.trim();

    if (!name || !message) {
      alert("Nama dan pesan harus diisi!");
      return;
    }

    // Gabungkan nama dan pesan
    const text = `Pesan dari: ${name}\n\n${message}`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chat_id,
            text: text,
          }),
        }
      );

      const data = await response.json();

      if (data.ok) {
        alert("Pesan berhasil dikirim!");
        document.getElementById("nameInput").value = "";
        document.getElementById("messageInput").value = "";
      } else {
        alert("Gagal mengirim pesan: " + data.description);
      }
    } catch (error) {
      alert("Terjadi kesalahan: " + error.message);
    }
  });

// Ambil elemen header
