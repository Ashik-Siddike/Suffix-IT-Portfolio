export function validateContact(values) {
  const errors = {};
  if (!values.name?.trim()) errors.name = 'Please enter your name.';
  if (!values.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = 'Please enter a valid email address.';
  if (!values.message?.trim()) errors.message = 'Please tell us about your requirements.';
  else if (values.message.trim().length < 10)
    errors.message = 'Please include at least 10 characters.';
  return errors;
}

export function createContactEmail(values) {
  const subject =
    values.interest === 'demo'
      ? 'Product demo enquiry'
      : `Website enquiry: ${values.interest || 'General enquiry'}`;
  const body = `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\nCompany: ${values.company?.trim() || 'Not provided'}\nInterest: ${values.interest || 'General enquiry'}\n\n${values.message.trim()}`;
  return `mailto:info@suffixit.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Integration boundary: intentionally no network request until a delivery endpoint is supplied.
export async function submitContact(_values) {
  throw new Error('Contact delivery is not connected. Please use email or telephone.');
}
