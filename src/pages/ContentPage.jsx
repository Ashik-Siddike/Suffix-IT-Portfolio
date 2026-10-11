import visuals from '../data/unique-visuals.json';
import { useParams } from 'react-router-dom';
import { ArrowUpRight } from '../components/GeneratedIcons';
import published from '../data/published-pages.json';
import {
  Accordion,
  Container,
  PageHero,
  PrimaryButton,
  SecondaryButton,
  ScrollReveal,
} from '../components/ui';
import { CTASection } from '../components/sections';
import SourceContent from '../components/SourceContent';
import NotFoundPage from './NotFoundPage';
import SiteImage from '../components/SiteImage';

export default function ContentPage({ kind }) {
  const { id, type } = useParams();
  if (kind === 'career')
    return (
      <>
        <PageHero
          eyebrow="GROW WITH SUFFIX IT"
          title="Build what’s next. Together."
          description="Explore published opportunities and connect with our team about your next chapter."
          breadcrumbs={[{ label: 'Careers' }]}
          visual={
            <div className="career-hero-art">
              <SiteImage
                src={visuals.static.career}
                alt="Technology team collaboration illustration"
                width="2032"
                height="1335"
                sizes="(max-width: 900px) 90vw, 550px"
              />
            </div>
          }
        />
        <section className="section">
          <Container>
            <div className="notice">
              The role below was published with a deadline of 18 December 2025. That deadline has
              passed. Contact career@suffixit.com for current opportunities.
            </div>
            <ScrollReveal as="article" variant="left" className="job-card">
              <div>
                <span className="eyebrow">ARCHIVED OPPORTUNITY · DHAKA · FULL TIME</span>
                <h2>Head of Business Development</h2>
                <p>Published role • Application deadline: 18 December 2025</p>
              </div>
              <SecondaryButton to="/career-detail/5">Read role details</SecondaryButton>
            </ScrollReveal>
            <div className="button-row" style={{ marginTop: 32 }}>
              <PrimaryButton href="mailto:career@suffixit.com">
                Ask about opportunities
              </PrimaryButton>
            </div>
          </Container>
        </section>
      </>
    );
  if (kind === 'webmail')
    return (
      <>
        <PageHero
          eyebrow="SUFFIX IT WEBMAIL"
          title="Your company email."
          description="Continue to Suffix IT’s existing webmail service."
          breadcrumbs={[{ label: 'Webmail' }]}
        />
        <section className="section">
          <Container>
            <ScrollReveal variant="zoom" className="utility-panel">
              <h2>Access the original service.</h2>
              <p>
                Email access is provided by the existing service. No credentials are collected by
                this website.
              </p>
              <SecondaryButton href="https://sg2plzcpnl505697.prod.sin2.secureserver.net:2096/">
                Open original webmail <ArrowUpRight size={18} aria-hidden="true" />
              </SecondaryButton>
            </ScrollReveal>
          </Container>
        </section>
      </>
    );
  const path =
    kind === 'policy'
      ? '/astha-policy'
      : kind === 'article'
        ? '/top-10-software-company-in-bangladesh'
        : kind === 'career-detail'
          ? `/career-detail/${id}`
          : `/web-e-commerce-detail/${type}`;
  const data = published[path];
  if (!data && (kind === 'career-detail' || kind === 'package')) return <NotFoundPage />;
  const title =
    kind === 'policy'
      ? 'Privacy policy for Astha'
      : kind === 'article'
        ? 'Software companies in Bangladesh'
        : kind === 'career-detail'
          ? 'Head of Business Development'
          : `${type} web & e-commerce package`;
  return (
    <>
      <PageHero
        eyebrow={
          kind === 'policy'
            ? 'LEGAL INFORMATION'
            : kind === 'article'
              ? 'INDUSTRY INSIGHTS'
              : kind === 'package'
                ? 'WEB & E-COMMERCE'
                : 'ARCHIVED CAREER OPPORTUNITY'
        }
        title={title}
        description={
          kind === 'policy'
            ? 'Original published policy. Last updated 1 August 2022.'
            : kind === 'article'
              ? 'An article originally published by Suffix IT. Historical company figures are reproduced as published and may be out of date.'
              : kind === 'package'
                ? 'Explore the scope published for this package. Contact our team for current availability and pricing.'
                : 'Dhaka · Full time · Published deadline: 18 December 2025'
        }
        breadcrumbs={[
          {
            label:
              kind === 'career-detail'
                ? 'Careers'
                : kind === 'package'
                  ? 'Web & e-commerce'
                  : title,
            path:
              kind === 'career-detail'
                ? '/career'
                : kind === 'package'
                  ? '/service/web-ecommerce'
                  : undefined,
          },
          ...(kind === 'career-detail' || kind === 'package' ? [{ label: title }] : []),
        ]}
      />
      <section className="section">
        <Container>
          {kind === 'package' && (
            <div className="notice">
              Published package price: ${{ Basic: 399, Classic: 699, Premium: 999 }[type]}. Confirm
              current availability and pricing with our team.
            </div>
          )}
          {kind === 'career-detail' && (
            <div className="notice">
              This published application deadline has passed. Please email career@suffixit.com to
              ask about current opportunities.
            </div>
          )}
          <SourceContent blocks={data?.blocks} />
          {kind === 'career-detail' && (
            <div className="source-content">
              <Accordion
                items={[
                  {
                    title: 'Original application link (archived)',
                    content: (
                      <p>
                        The published deadline has passed. The{' '}
                        <a
                          className="text-link"
                          href="https://forms.gle/qc1GUGA9mgsTbUcz8"
                          target="_blank"
                          rel="noreferrer"
                        >
                          original application form
                        </a>{' '}
                        is retained for reference. Contact the team before applying.
                      </p>
                    ),
                  },
                ]}
              />
              <PrimaryButton href="mailto:career@suffixit.com">
                Ask about current opportunities
              </PrimaryButton>
            </div>
          )}
          {kind === 'package' && (
            <div className="source-content">
              <PrimaryButton to={`/contact?solution=${encodeURIComponent(`${type} web package`)}`}>
                Discuss this package
              </PrimaryButton>
            </div>
          )}
        </Container>
      </section>
      {kind === 'package' && <CTASection />}
    </>
  );
}
