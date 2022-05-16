<script>
    import { validator, schema } from '../index.js'

    export let value = null
    export let validators
    export let features = []
    export let label
    export let type = 'text'

const {
      form,
      validation
    } = schema({
      name: {
        value: null,
        validators: [
          { validator: 'required', message: 'Please enter your name' }
        ]
      },
      field2: {
        value,
        validators
      }
})
</script>

<p>
    A form which:
</p>

<ul>
    {#each features as feature}
    <li>{feature}</li>
    {/each}
</ul>

<form on:submit|preventDefault>
<div class="field" use:validator={{ form: $form, validation }} data-key="name">
    <label for="name">
        <span>Name</span>
        <input id="name" type="text" bind:value={$form.name.value} />
    <label>
    {#if $validation.name.invalid}
        <span class="message">{$validation.name.message}</span>
    {/if}
</div>

<div class="field" use:validator={{ form: $form, validation }} data-key="field2">
    <label for="field2">
        <span>{label}</span>
        {#if type === 'text'}
        <input id="field2" type="text" bind:value={$form.field2.value} />
        {:else if type === 'checkbox'}
        <input id="field2" type="checkbox" bind:checked={$form.field2.value} />
        {:else if type === 'date'}
        <input id="field2" type="date" bind:value={$form.field2.value} />
        {/if}
    <label>
    {#if $validation.field2.invalid}
    <span class="message">{$validation.field2.message}</span>
    {/if}
</div>

{JSON.stringify($validation)}

<button disabled={!$validation._form.valid}>
    Sign up
</button>
</form>