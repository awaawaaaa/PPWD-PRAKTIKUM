$(document).ready(function () {

    /* =====================================================
    1. DATA PRODUK
    ===================================================== */

    const produkData = [
        {
            id: 1,
            nama: 'Es Krim Cokelat',
            harga: 15000,
            kategori: 'es-krim',
            icon: '🍫',
            desc: 'Cokelat premium lembut',
            badge: 'Best Seller',
            badgeType: 'hot'
        },
        {
            id: 2,
            nama: 'Es Krim Strawberry',
            harga: 15000,
            kategori: 'es-krim',
            icon: '🍓',
            desc: 'Stroberi segar asli',
            badge: 'Favorit',
            badgeType: ''
        },
        {
            id: 3,
            nama: 'Es Krim Vanilla',
            harga: 13000,
            kategori: 'es-krim',
            icon: '🍦',
            desc: 'Vanilla klasik creamy',
            badge: '',
            badgeType: ''
        },
        {
            id: 4,
            nama: 'Es Krim Mangga',
            harga: 16000,
            kategori: 'es-krim',
            icon: '🥭',
            desc: 'Mangga manis tropis',
            badge: 'Baru',
            badgeType: ''
        },
        {
            id: 5,
            nama: 'Sundae Cokelat',
            harga: 25000,
            kategori: 'sundae',
            icon: '🍨',
            desc: 'Sundae dengan topping cokelat',
            badge: 'Best Seller',
            badgeType: 'hot'
        },
        {
            id: 6,
            nama: 'Sundae Keju',
            harga: 27000,
            kategori: 'sundae',
            icon: '🧀',
            desc: 'Sundae topping keju melimpah',
            badge: '',
            badgeType: ''
        },
        {
            id: 7,
            nama: 'Sundae Buah',
            harga: 28000,
            kategori: 'sundae',
            icon: '🍧',
            desc: 'Sundae dengan buah segar',
            badge: 'Favorit',
            badgeType: ''
        },
        {
            id: 8,
            nama: 'Milkshake Cokelat',
            harga: 20000,
            kategori: 'minuman',
            icon: '🥤',
            desc: 'Milkshake cokelat dingin',
            badge: '',
            badgeType: ''
        },
        {
            id: 9,
            nama: 'Milkshake Strawberry',
            harga: 20000,
            kategori: 'minuman',
            icon: '🥛',
            desc: 'Milkshake stroberi segar',
            badge: 'Baru',
            badgeType: ''
        },
        {
            id: 10,
            nama: 'Es Teh Manis',
            harga: 8000,
            kategori: 'minuman',
            icon: '🧊',
            desc: 'Es teh manis segar',
            badge: '',
            badgeType: ''
        },
        {
            id: 11,
            nama: 'Es Jeruk',
            harga: 10000,
            kategori: 'minuman',
            icon: '🍊',
            desc: 'Es jeruk peras asli',
            badge: '',
            badgeType: ''
        },
        {
            id: 12,
            nama: 'Float Ice Cream',
            harga: 22000,
            kategori: 'minuman',
            icon: '🍹',
            desc: 'Minuman soda dengan es krim',
            badge: 'Best Seller',
            badgeType: 'hot'
        }
    ];


    /* =====================================================
    2. STATE
    ===================================================== */

    let cart = [];
    let currentFilter = 'all';
    let searchKeyword = '';


    /* =====================================================
    3. FUNGSI RENDER PRODUK
    ===================================================== */

    function renderProduk() {

        const $grid = $('#produkGrid');

        $grid.empty();

        // Filter kategori dan pencarian
        const filtered = produkData.filter(function (p) {

            const matchKategori =
                currentFilter === 'all' ||
                p.kategori === currentFilter;

            const matchSearch =
                p.nama.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                p.desc.toLowerCase().includes(searchKeyword.toLowerCase());

            return matchKategori && matchSearch;
        });


        // Jika produk tidak ditemukan
        if (filtered.length === 0) {

            $grid.html(`
                <div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:#bbb;">
                    <i class="fas fa-search"
                        style="font-size:3.5rem; color:#ffe4ec; margin-bottom:20px; display:block;">
                    </i>

                    <h3 style="color:#999; font-weight:600; margin-bottom:8px;">
                        Produk tidak ditemukan
                    </h3>

                    <p style="font-size:0.9rem;">
                        Coba kata kunci atau kategori lain
                    </p>
                </div>
            `);

            return;
        }


        // Render produk
        filtered.forEach(function (p) {

            const badgeHtml = p.badge
                ? `<div class="produk-badge ${p.badgeType}">${p.badge}</div>`
                : '';


            const card = `
                <div class="produk-card"
                    data-id="${p.id}"
                    data-kategori="${p.kategori}">

                    ${badgeHtml}

                    <div class="produk-img">
                        ${p.icon}
                    </div>

                    <div class="produk-info">

                        <h3>${p.nama}</h3>

                        <p class="desc">
                            ${p.desc}
                        </p>

                        <div class="produk-footer">

                            <div class="produk-price">
                                Rp ${p.harga.toLocaleString('id-ID')}
                                <small>per porsi</small>
                            </div>

                            <button
                                class="btn-add-cart"
                                data-id="${p.id}"
                                title="Tambah ke keranjang">

                                <i class="fas fa-plus"></i>

                            </button>

                        </div>

                    </div>

                </div>
            `;

            $grid.append(card);
        });
    }


    /* =====================================================
    4. FILTER KATEGORI - NAVBAR
    ===================================================== */

    $('.nav-link').click(function () {

        $('.nav-link').removeClass('active');

        $(this).addClass('active');

        currentFilter = $(this).data('filter');


        // Sinkronkan dengan tombol filter
        $('.filter-btn').removeClass('active');

        $(`.filter-btn[data-cat="${currentFilter}"]`)
            .addClass('active');


        renderProduk();
    });


    /* =====================================================
    5. FILTER KATEGORI - BUTTON
    ===================================================== */

    $('.filter-btn').click(function () {

        $('.filter-btn').removeClass('active');

        $(this).addClass('active');

        currentFilter = $(this).data('cat');


        // Sinkronkan dengan navbar
        $('.nav-link').removeClass('active');

        $(`.nav-link[data-filter="${currentFilter}"]`)
            .addClass('active');


        renderProduk();
    });


    /* =====================================================
    6. PENCARIAN REAL-TIME
    ===================================================== */

    $('#searchProduk').on('input', function () {

        searchKeyword = $(this).val();

        renderProduk();
    });


    /* =====================================================
    7. TAMBAH KE KERANJANG
    ===================================================== */

    $(document).on('click', '.btn-add-cart', function (e) {

        e.stopPropagation();

        const id = $(this).data('id');

        const produk = produkData.find(function (p) {
            return p.id === id;
        });

        if (!produk) return;


        // Cek produk sudah ada
        const existing = cart.find(function (item) {
            return item.id === id;
        });


        if (existing) {

            existing.qty += 1;

        } else {

            cart.push({
                id: produk.id,
                nama: produk.nama,
                harga: produk.harga,
                icon: produk.icon,
                qty: 1
            });

        }


        updateCartUI();

        showToast(`${produk.icon} ${produk.nama} ditambahkan!`);


        // Animasi tombol
        $(this).css(
            'transform',
            'rotate(90deg) scale(1.3)'
        );

        setTimeout(() => {
            $(this).css('transform', '');
        }, 300);


        // Animasi badge
        $('#cartBadge').css(
            'transform',
            'scale(1.4)'
        );

        setTimeout(() => {
            $('#cartBadge').css(
                'transform',
                'scale(1)'
            );
        }, 200);
    });


    /* =====================================================
    8. UPDATE UI KERANJANG
    ===================================================== */

    function updateCartUI() {

        const $cartItems = $('#cartItems');


        const totalQty = cart.reduce(
            (sum, item) => sum + item.qty,
            0
        );

        let totalHarga = cart.reduce(
            (sum, item) => sum + (item.harga * item.qty),
            0
        );

        if (totalHarga > 100000) {
            const hargaAwal = totalHarga;
            const diskon = totalHarga * 0.1;
            totalHarga -= diskon;

            $('#cartTotal').html(`
        <small style="text-decoration:line-through;color:#999;margin-right:8px;">
            Rp ${hargaAwal.toLocaleString('id-ID')}
        </small>
        <strong>Rp ${totalHarga.toLocaleString('id-ID')}</strong>
    `);
        } else {
            $('#cartTotal').html(
                'Rp ' + totalHarga.toLocaleString('id-ID')
            );
        }

        // Update badge
        $('#cartBadge').text(totalQty);



        // Jika kosong
        if (cart.length === 0) {

            $cartItems.html(`
                <div class="cart-empty">

                    <i class="fas fa-shopping-cart"></i>

                    <p>Keranjang masih kosong</p>

                    <small>
                        Yuk pilih es krim dulu!
                    </small>

                </div>
            `);

            return;
        }


        // Render isi keranjang
        let html = '';


        cart.forEach(function (item) {

            html += `
                <div class="cart-item" data-id="${item.id}">

                    <div class="cart-item-icon">
                        ${item.icon}
                    </div>

                    <div class="cart-item-info">

                        <h5>
                            ${item.nama}
                        </h5>

                        <div class="price">
                            Rp ${(item.harga * item.qty)
                    .toLocaleString('id-ID')}
                        </div>

                        <div class="qty-control">

                            <button
                                class="qty-btn"
                                data-action="minus"
                                data-id="${item.id}">
                                −
                            </button>

                            <span class="qty-value">
                                ${item.qty}
                            </span>

                            <button
                                class="qty-btn"
                                data-action="plus"
                                data-id="${item.id}">
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        class="cart-item-remove"
                        data-id="${item.id}"
                        title="Hapus">

                        <i class="fas fa-trash"></i>

                    </button>

                </div>
            `;
        });


        $cartItems.html(html);
    }

    function simpanRiwayat(total, qty) {

        const riwayat =
            JSON.parse(localStorage.getItem('riwayat')) || [];

        riwayat.push({
            tanggal: new Date().toISOString(),
            total: total,
            qty: qty
        });

        localStorage.setItem(
            'riwayat',
            JSON.stringify(riwayat)
        );
    }

    /* =====================================================
    RIWAYAT PEMBELIAN
    ===================================================== */

    function tampilkanRiwayat() {

        const riwayat =
            JSON.parse(localStorage.getItem('riwayat')) || [];

        const $history = $('#historyItems');

        $history.empty();

        if (riwayat.length === 0) {

            $history.html(`
            <div class="history-empty">
                <i class="fas fa-clock-rotate-left"></i>
                <p>Belum ada riwayat pembelian</p>
                <small>Riwayat checkout akan muncul di sini.</small>
            </div>
        `);

            return;
        }

        // Tampilkan dari yang terbaru
        riwayat.slice().reverse().forEach(function (item) {

            const tanggal = new Date(item.tanggal);

            const tanggalFormat = tanggal.toLocaleDateString(
                'id-ID',
                {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                }
            );

            $history.append(`
            <div class="history-card">

                <div class="history-date">
                    <i class="fas fa-calendar"></i>
                    ${tanggalFormat}
                </div>

                <div class="history-detail">

                    <span>
                        ${item.qty} item
                    </span>

                    <span class="history-total">
                        Rp ${item.total.toLocaleString('id-ID')}
                    </span>

                </div>

            </div>
        `);
        });
    }


    /* Buka riwayat */

    $('#historyBtn').click(function () {

        tampilkanRiwayat();

        $('#historySidebar').addClass('open');

        $('#historyOverlay').fadeIn(300);
    });


    /* Tutup riwayat */

    $('#historyClose, #historyOverlay').click(function () {

        $('#historySidebar').removeClass('open');

        $('#historyOverlay').fadeOut(300);
    });

    /* =====================================================
    9. KONTROL QTY
    ===================================================== */

    $(document).on('click', '.qty-btn', function () {

        const action = $(this).data('action');

        const id = $(this).data('id');

        const item = cart.find(function (i) {
            return i.id === id;
        });


        if (!item) return;


        if (action === 'plus') {

            item.qty += 1;

        } else if (action === 'minus') {

            item.qty -= 1;

            if (item.qty <= 0) {

                cart = cart.filter(function (i) {
                    return i.id !== id;
                });

            }
        }


        updateCartUI();
    });


    /* =====================================================
    10. HAPUS ITEM
    ===================================================== */

    $(document).on('click', '.cart-item-remove', function () {

        const id = $(this).data('id');

        const item = cart.find(function (i) {
            return i.id === id;
        });


        if (item) {

            showToast(
                `${item.icon} ${item.nama} dihapus dari keranjang`
            );

        }


        cart = cart.filter(function (i) {
            return i.id !== id;
        });


        updateCartUI();
    });


    /* =====================================================
    11. BUKA / TUTUP KERANJANG
    ===================================================== */

    $('#cartBtn').click(function () {

        $('#cartSidebar').addClass('open');

        $('#cartOverlay').fadeIn(300);
    });


    $('#cartClose, #cartOverlay').click(function () {

        $('#cartSidebar').removeClass('open');

        $('#cartOverlay').fadeOut(300);
    });

    function simpanRiwayat(total, qty) {

        const riwayat =
            JSON.parse(localStorage.getItem('riwayat')) || [];

        riwayat.push({
            tanggal: new Date().toISOString(),
            total: total,
            qty: qty
        });

        localStorage.setItem(
            'riwayat',
            JSON.stringify(riwayat)
        );
    }

    /* =====================================================
    8. CHECKOUT + FORM PEMBELI
    ===================================================== */

    $('#btnCheckout').click(function () {

        if (cart.length === 0) {
            showToast('❌ Keranjang masih kosong!');
            return;
        }

        // Buka modal data pembeli
        $('#buyerModal').fadeIn(300);
        $('#buyerOverlay').fadeIn(300);
    });


    /* Tutup modal */

    $('#buyerClose, #buyerOverlay').click(function () {

        $('#buyerModal').fadeOut(300);
        $('#buyerOverlay').fadeOut(300);

    });


    /* Submit form pembeli */

    $('#buyerForm').submit(function (e) {

        e.preventDefault();

        const nama = $('#namaPembeli').val().trim();
        const alamat = $('#alamatPembeli').val().trim();
        const noHp = $('#noHpPembeli').val().trim();


        // Reset error
        $('.error-msg').text('');


        let valid = true;


        // Validasi nama
        if (nama === '') {

            $('#errorNama').text(
                'Nama wajib diisi'
            );

            valid = false;
        }


        // Validasi alamat
        if (alamat === '') {

            $('#errorAlamat').text(
                'Alamat wajib diisi'
            );

            valid = false;
        }


        // Validasi nomor HP
        if (noHp === '') {

            $('#errorHp').text(
                'No. HP wajib diisi'
            );

            valid = false;

        } else if (!/^[0-9]{10,13}$/.test(noHp)) {

            $('#errorHp').text(
                'No. HP harus 10-13 digit angka'
            );

            valid = false;
        }


        // Jika tidak valid
        if (!valid) {
            return;
        }


        /* ==========================
           HITUNG TOTAL
        ========================== */

        const hargaAwal = cart.reduce(
            (sum, item) =>
                sum + (item.harga * item.qty),
            0
        );


        let total = hargaAwal;


        // Diskon 10%
        if (total > 100000) {
            total = total - (total * 0.1);
        }


        const totalQty = cart.reduce(
            (sum, item) => sum + item.qty,
            0
        );


        /* ==========================
           SIMPAN RIWAYAT
        ========================== */

        simpanRiwayat(total, totalQty);


        /* ==========================
           TUTUP MODAL
        ========================== */

        $('#buyerModal').fadeOut(300);
        $('#buyerOverlay').fadeOut(300);


        /* ==========================
        RESET FORM
        ========================== */

        $('#buyerForm')[0].reset();


        /* ==========================
        RESET KERANJANG
        ========================== */

        cart = [];

        updateCartUI();


        // Tutup sidebar
        $('#cartSidebar').removeClass('open');

        $('#cartOverlay').fadeOut(300);


        // Notifikasi berhasil
        showToast(
            `✅ Checkout berhasil, ${nama}!`
        );

    });



    /* =====================================================
    13. TOAST NOTIFICATION
    ===================================================== */

    let toastTimer;


    function showToast(message) {

        clearTimeout(toastTimer);


        $('#toastMsg').text(message);

        $('#toast').addClass('show');


        toastTimer = setTimeout(function () {

            $('#toast').removeClass('show');

        }, 2500);
    }


    /* =====================================================
    14. HAMBURGER MENU
    ===================================================== */

    $('#hamburger').click(function () {

        $('#navMenu').toggleClass('show');


        const icon = $(this).find('i');


        if ($('#navMenu').hasClass('show')) {

            icon
                .removeClass('fa-bars')
                .addClass('fa-times');

        } else {

            icon
                .removeClass('fa-times')
                .addClass('fa-bars');

        }
    });


    // Tutup menu saat link diklik
    $('.nav-link').click(function () {

        if (window.innerWidth <= 768) {

            $('#navMenu').removeClass('show');

            $('#hamburger')
                .find('i')
                .removeClass('fa-times')
                .addClass('fa-bars');
        }
    });


    /* =====================================================
    15. INISIALISASI
    ===================================================== */

    renderProduk();

    updateCartUI();


    // Console
    console.log(
        '%c🍦 Warung Ice Cream - Siap!',
        'color:#ff6b9d;font-size:16px;font-weight:bold;'
    );

    console.log(
        '%cTotal produk: ' + produkData.length,
        'color:#2d1b3d;font-size:12px;'
    );

});