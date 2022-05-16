<script context="module">
  export const PageMeta = {
    title: 'Basic Validation',
    description: 'Basic Validation Example'
  }
</script>

<script>
  import { Variant } from '@vitebook/client'
  import './form.css'
  import { validator, schema } from '$lib/index.js'

const { form: basicForm, validation: basicValidation } = schema({
    name: {
      value: null,
      validators: [
        { validator: 'required', message: 'Please enter your name' }
      ]
    },
    email: {
      value: 'jeff@example.com',
      validators: [
        { validator: 'required', message: 'Field is required' },
        { validator: 'email', message: '%email% Should be an email' }
      ]
    }
})

  const { form: nullsForm, validation: nullsValidation } = schema({
    name: {
      value: null,
      validators: [
        { validator: 'required', message: 'Please enter your name' }
      ]
    },
    email: {
      value: null,
      validators: [
        { validator: 'required', message: 'Field is required' },
        { validator: 'email', message: '%email% Should be an email' }
      ]
    }
})
</script>


<p>
  A basic form which:
</p>
<Variant name="Default">
  <ul>
    <li>Has an empty initial value for name</li>
    <li>Is initially not valid, but also not invalid (cannot submit)</li>
    <li>Requires an @ in the email address for validity</li>
  </ul>

  <form on:submit|preventDefault>
    <div class="field" use:validator={{ form: $basicForm, validation: basicValidation }} data-key="name">
      <label for="name">
        <span>Name</span>
        <input id="name" type="text" bind:value={$basicForm.name.value} />
      <label>
      {#if $basicValidation.name.invalid}
      <span class="message">{$basicValidation.name.message}</span>
      {/if}
    </div>

    <div class="field" use:validator={{ form: $basicForm, validation: basicValidation }} data-key="email">
      <label for="email">
        <span>Email</span>
        <input id="email" type="text" bind:value={$basicForm.email.value} />
      <label>
      {#if $basicValidation.email.invalid}
      <span class="message">{$basicValidation.email.message}</span>
      {/if}
    </div>

    {JSON.stringify($basicValidation)}

    <button disabled={!$basicValidation._form.valid}>
      Sign up
    </button>
  </form>
</Variant>

<Variant name="Nulls">
  <ul>
    <li>Has all null initial values</li>
  </ul>

  <form on:submit|preventDefault>
    <div class="field" use:validator={{ form: $nullsForm, validation: nullsValidation }} data-key="name">
      <label for="name">
        <span>Name</span>
        <input id="name" type="text" bind:value={$nullsForm.name.value} />
      <label>
      {#if $nullsValidation.name.invalid}
      <span class="message">{$nullsValidation.name.message}</span>
      {/if}
    </div>

    <div class="field" use:validator={{ form: $nullsForm, validation: nullsValidation }} data-key="email">
      <label for="email">
        <span>Email</span>
        <input id="email" type="text" bind:value={$nullsForm.email.value} />
      <label>
      {#if $nullsValidation.email.invalid}
      <span class="message">{$nullsValidation.email.message}</span>
      {/if}
    </div>

    {JSON.stringify($nullsValidation)}

    <button disabled={!$nullsValidation._form.valid}>
      Sign up
    </button>
  </form>
</Variant>
