import Chance from 'chance';

const chance = new Chance();

export const generateUser = () => {
	return {
		ssn: chance.ssn({ ssnFour: true }),
		name: chance.name(),
		gender: chance.gender({
			extraGenders: ['Agender', 'Genderqueer', 'Trans', 'Pangender', 'Helicopter', 'Mayonnaise']
		}),
		age: chance.age()
	}
};

export const generateUserArray = (userCount = 0) => {
	const userArray = [];

	while (0 < userCount--) {
		userArray.push(generateUser());
	}

	return userArray;
}
