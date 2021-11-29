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

<p>
	A basic form which:
</p>
<ul>
	<li>Has an empty initial value for name</li>
	<li>Is initially not valid, but also not invalid (cannot submit)</li>
	<li>Requires an @ in the email address for validity</li>
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
	{JSON.stringify($validation.name)}

	<div class="field" use:validator={{ form: $form, validation }} data-key="email">
		<label for="email">
			<span>Email</span>
			<input id="email" type="text" bind:value={$form.email.value} />
		<label>
		{#if $validation.email.invalid}
		<span class="message">{$validation.email.message}</span>
		{/if}
	</div>
	{JSON.stringify($validation.email)}

	<button disabled={!$validation._form.valid}>
		Sign up
	</button>
	{JSON.stringify($validation._form)}
</form>
