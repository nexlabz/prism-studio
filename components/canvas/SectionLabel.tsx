// Section kicker: `01 — Foundation`. The number and separator are separate
// spans so a template's sectionNumber rule can restyle them (app/rules.css
// turns them into `( 01 )  Foundation`).

export function SectionLabel({ index, kicker }: { index: string; kicker: string }) {
  return (
    <div className="sec-lbl">
      <span className="sec-num">{index}</span>
      <span className="sec-sep" aria-hidden="true"> — </span>
      <span>{kicker}</span>
    </div>
  )
}
