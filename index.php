
<?php
$folder = __DIR__;
$pertemuan = glob($folder . '/Pertemuan *', GLOB_ONLYDIR);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Daftar Pertemuan</title>
</head>
<body>

    <h1>Daftar Pertemuan Praktikum</h1>

    <?php if (empty($pertemuan)): ?>
        <p>Folder pertemuan tidak ditemukan!</p>
    <?php else: ?>
        <ul>
            <?php foreach ($pertemuan as $p): ?>
                <li>
                    <a href="<?= rawurlencode(basename($p)) ?>/">
                        <?= basename($p) ?>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>

</body>
</html>
