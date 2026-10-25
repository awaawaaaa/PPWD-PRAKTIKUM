
$(document).ready(function () {

    // Navigasi tab kategori bunga
    $(document).on("click", ".tab-button", function (e) {

        e.preventDefault();

        let button = $(this);
        let category = button.attr("data-category");
        let grid = $(".product-grid");

        // Pastikan kategori dan elemen produk ditemukan
        if (!grid.length || !category) {
            console.error("Product grid atau kategori tidak ditemukan!");
            return;
        }

        // Ubah tombol aktif
        $(".tab-button")
            .removeClass("active")
            .attr("aria-selected", "false");

        button
            .addClass("active")
            .attr("aria-selected", "true");

        // Geser koleksi lama ke kiri
        grid.stop(true, true).animate({
            left: "-50px",
            opacity: 0
        }, 250, function () {

            // Sembunyikan semua produk terlebih dahulu
            $(".product-card").hide();

            // Tampilkan produk sesuai kategori
            $(".product-card").filter(function () {

                return category === "all" ||
                    $(this).attr("data-category") === category;

            }).show();

            // Mulai koleksi baru dari sebelah kanan
            grid.css({
                left: "50px",
                opacity: 0
            });

            // Geser koleksi baru ke posisi semula
            grid.animate({
                left: "0px",
                opacity: 1
            }, 350);

            // Perbarui keterangan kategori
            let messages = {
                all: "Showing all of our favorite blooms ✿",
                romantic: "For the softest, sweetest kind of love ♡",
                cheerful: "A little sunshine for someone's day ☀",
                minimal: "Simple, calm, and effortlessly lovely ✧"
            };

            $("#tabHint")
                .stop(true, true)
                .hide()
                .text(messages[category] || messages.all)
                .fadeIn(350);

        });

    });

});
