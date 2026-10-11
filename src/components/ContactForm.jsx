import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from './ui';
import { createContactEmail, validateContact } from '../lib/contact';

export default function ContactForm() {
  const [params] = useSearchParams();
  const [values, setValues] = useState({
    name: '',
    email: '',
    company: '',
    interest: params.get('solution') || (params.get('intent') === 'demo' ? 'demo' : ''),
    message:
      params.get('intent') === 'demo' && params.get('solution')
        ? `I would like to request a demo of ${params.get('solution')}.`
        : '',
  });
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState(false);
  const form = useRef(null);
  const update = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setPrepared(false);
  };
  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      form.current.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
      setPrepared(false);
    } else setPrepared(true);
  };
  const field = (name, label, required = false, type = 'text') => (
    <div className="form-field">
      <label htmlFor={name}>
        {label}
        {required ? ' *' : ' (optional)'}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={values[name]}
        onChange={update}
        autoComplete={name === 'name' ? 'name' : name === 'email' ? 'email' : 'organization'}
        required={required}
        maxLength={name === 'email' ? 254 : 120}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <span id={`${name}-error`} className="form-error">
          {errors[name]}
        </span>
      )}
    </div>
  );
  return (
    <form className="contact-form" ref={form} onSubmit={submit} noValidate>
      <h2>Tell us about your project.</h2>
      <p className="form-note">
        Prepare an enquiry, then open it in your email app. This form does not send or store your
        information. Fields marked * are required.
      </p>
      <div className="form-grid">
        {field('name', 'Full name', true)}
        {field('email', 'Email address', true, 'email')}
      </div>
      {field('company', 'Company')}
      <div className="form-field">
        <label htmlFor="interest">I’m interested in (optional)</label>
        <select id="interest" name="interest" value={values.interest} onChange={update}>
          <option value="">Select a topic</option>
          <option value="demo">Requesting a product demo</option>
          <option value="Enterprise software">Enterprise software</option>
          <option value="Custom development">Custom development</option>
          <option value="IT consulting">IT consulting</option>
          <option value="Infrastructure & security">Infrastructure & security</option>
          {values.interest &&
            ![
              'demo',
              'Enterprise software',
              'Custom development',
              'IT consulting',
              'Infrastructure & security',
            ].includes(values.interest) && (
              <option value={values.interest}>{values.interest}</option>
            )}
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="message">Your requirements *</label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={update}
          required
          maxLength={4000}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span className="form-error" id="message-error">
            {errors.message}
          </span>
        )}
      </div>
      <PrimaryButton type="submit">Prepare email enquiry</PrimaryButton>
      {prepared && (
        <div className="form-status" role="status">
          <p>
            Your enquiry is ready. Nothing has been sent. Open your email app to review and send it
            to info@suffixit.com.
          </p>
          <SecondaryButton href={createContactEmail(values)}>Open email app</SecondaryButton>
        </div>
      )}
    </form>
  );
}
