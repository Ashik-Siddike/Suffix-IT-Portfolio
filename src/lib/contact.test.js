import { describe, expect, it } from 'vitest';
import { createContactEmail, submitContact, validateContact } from './contact';

describe('contact enquiry boundary', () => {
  it('reports missing fields and rejects malformed email or short requirements', () => {
    expect(Object.keys(validateContact({}))).toEqual(['name', 'email', 'message']);
    expect(
      validateContact({ name: 'Asha', email: 'not-an-email', message: 'short' }),
    ).toHaveProperty('email');
    expect(
      validateContact({ name: 'Asha', email: 'asha@example.com', message: 'short' }),
    ).toHaveProperty('message');
  });
  it('prepares a safely encoded mail link without claiming delivery', () => {
    const values = {
      name: 'Asha & Co',
      email: 'asha@example.com',
      company: 'A&B',
      interest: 'demo',
      message: 'Please show us ERP & payroll.',
    };
    expect(validateContact(values)).toEqual({});
    const href = createContactEmail(values);
    expect(href).toContain('mailto:info@suffixit.com?');
    expect(new URL(href).searchParams.get('body')).toContain('A&B');
    expect(new URL(href).searchParams.get('subject')).toBe('Product demo enquiry');
  });
  it('refuses to simulate a successful backend submission', async () => {
    await expect(submitContact({})).rejects.toThrow('not connected');
  });
});
