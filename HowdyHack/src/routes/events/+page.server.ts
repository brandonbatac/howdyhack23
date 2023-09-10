export const load: PageLoad = async ({ parent }) => {
	const { session } = await parent();

	const uid = session?.user.id;

	return {
		uid
	};
};

export const actions: Actions = {
	search: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const city = formData.get('city');
		const uid = formData.get('uid');

		const { data: found, error } = await supabase.rpc('get_events_with_following_attendees', {
			user_id: uid,
			user_city: city
		});

		console.log(found);
		console.log(error);
		return {
			success: true,
			found
		};
	},
	rsvp: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const uid = formData.get('uid');
		const eventId = formData.get('event_id');

		const { error } = await supabase
			.from('attending')
			.insert({ event_id: eventId, person_id: uid });
		console.log(error);
		return {
			success: error == null
		};
	}
};
