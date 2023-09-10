import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ parent, locals: { supabase } }) => {
	const { session } = await parent();

	const uid = session?.user.id;
	const { data: following, error } = await supabase
		.from('followers')
		.select('profiles!followers_following_id_fkey(*)')
		.eq('follower_id', uid);

	return {
		uid,
		following
	};
};

export const actions: Actions = {
	search: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');

		const { data: found, error } = await supabase
			.from('profiles')
			.select('avatar_url, first_name, last_name, id')
			.eq('email', email);

		console.log(found);
		return {
			success: true,
			found
		};
	},
	follow: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const uid = formData.get('uid');
		const id = formData.get('id');
		const { data, error } = await supabase.rpc('follow_user', {
			follower_id: uid,
			following_id: id
		});
	}
};
