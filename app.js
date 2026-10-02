/* Static estimate flow: prepare, review, then let the visitor send their email. */
'use strict';
const form = document.querySelector('#estimate-form');
const review = document.querySelector('#request-review');
const requestText = document.querySelector('#request-text');
const emailLink = document.querySelector('#send-email');
const copyStatus = document.querySelector('#copy-status');
const recipient = 'info@capitalcitycoatingsia.com';
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('#service').value = link.dataset.service;
    review.hidden = true;
  });
});
form.addEventListener('input', () => { review.hidden = true; });
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  for (const name of ['name', 'city']) {
    const field = form.elements.namedItem(name);
    if (!String(data.get(name)).trim()) {
      field.setCustomValidity('Please enter ' + (name === 'name' ? 'your name.' : 'your project city.'));
      field.reportValidity();
      field.addEventListener('input', () => field.setCustomValidity(''), { once: true });
      return;
    }
  }
  const get = key => String(data.get(key) || '').trim();
  const subject = 'Free estimate request: ' + get('service') + ' in ' + get('city');
  const body = [
    'Hello Capital City Coatings,', '', 'I would like a free estimate for my project.', '',
    'Name: ' + get('name'), 'Email: ' + get('email'), 'Phone: ' + (get('phone') || 'Not provided'),
    'City: ' + get('city'), 'Project type: ' + get('service'),
    'Approximate size: ' + (get('size') ? get('size') + ' sq ft' : 'Not sure'), '',
    'Project details:', get('details') || 'I would like to discuss options.', '', 'Thank you!'
  ].join('\n');
  requestText.value = 'To: ' + recipient + '\nSubject: ' + subject + '\n\n' + body;
  emailLink.href = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  copyStatus.textContent = '';
  review.hidden = false;
  review.focus();
});
document.querySelector('#copy-request').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(requestText.value);
    copyStatus.textContent = 'Copied. Paste into an email to ' + recipient + ' and send when ready.';
  } catch {
    requestText.focus();
    requestText.select();
    copyStatus.textContent = 'Select and copy the highlighted details, then paste them into your email.';
  }
});
