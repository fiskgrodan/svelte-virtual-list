import SVList from './components/SVList.html';
import store from './store/store.js';

const svlist = new SVList({
	target: document.body,
	store
});

window.store = store; // For debugging

export default svlist;
