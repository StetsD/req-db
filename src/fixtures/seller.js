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
		customer_company_id: 1
	},
	{
		name: 'Светлана',
		age: 32,
		customer_company_id: 1
	},
	{
		name: 'Юлия',
		age: 28,
		customer_company_id: 2
	},
	{
		name: 'Анна',
		age: 21,
		customer_company_id: 1
	},
	{
		name: 'Роман',
		age: 24,
		customer_company_id: 2
	}
]

module.exports = {thead, tbody};
