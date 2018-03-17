const thead = [
	{
		classList: '',
		items: [
			{
				content: 'id'
			},
			{
				content: 'Клиент'
			},
			{
				content: 'Строение'
			}
		]
	}
];

const tbody = [
	{
		id: 0,
		client: {
			id: 0,
			name: 'Boris',
			age: 25
		},
		building: {
			id: 0,
			name: 'Проект Высота',
			price: 25000,
			customer_company_id: 0,
			building_company_id: 1
		}

	},
	{
		id: 1,
		client: {
			id: 1,
			name: 'Semen',
			age: 43
		},
		building: {
			id: 1,
			name: 'Проект Лофт',
			price: 18000,
			customer_company_id: 1,
			building_company_id: 0
		}
	}
]

module.exports = {thead, tbody};
