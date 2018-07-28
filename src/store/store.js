import { Store } from 'svelte/store.js';
import { generateUserArray } from './users.js';

const store = new Store({
	scrollY: window.scrollY,
	innerHeight: window.innerHeight,
	marginTop: 536, // TODO: Calculate dynamically
	itemHeight: 66, // TODO: Calculate dunamically
	users: generateUserArray(2000)
});

store.compute('userCount', ['users'], (users) => {
	return users.length;
});

store.compute('renderCount', ['innerHeight', 'itemHeight'], (innerHeight, itemHeight) => {
	return Math.ceil((innerHeight) / itemHeight);
});

store.compute(
	'firstUser',
	['scrollY', 'marginTop', 'itemHeight', 'renderCount'],
	(scrollY, marginTop, itemHeight, renderCount) => {
		return Math.max(0, Math.floor((scrollY - marginTop) / itemHeight) - Math.floor(renderCount / 2));
	});

store.compute('lastUser', ['firstUser', 'userCount', 'renderCount'], (firstUser, userCount, renderCount) => {
	return Math.min(userCount, firstUser + 2 * renderCount);
});

store.compute('topFillerHeight', ['itemHeight', 'firstUser'], (itemHeight, firstUser) => {
	return itemHeight * firstUser;
});

store.compute('bottomFillerHeight', ['itemHeight', 'userCount', 'lastUser'], (itemHeight, userCount, lastUser) => {
	return itemHeight * (userCount - lastUser);
});

store.compute('filteredUsers', ['users', 'firstUser', 'lastUser'], (users, firstUser, lastUser) => {
	return users.slice(firstUser, lastUser);
});

store.compute(
	'listHeight',
	['itemHeight', 'firstUser', 'lastUser', 'topFillerHeight', 'bottomFillerHeight'],
	(itemHeight, firstUser, lastUser, topFillerHeight, bottomFillerHeight) => {
		return ((lastUser - firstUser + 1) * itemHeight) + topFillerHeight + bottomFillerHeight;
	}
)

export default store;
