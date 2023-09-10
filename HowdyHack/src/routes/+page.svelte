<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	export let data;
</script>

<div class="flex-container-2">
	<h1>TownTalk</h1>
	<p>Find events that all your friends are attending</p>
</div>

<style>
	/* Reusable class for box-sizing and font properties */
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: antiquewhite;
		font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol', 'Noto Color Emoji';
	}

	.flex-container-2 {
		display: flex;
		align-items: center;
		gap: 10px;
		justify-content: center;
		flex-direction: column;
	}

	h1 {
		text-align: center;
		font-size: 64px;
		text-decoration: none;
		margin-top: 18%;
		margin-bottom: 0px;
	}

	p {
		text-align: center;
		font-size: xx-large;
		text-decoration: none;
		margin-top: 20px;
	}
</style>
