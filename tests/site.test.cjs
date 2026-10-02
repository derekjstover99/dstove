const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function setup(values) {
  const elements = {};
  for (const id of ['#estimate-form','#request-review','#request-text','#send-email','#copy-status','#year','#service','#copy-request']) {
    elements[id] = { hidden: true, value: '', textContent: '', handlers: {}, addEventListener(type, fn) { this.handlers[type] = fn; }, focus() {}, select() {} };
  }
  const form = elements['#estimate-form'];
  form.reportValidity = () => true;
  form.elements = { namedItem: () => ({ setCustomValidity(){}, reportValidity(){}, addEventListener(){} }) };
  const links = ['Garage','Basement','Patio','Pool deck','Commercial'].map(service => ({dataset:{service},addEventListener(type, fn){ this.click=fn; }}));
  vm.runInNewContext(fs.readFileSync('app.js','utf8'), {
    document: {querySelector: id => elements[id], querySelectorAll: () => links},
    FormData: class {get(key){return values[key] || '';}},
    Date, navigator: {clipboard: {writeText: async () => { throw Error('Blocked'); }}}
  });
  return {elements,form,links};
}
test('estimate preserves punctuation, unicode and line breaks without altering recipient', () => {
  const {elements, form} = setup({name:'Jane & John',email:'jane@example.com',city:'Des Moines',service:'Garage',details:'Cracks & chips?\nFinish: gray / blue ✓'});
  form.handlers.submit({preventDefault(){}});
  const link = new URL(elements['#send-email'].href);
  assert.equal(link.pathname,'info@capitalcitycoatingsia.com');
  assert.match(link.searchParams.get('body'),/Cracks & chips\?\nFinish: gray \/ blue ✓/);
  assert.equal(elements['#request-review'].hidden,false);
  form.handlers.input();
  assert.equal(elements['#request-review'].hidden,true);
});
test('service links preselect the requested space', () => {
  const {elements,links} = setup({});
  for (const link of links) {link.click();assert.equal(elements['#service'].value,link.dataset.service);}
});
test('clipboard failure offers manual copy', async () => {
  const {elements} = setup({});
  await elements['#copy-request'].handlers.click();
  assert.match(elements['#copy-status'].textContent,/highlighted details/);
});
