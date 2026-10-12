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
  const [copyStatus, setCopyStatus] = useState('');
  const form = useRef(null);
  const update = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setPrepared(false);
    setCopyStatus('');
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
      <fieldset className="enquiry-fields">
        <legend>Your details</legend>
        <div className="form-grid">
          {field('name', 'Full name', true)}
          {field('email', 'Email address', true, 'email')}
        </div>
        {field('company', 'Company')}
      </fieldset>
      <fieldset className="enquiry-fields project-fields">
        <legend>Your project</legend>
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
      </fieldset>
      <PrimaryButton type="submit">Prepare email enquiry</PrimaryButton>
      {prepared && (
        <div className="form-status" role="status">
          <h3>Your email draft is ready</h3>
          <dl className="enquiry-summary">
            <div>
              <dt>To</dt>
              <dd>info@suffixit.com</dd>
            </div>
            <div>
              <dt>From</dt>
              <dd>
                {values.name} · {values.email}
              </dd>
            </div>
            <div>
              <dt>Topic</dt>
              <dd>{values.interest || 'General enquiry'}</dd>
            </div>
          </dl>
          <p className="enquiry-message">{values.message}</p>
          <p>
            Your enquiry is ready. Nothing has been sent. Open your email app to review and send it
            to info@suffixit.com.
          </p>
          <div className="enquiry-draft-actions">
            <SecondaryButton href={createContactEmail(values)}>Open email app</SecondaryButton>
            <button
              type="button"
              className="copy-enquiry"
              onClick={async () => {
                const details = new URLSearchParams(createContactEmail(values).split('?')[1]);
                try {
                  await navigator.clipboard.writeText(
                    `${details.get('subject')}\n\n${details.get('body')}`,
                  );
                  setCopyStatus('Draft copied.');
                } catch {
                  setCopyStatus('Copy is unavailable. Use Open email app to continue.');
                }
              }}
            >
              Copy draft
            </button>
          </div>
          {copyStatus && <p>{copyStatus}</p>}
        </div>
      )}
    </form>
  );
}
