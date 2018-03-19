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
		name: 'Екатерина',
		age: 24,
		customer_company: 0
	},
	{
		name: 'Светлана',
		age: 32,
		customer_company: 0
	},
	{
		name: 'Юлия',
		age: 28,
		customer_company: 1
	},
	{
		name: 'Анна',
		age: 21,
		customer_company: 0
	},
	{
		name: 'Роман',
		age: 24,
		customer_company: 1
	}
]

module.exports = {thead, tbody};
