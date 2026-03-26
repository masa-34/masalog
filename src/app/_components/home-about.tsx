/**
 * トップページの自己紹介文。内容はお好みで編集してください。
 */
export function HomeAbout() {
  return (
    <section
      className="mb-10 max-w-2xl md:mb-12"
      aria-labelledby="home-about-heading"
    >
      <h2
        id="home-about-heading"
        className="mb-6 text-2xl font-semibold tracking-tight text-gray-900 dark:text-slate-100"
      >
        Profile
      </h2>
      <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-slate-300">
        <p>
          システムエンジニアのメメモブログです。
          <br></br>laravel、next.js、react、typescript、docker、aws、etc...などを書いています。
        </p>
      </div>
    </section>
  );
}
