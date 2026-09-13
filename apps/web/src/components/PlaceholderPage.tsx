interface PlaceholderPageProps {
  title: string;
  description: string;
}

/**
 * A minimal placeholder page used by the P0 application shell. Full page
 * implementations (widgets, visualizations, etc.) are tracked as follow-up P0
 * issues; see prompt/02-Application.md for the full page specifications.
 */
export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="page-placeholder">
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
