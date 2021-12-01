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
					{ validator: 'email', message: '%email% Should be an email' }
				]
			},
			// list: {
			// 	value: [],
			// 	validators: [
			// 		{ validator: 'includes', message: 'Must be in %list%', options: { list: [ 'foo', 'bar', 'baz', 'qux' ] } }
			// 	]
			// }
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

	<div class="field" use:validator={{ form: $form, validation }} data-key="email">
		<label for="email">
			<span>Email</span>
			<input id="email" type="text" bind:value={$form.email.value} />
		<label>
		{#if $validation.email.invalid}
		<span class="message">{$validation.email.message}</span>
		{/if}
	</div>
<!-- 
	<div class="field" use:validator={{ form: $form, validation }} data-key="list">
		<label for="list">
			<span>These items</span>
			<input id="list" type="checkbox" bind:group={$form.list.value} />
		<label>
		{#if $validation.email.invalid}
		<span class="message">{$validation.email.message}</span>
		{/if}
	</div> -->

	{JSON.stringify($validation)}

	<button disabled={!$validation._form.valid}>
		Sign up
	</button>
</form>
