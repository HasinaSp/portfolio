/*
 * Bandeau défilant en boucle (CSS pur, voir .marquee dans globals.css) :
 * pause au survol, arrêté si le visiteur réduit les animations. La copie
 * qui assure la boucle est masquée aux lecteurs d'écran.
 */
export default function Marquee({ items, label }: { items: string[]; label: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="marquee-row">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 sm:gap-14">
          <span>{item}</span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#d00018]" />
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-label={label} role="region" className="marquee">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
