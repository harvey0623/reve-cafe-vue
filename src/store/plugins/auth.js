export const authPlugin = function(store) {
	store.dispatch('auth/getUserInfoFromStorage');
	store.subscribe((mutation, state) => {
		
	});
}