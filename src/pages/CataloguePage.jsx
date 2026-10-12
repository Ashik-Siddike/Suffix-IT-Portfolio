import visuals from '../data/unique-visuals.json';
import { useState } from 'react';
import { Search } from '../components/GeneratedIcons';
import { products, services } from '../data/catalog';
import { Container, EmptyState, PageHero } from '../components/ui';
import { ProductCard, ServiceCard } from '../components/cards';
import original from '../data/home-original.json';

export default function CataloguePage({ type }) {
  const isProduct = type === 'products';
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All products');
  const categories = {
    'All products': null,
    'ERP & Inventory': ['rupantor-erp', 'rupantor-inventory'],
    'HR & Workforce': ['payroll-system', 'provident-fund', 'field-force-management'],
    Commerce: ['e-commerce', 'pos-system'],
    Telecommunications: ['interconnect-billing'],
    Hospitality: ['hotel-booking-system'],
    IoT: ['transformer-monitoring'],
  };
  const catalogue = isProduct ? products : services;
  const filtered = catalogue.filter(
    (item) =>
      `${item.title} ${item.description} ${item.category || ''}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()) &&
      (!isProduct || !categories[category] || categories[category].includes(item.slug)),
  );
  return (
    <>
      <PageHero
        title={isProduct ? original.productsTitle : original.servicesTitle}
        description={isProduct ? original.productsDescription : original.servicesDescription}
        breadcrumbs={[{ label: isProduct ? 'Products' : 'Services' }]}
      />
      <section className="section">
        <Container>
          <div className="catalogue-toolbar">
            <div className="catalogue-controls">
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
              {isProduct && (
                <div className="category-field">
                  <label htmlFor="product-category">Category</label>
                  <select
                    id="product-category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    {Object.keys(categories).map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <p role="status">
              {filtered.length} {type} to explore
            </p>
          </div>
          {filtered.length ? (
            <div className="three-grid">
              {filtered.map((item, index) =>
                isProduct ? (
                  <ProductCard
                    key={item.path}
                    item={item}
                    image={visuals.productCards[item.path]}
                  />
                ) : (
                  <ServiceCard key={item.path} item={item} number={index + 1} />
                ),
              )}
            </div>
          ) : (
            <EmptyState />
          )}
          {(query || category !== 'All products') && (
            <button
              className="catalogue-reset"
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('All products');
              }}
            >
              Clear filters
            </button>
          )}
        </Container>
      </section>
    </>
  );
}
