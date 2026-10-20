
<?php
$folder = __DIR__;

$pertemuan = glob($folder . '/pertemuan*', GLOB_ONLYDIR);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Daftar Pertemuan</title>
</head>
<body>

    <h1>Daftar Pertemuan Praktikum</h1>

    <ul>
        <?php foreach ($pertemuan as $p): ?>
            <li>
                <a href="<?= basename($p) ?>/">
                    <?= ucfirst(basename($p)) ?>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>

</body>
</html>
