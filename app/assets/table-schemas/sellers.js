const thead = [
	{
		classList: '',
		items: [
			{
				content: 'id'
			},
			{
				content: 'Имя'
			},
			{
				content: 'Возраст'
			},
			{
				content: 'Застройщик'
			}
		]
	}
];

const tbody = [
	{
		id: 0,
		name: 'Екатерина',
		age: 24,
		customer_company: {
			id: 0,
			name: 'Строительная компания НОРД'
		}
	},
	{
		id: 1,
		name: 'Светлана',
		age: 32,
		customer_company: {
			id: 0,
			name: 'Строительная компания НОРД'
		}
	},
	{
		id: 2,
		name: 'Юлия',
		age: 28,
		customer_company: {
			id: 1,
			name: 'Инвестиционная компания Развитие'
		}
	},
	{
		id: 3,
		name: 'Анна',
		age: 21,
		customer_company: {
			id: 0,
			name: 'Строительная компания НОРД'
		}
	},
	{
		id: 4,
		name: 'Роман',
		age: 24,
		customer_company: {
			id: 1,
			name: 'Инвестиционная компания Развитие'
		}
	}
]

module.exports = {thead, tbody};
