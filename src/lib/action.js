import { get } from 'svelte/store';

function validator(node, { form, validation }) {
  const key = node.dataset.key;
  let previous = form[key].value;
  const _form = { invalid: false, dirty: false };

  return {
    update({ form }) {
      const current = form[key].value;
      let { invalid, message, dirty } = get(validation)[key];

      if (previous !== current) {
        _form.invalid = false;
        _form.dirty = true;
        try {
          form[key].validate(current);
          invalid = false;
          message = undefined;
          node.classList.add('valid');
          node.classList.remove('invalid');
          node.dispatchEvent(new CustomEvent('valid'));
        } catch (e) {
          invalid = true;
          _form.invalid = true;
          message = e.message;
          node.classList.add('invalid');
          node.classList.remove('valid');
        } finally {
          validation.update((r) => ({
            ...r,
            [key]: {
              dirty,
              message,
              invalid,
            },
            _form,
          }));
          previous = current;
        }
      }
    },
  };
}

export { validator };
