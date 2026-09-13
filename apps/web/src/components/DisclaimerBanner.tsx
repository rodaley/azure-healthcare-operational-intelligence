/**
 * Mandatory disclaimers that must be displayed throughout the application.
 *
 * See prompt/02-Application.md, "Mandatory Disclaimers".
 */
export function DisclaimerBanner() {
  return (
    <div className="disclaimer-banner" role="note">
      <p>Synthetic Healthcare Demo Data.</p>
      <p>
        Illustrative Operational Impact, not actual patient or customer data. AI-generated
        findings are operational hypotheses requiring human review. This solution is not
        represented as HIPAA compliant or approved for protected health information.
      </p>
    </div>
  );
}
