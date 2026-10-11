import { Container, PrimaryButton, SecondaryButton } from '../components/ui';

export default function NotFoundPage() {
  return (
    <Container className="state">
      <span className="eyebrow">404 — PAGE NOT FOUND</span>
      <h1>Let’s get you back on track.</h1>
      <p>The page you’re looking for may have moved or doesn’t exist.</p>
      <div className="button-row">
        <PrimaryButton to="/">Back to home</PrimaryButton>
        <SecondaryButton to="/contact">Contact us</SecondaryButton>
      </div>
    </Container>
  );
}
