<script lang="ts">
	import { enhance } from '$app/forms';

	function handleSubmit() {
		// ...

		return async ({ update }) => {
			await update({ reset: false });
		};
	}

	export let data;
	export let form;
</script>

<form action="?/search" method="POST" use:enhance>
	<h1>Events</h1>

	<div class="center">
		<input type="hidden" name="uid" value={data.uid} />
		<input type="text" name="city" placeholder="City" />
		<button class="search-button">Search</button>
	</div>

	<div class="fat" />

	<div class="flex-container-2">
		{#if form?.found}
			{#each form.found as event}
				<div class="profile-box">
					<h3>{event.event_name}</h3>

					<p>{event.event_description}</p>
					{#if event.attendees_from_following.length != 0}
						<div class="attendee">
							<h3>Attendees</h3>
							{#each event.attendees_from_following as person}
								{#if person.first_name}
									<div class="attendee">
										<p>{person.first_name} {person.last_name}</p>
										<img src={person.avatar_url} alt="Profile Image" class="profile-image" />
									</div>
								{/if}
							{/each}
						</div>
					{/if}

					<form action="?/rsvp" method="POST" use:enhance>
						<input type="hidden" name="uid" value={data.uid} />
						<input type="hidden" name="event_id" value={event.event_id} />
						<button class="search-button">RSVP</button>
					</form>
				</div>
			{/each}
		{/if}
	</div>
</form>
<br />

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

	.fat {
		height: 50px;
	}

	.flex-container-2 {
		display: flex;
		align-items: center;
		gap: 20px;
		justify-content: center;
		flex-direction: column;
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
		height: auto;
		width: 1100px;
		border-radius: 15px;
		text-align: center;
		padding: 10px;
	}

	.profile-image {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.attendee {
		display: flex;
		align-items: center;
		gap: 20px;
		justify-content: center;
		flex-direction: row;
	}

	.search-button {
		background: #a59378;
		margin: 2px;
		padding: 12px 20px 12px 20px;
		box-sizing: border-box;
		border-radius: 0.5rem;
		border: none;
	}

	h3 {
		margin-top: 25px;
		text-align: center;
		font-size: 30px;
		text-decoration: none;
	}
</style>
