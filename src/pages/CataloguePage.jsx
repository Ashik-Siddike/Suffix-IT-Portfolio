import { useState } from 'react';
import { Search } from 'lucide-react';
import { products, services } from '../data/catalog';
import { Container, EmptyState, PageHero } from '../components/ui';
import { ProductCard, ServiceCard } from '../components/cards';
import { CTASection } from '../components/sections';

export default function CataloguePage({ type }) {
  const isProduct = type === 'products';
  const [query, setQuery] = useState('');
  const catalogue = isProduct ? products : services;
  const filtered = catalogue.filter((item) =>
    `${item.title} ${item.description} ${item.category || ''}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  return (
    <>
      <PageHero
        eyebrow={isProduct ? 'SOFTWARE THAT WORKS FOR YOU' : 'OUR TECHNOLOGY EXPERTISE'}
        title={
          isProduct ? 'The right solution. A better way to work.' : 'Your goals. Our expertise.'
        }
        description={
          isProduct
            ? 'Explore enterprise software built to simplify operations and connect your business.'
            : 'From application development and consulting to infrastructure and security, find the right expertise for your business.'
        }
        breadcrumbs={[{ label: isProduct ? 'Products' : 'Services' }]}
      />
      <section className="section">
        <Container>
          <div className="catalogue-toolbar">
            <div className="search-field">
              <label htmlFor="catalogue-search" className="sr-only">
                Search {type}
              </label>
              <Search size={18} aria-hidden="true" />
              <input
                id="catalogue-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${type}…`}
                type="search"
              />
            </div>
            <p role="status">
              {filtered.length} {type} to explore
            </p>
          </div>
          {filtered.length ? (
            <div className="three-grid">
              {filtered.map((item, index) =>
                isProduct ? (
                  <ProductCard key={item.path} item={item} />
                ) : (
                  <ServiceCard key={item.path} item={item} number={index + 1} />
                ),
              )}
            </div>
          ) : (
            <EmptyState />
          )}
        </Container>
      </section>
      <CTASection
        title="Need help choosing the right solution?"
        description="Tell us about your business. Our team can help you explore the options."
      />
    </>
  );
}
