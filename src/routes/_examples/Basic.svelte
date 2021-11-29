<script>
  import './form.css'
  import { validator, schema } from '$lib/index.js'

	const { form, validation } = schema({
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
				{ validator: 'email', message: '%s Should be an email' }
			]
		}
	})
</script>

<form on:submit|preventDefault>
	<div class="field" use:validator={{ form: $form, validation }} data-key="name">
		<label for="email">
			<span>Name</span>
			<input id="email" type="text" bind:value={$form.name.value} />
		<label>
		{#if $validation.name.invalid}
		<span class="message">{$validation.name.message}</span>
		{/if}
	</div>

	<div class="field" use:validator={{ form: $form, validation }} data-key="email">
		<label for="email">
			<span>Email</span>
			<input id="email" type="text" bind:value={$form.email.value} />
		<label>
		{#if $validation.email.invalid}
		<span class="message">{$validation.email.message}</span>
		{/if}
	</div>

	<button disabled={$validation._form.invalid}>
		Sign up
	</button>
</form>
