const pandasChapters = [
  {num:"01",title:"Series",subtitle:"Array 1D berlabel — fondasi semua operasi Pandas",type:"pandas",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="section-label">Apa itu Series?</div>
<div class="concept-box"><p>Series adalah array 1 dimensi berlabel. Bayangkan seperti kolom di Excel — setiap baris punya <strong>indeks</strong> dan <strong>nilai</strong>. Bisa menyimpan integer, float, string, bahkan Python object.</p>
<ul><li>Index bisa angka (0,1,2...) atau label custom ('jan','feb'...)</li>
<li>Semua elemen bertipe sama (homogeneous)</li>
<li>Ukurannya immutable setelah dibuat</li></ul></div>
<div class="code-block" data-lang="python"><span class="kw">import</span> pandas <span class="kw">as</span> pd

<span class="comment"># 1. Dari list</span>
s1 = pd.Series([<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>, <span class="num">40</span>])

<span class="comment"># 2. Dari dict — keys jadi index</span>
s2 = pd.Series({<span class="str">'jan'</span>: <span class="num">100</span>, <span class="str">'feb'</span>: <span class="num">150</span>, <span class="str">'mar'</span>: <span class="num">200</span>})

<span class="comment"># 3. Index custom</span>
s3 = pd.Series([<span class="num">85</span>, <span class="num">92</span>, <span class="num">78</span>], index=[<span class="str">'Matematika'</span>, <span class="str">'IPA'</span>, <span class="str">'IPS'</span>])

print(s3[<span class="str">'IPA'</span>])    <span class="comment"># → 92</span>
print(s3.iloc[<span class="num">1</span>])  <span class="comment"># → 92</span></div>`,
    "Contoh":`<div class="code-block" data-lang="python">nilai = pd.Series([<span class="num">85</span>,<span class="num">92</span>,<span class="num">78</span>,<span class="num">95</span>,<span class="num">88</span>],
                  index=[<span class="str">'Andi'</span>,<span class="str">'Budi'</span>,<span class="str">'Cita'</span>,<span class="str">'Dina'</span>,<span class="str">'Eva'</span>])

print(nilai.mean())   <span class="comment"># 87.6</span>
print(nilai.max())    <span class="comment"># 95</span>
lulus = nilai[nilai >= <span class="num">80</span>]
nilai_bonus = nilai + <span class="num">5</span></div>
<div class="output-label">▸ Output lulus</div>
<div class="output-box">Andi    85
Budi    92
Dina    95
Eva     88
dtype: int64</div>
<table class="mini"><tr><th>Method</th><th>Fungsi</th></tr>
<tr><td>.value_counts()</td><td>Frekuensi tiap nilai</td></tr>
<tr><td>.sort_values()</td><td>Urutkan by nilai</td></tr>
<tr><td>.isnull()</td><td>Cek NaN</td></tr>
<tr><td>.apply(func)</td><td>Fungsi ke tiap elemen</td></tr></table>`,
    "Real Case":`<div class="case-card"><div class="case-header"><span class="badge badge-purple">Case</span> Analisis penjualan 12 bulan</div><div class="case-body">
<div class="code-block" data-lang="python">penjualan = pd.Series({
    <span class="str">'Jan'</span>:<span class="num">45000</span>, <span class="str">'Feb'</span>:<span class="num">52000</span>, <span class="str">'Mar'</span>:<span class="num">48000</span>,
    <span class="str">'Apr'</span>:<span class="num">61000</span>, <span class="str">'Mei'</span>:<span class="num">58000</span>, <span class="str">'Jun'</span>:<span class="num">72000</span>
})
target = <span class="num">60000</span>
print(f<span class="str">"Terbaik: {penjualan.idxmax()}"</span>)
bawah = penjualan[penjualan &lt; target]
growth = penjualan.pct_change() * <span class="num">100</span></div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Chained Indexing — berbahaya!</strong><br>s[s > 80][0] = 100 bisa gagal. Gunakan s.loc[s > 80] = 100</p></div>
<div class="warning-box"><p><strong>Operasi antar Series align by index!</strong><br>Jika index berbeda, hasilnya NaN. Selalu cek index sebelum operasi.</p></div>
<div class="warning-box"><p><strong>NaN comparison selalu False!</strong><br>Gunakan .isnull() bukan == None</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan Series</h4><ol>
<li>Buat Series nilai UAS 5 mata kuliah dengan nama sebagai index.</li>
<li>Hitung mean, max, min.</li>
<li>Filter nilai di atas rata-rata.</li>
<li>Tambah bonus 5 poin, cek yang di atas 100.</li>
<li>Konversi ke GPA (skala 0–4) dengan .apply().</li></ol></div>`
  }},
  {num:"02",title:"DataFrame",subtitle:"Tabel 2D — struktur data utama Pandas",type:"pandas",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="concept-box"><p>DataFrame adalah tabel 2D dengan baris dan kolom. Setiap kolom adalah Series. Baris punya index, kolom punya nama.</p>
<ul><li>Kolom bisa berbeda tipe (heterogeneous)</li><li>Efisien untuk ratusan ribu baris</li></ul></div>
<div class="code-block" data-lang="python">df = pd.DataFrame({
    <span class="str">'Nama'</span>: [<span class="str">'Andi'</span>, <span class="str">'Budi'</span>, <span class="str">'Cita'</span>],
    <span class="str">'Usia'</span>: [<span class="num">25</span>, <span class="num">30</span>, <span class="num">28</span>],
    <span class="str">'Gaji'</span>: [<span class="num">8500000</span>, <span class="num">12000000</span>, <span class="num">9500000</span>]
})
print(df.shape)    <span class="comment"># (3, 3)</span>
print(df.dtypes)</div>`,
    "Contoh":`<div class="code-block" data-lang="python"><span class="comment"># Akses kolom</span>
df[<span class="str">'Nama'</span>]              <span class="comment"># Series</span>
df[[<span class="str">'Nama'</span>, <span class="str">'Gaji'</span>]]   <span class="comment"># DataFrame</span>
df.iloc[<span class="num">0</span>]             <span class="comment"># baris pertama by posisi</span>
df.loc[<span class="num">0</span>]              <span class="comment"># baris pertama by label</span>

df[<span class="str">'Gaji_Juta'</span>] = df[<span class="str">'Gaji'</span>] / <span class="num">1_000_000</span>
df = df.drop(columns=[<span class="str">'Gaji_Juta'</span>])
df = df.rename(columns={<span class="str">'Nama'</span>: <span class="str">'name'</span>})</div>`,
    "Real Case":`<div class="case-card"><div class="case-header"><span class="badge badge-purple">Case</span> Dataset karyawan</div><div class="case-body">
<div class="code-block" data-lang="python">df_k = pd.DataFrame({
    <span class="str">'nama'</span>:[<span class="str">'Andi'</span>,<span class="str">'Budi'</span>,<span class="str">'Cita'</span>],
    <span class="str">'dept'</span>:[<span class="str">'IT'</span>,<span class="str">'HR'</span>,<span class="str">'IT'</span>],
    <span class="str">'gaji'</span>:[<span class="num">12</span>,<span class="num">8</span>,<span class="num">15</span>],
    <span class="str">'tahun_masuk'</span>:[<span class="num">2018</span>,<span class="num">2020</span>,<span class="num">2015</span>]
})
senior = df_k[df_k[<span class="str">'tahun_masuk'</span>] &lt;= <span class="num">2018</span>]
avg = df_k.groupby(<span class="str">'dept'</span>)[<span class="str">'gaji'</span>].mean()</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>df['col'] vs df[['col']]</strong><br>Satu kurung = Series, dua kurung = DataFrame.</p></div>
<div class="warning-box"><p><strong>drop() tidak ubah asli tanpa inplace atau reassign!</strong></p></div>
<div class="warning-box"><p><strong>.loc vs .iloc</strong><br>.loc = by label, .iloc = by posisi integer.</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan DataFrame</h4><ol>
<li>Buat DataFrame 5 produk: nama, harga, stok, kategori.</li>
<li>Tambah kolom total_nilai = harga × stok.</li>
<li>Filter stok &lt; 10.</li>
<li>Sort by harga descending.</li>
<li>Hapus kolom stok, rename nama → produk.</li></ol></div>`
  }},
  {num:"03",title:"Data Import",subtitle:"Baca data dari CSV, Excel, JSON, SQL",type:"pandas",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<table class="mini"><tr><th>Format</th><th>Baca</th><th>Simpan</th></tr>
<tr><td>CSV</td><td>pd.read_csv()</td><td>df.to_csv()</td></tr>
<tr><td>Excel</td><td>pd.read_excel()</td><td>df.to_excel()</td></tr>
<tr><td>JSON</td><td>pd.read_json()</td><td>df.to_json()</td></tr>
<tr><td>SQL</td><td>pd.read_sql()</td><td>df.to_sql()</td></tr>
<tr><td>Parquet</td><td>pd.read_parquet()</td><td>df.to_parquet()</td></tr></table>`,
    "Contoh":`<div class="code-block" data-lang="python">df = pd.read_csv(
    <span class="str">'data.csv'</span>,
    sep=<span class="str">';'</span>, encoding=<span class="str">'utf-8'</span>,
    index_col=<span class="str">'id'</span>,
    usecols=[<span class="str">'nama'</span>, <span class="str">'gaji'</span>],
    nrows=<span class="num">1000</span>,
    na_values=[<span class="str">'-'</span>, <span class="str">'N/A'</span>],
    dtype={<span class="str">'id'</span>: <span class="str">'int32'</span>}
)
df.to_csv(<span class="str">'output.csv'</span>, index=<span class="kw">False</span>)</div>`,
    "Real Case":`<div class="case-card"><div class="case-header"><span class="badge badge-purple">Case</span> Data legacy sistem lama</div><div class="case-body">
<div class="code-block" data-lang="python">df = pd.read_csv(
    <span class="str">'penjualan.csv'</span>,
    sep=<span class="str">';'</span>, encoding=<span class="str">'latin-1'</span>,
    skiprows=<span class="num">2</span>, dayfirst=<span class="kw">True</span>,
    decimal=<span class="str">','</span>, thousands=<span class="str">'.'</span>,
    parse_dates=[<span class="str">'tanggal'</span>]
)</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>UnicodeDecodeError?</strong> Coba: utf-8, latin-1, cp1252, utf-8-sig</p></div>
<div class="warning-box"><p><strong>Unnamed: 0 muncul?</strong> Tambahkan index=False saat to_csv()</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan Import</h4><ol>
<li>Download CSV dari Kaggle, baca dengan read_csv().</li>
<li>Cek shape, dtypes, isnull().sum().</li>
<li>Baca ulang hanya 500 baris dan 3 kolom.</li>
<li>Simpan subset ke 'subset.csv' tanpa index.</li></ol></div>`
  }},
  {num:"04",title:"Selection & Filtering",subtitle:"Pilih dan saring data dengan presisi",type:"pandas",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="two-col">
<div class="concept-box"><p><strong>.loc[]</strong> — by label, inklusif kedua ujung</p></div>
<div class="concept-box"><p><strong>.iloc[]</strong> — by posisi, eksklusif ujung kanan</p></div>
</div>
<div class="concept-box"><p><strong>Boolean Indexing</strong>: Masking True/False — paling sering dipakai!</p></div>`,
    "Contoh":`<div class="code-block" data-lang="python">senior = df[df[<span class="str">'usia'</span>] >= <span class="num">35</span>]
result = df[(df[<span class="str">'usia'</span>] >= <span class="num">30</span>) & (df[<span class="str">'gaji'</span>] > <span class="num">10e6</span>)]
result = df[df[<span class="str">'dept'</span>].isin([<span class="str">'IT'</span>, <span class="str">'Finance'</span>])]
bukan_it = df[~(df[<span class="str">'dept'</span>] == <span class="str">'IT'</span>)]
jakarta = df[df[<span class="str">'kota'</span>].str.contains(<span class="str">'Jakarta'</span>, na=<span class="kw">False</span>)]
hasil = df.query(<span class="str">"usia >= 30 and dept == 'IT'"</span>)</div>`,
    "Real Case":`<div class="case-card"><div class="case-header"><span class="badge badge-purple">Case</span> Segmentasi pelanggan premium</div><div class="case-body">
<div class="code-block" data-lang="python">from datetime <span class="kw">import</span> datetime, timedelta
cutoff = datetime.now() - timedelta(days=<span class="num">180</span>)
premium = df[(df[<span class="str">'total'</span>] > <span class="num">5_000_000</span>) &
             (df[<span class="str">'transaksi'</span>] >= <span class="num">3</span>) &
             (df[<span class="str">'last_order'</span>] >= cutoff)].copy()</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Lupa kurung di multiple conditions!</strong><br>df[(df['a'] > 5) & (df['b'] &lt; 10)] ← BENAR</p></div>
<div class="warning-box"><p><strong>Pakai 'and'/'or' Python → ValueError!</strong><br>Harus pakai & | ~ bukan and/or/not</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan Filtering</h4><ol>
<li>Filter karyawan usia 25-35 tahun.</li>
<li>Filter dept IT atau Engineering dengan gaji di atas rata-rata.</li>
<li>Gunakan .query() untuk nama mengandung 'a'.</li>
<li>Pilih hanya 3 kolom dari hasil filter.</li></ol></div>`
  }},
  {num:"05",title:"Aggregation",subtitle:"groupby, agg, transform — inti analisis data",type:"pandas",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="concept-box"><p><strong>Split–Apply–Combine</strong>: Split data by kategori → Apply fungsi → Combine hasilnya. Mirip "subtotal per kategori" di Excel.</p></div>
<div class="code-block" data-lang="python">df.groupby(<span class="str">'dept'</span>)[<span class="str">'gaji'</span>].mean()
df.groupby(<span class="str">'dept'</span>)[<span class="str">'gaji'</span>].agg([<span class="str">'mean'</span>,<span class="str">'max'</span>,<span class="str">'count'</span>])
df.groupby([<span class="str">'dept'</span>,<span class="str">'level'</span>])[<span class="str">'gaji'</span>].mean()</div>`,
    "Contoh":`<div class="code-block" data-lang="python">ringkasan = df.groupby(<span class="str">'dept'</span>).agg(
    gaji_rata    = (<span class="str">'gaji'</span>, <span class="str">'mean'</span>),
    gaji_max     = (<span class="str">'gaji'</span>, <span class="str">'max'</span>),
    jumlah_orang = (<span class="str">'id'</span>, <span class="str">'count'</span>),
)
df[<span class="str">'pct_dept'</span>] = df.groupby(<span class="str">'dept'</span>)[<span class="str">'gaji'</span>].transform(
    <span class="kw">lambda</span> x: x / x.sum() * <span class="num">100</span>
)</div>`,
    "Real Case":`<div class="case-card"><div class="case-header"><span class="badge badge-purple">Case</span> Laporan penjualan per region & kuartal</div><div class="case-body">
<div class="code-block" data-lang="python">df[<span class="str">'Q'</span>] = df[<span class="str">'tgl'</span>].dt.quarter
laporan = df.groupby([<span class="str">'region'</span>,<span class="str">'Q'</span>]).agg(
    revenue=(<span class="str">'revenue'</span>,<span class="str">'sum'</span>),
    orders=(<span class="str">'order_id'</span>,<span class="str">'nunique'</span>)
).reset_index()</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Lupa reset_index()</strong> — hasilnya punya index yang aneh.</p></div>
<div class="warning-box"><p><strong>.count() vs .size()</strong> — count() skip NaN, size() tidak.</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan Aggregation</h4><ol>
<li>Hitung total, rata-rata, count per kategori produk.</li>
<li>Temukan produk revenue tertinggi per kota.</li>
<li>Hitung % kontribusi tiap kategori ke total.</li>
<li>Tambah kolom rank gaji dalam departemen dengan transform.</li></ol></div>`
  }},
  {num:"06",title:"Data Cleaning",subtitle:"NaN, duplikat, tipe data, inkonsistensi",type:"pandas",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="concept-box"><p>Data cleaning adalah <strong>80% pekerjaan</strong> data analyst. Data nyata hampir selalu kotor.</p>
<ul><li><strong>Missing values (NaN)</strong>: hapus atau isi</li><li><strong>Duplikat</strong>: data tercatat lebih dari sekali</li>
<li><strong>Tipe data salah</strong>: angka sebagai string</li><li><strong>Inkonsistensi</strong>: 'jakarta', 'Jakarta', 'JAKARTA'</li></ul></div>`,
    "Contoh":`<div class="code-block" data-lang="python">df.isnull().sum()
df[<span class="str">'gaji'</span>] = df[<span class="str">'gaji'</span>].fillna(df[<span class="str">'gaji'</span>].median())
df[<span class="str">'kota'</span>] = df[<span class="str">'kota'</span>].fillna(<span class="str">'Tidak Diketahui'</span>)
df = df.dropna(subset=[<span class="str">'email'</span>])
df = df.drop_duplicates(subset=[<span class="str">'email'</span>], keep=<span class="str">'last'</span>)
df[<span class="str">'gaji'</span>] = pd.to_numeric(df[<span class="str">'gaji'</span>], errors=<span class="str">'coerce'</span>)
df[<span class="str">'tgl'</span>]  = pd.to_datetime(df[<span class="str">'tgl'</span>])</div>`,
    "Real Case":`<div class="case-card"><div class="case-header"><span class="badge badge-purple">Case</span> Pipeline cleaning data pelanggan</div><div class="case-body">
<div class="code-block" data-lang="python"><span class="kw">def</span> <span class="fn">clean</span>(df):
    df = df.copy()
    df = df.drop_duplicates(subset=[<span class="str">'email'</span>], keep=<span class="str">'last'</span>)
    df[<span class="str">'nama'</span>]  = df[<span class="str">'nama'</span>].str.strip().str.title()
    df[<span class="str">'email'</span>] = df[<span class="str">'email'</span>].str.lower()
    df[<span class="str">'gaji'</span>]  = pd.to_numeric(df[<span class="str">'gaji'</span>], errors=<span class="str">'coerce'</span>)
    df = df.dropna(subset=[<span class="str">'nama'</span>,<span class="str">'email'</span>])
    <span class="kw">return</span> df</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>fillna() tidak ubah asli!</strong> Selalu: df['col'] = df['col'].fillna(0)</p></div>
<div class="warning-box"><p><strong>to_numeric tanpa errors='coerce' akan error</strong> kalau ada string.</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan Cleaning</h4><ol>
<li>Buat DataFrame dengan NaN, duplikat, dan tipe salah.</li>
<li>Buat fungsi clean() yang menangani semuanya.</li>
<li>Identifikasi outlier gaji dengan IQR method.</li>
<li>Hitung % baris yang selamat setelah cleaning.</li></ol></div>`
  }},
  {num:"07",title:"Merge & Join",subtitle:"Gabungkan tabel seperti SQL JOIN",type:"pandas",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<table class="mini"><tr><th>Tipe</th><th>Perilaku</th></tr>
<tr><td>inner</td><td>Hanya baris yang cocok di kedua tabel</td></tr>
<tr><td>left</td><td>Semua baris kiri, NaN jika tidak cocok</td></tr>
<tr><td>right</td><td>Semua baris kanan</td></tr>
<tr><td>outer</td><td>Semua baris dari kedua tabel</td></tr></table>`,
    "Contoh":`<div class="code-block" data-lang="python">result = pd.merge(df1, df2, on=<span class="str">'id'</span>, how=<span class="str">'left'</span>)
result = pd.merge(df1, df2,
    left_on=<span class="str">'dept_id'</span>, right_on=<span class="str">'id_dept'</span>, how=<span class="str">'inner'</span>)
stacked = pd.concat([df1, df2], ignore_index=<span class="kw">True</span>)</div>`,
    "Real Case":`<div class="case-card"><div class="case-header"><span class="badge badge-purple">Case</span> Laporan dari 3 tabel</div><div class="case-body">
<div class="code-block" data-lang="python">laporan = (df_orders
    .merge(df_customers[[<span class="str">'id'</span>,<span class="str">'nama'</span>,<span class="str">'kota'</span>]], on=<span class="str">'id'</span>, how=<span class="str">'left'</span>)
    .merge(df_products[[<span class="str">'id'</span>,<span class="str">'nama_produk'</span>]], on=<span class="str">'id'</span>, how=<span class="str">'left'</span>)
)</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Duplikat di key → baris explode!</strong> Cek df['key'].duplicated().sum() sebelum merge.</p></div>
<div class="warning-box"><p><strong>Kolom sama → _x _y suffix.</strong> Pilih kolom dulu sebelum merge.</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan Merge</h4><ol>
<li>Buat df_siswa dan df_kelas, gabungkan left join.</li>
<li>Coba inner — berapa yang hilang?</li>
<li>Gabungkan 3 tabel berantai.</li>
<li>Validasi: bandingkan jumlah baris sebelum vs sesudah.</li></ol></div>`
  }},
  {num:"08",title:"Apply & Lambda",subtitle:"Fungsi custom ke setiap baris atau kolom",type:"pandas",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="concept-box"><p>Gunakan <code>.apply()</code> saat tidak ada fungsi built-in yang tersedia. <strong>Tapi ingat</strong>: vectorized operations selalu jauh lebih cepat!</p>
<ul><li>Series.apply(func) — ke setiap elemen</li><li>DataFrame.apply(func, axis=1) — per baris</li></ul></div>`,
    "Contoh":`<div class="code-block" data-lang="python">df[<span class="str">'grade'</span>] = df[<span class="str">'nilai'</span>].apply(
    <span class="kw">lambda</span> x: <span class="str">'A'</span> <span class="kw">if</span> x>=<span class="num">90</span> <span class="kw">else</span> <span class="str">'B'</span> <span class="kw">if</span> x>=<span class="num">80</span> <span class="kw">else</span> <span class="str">'C'</span>
)
<span class="comment"># LEBIH CEPAT: np.where</span>
<span class="kw">import</span> numpy <span class="kw">as</span> np
df[<span class="str">'bonus'</span>] = np.where(df[<span class="str">'target_hit'</span>], df[<span class="str">'gaji'</span>]*<span class="num">0.2</span>, df[<span class="str">'gaji'</span>]*<span class="num">0.1</span>)</div>`,
    "Real Case":`<div class="case-card"><div class="case-header"><span class="badge badge-purple">Case</span> Credit scoring</div><div class="case-body">
<div class="code-block" data-lang="python"><span class="kw">def</span> <span class="fn">score</span>(row):
    s = <span class="num">500</span> + row[<span class="str">'payment_rate'</span>]*<span class="num">200</span>
    s -= min(row[<span class="str">'hutang'</span>]/row[<span class="str">'income'</span>]*<span class="num">100</span>, <span class="num">200</span>)
    s += min(row[<span class="str">'tahun_nasabah'</span>]*<span class="num">10</span>, <span class="num">100</span>)
    <span class="kw">return</span> round(max(<span class="num">300</span>, min(<span class="num">850</span>, s)))
df[<span class="str">'credit'</span>] = df.apply(score, axis=<span class="num">1</span>)</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>apply(axis=1) sangat lambat!</strong> Untuk operasi sederhana, selalu coba vectorized dulu.</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan Apply</h4><ol>
<li>Kategorikan usia: Remaja/Dewasa/Lansia.</li>
<li>Buat inisial nama ('Andi Pratama' → 'AP').</li>
<li>Hitung BMI dari berat dan tinggi.</li>
<li>Bandingkan waktu apply vs vectorized untuk 100k baris.</li></ol></div>`
  }},
  {num:"09",title:"Pivot Table",subtitle:"Cross-tabulation multidimensi",type:"pandas",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="concept-box"><p>Pivot table merangkum data ke baris × kolom berdasarkan kategori. Seperti PivotTable Excel — ideal untuk laporan silang.</p></div>
<div class="code-block" data-lang="python">pd.pivot_table(df, values=<span class="str">'gaji'</span>, index=<span class="str">'dept'</span>,
               columns=<span class="str">'level'</span>, aggfunc=<span class="str">'mean'</span>,
               fill_value=<span class="num">0</span>, margins=<span class="kw">True</span>)</div>`,
    "Contoh":`<div class="code-block" data-lang="python">pivot = pd.pivot_table(df,
    values=[<span class="str">'gaji'</span>,<span class="str">'bonus'</span>], index=<span class="str">'dept'</span>, columns=<span class="str">'level'</span>,
    aggfunc={<span class="str">'gaji'</span>:<span class="str">'mean'</span>, <span class="str">'bonus'</span>:<span class="str">'sum'</span>}
)
ct = pd.crosstab(df[<span class="str">'dept'</span>], df[<span class="str">'level'</span>], normalize=<span class="str">'index'</span>)</div>`,
    "Real Case":`<div class="case-card"><div class="case-header"><span class="badge badge-purple">Case</span> Dashboard penjualan produk × region</div><div class="case-body">
<div class="code-block" data-lang="python">pivot = pd.pivot_table(df,
    values=<span class="str">'revenue'</span>, index=<span class="str">'kategori'</span>,
    columns=<span class="str">'region'</span>, aggfunc=<span class="str">'sum'</span>,
    fill_value=<span class="num">0</span>, margins=<span class="kw">True</span>
) / <span class="num">1_000_000</span></div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>margins=True menambah baris/kolom 'All'</strong> — drop dulu sebelum analisis lanjutan.</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan Pivot</h4><ol>
<li>Pivot: jumlah karyawan per dept per level.</li>
<li>Tambah margins.</li>
<li>Crosstab distribusi % gender per dept.</li>
<li>Export ke Excel dengan conditional formatting.</li></ol></div>`
  }},
  {num:"10",title:"DateTime Handling",subtitle:"Parse, filter, resample data waktu",type:"pandas",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="concept-box"><p>Pandas punya dukungan datetime kuat via <code>datetime64</code> dan accessor <code>.dt</code>. Sangat penting untuk time-series.</p></div>
<div class="code-block" data-lang="python">df[<span class="str">'tgl'</span>] = pd.to_datetime(df[<span class="str">'tgl'</span>], format=<span class="str">'%d/%m/%Y'</span>)
df[<span class="str">'tahun'</span>]    = df[<span class="str">'tgl'</span>].dt.year
df[<span class="str">'bulan'</span>]    = df[<span class="str">'tgl'</span>].dt.month
df[<span class="str">'nama_hari'</span>] = df[<span class="str">'tgl'</span>].dt.day_name()
df[<span class="str">'kuartal'</span>]  = df[<span class="str">'tgl'</span>].dt.quarter</div>`,
    "Contoh":`<div class="code-block" data-lang="python">q1 = df[(df[<span class="str">'tgl'</span>] >= <span class="str">'2024-01-01'</span>) & (df[<span class="str">'tgl'</span>] &lt;= <span class="str">'2024-03-31'</span>)]
df[<span class="str">'masa_kerja'</span>] = (pd.Timestamp.now() - df[<span class="str">'tgl_masuk'</span>]).dt.days
df = df.set_index(<span class="str">'tgl'</span>)
bulanan = df[<span class="str">'revenue'</span>].resample(<span class="str">'ME'</span>).sum()
rolling = df[<span class="str">'revenue'</span>].rolling(<span class="num">7</span>).mean()</div>`,
    "Real Case":`<div class="case-card"><div class="case-header"><span class="badge badge-purple">Case</span> Tren penjualan YoY</div><div class="case-body">
<div class="code-block" data-lang="python">df = df.set_index(<span class="str">'tgl'</span>).sort_index()
yoy = df[<span class="str">'revenue'</span>].resample(<span class="str">'YE'</span>).sum()
yoy_growth = yoy.pct_change() * <span class="num">100</span>
print(f<span class="str">"YoY: {yoy_growth.iloc[-1]:.1f}%"</span>)</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Kolom tgl masih string?</strong> Konversi dulu dengan pd.to_datetime()</p></div>
<div class="warning-box"><p><strong>resample() butuh DatetimeIndex!</strong> set_index('tgl') dulu.</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan DateTime</h4><ol>
<li>Buat date_range dari Jan 2024 hingga hari ini.</li>
<li>Ekstrak komponen waktu dari dataset transaksi.</li>
<li>Filter transaksi weekend (Sabtu & Minggu).</li>
<li>Resample mingguan + rolling mean 30 hari.</li></ol></div>`
  }},
  {num:"11",title:"String Operations",subtitle:".str accessor — vectorized text manipulation",type:"pandas",
   tabs:["Konsep","Contoh","Real Case","Jebakan","Latihan"],content:{
    "Konsep":`<div class="concept-box"><p>Accessor <code>.str</code> membuat semua operasi string vectorized — jauh lebih cepat dari apply(lambda). Otomatis handle NaN.</p></div>
<div class="code-block" data-lang="python">df[<span class="str">'nama'</span>].str.upper()
df[<span class="str">'nama'</span>].str.lower()
df[<span class="str">'nama'</span>].str.strip()
df[<span class="str">'nama'</span>].str.len()</div>`,
    "Contoh":`<div class="code-block" data-lang="python">df[<span class="str">'nama'</span>].str.contains(<span class="str">'Andi'</span>, na=<span class="kw">False</span>)
df[<span class="str">'email'</span>].str.match(r<span class="str">'^[\w.-]+@[\w.-]+\.\w+'</span>)
df[<span class="str">'nama_depan'</span>] = df[<span class="str">'nama'</span>].str.split(<span class="str">' '</span>).str[<span class="num">0</span>]
df[<span class="str">'domain'</span>]     = df[<span class="str">'email'</span>].str.split(<span class="str">'@'</span>).str[<span class="num">1</span>]
df[<span class="str">'kode_pos'</span>] = df[<span class="str">'alamat'</span>].str.extract(r<span class="str">'(\b\d{5}\b)'</span>)</div>`,
    "Real Case":`<div class="case-card"><div class="case-header"><span class="badge badge-purple">Case</span> Normalisasi data alamat</div><div class="case-body">
<div class="code-block" data-lang="python">df[<span class="str">'kota'</span>] = (df[<span class="str">'kota'</span>].str.strip().str.lower()
    .str.replace(r<span class="str">'kota\s*'</span>,<span class="str">''</span>,regex=<span class="kw">True</span>).str.title())
df[<span class="str">'telpon'</span>] = (df[<span class="str">'telpon'</span>]
    .str.replace(r<span class="str">'[^0-9]'</span>,<span class="str">''</span>,regex=<span class="kw">True</span>)
    .str.replace(r<span class="str">'^62'</span>,<span class="str">'0'</span>,regex=<span class="kw">True</span>))</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>str.contains() error jika ada NaN!</strong> Tambahkan na=False.</p></div>
<div class="warning-box"><p><strong>str.replace() tanpa regex=True</strong> tidak menggunakan regex pattern.</p></div>`,
    "Latihan":`<div class="exercise-box"><h4>Latihan String</h4><ol>
<li>Ekstrak nama depan dan belakang dari nama lengkap.</li>
<li>Validasi email dengan regex.</li>
<li>Bersihkan dan standarisasi nama kota.</li>
<li>Ekstrak semua angka dari kolom deskripsi.</li></ol></div>`
  }}
];
