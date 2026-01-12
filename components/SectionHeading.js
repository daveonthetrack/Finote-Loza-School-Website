export default function SectionHeading({ title, subtitle }) {
  return (
    <div>
      <h2 className="heading-section">{title}</h2>
      {subtitle ? <p className="text-gray-600 mt-2 max-w-2xl">{subtitle}</p> : null}
    </div>
  );
}


