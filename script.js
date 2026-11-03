
// MODE GELAP

const tombolTema = document.getElementById("tombol-tema");

// Memeriksa tema yang tersimpan
if (localStorage.getItem("tema") === "gelap") {
    document.body.classList.add("gelap");
    tombolTema.textContent = "☀️ Mode Terang";
}

// Mengubah tema
tombolTema.addEventListener("click", function () {

    document.body.classList.toggle("gelap");

    if (document.body.classList.contains("gelap")) {
        tombolTema.textContent = "☀️ Mode Terang";
        localStorage.setItem("tema", "gelap");
    } else {
        tombolTema.textContent = "🌙 Mode Gelap";
        localStorage.setItem("tema", "terang");
    }

});


// PENCARIAN PROYEK

const inputCari = document.getElementById("cari");
const kartuProyek = document.querySelectorAll(".kartu");
const pesanKosong = document.getElementById("pesan-kosong");

inputCari.addEventListener("input", function () {

    const kataKunci = inputCari.value.toLowerCase().trim();
    let ditemukan = 0;

    kartuProyek.forEach(function (kartu) {

        const namaProyek = kartu.textContent.toLowerCase();

        if (namaProyek.includes(kataKunci)) {
            kartu.style.display = "flex";
            ditemukan++;
        } else {
            kartu.style.display = "none";
        }

    });

    pesanKosong.style.display =
        ditemukan === 0 ? "block" : "none";

});
