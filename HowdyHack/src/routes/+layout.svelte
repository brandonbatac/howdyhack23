<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
	$: ({ supabase, session } = data);
	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				console.log('auth state changed');
				invalidate('supabase:auth');
			}
		});
		return () => subscription.unsubscribe();
	});
</script>

<div class="home">
	{#if data.session}
		<div class="header-bar">
			<div class="left-bar">
				<div class="home-button-header">
					<a href="/" class="btn">Home</a>
				</div>
				<div class="home-button-header">
					<a href="/events" class="btn">Events</a>
				</div>
				<div class="home-button-header">
					<a href="/friends" class="btn">Friends</a>
				</div>
			</div>
			<div class="gap" />
			<div class="right-bar">
				<div class="home-button-header">
					<a href="/logout" class="btn">Logout</a>
				</div>
				{#if data.profile}
					<div class="flex-container profile-info">
						<img src={data.profile[0].avatar_url} alt="Profile Image" class="profile-image" />
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<div class="header-bar">
			<div class="left-bar">
				<div class="home-button-header">
					<a href="/" class="btn">Home</a>
				</div>
			</div>
			<div class="gap" />

			<div class="right-bar">
				<div class="home-button-header">
					<a href="/login" class="btn">Login</a>
				</div>
				<div class="home-button-header">
					<a href="/signup" class="btn">Sign up</a>
				</div>
			</div>
		</div>
	{/if}
</div>

<slot />

<style>
	/* Reusable class for box-sizing and font properties */
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: antiquewhite;
	}

	.home-button-header {
		font-size: 34px;
		font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol', 'Noto Color Emoji';
	}

	/* Reusable class for flexbox container */
	.flex-container {
		display: flex;
		align-items: center;
		gap: 10px;
		justify-content: center;
	}

	.left-bar {
		display: flex;
		align-items: center;
		justify-content: left;
		gap: 20px;
		flex-direction: row;
	}

	.right-bar {
		display: flex;
		align-items: center;
		justify-content: right;
		gap: 20px;
		flex-direction: row;
	}

	.gap {
		display: flex;
		align-items: center;
		justify-content: right;
		flex-grow: 1;
		flex-direction: row;
	}

	/* Common styles for header-bar */
	.header-bar {
		display: flex;
		align-items: center;
		background: #e3d9c0;
		padding: 10px 20px 10px 20px;
		flex-direction: row;
	}

	/* Button styles */
	.btn {
		color: #52493e;
		text-align: left;
		font-size: 34px;
		text-decoration: none;
	}

	/* Header styles */

	/* Profile image styles */
	.profile-image {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.bottom-bar {
		background: #e3d9c0;
		height: 20px;
		position: absolute;
		right: 0px;
		left: 0px;
		bottom: 0px;
		overflow: hidden;
	}
</style>
