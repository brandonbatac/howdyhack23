<script lang="ts">
	import { enhance } from '$app/forms';
	export let data;
	export let form;
</script>

<form action="?/search" method="POST" use:enhance>
	<h1>Search People</h1>
	<div class="center">
		<input type="text" name="email" placeholder="Email" />
		<button class="search-button">Search</button>
	</div>

	<div class="flex-container-2">
		<div class="friends-list">
			{#if data.following}
				{#each data.following as { profiles }}
					<p>{profiles.first_name} {profiles.last_name}</p>
				{/each}
			{/if}
		</div>
		{#if form?.found}
			<div class="profile-box">
				<div class="flex-container-3">
					<img src={form.found[0].avatar_url} alt="Profile Image" class="profile-image-2" />
					<h2>{form.found[0].first_name} {form.found[0].last_name}</h2>
					<form action="?/follow" method="POST" use:enhance>
						<input type="hidden" name="uid" value={data.uid} />
						<input type="hidden" name="id" value={form.found[0].id} />
						<button class="follow-button">Follow</button>
					</form>
				</div>
			</div>
		{:else}
			<div class="profile-box-invis" />
		{/if}
	</div>
</form>

<style>
	/* Reusable class for box-sizing and font properties */
	:global(body) {
		margin: 0;
		padding: 0;
		font-size: 34px;
		font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol', 'Noto Color Emoji';
	}

	.profile-image-2 {
		width: 250px;
		height: 250px;
		border-radius: 50%;
	}

	.flex-container-2 {
		display: flex;
		align-items: center;
		gap: 10px;
		justify-content: center;
		margin-top: 5%;
	}

	h1 {
		margin-top: 10%;
		text-align: center;
		font-size: 64px;
		text-decoration: none;
	}

	h2 {
		margin-top: 10%;
		text-align: center;
		font-size: 50px;
		text-decoration: none;
		margin-bottom: 100px;
	}

	.center {
		margin: 0;
		position: absolute;
		left: 50%;
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}

	input {
		margin: 2px;
		padding: 12px 20px 12px 20px;
		box-sizing: border-box;
		border-radius: 0.5rem;
		border: none;
		width: 500px;
	}

	.profile-box {
		background: #e3d9c0;
		height: 425px;
		width: 1100px;
		border-radius: 15px;
		margin-bottom: 115px;
	}

	.profile-box-invis {
		background: none;
		height: 425px;
		width: 1100px;
		border-radius: 15px;
		margin-bottom: 115px;
	}

	.flex-container-3 {
		display: flex;
		align-items: center;
		gap: 100px;
		justify-content: center;
		margin-top: 45px;
	}

	.search-button {
		background: #a59378;
		margin: 2px;
		padding: 12px 20px 12px 20px;
		box-sizing: border-box;
		border-radius: 0.5rem;
		border: none;
	}

	.follow-button {
		background: #a59378;
		height: 85px;
		width: 150px;
		border-radius: 15px;
		border: none;
		font-size: 34px;
		font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol', 'Noto Color Emoji';
	}

	h3 {
		margin-top: 25px;
		text-align: center;
		font-size: 30px;
		text-decoration: none;
	}

	.friends-list {
		background: #e3d9c0;
		height: 500px;
		width: 350px;
		border-radius: 15px;
		align-items: center;
		padding: 20px;
		margin-left: 40px;
	}
</style>
