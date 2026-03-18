const sqlChapters = [
  {num:"S1",title:"Struktur Database",subtitle:"Konsep dasar: database, tabel, kolom, tipe data",type:"sql",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="concept-box"><p>PostgreSQL adalah sistem manajemen database relasional (RDBMS) open-source yang paling canggih. Data disimpan dalam <strong>tabel</strong> (seperti spreadsheet) yang memiliki hubungan satu sama lain.</p>
<ul><li><strong>Database</strong>: container untuk semua tabel</li>
<li><strong>Tabel</strong>: kumpulan baris (row) dan kolom (column)</li>
<li><strong>Primary Key</strong>: kolom unik yang mengidentifikasi tiap baris</li>
<li><strong>Foreign Key</strong>: kolom yang menghubungkan ke tabel lain</li></ul></div>
<div class="section-label">Tipe data penting</div>
<table class="mini"><tr><th>Tipe</th><th>Contoh</th><th>Kegunaan</th></tr>
<tr><td>INTEGER / BIGINT</td><td>1, 42, 1000</td><td>Angka bulat</td></tr>
<tr><td>NUMERIC(10,2)</td><td>9999.99</td><td>Desimal presisi (uang)</td></tr>
<tr><td>VARCHAR(n)</td><td>'Jakarta'</td><td>Teks dengan batas</td></tr>
<tr><td>TEXT</td><td>'Deskripsi panjang'</td><td>Teks bebas</td></tr>
<tr><td>BOOLEAN</td><td>TRUE / FALSE</td><td>Nilai boolean</td></tr>
<tr><td>DATE</td><td>'2024-01-15'</td><td>Tanggal</td></tr>
<tr><td>TIMESTAMP</td><td>'2024-01-15 10:30:00'</td><td>Tanggal + waktu</td></tr>
<tr><td>UUID</td><td>'550e8400-e29b...'</td><td>ID unik global</td></tr></table>`,
    "Contoh":`<div class="section-label">Membuat database dan tabel</div>
<div class="code-block" data-lang="sql"><span class="comment">-- Buat database</span>
<span class="kw">CREATE DATABASE</span> toko_online;

<span class="comment">-- Gunakan database</span>
<span class="kw">\c</span> toko_online

<span class="comment">-- Buat tabel customers</span>
<span class="kw">CREATE TABLE</span> customers (
    id          <span class="type">SERIAL PRIMARY KEY</span>,
    nama        <span class="type">VARCHAR</span>(<span class="num">100</span>) <span class="kw">NOT NULL</span>,
    email       <span class="type">VARCHAR</span>(<span class="num">150</span>) <span class="kw">UNIQUE NOT NULL</span>,
    kota        <span class="type">VARCHAR</span>(<span class="num">50</span>),
    created_at  <span class="type">TIMESTAMP</span> <span class="kw">DEFAULT</span> <span class="fn">NOW</span>()
);

<span class="comment">-- Buat tabel products</span>
<span class="kw">CREATE TABLE</span> products (
    id          <span class="type">SERIAL PRIMARY KEY</span>,
    nama        <span class="type">VARCHAR</span>(<span class="num">200</span>) <span class="kw">NOT NULL</span>,
    harga       <span class="type">NUMERIC</span>(<span class="num">12</span>,<span class="num">2</span>) <span class="kw">NOT NULL</span>,
    stok        <span class="type">INTEGER</span> <span class="kw">DEFAULT</span> <span class="num">0</span>,
    kategori    <span class="type">VARCHAR</span>(<span class="num">50</span>)
);

<span class="comment">-- Buat tabel orders dengan foreign key</span>
<span class="kw">CREATE TABLE</span> orders (
    id           <span class="type">SERIAL PRIMARY KEY</span>,
    customer_id  <span class="type">INTEGER</span> <span class="kw">REFERENCES</span> customers(id),
    product_id   <span class="type">INTEGER</span> <span class="kw">REFERENCES</span> products(id),
    qty          <span class="type">INTEGER</span> <span class="kw">NOT NULL</span>,
    total        <span class="type">NUMERIC</span>(<span class="num">12</span>,<span class="num">2</span>),
    order_date   <span class="type">TIMESTAMP</span> <span class="kw">DEFAULT</span> <span class="fn">NOW</span>()
);</div>`,
    "Real Case":`<div class="case-card sql-header"><div class="case-header sql-header"><span class="badge badge-teal">Case</span> Schema toko online lengkap</div><div class="case-body">
<p>Merancang schema database untuk toko online dengan relasi antar tabel yang benar.</p>
<div class="code-block" data-lang="sql"><span class="comment">-- Tambah constraint dan enum</span>
<span class="kw">CREATE TYPE</span> order_status <span class="kw">AS ENUM</span> (<span class="str">'pending'</span>,<span class="str">'paid'</span>,<span class="str">'shipped'</span>,<span class="str">'done'</span>);

<span class="kw">ALTER TABLE</span> orders
    <span class="kw">ADD COLUMN</span> status order_status <span class="kw">DEFAULT</span> <span class="str">'pending'</span>,
    <span class="kw">ADD CONSTRAINT</span> qty_positive <span class="kw">CHECK</span> (qty > <span class="num">0</span>),
    <span class="kw">ADD CONSTRAINT</span> total_positive <span class="kw">CHECK</span> (total > <span class="num">0</span>);

<span class="comment">-- Lihat struktur tabel</span>
<span class="kw">\d</span> orders</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Lupa NOT NULL?</strong> Data kosong bisa masuk dan merusak logika aplikasi. Selalu pikirkan constraint dari awal.</p></div>
<div class="warning-box"><p><strong>Pakai VARCHAR terlalu pendek?</strong> Lebih baik sedikit lebih besar. VARCHAR(255) vs VARCHAR(100) tidak beda performa signifikan di PostgreSQL.</p></div>
<div class="warning-box"><p><strong>Gunakan SERIAL bukan INTEGER untuk ID.</strong> SERIAL otomatis auto-increment. Di PostgreSQL modern gunakan GENERATED ALWAYS AS IDENTITY.</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan Struktur DB</h4><ol>
<li>Buat database 'perpustakaan' dengan tabel: buku, anggota, peminjaman.</li>
<li>Tambahkan constraint yang tepat (NOT NULL, UNIQUE, CHECK).</li>
<li>Buat relasi foreign key antara peminjaman → buku dan anggota.</li>
<li>Tambahkan kolom created_at dan updated_at dengan DEFAULT NOW().</li>
<li>Lihat struktur tabel dengan perintah \d nama_tabel.</li></ol></div>`
  }},
  {num:"S2",title:"CRUD",subtitle:"Create, Read, Update, Delete — operasi dasar database",type:"sql",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="concept-box"><p>CRUD adalah empat operasi dasar database yang wajib dikuasai. Semua aplikasi pada dasarnya melakukan salah satu dari empat ini.</p>
<ul><li><strong>CREATE</strong> — INSERT INTO: menambah data baru</li>
<li><strong>READ</strong> — SELECT: membaca/query data</li>
<li><strong>UPDATE</strong> — UPDATE SET: mengubah data</li>
<li><strong>DELETE</strong> — DELETE FROM: menghapus data</li></ul></div>`,
    "Contoh":`<div class="code-block" data-lang="sql"><span class="comment">-- CREATE: Insert satu baris</span>
<span class="kw">INSERT INTO</span> customers (nama, email, kota)
<span class="kw">VALUES</span> (<span class="str">'Andi Pratama'</span>, <span class="str">'andi@email.com'</span>, <span class="str">'Jakarta'</span>);

<span class="comment">-- INSERT banyak sekaligus</span>
<span class="kw">INSERT INTO</span> products (nama, harga, stok, kategori)
<span class="kw">VALUES</span>
    (<span class="str">'Laptop Gaming'</span>, <span class="num">15000000</span>, <span class="num">10</span>, <span class="str">'Elektronik'</span>),
    (<span class="str">'Mouse Wireless'</span>, <span class="num">350000</span>, <span class="num">50</span>, <span class="str">'Aksesori'</span>),
    (<span class="str">'Keyboard Mekanikal'</span>, <span class="num">1200000</span>, <span class="num">25</span>, <span class="str">'Aksesori'</span>);

<span class="comment">-- READ: Select basic</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> customers;
<span class="kw">SELECT</span> nama, email <span class="kw">FROM</span> customers;

<span class="comment">-- UPDATE: ubah data</span>
<span class="kw">UPDATE</span> products
<span class="kw">SET</span> harga = <span class="num">14500000</span>, stok = stok - <span class="num">1</span>
<span class="kw">WHERE</span> id = <span class="num">1</span>;

<span class="comment">-- DELETE: hapus data</span>
<span class="kw">DELETE FROM</span> customers
<span class="kw">WHERE</span> id = <span class="num">5</span>;

<span class="comment">-- RETURNING — ambil data setelah operasi</span>
<span class="kw">INSERT INTO</span> customers (nama, email)
<span class="kw">VALUES</span> (<span class="str">'Budi'</span>, <span class="str">'budi@email.com'</span>)
<span class="kw">RETURNING</span> id, created_at;</div>`,
    "Real Case":`<div class="case-card"><div class="case-header sql-header"><span class="badge badge-teal">Case</span> Proses transaksi pembelian</div><div class="case-body">
<div class="code-block" data-lang="sql"><span class="comment">-- Insert order baru dan update stok sekaligus</span>
<span class="kw">INSERT INTO</span> orders (customer_id, product_id, qty, total)
<span class="kw">SELECT</span> <span class="num">1</span>, <span class="num">1</span>, <span class="num">2</span>, harga * <span class="num">2</span>
<span class="kw">FROM</span> products <span class="kw">WHERE</span> id = <span class="num">1</span>
<span class="kw">RETURNING</span> id;

<span class="kw">UPDATE</span> products
<span class="kw">SET</span> stok = stok - <span class="num">2</span>
<span class="kw">WHERE</span> id = <span class="num">1</span> <span class="kw">AND</span> stok >= <span class="num">2</span>;

<span class="comment">-- UPSERT: insert atau update jika sudah ada</span>
<span class="kw">INSERT INTO</span> customers (email, nama, kota)
<span class="kw">VALUES</span> (<span class="str">'andi@email.com'</span>, <span class="str">'Andi Updated'</span>, <span class="str">'Bandung'</span>)
<span class="kw">ON CONFLICT</span> (email)
<span class="kw">DO UPDATE SET</span> nama=EXCLUDED.nama, kota=EXCLUDED.kota;</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>UPDATE/DELETE tanpa WHERE — bencana!</strong> Selalu test dengan SELECT dulu sebelum UPDATE/DELETE.</p></div>
<div class="warning-box"><p><strong>Lupa COMMIT setelah operasi dalam transaction.</strong> Data tidak tersimpan permanen sampai COMMIT dipanggil.</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan CRUD</h4><ol>
<li>Insert 5 buku ke tabel buku perpustakaan.</li>
<li>Select semua buku dengan RETURNING id.</li>
<li>Update stok buku tertentu.</li>
<li>Delete buku yang stoknya 0.</li>
<li>Coba UPSERT: insert anggota, jika email sudah ada maka update nama.</li></ol></div>`
  }},
  {num:"S3",title:"Filtering & Sorting",subtitle:"WHERE, ORDER BY, LIMIT, LIKE, IN, BETWEEN",type:"sql",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="concept-box"><p>Filtering dengan WHERE adalah inti dari SQL. PostgreSQL mendukung berbagai operator dan fungsi untuk filter yang sangat fleksibel.</p></div>
<table class="mini"><tr><th>Operator</th><th>Contoh</th></tr>
<tr><td>=, !=, &lt;, &gt;, &lt;=, &gt;=</td><td>WHERE harga &gt; 100000</td></tr>
<tr><td>AND, OR, NOT</td><td>WHERE x > 5 AND y &lt; 10</td></tr>
<tr><td>BETWEEN</td><td>WHERE harga BETWEEN 100 AND 500</td></tr>
<tr><td>IN</td><td>WHERE kota IN ('Jakarta','Bandung')</td></tr>
<tr><td>LIKE / ILIKE</td><td>WHERE nama ILIKE '%andi%'</td></tr>
<tr><td>IS NULL / IS NOT NULL</td><td>WHERE email IS NOT NULL</td></tr></table>`,
    "Contoh":`<div class="code-block" data-lang="sql"><span class="comment">-- Filter dasar</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> products
<span class="kw">WHERE</span> harga > <span class="num">1000000</span>
  <span class="kw">AND</span> stok > <span class="num">0</span>
  <span class="kw">AND</span> kategori = <span class="str">'Elektronik'</span>;

<span class="comment">-- LIKE (case-sensitive) vs ILIKE (case-insensitive)</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> customers
<span class="kw">WHERE</span> nama <span class="kw">ILIKE</span> <span class="str">'%andi%'</span>;  <span class="comment">-- cocok: Andi, ANDI, andi</span>

<span class="comment">-- IN dan BETWEEN</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> products
<span class="kw">WHERE</span> kategori <span class="kw">IN</span> (<span class="str">'Elektronik'</span>, <span class="str">'Aksesori'</span>)
  <span class="kw">AND</span> harga <span class="kw">BETWEEN</span> <span class="num">500000</span> <span class="kw">AND</span> <span class="num">5000000</span>;

<span class="comment">-- ORDER BY + LIMIT</span>
<span class="kw">SELECT</span> nama, harga <span class="kw">FROM</span> products
<span class="kw">ORDER BY</span> harga <span class="kw">DESC</span>
<span class="kw">LIMIT</span> <span class="num">10</span> <span class="kw">OFFSET</span> <span class="num">20</span>;  <span class="comment">-- halaman 3 (halaman ke-3 = offset 20)</span>

<span class="comment">-- NULL handling</span>
<span class="kw">SELECT</span> nama, <span class="fn">COALESCE</span>(kota, <span class="str">'Tidak Diketahui'</span>) <span class="kw">AS</span> kota
<span class="kw">FROM</span> customers;</div>`,
    "Real Case":`<div class="case-card"><div class="case-header sql-header"><span class="badge badge-teal">Case</span> Pencarian produk di e-commerce</div><div class="case-body">
<div class="code-block" data-lang="sql"><span class="kw">SELECT</span>
    p.nama,
    p.harga,
    p.stok,
    <span class="fn">CASE</span>
        <span class="kw">WHEN</span> p.stok = <span class="num">0</span>     <span class="kw">THEN</span> <span class="str">'Habis'</span>
        <span class="kw">WHEN</span> p.stok &lt; <span class="num">5</span>    <span class="kw">THEN</span> <span class="str">'Hampir Habis'</span>
        <span class="kw">ELSE</span> <span class="str">'Tersedia'</span>
    <span class="kw">END</span> <span class="kw">AS</span> status_stok
<span class="kw">FROM</span> products p
<span class="kw">WHERE</span> p.nama <span class="kw">ILIKE</span> <span class="str">'%laptop%'</span>
  <span class="kw">AND</span> p.harga <span class="kw">BETWEEN</span> <span class="num">5000000</span> <span class="kw">AND</span> <span class="num">20000000</span>
<span class="kw">ORDER BY</span> p.harga <span class="kw">ASC</span>
<span class="kw">LIMIT</span> <span class="num">20</span>;</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>= NULL vs IS NULL</strong> — WHERE kota = NULL tidak pernah TRUE! Gunakan IS NULL.</p></div>
<div class="warning-box"><p><strong>LIKE '%term%' lambat pada data besar!</strong> Untuk pencarian teks penuh, gunakan Full Text Search (tsvector).</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan Filtering</h4><ol>
<li>Cari semua produk dengan harga di atas rata-rata.</li>
<li>Filter pelanggan dari Jakarta atau Bandung yang email-nya tidak null.</li>
<li>Tampilkan 5 produk termahal per kategori.</li>
<li>Gunakan CASE untuk label harga: Murah/Menengah/Mahal.</li>
<li>Cari buku yang judulnya mengandung kata 'data' (case-insensitive).</li></ol></div>`
  }},
  {num:"S4",title:"Aggregation & Group By",subtitle:"COUNT, SUM, AVG, MIN, MAX, HAVING",type:"sql",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="concept-box"><p>Fungsi agregasi merangkum banyak baris menjadi satu nilai. GROUP BY memisahkan data per kategori sebelum agregasi. HAVING adalah WHERE untuk hasil agregasi.</p></div>
<table class="mini"><tr><th>Fungsi</th><th>Kegunaan</th></tr>
<tr><td>COUNT(*)</td><td>Hitung semua baris</td></tr>
<tr><td>COUNT(col)</td><td>Hitung non-NULL</td></tr>
<tr><td>COUNT(DISTINCT col)</td><td>Hitung nilai unik</td></tr>
<tr><td>SUM(col)</td><td>Total</td></tr>
<tr><td>AVG(col)</td><td>Rata-rata</td></tr>
<tr><td>MIN / MAX</td><td>Nilai terkecil/terbesar</td></tr>
<tr><td>STRING_AGG(col, ',')</td><td>Gabungkan teks</td></tr></table>`,
    "Contoh":`<div class="code-block" data-lang="sql"><span class="comment">-- Agregasi dasar</span>
<span class="kw">SELECT</span>
    <span class="fn">COUNT</span>(*) <span class="kw">AS</span> total_produk,
    <span class="fn">SUM</span>(stok) <span class="kw">AS</span> total_stok,
    <span class="fn">AVG</span>(harga) <span class="kw">AS</span> rata_harga,
    <span class="fn">MIN</span>(harga) <span class="kw">AS</span> harga_min,
    <span class="fn">MAX</span>(harga) <span class="kw">AS</span> harga_max
<span class="kw">FROM</span> products;

<span class="comment">-- GROUP BY + HAVING</span>
<span class="kw">SELECT</span>
    kategori,
    <span class="fn">COUNT</span>(*) <span class="kw">AS</span> jumlah,
    <span class="fn">ROUND</span>(<span class="fn">AVG</span>(harga),<span class="num">0</span>) <span class="kw">AS</span> avg_harga,
    <span class="fn">SUM</span>(stok * harga) <span class="kw">AS</span> total_nilai_stok
<span class="kw">FROM</span> products
<span class="kw">GROUP BY</span> kategori
<span class="kw">HAVING</span> <span class="fn">COUNT</span>(*) >= <span class="num">3</span>        <span class="comment">-- hanya kategori dengan 3+ produk</span>
<span class="kw">ORDER BY</span> total_nilai_stok <span class="kw">DESC</span>;</div>`,
    "Real Case":`<div class="case-card"><div class="case-header sql-header"><span class="badge badge-teal">Case</span> Laporan penjualan per bulan per kategori</div><div class="case-body">
<div class="code-block" data-lang="sql"><span class="kw">SELECT</span>
    <span class="fn">DATE_TRUNC</span>(<span class="str">'month'</span>, o.order_date) <span class="kw">AS</span> bulan,
    p.kategori,
    <span class="fn">COUNT</span>(o.id) <span class="kw">AS</span> total_order,
    <span class="fn">SUM</span>(o.total) <span class="kw">AS</span> total_revenue,
    <span class="fn">ROUND</span>(<span class="fn">AVG</span>(o.total),<span class="num">0</span>) <span class="kw">AS</span> avg_order,
    <span class="fn">COUNT</span>(<span class="kw">DISTINCT</span> o.customer_id) <span class="kw">AS</span> unique_customers
<span class="kw">FROM</span> orders o
<span class="kw">JOIN</span> products p <span class="kw">ON</span> o.product_id = p.id
<span class="kw">WHERE</span> o.order_date >= <span class="str">'2024-01-01'</span>
<span class="kw">GROUP BY</span> <span class="num">1</span>, <span class="num">2</span>
<span class="kw">ORDER BY</span> <span class="num">1</span>, total_revenue <span class="kw">DESC</span>;</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Kolom di SELECT harus di GROUP BY</strong> (kecuali yang di dalam fungsi agregasi). Jika tidak, PostgreSQL error.</p></div>
<div class="warning-box"><p><strong>HAVING vs WHERE</strong> — WHERE filter SEBELUM agregasi, HAVING filter SETELAH. Jangan pakai HAVING untuk filter baris biasa (lebih lambat).</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan Aggregation</h4><ol>
<li>Hitung total revenue, rata-rata order, dan customer unik per bulan.</li>
<li>Temukan kategori dengan rata-rata harga di atas 500.000.</li>
<li>Tampilkan top 5 produk terlaris berdasarkan total qty.</li>
<li>Buat laporan: berapa % kontribusi tiap kategori ke total revenue?</li>
<li>Gunakan STRING_AGG untuk daftar produk per kategori dalam satu baris.</li></ol></div>`
  }},
  {num:"S5",title:"JOIN",subtitle:"INNER, LEFT, RIGHT, FULL OUTER, SELF JOIN",type:"sql",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="concept-box"><p>JOIN menggabungkan data dari dua tabel berdasarkan kondisi (biasanya primary key = foreign key).</p></div>
<table class="mini"><tr><th>Tipe JOIN</th><th>Hasil</th></tr>
<tr><td>INNER JOIN</td><td>Hanya baris yang cocok di KEDUA tabel</td></tr>
<tr><td>LEFT JOIN</td><td>Semua baris kiri + cocok di kanan (NULL jika tidak ada)</td></tr>
<tr><td>RIGHT JOIN</td><td>Semua baris kanan + cocok di kiri</td></tr>
<tr><td>FULL OUTER JOIN</td><td>Semua baris dari kedua tabel</td></tr>
<tr><td>CROSS JOIN</td><td>Semua kombinasi (kartesian)</td></tr>
<tr><td>SELF JOIN</td><td>Tabel join dengan dirinya sendiri</td></tr></table>`,
    "Contoh":`<div class="code-block" data-lang="sql"><span class="comment">-- INNER JOIN: hanya order yang punya customer & product valid</span>
<span class="kw">SELECT</span>
    o.id, c.nama <span class="kw">AS</span> customer,
    p.nama <span class="kw">AS</span> produk, o.qty, o.total
<span class="kw">FROM</span> orders o
<span class="kw">INNER JOIN</span> customers c <span class="kw">ON</span> o.customer_id = c.id
<span class="kw">INNER JOIN</span> products  p <span class="kw">ON</span> o.product_id  = p.id;

<span class="comment">-- LEFT JOIN: semua customer, termasuk yang belum pernah order</span>
<span class="kw">SELECT</span>
    c.nama,
    <span class="fn">COUNT</span>(o.id) <span class="kw">AS</span> total_order,
    <span class="fn">COALESCE</span>(<span class="fn">SUM</span>(o.total), <span class="num">0</span>) <span class="kw">AS</span> total_belanja
<span class="kw">FROM</span> customers c
<span class="kw">LEFT JOIN</span> orders o <span class="kw">ON</span> c.id = o.customer_id
<span class="kw">GROUP BY</span> c.id, c.nama
<span class="kw">ORDER BY</span> total_belanja <span class="kw">DESC</span>;

<span class="comment">-- SELF JOIN: cari karyawan beserta nama manajernya</span>
<span class="kw">SELECT</span>
    e.nama <span class="kw">AS</span> karyawan,
    m.nama <span class="kw">AS</span> manajer
<span class="kw">FROM</span> employees e
<span class="kw">LEFT JOIN</span> employees m <span class="kw">ON</span> e.manager_id = m.id;</div>`,
    "Real Case":`<div class="case-card"><div class="case-header sql-header"><span class="badge badge-teal">Case</span> Laporan order lengkap dari 4 tabel</div><div class="case-body">
<div class="code-block" data-lang="sql"><span class="kw">SELECT</span>
    o.id <span class="kw">AS</span> order_id,
    c.nama <span class="kw">AS</span> customer,
    c.kota,
    p.nama <span class="kw">AS</span> produk,
    p.kategori,
    o.qty,
    o.total,
    o.status,
    o.order_date::DATE <span class="kw">AS</span> tanggal
<span class="kw">FROM</span> orders o
<span class="kw">JOIN</span> customers c <span class="kw">ON</span> o.customer_id = c.id
<span class="kw">JOIN</span> products  p <span class="kw">ON</span> o.product_id  = p.id
<span class="kw">WHERE</span> o.order_date >= <span class="fn">NOW</span>() - <span class="kw">INTERVAL</span> <span class="str">'30 days'</span>
  <span class="kw">AND</span> o.status != <span class="str">'cancelled'</span>
<span class="kw">ORDER BY</span> o.order_date <span class="kw">DESC</span>;</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Lupa kondisi ON → CROSS JOIN!</strong> Setiap baris di tabel kiri dikombinasikan dengan semua baris di kanan. Bisa menghasilkan jutaan baris.</p></div>
<div class="warning-box"><p><strong>Ambiguous column name.</strong> Jika dua tabel punya kolom sama (misal 'id'), selalu prefix dengan alias: o.id bukan hanya id.</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan JOIN</h4><ol>
<li>Tampilkan semua peminjaman beserta nama anggota dan judul buku.</li>
<li>Cari anggota yang BELUM pernah meminjam buku (gunakan LEFT JOIN + IS NULL).</li>
<li>Hitung total buku yang dipinjam per anggota.</li>
<li>SELF JOIN: tampilkan buku beserta buku lain di kategori yang sama.</li>
<li>FULL OUTER JOIN: temukan buku tanpa peminjam DAN anggota tanpa peminjaman.</li></ol></div>`
  }},
  {num:"S6",title:"Index & Optimasi",subtitle:"Percepat query dengan index yang tepat",type:"sql",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="concept-box"><p>Index adalah struktur data tambahan yang mempercepat pencarian — seperti indeks di buku. Tanpa index, PostgreSQL melakukan <strong>Sequential Scan</strong> (baca semua baris). Dengan index, ia melakukan <strong>Index Scan</strong> (langsung ke baris yang relevan).</p>
<ul><li><strong>B-tree</strong>: default, cocok untuk =, &lt;, &gt;, BETWEEN, LIKE 'prefix%'</li>
<li><strong>Hash</strong>: hanya untuk = (lebih cepat untuk equality)</li>
<li><strong>GiST / GIN</strong>: untuk full-text search, array, JSON</li></ul></div>`,
    "Contoh":`<div class="code-block" data-lang="sql"><span class="comment">-- Lihat query plan SEBELUM index</span>
<span class="kw">EXPLAIN ANALYZE</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> orders <span class="kw">WHERE</span> customer_id = <span class="num">42</span>;
<span class="comment">-- Seq Scan on orders (cost=0.00..2842.00 rows=3 ...)</span>

<span class="comment">-- Buat index</span>
<span class="kw">CREATE INDEX</span> idx_orders_customer <span class="kw">ON</span> orders(customer_id);
<span class="kw">CREATE INDEX</span> idx_orders_date     <span class="kw">ON</span> orders(order_date);

<span class="comment">-- Composite index — urutan PENTING!</span>
<span class="kw">CREATE INDEX</span> idx_orders_customer_date
    <span class="kw">ON</span> orders(customer_id, order_date);

<span class="comment">-- Setelah index</span>
<span class="kw">EXPLAIN ANALYZE</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> orders <span class="kw">WHERE</span> customer_id = <span class="num">42</span>;
<span class="comment">-- Index Scan using idx_orders_customer ... (jauh lebih cepat!)</span>

<span class="comment">-- Partial index — hanya index baris yang memenuhi kondisi</span>
<span class="kw">CREATE INDEX</span> idx_orders_pending
    <span class="kw">ON</span> orders(order_date)
    <span class="kw">WHERE</span> status = <span class="str">'pending'</span>;

<span class="comment">-- Lihat semua index di tabel</span>
<span class="kw">SELECT</span> indexname, indexdef
<span class="kw">FROM</span> pg_indexes
<span class="kw">WHERE</span> tablename = <span class="str">'orders'</span>;</div>`,
    "Real Case":`<div class="case-card"><div class="case-header sql-header"><span class="badge badge-teal">Case</span> Optimasi query laporan penjualan</div><div class="case-body">
<div class="code-block" data-lang="sql"><span class="comment">-- Query lambat: join 3 tabel + filter tanggal</span>
<span class="kw">EXPLAIN ANALYZE</span>
<span class="kw">SELECT</span> p.kategori, <span class="fn">SUM</span>(o.total)
<span class="kw">FROM</span> orders o <span class="kw">JOIN</span> products p <span class="kw">ON</span> o.product_id = p.id
<span class="kw">WHERE</span> o.order_date >= <span class="str">'2024-01-01'</span>
<span class="kw">GROUP BY</span> p.kategori;

<span class="comment">-- Solusi: index pada kolom yang di-filter dan di-join</span>
<span class="kw">CREATE INDEX</span> idx_orders_product_date
    <span class="kw">ON</span> orders(product_id, order_date);

<span class="comment">-- Partial index untuk query yang sering</span>
<span class="kw">CREATE INDEX</span> idx_orders_2024
    <span class="kw">ON</span> orders(order_date, product_id)
    <span class="kw">WHERE</span> order_date >= <span class="str">'2024-01-01'</span>;</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Index terlalu banyak → INSERT/UPDATE jadi lambat!</strong> Setiap index harus diupdate saat data berubah. Buat hanya index yang benar-benar dipakai.</p></div>
<div class="warning-box"><p><strong>LIKE '%kata%' tidak bisa pakai B-tree index!</strong> Wildcard di awal (%) membuat index tidak dipakai. Gunakan Full Text Search atau pg_trgm untuk ini.</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan Index</h4><ol>
<li>Gunakan EXPLAIN ANALYZE pada query JOIN yang lambat.</li>
<li>Buat index yang tepat dan jalankan ulang — bandingkan cost-nya.</li>
<li>Buat composite index untuk query yang filter 2 kolom sekaligus.</li>
<li>Buat partial index untuk baris dengan status 'active' saja.</li>
<li>Lihat semua index di tabel dengan pg_indexes.</li></ol></div>`
  }},
  {num:"S7",title:"Transaction",subtitle:"ACID — konsistensi data yang terjamin",type:"sql",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="concept-box"><p>Transaction adalah sekelompok operasi yang dijalankan sebagai satu unit. Jika satu gagal, semua dibatalkan (ROLLBACK). Jika semua berhasil, tersimpan (COMMIT).</p>
<ul><li><strong>Atomicity</strong>: semua atau tidak sama sekali</li>
<li><strong>Consistency</strong>: data selalu dalam kondisi valid</li>
<li><strong>Isolation</strong>: transaction tidak saling interferensi</li>
<li><strong>Durability</strong>: data tersimpan permanen setelah COMMIT</li></ul></div>`,
    "Contoh":`<div class="code-block" data-lang="sql"><span class="comment">-- Contoh transfer uang — atomik!</span>
<span class="kw">BEGIN</span>;

<span class="kw">UPDATE</span> accounts
<span class="kw">SET</span> balance = balance - <span class="num">500000</span>
<span class="kw">WHERE</span> id = <span class="num">1</span> <span class="kw">AND</span> balance >= <span class="num">500000</span>;

<span class="comment">-- Cek apakah debit berhasil</span>
<span class="kw">DO</span> $$
<span class="kw">BEGIN</span>
    <span class="kw">IF NOT FOUND THEN</span>
        <span class="kw">RAISE EXCEPTION</span> <span class="str">'Saldo tidak cukup'</span>;
    <span class="kw">END IF</span>;
<span class="kw">END</span> $$;

<span class="kw">UPDATE</span> accounts
<span class="kw">SET</span> balance = balance + <span class="num">500000</span>
<span class="kw">WHERE</span> id = <span class="num">2</span>;

<span class="kw">INSERT INTO</span> transfer_log (from_id, to_id, amount)
<span class="kw">VALUES</span> (<span class="num">1</span>, <span class="num">2</span>, <span class="num">500000</span>);

<span class="kw">COMMIT</span>;  <span class="comment">-- semua tersimpan</span>

<span class="comment">-- Jika ada error → rollback otomatis atau manual</span>
<span class="kw">ROLLBACK</span>;

<span class="comment">-- SAVEPOINT — rollback sebagian</span>
<span class="kw">BEGIN</span>;
<span class="kw">INSERT INTO</span> orders ... ;
<span class="kw">SAVEPOINT</span> sp1;
<span class="kw">UPDATE</span> products ... ;
<span class="comment">-- Jika update gagal, rollback ke savepoint saja</span>
<span class="kw">ROLLBACK TO</span> sp1;
<span class="kw">COMMIT</span>;</div>`,
    "Real Case":`<div class="case-card"><div class="case-header sql-header"><span class="badge badge-teal">Case</span> Proses checkout yang aman</div><div class="case-body">
<div class="code-block" data-lang="sql"><span class="kw">BEGIN</span>;

<span class="comment">-- 1. Cek & kurangi stok (lock baris)</span>
<span class="kw">UPDATE</span> products
<span class="kw">SET</span> stok = stok - <span class="num">2</span>
<span class="kw">WHERE</span> id = <span class="num">1</span> <span class="kw">AND</span> stok >= <span class="num">2</span>;

<span class="comment">-- 2. Buat order</span>
<span class="kw">INSERT INTO</span> orders (customer_id, product_id, qty, total, status)
<span class="kw">SELECT</span> <span class="num">5</span>, <span class="num">1</span>, <span class="num">2</span>, harga*<span class="num">2</span>, <span class="str">'paid'</span>
<span class="kw">FROM</span> products <span class="kw">WHERE</span> id = <span class="num">1</span>
<span class="kw">RETURNING</span> id;

<span class="comment">-- 3. Catat pembayaran</span>
<span class="kw">INSERT INTO</span> payments (order_id, amount, method)
<span class="kw">VALUES</span> (currval(<span class="str">'orders_id_seq'</span>), <span class="num">30000000</span>, <span class="str">'transfer'</span>);

<span class="kw">COMMIT</span>;</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Lupa COMMIT!</strong> Data tidak tersimpan. Selalu tutup transaction dengan COMMIT atau ROLLBACK.</p></div>
<div class="warning-box"><p><strong>Transaction terlalu panjang → DEADLOCK!</strong> Jaga transaction sesingkat mungkin. Lock baris yang sama dari 2 session berbeda bisa deadlock.</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan Transaction</h4><ol>
<li>Buat transaction: pinjam buku (kurangi stok + insert peminjaman).</li>
<li>Simulasikan kegagalan — pastikan ROLLBACK berjalan.</li>
<li>Gunakan SAVEPOINT untuk multi-step process.</li>
<li>Coba buat dua session yang saling lock — amati deadlock.</li></ol></div>`
  }},
  {num:"S8",title:"Subquery & CASE",subtitle:"Nested queries, CTE, CASE WHEN, Window Functions",type:"sql",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="concept-box"><p>Subquery adalah query di dalam query. CTE (Common Table Expression) dengan WITH membuat kode lebih readable. Window Functions melakukan agregasi tanpa menghilangkan baris.</p></div>
<table class="mini"><tr><th>Teknik</th><th>Kegunaan</th></tr>
<tr><td>Subquery (WHERE)</td><td>Filter berdasarkan hasil query lain</td></tr>
<tr><td>Subquery (FROM)</td><td>Query dari tabel virtual</td></tr>
<tr><td>CTE (WITH)</td><td>Named subquery, lebih readable</td></tr>
<tr><td>CASE WHEN</td><td>Logika kondisional dalam query</td></tr>
<tr><td>Window Functions</td><td>ROW_NUMBER, RANK, LAG, LEAD, SUM OVER</td></tr></table>`,
    "Contoh":`<div class="code-block" data-lang="sql"><span class="comment">-- Subquery di WHERE</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> products
<span class="kw">WHERE</span> harga > (<span class="kw">SELECT</span> <span class="fn">AVG</span>(harga) <span class="kw">FROM</span> products);

<span class="comment">-- CTE (WITH) — lebih readable</span>
<span class="kw">WITH</span> avg_per_kategori <span class="kw">AS</span> (
    <span class="kw">SELECT</span> kategori, <span class="fn">AVG</span>(harga) <span class="kw">AS</span> avg_harga
    <span class="kw">FROM</span> products <span class="kw">GROUP BY</span> kategori
)
<span class="kw">SELECT</span> p.*, a.avg_harga,
    p.harga - a.avg_harga <span class="kw">AS</span> diff_dari_avg
<span class="kw">FROM</span> products p
<span class="kw">JOIN</span> avg_per_kategori a <span class="kw">ON</span> p.kategori = a.kategori;

<span class="comment">-- CASE WHEN</span>
<span class="kw">SELECT</span> nama, harga,
    <span class="fn">CASE</span>
        <span class="kw">WHEN</span> harga &lt; <span class="num">100000</span>  <span class="kw">THEN</span> <span class="str">'Budget'</span>
        <span class="kw">WHEN</span> harga &lt; <span class="num">1000000</span> <span class="kw">THEN</span> <span class="str">'Mid-range'</span>
        <span class="kw">ELSE</span> <span class="str">'Premium'</span>
    <span class="kw">END</span> <span class="kw">AS</span> segmen
<span class="kw">FROM</span> products;

<span class="comment">-- WINDOW FUNCTIONS</span>
<span class="kw">SELECT</span>
    nama, kategori, harga,
    <span class="fn">RANK</span>() <span class="kw">OVER</span> (<span class="kw">PARTITION BY</span> kategori <span class="kw">ORDER BY</span> harga <span class="kw">DESC</span>) <span class="kw">AS</span> rank_harga,
    <span class="fn">SUM</span>(harga) <span class="kw">OVER</span> (<span class="kw">PARTITION BY</span> kategori) <span class="kw">AS</span> total_kategori,
    <span class="fn">LAG</span>(harga) <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> id) <span class="kw">AS</span> harga_sebelumnya
<span class="kw">FROM</span> products;</div>`,
    "Real Case":`<div class="case-card"><div class="case-header sql-header"><span class="badge badge-teal">Case</span> Dashboard executive: top customers & growth</div><div class="case-body">
<div class="code-block" data-lang="sql"><span class="kw">WITH</span>
monthly_revenue <span class="kw">AS</span> (
    <span class="kw">SELECT</span>
        <span class="fn">DATE_TRUNC</span>(<span class="str">'month'</span>, order_date) <span class="kw">AS</span> bulan,
        <span class="fn">SUM</span>(total) <span class="kw">AS</span> revenue
    <span class="kw">FROM</span> orders <span class="kw">GROUP BY</span> <span class="num">1</span>
),
revenue_growth <span class="kw">AS</span> (
    <span class="kw">SELECT</span> bulan, revenue,
        <span class="fn">LAG</span>(revenue) <span class="kw">OVER</span> (<span class="kw">ORDER BY</span> bulan) <span class="kw">AS</span> prev_revenue
    <span class="kw">FROM</span> monthly_revenue
)
<span class="kw">SELECT</span>
    bulan,
    revenue,
    prev_revenue,
    <span class="fn">ROUND</span>((revenue - prev_revenue) / prev_revenue * <span class="num">100</span>, <span class="num">1</span>) <span class="kw">AS</span> growth_pct,
    <span class="fn">CASE</span>
        <span class="kw">WHEN</span> revenue > prev_revenue <span class="kw">THEN</span> <span class="str">'↑ Naik'</span>
        <span class="kw">WHEN</span> revenue &lt; prev_revenue <span class="kw">THEN</span> <span class="str">'↓ Turun'</span>
        <span class="kw">ELSE</span> <span class="str">'→ Sama'</span>
    <span class="kw">END</span> <span class="kw">AS</span> tren
<span class="kw">FROM</span> revenue_growth
<span class="kw">ORDER BY</span> bulan;</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Subquery korelatif sangat lambat!</strong> Subquery yang referensikan tabel luar dijalankan per baris. Ganti dengan JOIN atau CTE bila memungkinkan.</p></div>
<div class="warning-box"><p><strong>Window Function tidak bisa di WHERE!</strong> Bungkus dalam subquery atau CTE dulu, baru filter.</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan Subquery & CASE</h4><ol>
<li>Tampilkan produk dengan harga di atas rata-rata per kategori menggunakan CTE.</li>
<li>Rank pelanggan berdasarkan total belanja dengan RANK() OVER.</li>
<li>Hitung growth revenue bulan ke bulan dengan LAG().</li>
<li>CASE WHEN: buat label 'VIP' (total > 10jt), 'Regular' (> 1jt), 'New' (lainnya).</li>
<li>Gunakan WITH RECURSIVE untuk membuat hierarki kategori.</li></ol></div>`
  }}
];

