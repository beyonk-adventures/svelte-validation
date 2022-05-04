<script lang="ts" context="module">
  import type { PageMeta } from '@vitebook/client';

  export const __pageMeta: PageMeta = {
    title: 'Checkbox Validation',
    description: 'Checkbox Validation Example',
  };
</script>

<script>
  import { Variant } from '@vitebook/client';
  import Form from './components/_form.svelte'
  import './form.css'
</script>

<Variant name="Checkboxes">
  <Form
    label="Terms & Conditions"
    type="checkbox"
    validators={[
      {
        validator: 'required',
        message: 'You must agree to our Terms and Conditions'
      }
    ]}
    />
</Variant>

<Variant name="Dates">
  <Form
    label="Date Of Birth"
    type="date"
    validators={[
      {
        validator: 'required',
        message: 'You must select your date of birth'
      },
      {
        validator: 'date',
        options: {
          before: (new Date()).setFullYear(new Date().getFullYear() - 18)
        },
        message: 'You must be older than 18 to use this service'
      }
    ]}
    />
</Variant>