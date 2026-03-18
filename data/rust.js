const rustChapters = [
  {num:"R1",title:"Ownership & Borrowing",subtitle:"Rust's killer feature — memory safety tanpa garbage collector",type:"rust",
   tabs:["Konsep","Contoh","Real Case","Jebakan","vs Bahasa Lain"],content:{
    "Konsep":`<div class="concept-box"><p>Ownership adalah sistem Rust untuk mengelola memori <strong>tanpa garbage collector</strong>. Setiap nilai punya satu <em>owner</em>. Saat owner keluar scope, nilai di-drop otomatis.</p>
<ul>
<li><strong>Ownership rule 1</strong>: Setiap nilai punya tepat satu owner</li>
<li><strong>Ownership rule 2</strong>: Saat owner keluar scope, nilai di-drop</li>
<li><strong>Move semantics</strong>: assignment memindahkan ownership, bukan copy</li>
<li><strong>Borrowing</strong>: pinjam nilai tanpa ambil ownership — via referensi <code>&T</code></li>
<li><strong>Borrow rules</strong>: boleh banyak <code>&T</code> (shared) ATAU satu <code>&mut T</code> (exclusive) — tidak boleh keduanya</li>
</ul></div>
<div class="section-label">Visualisasi ownership</div>
<div class="code-block" data-lang="rust"><span class="comment">// Setiap kotak = satu owner, panah = referensi</span>
<span class="comment">// [String "hello"] ← s1 (owner)</span>
<span class="comment">// setelah let s2 = s1 → MOVE:</span>
<span class="comment">// [String "hello"] ← s2 (owner baru), s1 invalid!</span></div>`,
    "Contoh":`<div class="code-block" data-lang="rust"><span class="kw">fn</span> <span class="fn">main</span>() {
    <span class="comment">// MOVE: s1 tidak bisa dipakai setelah ini</span>
    <span class="kw">let</span> s1 = <span class="type">String</span>::from(<span class="str">"hello"</span>);
    <span class="kw">let</span> s2 = s1; <span class="comment">// s1 MOVED ke s2</span>
    <span class="comment">// println!("{}", s1); // ERROR: value borrowed after move</span>
    println!(<span class="str">"{}"</span>, s2); <span class="comment">// OK</span>

    <span class="comment">// COPY: tipe primitif di-copy, bukan move</span>
    <span class="kw">let</span> x = <span class="num">5</span>;
    <span class="kw">let</span> y = x; <span class="comment">// COPY — x masih valid</span>
    println!(<span class="str">"{} {}"</span>, x, y); <span class="comment">// OK: 5 5</span>

    <span class="comment">// BORROWING: pinjam tanpa ambil ownership</span>
    <span class="kw">let</span> s3 = <span class="type">String</span>::from(<span class="str">"world"</span>);
    <span class="kw">let</span> len = <span class="fn">calculate_length</span>(&s3); <span class="comment">// & = borrow</span>
    println!(<span class="str">"{} has {} chars"</span>, s3, len); <span class="comment">// s3 masih valid!</span>

    <span class="comment">// MUTABLE BORROW: hanya boleh satu sekaligus</span>
    <span class="kw">let mut</span> s4 = <span class="type">String</span>::from(<span class="str">"hello"</span>);
    <span class="kw">let</span> r1 = &<span class="kw">mut</span> s4;
    r1.push_str(<span class="str">" world"</span>);
    <span class="comment">// let r2 = &mut s4; // ERROR: cannot borrow twice!</span>
    println!(<span class="str">"{}"</span>, r1);
}

<span class="kw">fn</span> <span class="fn">calculate_length</span>(s: &<span class="type">String</span>) -> <span class="type">usize</span> {
    s.len() <span class="comment">// s dipinjam, tidak di-drop di sini</span>
}</div>`,
    "Real Case":`<div class="case-card"><div class="case-header" style="background:linear-gradient(90deg,rgba(255,110,50,0.1),transparent)"><span class="badge" style="background:rgba(255,110,50,0.2);color:#ff8c50">Case</span> Buffer management tanpa memory leak</div><div class="case-body">
<div class="code-block" data-lang="rust"><span class="comment">// Ownership memastikan buffer di-free otomatis</span>
<span class="kw">fn</span> <span class="fn">process_file</span>(path: &<span class="type">str</span>) -> <span class="type">Result</span>&lt;<span class="type">String</span>, <span class="type">std::io::Error</span>&gt; {
    <span class="kw">let</span> content = std::fs::<span class="fn">read_to_string</span>(path)?; <span class="comment">// owned</span>
    <span class="kw">let</span> processed = <span class="fn">transform</span>(&content); <span class="comment">// borrow content</span>
    <span class="comment">// content di-drop di sini — memory freed!</span>
    <span class="type">Ok</span>(processed)
}

<span class="kw">fn</span> <span class="fn">transform</span>(s: &<span class="type">str</span>) -> <span class="type">String</span> {
    s.lines()
     .filter(|l| !l.starts_with(<span class="str">'#'</span>))
     .collect::&lt;<span class="type">Vec</span>&lt;_&gt;&gt;()
     .join(<span class="str">"\n"</span>)
}</div>
</div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Use after move!</strong><br>let s2 = s1; kemudian pakai s1 → compile error. Solusi: clone() jika perlu copy, atau gunakan referensi &s1.</p></div>
<div class="warning-box"><p><strong>Dua mutable borrow sekaligus!</strong><br>let r1 = &mut s; let r2 = &mut s; → compile error. Rust sengaja melarang ini untuk cegah data race.</p></div>
<div class="warning-box"><p><strong>Dangling reference tidak mungkin di Rust!</strong><br>Borrow checker memastikan referensi selalu valid. Di bahasa lain ini sumber bug paling umum.</p></div>`,
    "vs Bahasa Lain":`<div class="concept-box"><p><strong>C/C++</strong>: manual malloc/free → mudah memory leak & dangling pointer. Rust: otomatis, zero-cost.</p>
<p><strong>Java/Python/Go</strong>: garbage collector → aman tapi ada pause & overhead. Rust: tidak ada GC, performa deterministik.</p>
<p><strong>Swift</strong>: ARC (reference counting) → overhead runtime. Rust: compile-time, zero runtime overhead.</p></div>
<table class="mini"><tr><th>Bahasa</th><th>Memory Management</th><th>Safety</th><th>Perf</th></tr>
<tr><td>C/C++</td><td>Manual</td><td>❌ Tidak aman</td><td>⚡ Maksimal</td></tr>
<tr><td>Java/Go</td><td>GC</td><td>✅ Aman</td><td>🔶 GC pause</td></tr>
<tr><td>Swift</td><td>ARC</td><td>✅ Aman</td><td>🔶 Runtime overhead</td></tr>
<tr><td>Rust</td><td>Ownership</td><td>✅ Aman</td><td>⚡ Maksimal</td></tr></table>`
  }},
  {num:"R2",title:"Lifetimes",subtitle:"Anotasi masa hidup referensi — borrow checker yang eksplisit",type:"rust",
   tabs:["Konsep","Contoh","Real Case","Jebakan","vs Bahasa Lain"],content:{
    "Konsep":`<div class="concept-box"><p>Lifetime adalah anotasi yang memberi tahu compiler berapa lama sebuah referensi valid. Biasanya di-<em>infer</em> otomatis, tapi kadang harus eksplisit dengan sintaks <code>'a</code>.</p>
<ul>
<li>Lifetime bukan runtime concept — hanya ada saat compile time</li>
<li>Notasi: <code>'a</code>, <code>'b</code>, <code>'static</code></li>
<li><code>'static</code>: referensi valid sepanjang program berjalan</li>
<li>Lifetime elision: aturan otomatis yang mengurangi kebutuhan anotasi eksplisit</li>
</ul></div>
<div class="code-block" data-lang="rust"><span class="comment">// Tanpa lifetime anotasi — compiler tahu mana lebih pendek</span>
<span class="kw">fn</span> <span class="fn">longest</span>&lt;<span class="str">'a</span>&gt;(x: &<span class="str">'a</span> <span class="type">str</span>, y: &<span class="str">'a</span> <span class="type">str</span>) -> &<span class="str">'a</span> <span class="type">str</span> {
    <span class="comment">// 'a = lifetime yang lebih pendek antara x dan y</span>
    <span class="kw">if</span> x.len() > y.len() { x } <span class="kw">else</span> { y }
}</div>`,
    "Contoh":`<div class="code-block" data-lang="rust"><span class="comment">// Lifetime pada struct — struct tidak boleh outlive referensinya</span>
<span class="kw">struct</span> <span class="type">ImportantExcerpt</span>&lt;<span class="str">'a</span>&gt; {
    part: &<span class="str">'a</span> <span class="type">str</span>,
}

<span class="kw">impl</span>&lt;<span class="str">'a</span>&gt; <span class="type">ImportantExcerpt</span>&lt;<span class="str">'a</span>&gt; {
    <span class="kw">fn</span> <span class="fn">level</span>(&self) -> <span class="type">i32</span> { <span class="num">3</span> }
    <span class="kw">fn</span> <span class="fn">announce</span>(&self, announcement: &<span class="type">str</span>) -> &<span class="type">str</span> {
        println!(<span class="str">"Attention: {}"</span>, announcement);
        self.part <span class="comment">// lifetime = 'a (dari self)</span>
    }
}

<span class="kw">fn</span> <span class="fn">main</span>() {
    <span class="kw">let</span> novel = <span class="type">String</span>::from(<span class="str">"Call me Ishmael. Some years ago..."</span>);
    <span class="kw">let</span> first_sentence;
    {
        <span class="kw">let</span> i = novel.<span class="fn">find</span>(<span class="str">'.'</span>).unwrap_or(novel.len());
        first_sentence = &novel[..i];
    } <span class="comment">// fine — novel masih hidup</span>
    
    <span class="kw">let</span> excerpt = <span class="type">ImportantExcerpt</span> { part: first_sentence };
    println!(<span class="str">"{}"</span>, excerpt.part);
}

<span class="comment">// 'static lifetime — string literal hidup selamanya</span>
<span class="kw">let</span> s: &<span class="str">'static</span> <span class="type">str</span> = <span class="str">"I live forever"</span>;</div>`,
    "Real Case":`<div class="case-card"><div class="case-header" style="background:linear-gradient(90deg,rgba(255,110,50,0.1),transparent)"><span class="badge" style="background:rgba(255,110,50,0.2);color:#ff8c50">Case</span> Parser yang return slice dari input asli</div><div class="case-body">
<div class="code-block" data-lang="rust"><span class="comment">// Parser return &str yang hidup selama input hidup</span>
<span class="kw">struct</span> <span class="type">Parser</span>&lt;<span class="str">'a</span>&gt; {
    input: &<span class="str">'a</span> <span class="type">str</span>,
    pos: <span class="type">usize</span>,
}

<span class="kw">impl</span>&lt;<span class="str">'a</span>&gt; <span class="type">Parser</span>&lt;<span class="str">'a</span>&gt; {
    <span class="kw">fn</span> <span class="fn">new</span>(input: &<span class="str">'a</span> <span class="type">str</span>) -> Self {
        <span class="type">Parser</span> { input, pos: <span class="num">0</span> }
    }
    
    <span class="kw">fn</span> <span class="fn">next_word</span>(&<span class="kw">mut</span> self) -> <span class="type">Option</span>&lt;&<span class="str">'a</span> <span class="type">str</span>&gt; {
        <span class="kw">let</span> start = self.pos;
        <span class="kw">while</span> self.pos &lt; self.input.len()
              && !self.input[self.pos..].starts_with(<span class="str">' '</span>) {
            self.pos += <span class="num">1</span>;
        }
        <span class="kw">if</span> start == self.pos { <span class="type">None</span> }
        <span class="kw">else</span> { <span class="type">Some</span>(&self.input[start..self.pos]) }
    }
}</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Return referensi ke local variable → compile error!</strong><br>fn bad() -> &String { let s = String::from("x"); &s } → s di-drop saat fungsi selesai!</p></div>
<div class="warning-box"><p><strong>Lifetime bukan soal scope yang sama.</strong> 'a berarti "minimal selama ini" — bukan "harus sama persis".</p></div>`,
    "vs Bahasa Lain":`<div class="concept-box"><p><strong>C++</strong>: dangling pointer tidak terdeteksi sampai runtime (crash/UB). Rust: terdeteksi saat compile.</p>
<p><strong>Java/Python</strong>: semua reference di-manage GC, tidak perlu pikir lifetime. Tapi ada overhead dan tidak bisa zero-copy parsing.</p>
<p><strong>Rust</strong>: zero-copy parsing dimungkinkan karena compiler membuktikan referensi valid — performa C dengan safety Java.</p></div>`
  }},
  {num:"R3",title:"Traits & Generics",subtitle:"Abstraksi tanpa biaya — polymorphism di Rust",type:"rust",
   tabs:["Konsep","Contoh","Real Case","Jebakan","vs Bahasa Lain"],content:{
    "Konsep":`<div class="concept-box"><p>Trait adalah interface di Rust — mendefinisikan perilaku yang bisa diimplementasi oleh banyak tipe. Generics memungkinkan kode bekerja untuk berbagai tipe tanpa duplikasi. Rust menggunakan <strong>monomorphization</strong>: kode generic di-compile untuk setiap tipe konkret — zero overhead runtime.</p>
<ul>
<li><strong>Trait</strong>: kumpulan method signature (seperti interface di Java/Go)</li>
<li><strong>impl Trait for Type</strong>: implementasi trait untuk tipe tertentu</li>
<li><strong>Trait bounds</strong>: <code>T: Display + Clone</code> — syarat yang harus dipenuhi generic</li>
<li><strong>Trait objects</strong>: <code>dyn Trait</code> — dynamic dispatch (runtime polymorphism)</li>
</ul></div>`,
    "Contoh":`<div class="code-block" data-lang="rust"><span class="comment">// Definisi trait</span>
<span class="kw">trait</span> <span class="type">Summary</span> {
    <span class="kw">fn</span> <span class="fn">summarize</span>(&self) -> <span class="type">String</span>;
    <span class="comment">// Default implementation</span>
    <span class="kw">fn</span> <span class="fn">preview</span>(&self) -> <span class="type">String</span> {
        <span class="fn">format</span>!(<span class="str">"{}..."</span>, &self.<span class="fn">summarize</span>()[..<span class="num">50</span>.min(self.<span class="fn">summarize</span>().len())])
    }
}

<span class="kw">struct</span> <span class="type">Article</span> { title: <span class="type">String</span>, content: <span class="type">String</span> }
<span class="kw">struct</span> <span class="type">Tweet</span>   { username: <span class="type">String</span>, body: <span class="type">String</span> }

<span class="kw">impl</span> <span class="type">Summary</span> <span class="kw">for</span> <span class="type">Article</span> {
    <span class="kw">fn</span> <span class="fn">summarize</span>(&self) -> <span class="type">String</span> {
        <span class="fn">format</span>!(<span class="str">"{}: {}"</span>, self.title, &self.content[..<span class="num">100</span>.min(self.content.len())])
    }
}
<span class="kw">impl</span> <span class="type">Summary</span> <span class="kw">for</span> <span class="type">Tweet</span> {
    <span class="kw">fn</span> <span class="fn">summarize</span>(&self) -> <span class="type">String</span> {
        <span class="fn">format</span>!(<span class="str">"@{}: {}"</span>, self.username, self.body)
    }
}

<span class="comment">// Generic function dengan trait bound</span>
<span class="kw">fn</span> <span class="fn">notify</span>&lt;T: <span class="type">Summary</span>&gt;(item: &T) {
    println!(<span class="str">"Breaking: {}"</span>, item.<span class="fn">summarize</span>());
}

<span class="comment">// Trait object — dynamic dispatch</span>
<span class="kw">fn</span> <span class="fn">notify_dyn</span>(item: &<span class="kw">dyn</span> <span class="type">Summary</span>) {
    println!(<span class="str">"Breaking: {}"</span>, item.<span class="fn">summarize</span>());
}

<span class="comment">// Multiple trait bounds</span>
<span class="kw">fn</span> <span class="fn">print_and_clone</span>&lt;T: std::fmt::<span class="type">Display</span> + <span class="type">Clone</span>&gt;(item: T) -> T {
    println!(<span class="str">"{}"</span>, item);
    item.<span class="fn">clone</span>()
}</div>`,
    "Real Case":`<div class="case-card"><div class="case-header" style="background:linear-gradient(90deg,rgba(255,110,50,0.1),transparent)"><span class="badge" style="background:rgba(255,110,50,0.2);color:#ff8c50">Case</span> Plugin system dengan trait objects</div><div class="case-body">
<div class="code-block" data-lang="rust"><span class="kw">trait</span> <span class="type">DataSource</span> {
    <span class="kw">fn</span> <span class="fn">fetch</span>(&self, query: &<span class="type">str</span>) -> <span class="type">Vec</span>&lt;<span class="type">String</span>&gt;;
    <span class="kw">fn</span> <span class="fn">name</span>(&self) -> &<span class="type">str</span>;
}

<span class="kw">struct</span> <span class="type">PostgresSource</span> { conn_str: <span class="type">String</span> }
<span class="kw">struct</span> <span class="type">CsvSource</span>      { path: <span class="type">String</span> }

<span class="kw">impl</span> <span class="type">DataSource</span> <span class="kw">for</span> <span class="type">PostgresSource</span> {
    <span class="kw">fn</span> <span class="fn">fetch</span>(&self, q: &<span class="type">str</span>) -> <span class="type">Vec</span>&lt;<span class="type">String</span>&gt; { <span class="fn">vec!</span>[<span class="fn">format!</span>(<span class="str">"pg:{}"</span>, q)] }
    <span class="kw">fn</span> <span class="fn">name</span>(&self) -> &<span class="type">str</span> { <span class="str">"PostgreSQL"</span> }
}
<span class="kw">impl</span> <span class="type">DataSource</span> <span class="kw">for</span> <span class="type">CsvSource</span> {
    <span class="kw">fn</span> <span class="fn">fetch</span>(&self, q: &<span class="type">str</span>) -> <span class="type">Vec</span>&lt;<span class="type">String</span>&gt; { <span class="fn">vec!</span>[<span class="fn">format!</span>(<span class="str">"csv:{}"</span>, q)] }
    <span class="kw">fn</span> <span class="fn">name</span>(&self) -> &<span class="type">str</span> { <span class="str">"CSV"</span> }
}

<span class="comment">// Vec of trait objects — bisa campur tipe berbeda!</span>
<span class="kw">let</span> sources: <span class="type">Vec</span>&lt;<span class="type">Box</span>&lt;<span class="kw">dyn</span> <span class="type">DataSource</span>&gt;&gt; = <span class="fn">vec!</span>[
    <span class="type">Box</span>::new(<span class="type">PostgresSource</span> { conn_str: <span class="str">"..."</span>.into() }),
    <span class="type">Box</span>::new(<span class="type">CsvSource</span>      { path: <span class="str">"data.csv"</span>.into() }),
];
<span class="kw">for</span> s <span class="kw">in</span> &sources { println!(<span class="str">"{}: {:?}"</span>, s.<span class="fn">name</span>(), s.<span class="fn">fetch</span>(<span class="str">"SELECT *"</span>)); }</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>dyn Trait tidak bisa di-return langsung tanpa Box!</strong><br>fn get() -> dyn Trait {} → error. Gunakan fn get() -> Box&lt;dyn Trait&gt; {}</p></div>
<div class="warning-box"><p><strong>Trait object tidak support generic methods.</strong> dyn Trait hanya untuk object-safe traits. Method generic tidak bisa ada di trait yang digunakan sebagai dyn.</p></div>`,
    "vs Bahasa Lain":`<div class="concept-box"><p><strong>Java interface</strong>: selalu dynamic dispatch + boxing overhead. Rust generic: monomorphized, zero overhead — lebih seperti C++ templates tapi lebih aman.</p>
<p><strong>Go interface</strong>: selalu dynamic dispatch. Rust: bisa pilih static (generic) atau dynamic (dyn Trait) sesuai kebutuhan.</p>
<p><strong>Haskell typeclass</strong>: paling mirip dengan Rust trait — keduanya compile-time, composable, dan tidak perlu inheritance.</p></div>`
  }},
  {num:"R4",title:"Smart Pointers",subtitle:"Box, Rc, RefCell — kepemilikan yang lebih fleksibel",type:"rust",
   tabs:["Konsep","Contoh","Real Case","Jebakan","vs Bahasa Lain"],content:{
    "Konsep":`<div class="concept-box"><p>Smart pointer adalah struct yang bertindak seperti pointer tapi dengan metadata dan kemampuan tambahan. Berbeda dengan referensi biasa yang hanya meminjam data.</p>
<ul>
<li><strong>Box&lt;T&gt;</strong>: alokasi heap, single owner, ukuran compile-time tidak diketahui</li>
<li><strong>Rc&lt;T&gt;</strong>: Reference Counted — multiple owner, single thread</li>
<li><strong>Arc&lt;T&gt;</strong>: Atomic Reference Counted — multiple owner, multi thread</li>
<li><strong>RefCell&lt;T&gt;</strong>: interior mutability — borrow checking di runtime, bukan compile time</li>
<li><strong>Rc&lt;RefCell&lt;T&gt;&gt;</strong>: kombinasi umum untuk shared mutable state</li>
</ul></div>`,
    "Contoh":`<div class="code-block" data-lang="rust"><span class="kw">use</span> std::rc::<span class="type">Rc</span>;
<span class="kw">use</span> std::cell::<span class="type">RefCell</span>;

<span class="comment">// BOX: recursive data structure (linked list)</span>
<span class="kw">enum</span> <span class="type">List</span> {
    Cons(<span class="type">i32</span>, <span class="type">Box</span>&lt;<span class="type">List</span>&gt;),
    Nil,
}
<span class="kw">let</span> list = <span class="type">List</span>::Cons(<span class="num">1</span>, <span class="type">Box</span>::new(<span class="type">List</span>::Cons(<span class="num">2</span>, <span class="type">Box</span>::new(<span class="type">List</span>::Nil))));

<span class="comment">// RC: shared ownership</span>
<span class="kw">let</span> a = <span class="type">Rc</span>::new(<span class="num">5</span>);
<span class="kw">let</span> b = <span class="type">Rc</span>::clone(&a); <span class="comment">// ref count: 2</span>
<span class="kw">let</span> c = <span class="type">Rc</span>::clone(&a); <span class="comment">// ref count: 3</span>
println!(<span class="str">"ref count = {}"</span>, <span class="type">Rc</span>::strong_count(&a)); <span class="comment">// 3</span>
<span class="comment">// drop(c); → ref count: 2 — data masih hidup</span>

<span class="comment">// REFCELL: interior mutability</span>
<span class="kw">let</span> data = <span class="type">RefCell</span>::new(<span class="fn">vec!</span>[<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>]);
{
    <span class="kw">let mut</span> d = data.<span class="fn">borrow_mut</span>(); <span class="comment">// runtime borrow check</span>
    d.<span class="fn">push</span>(<span class="num">4</span>);
} <span class="comment">// borrow released</span>
println!(<span class="str">"{:?}"</span>, data.<span class="fn">borrow</span>()); <span class="comment">// [1,2,3,4]</span>

<span class="comment">// RC + REFCELL: shared mutable state</span>
<span class="kw">let</span> shared = <span class="type">Rc</span>::new(<span class="type">RefCell</span>::new(<span class="fn">vec!</span>[]));
<span class="kw">let</span> clone1 = <span class="type">Rc</span>::clone(&shared);
<span class="kw">let</span> clone2 = <span class="type">Rc</span>::clone(&shared);
clone1.<span class="fn">borrow_mut</span>().<span class="fn">push</span>(<span class="num">1</span>);
clone2.<span class="fn">borrow_mut</span>().<span class="fn">push</span>(<span class="num">2</span>);
println!(<span class="str">"{:?}"</span>, shared.<span class="fn">borrow</span>()); <span class="comment">// [1, 2]</span></div>`,
    "Real Case":`<div class="case-card"><div class="case-header" style="background:linear-gradient(90deg,rgba(255,110,50,0.1),transparent)"><span class="badge" style="background:rgba(255,110,50,0.2);color:#ff8c50">Case</span> Graph dengan shared nodes</div><div class="case-body">
<div class="code-block" data-lang="rust"><span class="kw">use</span> std::rc::<span class="type">Rc</span>;
<span class="kw">use</span> std::cell::<span class="type">RefCell</span>;

<span class="kw">type</span> <span class="type">NodeRef</span> = <span class="type">Rc</span>&lt;<span class="type">RefCell</span>&lt;<span class="type">Node</span>&gt;&gt;;

<span class="kw">struct</span> <span class="type">Node</span> {
    value: <span class="type">i32</span>,
    neighbors: <span class="type">Vec</span>&lt;<span class="type">NodeRef</span>&gt;,
}

<span class="kw">impl</span> <span class="type">Node</span> {
    <span class="kw">fn</span> <span class="fn">new</span>(v: <span class="type">i32</span>) -> <span class="type">NodeRef</span> {
        <span class="type">Rc</span>::new(<span class="type">RefCell</span>::new(<span class="type">Node</span> { value: v, neighbors: <span class="fn">vec!</span>[] }))
    }
    <span class="kw">fn</span> <span class="fn">connect</span>(a: &<span class="type">NodeRef</span>, b: &<span class="type">NodeRef</span>) {
        a.<span class="fn">borrow_mut</span>().neighbors.<span class="fn">push</span>(<span class="type">Rc</span>::clone(b));
        b.<span class="fn">borrow_mut</span>().neighbors.<span class="fn">push</span>(<span class="type">Rc</span>::clone(a));
    }
}</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Rc cycle → memory leak!</strong> A points to B, B points to A — ref count tidak pernah 0. Solusi: Weak&lt;T&gt; untuk back-references.</p></div>
<div class="warning-box"><p><strong>RefCell panic di runtime jika borrow violation!</strong> Tidak seperti compile-time borrow checker — dua borrow_mut() bersamaan akan panic.</p></div>`,
    "vs Bahasa Lain":`<div class="concept-box"><p><strong>C++</strong>: unique_ptr ≈ Box, shared_ptr ≈ Rc/Arc, weak_ptr ≈ Weak. Tapi C++ tidak punya RefCell — harus mutex manual.</p>
<p><strong>Python</strong>: semua object adalah Rc secara default (reference counting). Tidak ada konsep single ownership.</p>
<p><strong>Java</strong>: semua object di heap dengan GC. Tidak ada stack allocation atau explicit ownership.</p></div>`
  }},
  {num:"R5",title:"Iterator & Closures",subtitle:"Functional programming — lazy, zero-cost, ekspresif",type:"rust",
   tabs:["Konsep","Contoh","Real Case","Jebakan","vs Bahasa Lain"],content:{
    "Konsep":`<div class="concept-box"><p>Closure adalah fungsi anonim yang bisa capture variabel dari scope sekitarnya. Iterator adalah trait yang menghasilkan sequence nilai satu per satu — <strong>lazy</strong> dan <strong>zero-cost abstraction</strong>.</p>
<ul>
<li><strong>Closure</strong>: <code>|x| x + 1</code> — capture by reference, mut reference, atau move</li>
<li><strong>FnOnce</strong>: bisa dipanggil sekali (capture by move)</li>
<li><strong>FnMut</strong>: bisa dipanggil berkali-kali, mutate capture</li>
<li><strong>Fn</strong>: bisa dipanggil berkali-kali, tidak mutate</li>
<li><strong>Iterator adapters</strong>: map, filter, fold, take, skip, chain, zip, flat_map</li>
<li><strong>Lazy evaluation</strong>: tidak ada yang dicompute sampai .collect() atau .for_each()</li>
</ul></div>`,
    "Contoh":`<div class="code-block" data-lang="rust"><span class="comment">// Closure dasar</span>
<span class="kw">let</span> add = |x: <span class="type">i32</span>, y: <span class="type">i32</span>| x + y;
<span class="kw">let</span> double = |x| x * <span class="num">2</span>; <span class="comment">// tipe diinfer</span>

<span class="comment">// Capture by reference</span>
<span class="kw">let</span> threshold = <span class="num">10</span>;
<span class="kw">let</span> above = |x: &<span class="type">i32</span>| x > &threshold; <span class="comment">// borrow threshold</span>

<span class="comment">// Capture by move</span>
<span class="kw">let</span> name = <span class="type">String</span>::from(<span class="str">"Rust"</span>);
<span class="kw">let</span> greet = <span class="kw">move</span> || println!(<span class="str">"Hello, {}!"</span>, name); <span class="comment">// name moved</span>

<span class="comment">// Iterator chain — semua lazy!</span>
<span class="kw">let</span> result: <span class="type">Vec</span>&lt;<span class="type">i32</span>&gt; = (<span class="num">1</span>..<span class="num">100</span>)          <span class="comment">// range iterator</span>
    .filter(|&x| x % <span class="num">2</span> == <span class="num">0</span>)           <span class="comment">// keep even</span>
    .map(|x| x * x)                    <span class="comment">// square them</span>
    .take(<span class="num">5</span>)                           <span class="comment">// hanya 5 pertama</span>
    .collect();                         <span class="comment">// eksekusi!</span>
<span class="comment">// [4, 16, 36, 64, 100]</span>

<span class="comment">// fold = reduce</span>
<span class="kw">let</span> sum: <span class="type">i32</span> = (<span class="num">1</span>..=<span class="num">10</span>).<span class="fn">fold</span>(<span class="num">0</span>, |acc, x| acc + x); <span class="comment">// 55</span>

<span class="comment">// flat_map: flatten setelah map</span>
<span class="kw">let</span> words = <span class="fn">vec!</span>[<span class="str">"hello world"</span>, <span class="str">"foo bar"</span>];
<span class="kw">let</span> letters: <span class="type">Vec</span>&lt;&<span class="type">str</span>&gt; = words.<span class="fn">iter</span>()
    .flat_map(|s| s.split(<span class="str">' '</span>))
    .collect();
<span class="comment">// ["hello", "world", "foo", "bar"]</span>

<span class="comment">// zip: gabungkan dua iterator</span>
<span class="kw">let</span> names = <span class="fn">vec!</span>[<span class="str">"Alice"</span>, <span class="str">"Bob"</span>];
<span class="kw">let</span> scores = <span class="fn">vec!</span>[<span class="num">90</span>, <span class="num">85</span>];
<span class="kw">let</span> pairs: <span class="type">Vec</span>&lt;_&gt; = names.<span class="fn">iter</span>().zip(scores.<span class="fn">iter</span>()).collect();</div>`,
    "Real Case":`<div class="case-card"><div class="case-header" style="background:linear-gradient(90deg,rgba(255,110,50,0.1),transparent)"><span class="badge" style="background:rgba(255,110,50,0.2);color:#ff8c50">Case</span> Data processing pipeline</div><div class="case-body">
<div class="code-block" data-lang="rust"><span class="kw">use</span> std::collections::<span class="type">HashMap</span>;

<span class="kw">struct</span> <span class="type">Sale</span> { product: <span class="type">String</span>, amount: <span class="type">f64</span>, region: <span class="type">String</span> }

<span class="kw">fn</span> <span class="fn">sales_report</span>(sales: &[<span class="type">Sale</span>]) -> <span class="type">HashMap</span>&lt;&<span class="type">str</span>, <span class="type">f64</span>&gt; {
    sales.<span class="fn">iter</span>()
        .filter(|s| s.amount > <span class="num">100.0</span>)
        .fold(<span class="type">HashMap</span>::new(), |<span class="kw">mut</span> acc, s| {
            *acc.<span class="fn">entry</span>(&s.region).<span class="fn">or_insert</span>(<span class="num">0.0</span>) += s.amount;
            acc
        })
}

<span class="comment">// Custom iterator</span>
<span class="kw">struct</span> <span class="type">Fibonacci</span> { a: <span class="type">u64</span>, b: <span class="type">u64</span> }
<span class="kw">impl</span> <span class="type">Iterator</span> <span class="kw">for</span> <span class="type">Fibonacci</span> {
    <span class="kw">type</span> <span class="type">Item</span> = <span class="type">u64</span>;
    <span class="kw">fn</span> <span class="fn">next</span>(&<span class="kw">mut</span> self) -> <span class="type">Option</span>&lt;<span class="type">u64</span>&gt; {
        <span class="kw">let</span> next = self.a + self.b;
        self.a = self.b; self.b = next;
        <span class="type">Some</span>(self.a)
    }
}
<span class="kw">let</span> fibs: <span class="type">Vec</span>&lt;_&gt; = <span class="type">Fibonacci</span> { a:<span class="num">0</span>, b:<span class="num">1</span> }.take(<span class="num">10</span>).collect();</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Iterator tidak dieksekusi tanpa consumer!</strong> .map().filter() tidak melakukan apa-apa. Harus ada .collect(), .for_each(), .sum(), dst.</p></div>
<div class="warning-box"><p><strong>iter() vs into_iter() vs iter_mut()</strong>: iter() = borrow (&T), iter_mut() = mutable borrow (&mut T), into_iter() = consume (T — move).</p></div>`,
    "vs Bahasa Lain":`<div class="concept-box"><p><strong>Python generators</strong>: lazy juga, tapi ada overhead karena interpreted. Rust iterator dikompilasi menjadi loop biasa — zero overhead.</p>
<p><strong>Java Stream API</strong>: mirip tapi ada boxing overhead (int → Integer). Rust generic iterator bekerja langsung pada primitif.</p>
<p><strong>Haskell lazy lists</strong>: paling mirip, keduanya lazy dan composable. Rust lebih eksplisit tentang kapan eksekusi terjadi.</p></div>`
  }},
  {num:"R6",title:"Concurrency",subtitle:"Thread, Mutex, Channel — fearless concurrency",type:"rust",
   tabs:["Konsep","Contoh","Real Case","Jebakan","vs Bahasa Lain"],content:{
    "Konsep":`<div class="concept-box"><p>Rust menjamin <strong>fearless concurrency</strong> — data race tidak mungkin terjadi karena ownership system. Compiler memastikan data yang di-share antar thread aman.</p>
<ul>
<li><strong>thread::spawn</strong>: buat OS thread baru</li>
<li><strong>Mutex&lt;T&gt;</strong>: mutual exclusion — hanya satu thread bisa akses sekaligus</li>
<li><strong>Arc&lt;T&gt;</strong>: Atomic Reference Counting — shared ownership antar thread</li>
<li><strong>Channel (mpsc)</strong>: message passing — send data antar thread</li>
<li><strong>Send + Sync</strong>: marker traits — tipe yang aman di-send/share antar thread</li>
</ul></div>`,
    "Contoh":`<div class="code-block" data-lang="rust"><span class="kw">use</span> std::{thread, sync::{Arc, Mutex}, sync::mpsc};

<span class="comment">// THREAD SPAWN + JOIN</span>
<span class="kw">let</span> handle = thread::spawn(|| {
    <span class="kw">for</span> i <span class="kw">in</span> <span class="num">1</span>..<span class="num">5</span> { println!(<span class="str">"thread: {}"</span>, i); }
});
<span class="kw">for</span> i <span class="kw">in</span> <span class="num">1</span>..<span class="num">5</span> { println!(<span class="str">"main: {}"</span>, i); }
handle.<span class="fn">join</span>().unwrap(); <span class="comment">// tunggu thread selesai</span>

<span class="comment">// SHARED STATE dengan Arc + Mutex</span>
<span class="kw">let</span> counter = <span class="type">Arc</span>::new(<span class="type">Mutex</span>::new(<span class="num">0</span>));
<span class="kw">let mut</span> handles = <span class="fn">vec!</span>[];

<span class="kw">for</span> _ <span class="kw">in</span> <span class="num">0</span>..<span class="num">10</span> {
    <span class="kw">let</span> c = <span class="type">Arc</span>::clone(&counter);
    <span class="kw">let</span> h = thread::spawn(<span class="kw">move</span> || {
        <span class="kw">let mut</span> num = c.<span class="fn">lock</span>().unwrap(); <span class="comment">// acquire lock</span>
        *num += <span class="num">1</span>;
    }); <span class="comment">// lock released saat num di-drop</span>
    handles.<span class="fn">push</span>(h);
}
<span class="kw">for</span> h <span class="kw">in</span> handles { h.<span class="fn">join</span>().unwrap(); }
println!(<span class="str">"Result: {}"</span>, *counter.<span class="fn">lock</span>().unwrap()); <span class="comment">// 10</span>

<span class="comment">// CHANNEL: message passing</span>
<span class="kw">let</span> (tx, rx) = mpsc::channel();
<span class="kw">let</span> tx2 = tx.<span class="fn">clone</span>(); <span class="comment">// multiple producers</span>

thread::spawn(<span class="kw">move</span> || tx.<span class="fn">send</span>(<span class="str">"hello"</span>).unwrap());
thread::spawn(<span class="kw">move</span> || tx2.<span class="fn">send</span>(<span class="str">"world"</span>).unwrap());

<span class="kw">for</span> msg <span class="kw">in</span> rx { println!(<span class="str">"Got: {}"</span>, msg); }</div>`,
    "Real Case":`<div class="case-card"><div class="case-header" style="background:linear-gradient(90deg,rgba(255,110,50,0.1),transparent)"><span class="badge" style="background:rgba(255,110,50,0.2);color:#ff8c50">Case</span> Parallel data processing dengan rayon</div><div class="case-body">
<div class="code-block" data-lang="rust"><span class="comment">// Rayon: data parallelism dengan API seperti iterator biasa</span>
<span class="comment">// Cargo.toml: rayon = "1"</span>
<span class="kw">use</span> rayon::prelude::*;

<span class="kw">let</span> data: <span class="type">Vec</span>&lt;<span class="type">i64</span>&gt; = (<span class="num">0</span>..<span class="num">1_000_000</span>).collect();

<span class="comment">// Sequential</span>
<span class="kw">let</span> sum_seq: <span class="type">i64</span> = data.<span class="fn">iter</span>().map(|x| x * x).sum();

<span class="comment">// Parallel — ganti .iter() dengan .par_iter()!</span>
<span class="kw">let</span> sum_par: <span class="type">i64</span> = data.<span class="fn">par_iter</span>().map(|x| x * x).sum();

<span class="comment">// Rayon otomatis gunakan semua CPU core</span>
<span class="kw">let</span> results: <span class="type">Vec</span>&lt;_&gt; = data
    .<span class="fn">par_iter</span>()
    .filter(|&&x| x % <span class="num">2</span> == <span class="num">0</span>)
    .map(|&x| x * <span class="num">2</span>)
    .collect();</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>Deadlock masih mungkin terjadi!</strong> Rust cegah data race, tapi tidak deadlock. Jangan acquire dua Mutex dalam urutan berbeda di dua thread.</p></div>
<div class="warning-box"><p><strong>Mutex::lock() return Result!</strong> .unwrap() bisa panic jika thread lain panic saat holding lock (poisoned mutex).</p></div>`,
    "vs Bahasa Lain":`<div class="concept-box"><p><strong>Java/C#</strong>: synchronized/lock — runtime overhead, mudah lupa, compiler tidak membantu.</p>
<p><strong>Go goroutine + channel</strong>: mudah dipakai, tapi data race bisa terjadi (harus pakai race detector). Rust: impossible di safe code.</p>
<p><strong>C++</strong>: std::thread + std::mutex — sama powerful tapi tidak ada compile-time safety. Data race = undefined behavior.</p></div>`
  }},
  {num:"R7",title:"Async Programming",subtitle:"async/await — concurrency tanpa thread overhead",type:"rust",
   tabs:["Konsep","Contoh","Real Case","Jebakan","vs Bahasa Lain"],content:{
    "Konsep":`<div class="concept-box"><p>Async di Rust berbeda dari bahasa lain — tidak ada built-in runtime. Kamu pilih runtime sendiri (Tokio, async-std). <code>async fn</code> return <code>Future</code> — nilai yang belum tentu selesai. <code>.await</code> menunggu Future selesai tanpa block thread.</p>
<ul>
<li><strong>Future&lt;Output=T&gt;</strong>: trait yang represent operasi async</li>
<li><strong>async fn</strong>: fungsi yang return Future secara implisit</li>
<li><strong>.await</strong>: yield ke executor, tunggu Future selesai</li>
<li><strong>Tokio</strong>: runtime paling populer — event loop, thread pool, async I/O</li>
<li><strong>join!</strong>: jalankan beberapa Future serentak</li>
<li><strong>select!</strong>: tunggu salah satu dari beberapa Future</li>
</ul></div>`,
    "Contoh":`<div class="code-block" data-lang="rust"><span class="comment">// Cargo.toml: tokio = { version = "1", features = ["full"] }</span>
<span class="kw">use</span> tokio::time::{sleep, <span class="type">Duration</span>};

<span class="comment">// async function</span>
<span class="kw">async fn</span> <span class="fn">fetch_data</span>(id: <span class="type">u32</span>) -> <span class="type">String</span> {
    <span class="fn">sleep</span>(<span class="type">Duration</span>::from_millis(<span class="num">100</span>)).await; <span class="comment">// simulate I/O</span>
    <span class="fn">format!</span>(<span class="str">"data for id {}"</span>, id)
}

<span class="comment">// Sequential — lambat (100ms + 100ms = 200ms)</span>
<span class="kw">async fn</span> <span class="fn">sequential</span>() {
    <span class="kw">let</span> a = <span class="fn">fetch_data</span>(<span class="num">1</span>).await;
    <span class="kw">let</span> b = <span class="fn">fetch_data</span>(<span class="num">2</span>).await;
    println!(<span class="str">"{} {}"</span>, a, b);
}

<span class="comment">// Concurrent — cepat (≈100ms)</span>
<span class="kw">async fn</span> <span class="fn">concurrent</span>() {
    <span class="kw">let</span> (a, b) = tokio::join!(
        <span class="fn">fetch_data</span>(<span class="num">1</span>),
        <span class="fn">fetch_data</span>(<span class="num">2</span>)
    );
    println!(<span class="str">"{} {}"</span>, a, b);
}

<span class="comment">// Entry point</span>
#[tokio::main]
<span class="kw">async fn</span> <span class="fn">main</span>() {
    <span class="fn">concurrent</span>().await;
    
    <span class="comment">// Spawn task (seperti goroutine)</span>
    <span class="kw">let</span> handle = tokio::task::spawn(<span class="kw">async</span> {
        <span class="fn">fetch_data</span>(<span class="num">3</span>).await
    });
    <span class="kw">let</span> result = handle.await.unwrap();
    println!(<span class="str">"{}"</span>, result);
}</div>`,
    "Real Case":`<div class="case-card"><div class="case-header" style="background:linear-gradient(90deg,rgba(255,110,50,0.1),transparent)"><span class="badge" style="background:rgba(255,110,50,0.2);color:#ff8c50">Case</span> HTTP server dengan Axum</div><div class="case-body">
<div class="code-block" data-lang="rust"><span class="comment">// Cargo.toml: axum = "0.7", tokio = { version="1", features=["full"] }</span>
<span class="kw">use</span> axum::{routing::get, <span class="type">Router</span>, extract::<span class="type">Path</span>};

<span class="kw">async fn</span> <span class="fn">get_user</span>(<span class="type">Path</span>(id): <span class="type">Path</span>&lt;<span class="type">u32</span>&gt;) -> <span class="type">String</span> {
    <span class="comment">// async DB query di sini</span>
    <span class="fn">format!</span>(<span class="str">"User {}"</span>, id)
}

<span class="kw">async fn</span> <span class="fn">health</span>() -> &<span class="str">'static str</span> { <span class="str">"OK"</span> }

#[tokio::main]
<span class="kw">async fn</span> <span class="fn">main</span>() {
    <span class="kw">let</span> app = <span class="type">Router</span>::new()
        .<span class="fn">route</span>(<span class="str">"/health"</span>, get(<span class="fn">health</span>))
        .<span class="fn">route</span>(<span class="str">"/users/:id"</span>, get(<span class="fn">get_user</span>));

    <span class="kw">let</span> listener = tokio::net::<span class="type">TcpListener</span>::<span class="fn">bind</span>(<span class="str">"0.0.0.0:3000"</span>).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>async fn di trait masih perlu async-trait crate!</strong> Trait async fn baru stabil di Rust 1.75 — versi lama butuh #[async_trait] macro.</p></div>
<div class="warning-box"><p><strong>Future tidak jalan sampai di-.await atau di-spawn!</strong> Membuat Future tidak memulai eksekusinya. Ini berbeda dari Promise di JavaScript.</p></div>`,
    "vs Bahasa Lain":`<div class="concept-box"><p><strong>JavaScript</strong>: single-threaded, event loop built-in. Rust async: bisa multi-threaded, runtime dipilih sendiri.</p>
<p><strong>Python asyncio</strong>: single-threaded, GIL masih ada. Rust: truly parallel async dengan multiple threads.</p>
<p><strong>Go goroutine</strong>: built-in scheduler, sangat mudah. Rust async: lebih verbose tapi zero-overhead dan bisa embed di bare-metal.</p></div>`
  }},
  {num:"R8",title:"Error Handling",subtitle:"Result & Option — error handling yang eksplisit dan aman",type:"rust",
   tabs:["Konsep","Contoh","Real Case","Jebakan","vs Bahasa Lain"],content:{
    "Konsep":`<div class="concept-box"><p>Rust tidak punya exception. Error handling dilakukan via return value menggunakan dua enum powerful: <code>Option&lt;T&gt;</code> dan <code>Result&lt;T, E&gt;</code>. Ini memaksa programmer untuk explicitly handle semua error kasus.</p>
<ul>
<li><strong>Option&lt;T&gt;</strong>: Some(value) atau None — untuk nilai yang mungkin tidak ada</li>
<li><strong>Result&lt;T, E&gt;</strong>: Ok(value) atau Err(error) — untuk operasi yang bisa gagal</li>
<li><strong>? operator</strong>: early return Err jika gagal — propagasi error otomatis</li>
<li><strong>unwrap()</strong>: ambil nilai, panic jika None/Err — hanya untuk prototyping!</li>
<li><strong>expect("msg")</strong>: seperti unwrap tapi dengan pesan error yang jelas</li>
</ul></div>`,
    "Contoh":`<div class="code-block" data-lang="rust"><span class="comment">// OPTION</span>
<span class="kw">let</span> names = <span class="fn">vec!</span>[<span class="str">"Alice"</span>, <span class="str">"Bob"</span>];
<span class="kw">let</span> first: <span class="type">Option</span>&lt;&&<span class="type">str</span>&gt; = names.<span class="fn">first</span>();

<span class="kw">match</span> first {
    <span class="type">Some</span>(name) => println!(<span class="str">"Hello, {}!"</span>, name),
    <span class="type">None</span>       => println!(<span class="str">"Empty list"</span>),
}

<span class="comment">// Option combinators</span>
<span class="kw">let</span> length = names.<span class="fn">first</span>().<span class="fn">map</span>(|s| s.len()); <span class="comment">// Option&lt;usize&gt;</span>
<span class="kw">let</span> default = names.<span class="fn">first</span>().<span class="fn">unwrap_or</span>(&<span class="str">"default"</span>);
<span class="kw">let</span> filtered = names.<span class="fn">first</span>().<span class="fn">filter</span>(|&&s| s.len() > <span class="num">3</span>);

<span class="comment">// RESULT + ? operator</span>
<span class="kw">use</span> std::{fs, num::<span class="type">ParseIntError</span>};

<span class="kw">fn</span> <span class="fn">parse_config</span>(path: &<span class="type">str</span>) -> <span class="type">Result</span>&lt;<span class="type">i32</span>, <span class="type">Box</span>&lt;<span class="kw">dyn</span> std::error::<span class="type">Error</span>&gt;&gt; {
    <span class="kw">let</span> content = fs::<span class="fn">read_to_string</span>(path)?; <span class="comment">// ? = return Err jika gagal</span>
    <span class="kw">let</span> value: <span class="type">i32</span> = content.<span class="fn">trim</span>().<span class="fn">parse</span>()?; <span class="comment">// ? lagi</span>
    <span class="type">Ok</span>(value)
}

<span class="comment">// Custom error type</span>
#[derive(<span class="type">Debug</span>)]
<span class="kw">enum</span> <span class="type">AppError</span> {
    <span class="type">Io</span>(std::io::<span class="type">Error</span>),
    <span class="type">Parse</span>(<span class="type">ParseIntError</span>),
    <span class="type">NotFound</span>(<span class="type">String</span>),
}

<span class="kw">impl</span> std::fmt::<span class="type">Display</span> <span class="kw">for</span> <span class="type">AppError</span> {
    <span class="kw">fn</span> <span class="fn">fmt</span>(&self, f: &<span class="kw">mut</span> std::fmt::<span class="type">Formatter</span>) -> std::fmt::<span class="type">Result</span> {
        <span class="kw">match</span> self {
            <span class="type">AppError</span>::<span class="type">Io</span>(e)         => <span class="fn">write!</span>(f, <span class="str">"IO error: {}"</span>, e),
            <span class="type">AppError</span>::<span class="type">Parse</span>(e)      => <span class="fn">write!</span>(f, <span class="str">"Parse error: {}"</span>, e),
            <span class="type">AppError</span>::<span class="type">NotFound</span>(msg) => <span class="fn">write!</span>(f, <span class="str">"Not found: {}"</span>, msg),
        }
    }
}</div>`,
    "Real Case":`<div class="case-card"><div class="case-header" style="background:linear-gradient(90deg,rgba(255,110,50,0.1),transparent)"><span class="badge" style="background:rgba(255,110,50,0.2);color:#ff8c50">Case</span> Error handling dengan thiserror & anyhow</div><div class="case-body">
<div class="code-block" data-lang="rust"><span class="comment">// thiserror: derive macro untuk custom error</span>
<span class="comment">// anyhow: Box&lt;dyn Error&gt; yang ergonomis</span>
<span class="kw">use</span> thiserror::<span class="type">Error</span>;
<span class="kw">use</span> anyhow::<span class="type">Result</span>;

#[derive(<span class="type">Error</span>, <span class="type">Debug</span>)]
<span class="kw">enum</span> <span class="type">DbError</span> {
    #[error(<span class="str">"Connection failed: {0}"</span>)]
    <span class="type">Connection</span>(<span class="type">String</span>),
    #[error(<span class="str">"Record not found: id={id}"</span>)]
    <span class="type">NotFound</span> { id: <span class="type">u32</span> },
    #[error(transparent)]
    <span class="type">Io</span>(#[from] std::io::<span class="type">Error</span>),
}

<span class="kw">fn</span> <span class="fn">get_user</span>(id: <span class="type">u32</span>) -> <span class="type">Result</span>&lt;<span class="type">String</span>&gt; {
    <span class="kw">if</span> id == <span class="num">0</span> {
        <span class="kw">return</span> <span class="type">Err</span>(<span class="type">DbError</span>::<span class="type">NotFound</span> { id }.into());
    }
    <span class="type">Ok</span>(<span class="fn">format!</span>(<span class="str">"User {}"</span>, id))
}</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>unwrap() di production code = bahaya!</strong> Gunakan unwrap_or(), unwrap_or_else(), atau ? operator. unwrap() hanya untuk prototyping atau test.</p></div>
<div class="warning-box"><p><strong>? operator hanya bisa dipakai dalam fn yang return Result/Option!</strong> Di main(), gunakan #[tokio::main] atau explicit match.</p></div>`,
    "vs Bahasa Lain":`<div class="concept-box"><p><strong>Java/Python</strong>: exception — bisa diabaikan, stack unwind mahal, tidak terlihat di type signature.</p>
<p><strong>Go</strong>: return (value, error) — mirip Rust tapi bisa diabaikan (if err != nil sering lupa). Rust: compiler paksa handle.</p>
<p><strong>Haskell Maybe/Either</strong>: paling mirip, keduanya functional dan type-safe. Rust lebih ergonomis dengan ? operator.</p></div>`
  }},
  {num:"R9",title:"Unsafe Rust",subtitle:"Keluar dari safety net — power tanpa batas",type:"rust",
   tabs:["Konsep","Contoh","Real Case","Jebakan","vs Bahasa Lain"],content:{
    "Konsep":`<div class="concept-box"><p><code>unsafe</code> adalah escape hatch dari borrow checker. Digunakan untuk operasi yang compiler tidak bisa verifikasi keamanannya. Rust masih safe secara default — unsafe hanya untuk kasus spesifik.</p>
<ul>
<li><strong>Raw pointer</strong>: *const T dan *mut T — seperti pointer C</li>
<li><strong>unsafe fn</strong>: fungsi yang caller harus pastikan invariant terpenuhi</li>
<li><strong>unsafe trait</strong>: trait dengan invariant yang compiler tidak bisa verify</li>
<li><strong>extern "C"</strong>: FFI — panggil fungsi C dari Rust</li>
<li><strong>static mut</strong>: global mutable state</li>
</ul>
<p style="margin-top:8px"><strong>5 hal yang HANYA bisa dilakukan dalam unsafe block:</strong></p>
<ul>
<li>Dereference raw pointer</li>
<li>Panggil unsafe function/method</li>
<li>Akses/modifikasi static mutable variable</li>
<li>Implementasi unsafe trait</li>
<li>Akses field dari union</li>
</ul></div>`,
    "Contoh":`<div class="code-block" data-lang="rust"><span class="comment">// Raw pointer</span>
<span class="kw">let</span> x = <span class="num">5</span>;
<span class="kw">let</span> ptr = &x <span class="kw">as</span> *<span class="kw">const</span> <span class="type">i32</span>; <span class="comment">// cast ke raw pointer</span>
<span class="kw">unsafe</span> {
    println!(<span class="str">"value: {}"</span>, *ptr); <span class="comment">// dereference — unsafe!</span>
}

<span class="comment">// Unsafe function</span>
<span class="kw">unsafe fn</span> <span class="fn">dangerous</span>() { <span class="comment">/* caller harus pastikan invariant */</span> }
<span class="kw">unsafe</span> { <span class="fn">dangerous</span>(); }

<span class="comment">// FFI: panggil fungsi C</span>
<span class="kw">extern</span> <span class="str">"C"</span> {
    <span class="kw">fn</span> <span class="fn">abs</span>(x: <span class="type">i32</span>) -> <span class="type">i32</span>; <span class="comment">// dari libc</span>
}
<span class="kw">unsafe</span> { println!(<span class="str">"{}"</span>, <span class="fn">abs</span>(-<span class="num">5</span>)); } <span class="comment">// 5</span>

<span class="comment">// Implementasi Send/Sync secara manual</span>
<span class="kw">struct</span> <span class="type">MyPointer</span>(*<span class="kw">mut</span> <span class="type">i32</span>);
<span class="kw">unsafe impl</span> <span class="type">Send</span> <span class="kw">for</span> <span class="type">MyPointer</span> {} <span class="comment">// kita jamin thread safety!</span>

<span class="comment">// split_at_mut — tidak bisa dilakukan tanpa unsafe</span>
<span class="kw">fn</span> <span class="fn">split_at_mut</span>(s: &<span class="kw">mut</span> [<span class="type">i32</span>], mid: <span class="type">usize</span>) -> (&<span class="kw">mut</span> [<span class="type">i32</span>], &<span class="kw">mut</span> [<span class="type">i32</span>]) {
    <span class="kw">let</span> ptr = s.as_mut_ptr();
    <span class="kw">unsafe</span> {
        (
            std::slice::from_raw_parts_mut(ptr, mid),
            std::slice::from_raw_parts_mut(ptr.add(mid), s.len() - mid),
        )
    }
}</div>`,
    "Real Case":`<div class="case-card"><div class="case-header" style="background:linear-gradient(90deg,rgba(255,110,50,0.1),transparent)"><span class="badge" style="background:rgba(255,110,50,0.2);color:#ff8c50">Case</span> Menulis binding ke library C</div><div class="case-body">
<div class="code-block" data-lang="rust"><span class="comment">// Wrap unsafe FFI dalam safe API</span>
<span class="kw">mod</span> ffi {
    <span class="kw">extern</span> <span class="str">"C"</span> {
        <span class="kw">pub fn</span> <span class="fn">sqlite3_open</span>(path: *<span class="kw">const</span> <span class="type">i8</span>, db: *<span class="kw">mut</span> *<span class="kw">mut</span> <span class="type">u8</span>) -> <span class="type">i32</span>;
        <span class="kw">pub fn</span> <span class="fn">sqlite3_close</span>(db: *<span class="kw">mut</span> <span class="type">u8</span>) -> <span class="type">i32</span>;
    }
}

<span class="comment">// Safe wrapper — semua unsafe tersembunyi di dalam</span>
<span class="kw">pub struct</span> <span class="type">Database</span>(*<span class="kw">mut</span> <span class="type">u8</span>);

<span class="kw">impl</span> <span class="type">Database</span> {
    <span class="kw">pub fn</span> <span class="fn">open</span>(path: &<span class="type">str</span>) -> <span class="type">Result</span>&lt;Self, <span class="type">i32</span>&gt; {
        <span class="kw">let mut</span> db = std::ptr::null_mut();
        <span class="kw">let</span> rc = <span class="kw">unsafe</span> { ffi::<span class="fn">sqlite3_open</span>(path.as_ptr() <span class="kw">as</span> _, &<span class="kw">mut</span> db) };
        <span class="kw">if</span> rc == <span class="num">0</span> { <span class="type">Ok</span>(<span class="type">Database</span>(db)) } <span class="kw">else</span> { <span class="type">Err</span>(rc) }
    }
}

<span class="kw">impl</span> <span class="type">Drop</span> <span class="kw">for</span> <span class="type">Database</span> {
    <span class="kw">fn</span> <span class="fn">drop</span>(&<span class="kw">mut</span> self) {
        <span class="kw">unsafe</span> { ffi::<span class="fn">sqlite3_close</span>(self.<span class="num">0</span>); }
    }
}</div></div></div>`,
    "Jebakan":`<div class="warning-box"><p><strong>unsafe bukan "disable safety" — kamu yang bertanggung jawab!</strong> Compiler percaya kamu. Jika invariant dilanggar → undefined behavior seperti C/C++.</p></div>
<div class="warning-box"><p><strong>Minimisasi unsafe surface area!</strong> Bungkus unsafe dalam fungsi/module dengan safe API di luar. Jangan biarkan unsafe menyebar ke seluruh codebase.</p></div>
<div class="warning-box"><p><strong>Gunakan Miri untuk test unsafe code!</strong> Miri adalah interpreter yang detect undefined behavior di unsafe Rust.</p></div>`,
    "vs Bahasa Lain":`<div class="concept-box"><p><strong>C/C++</strong>: semua kode "unsafe" — tidak ada pembatas. Rust: unsafe hanya di block eksplisit, mudah di-audit.</p>
<p><strong>Java/Python</strong>: tidak ada unsafe — tidak bisa akses raw memory. Rust: bisa, tapi dengan explicit opt-in.</p>
<p><strong>Filosofi Rust</strong>: unsafe code harus sesedikit mungkin, tersembunyi di balik safe abstraction, dan mudah di-review. "Unsafe Rust is a powerful tool; treat it with respect."</p></div>`
  }}
];

