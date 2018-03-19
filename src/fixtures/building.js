const thead = [
	{
		classList: '',
		items: [
			{
				content: 'id'
			},
			{
				content: 'Название'
			},
			{
				content: 'Цена'
			},
			{
				content: 'Застройщик'
			},
			{
				content: 'Подрядчик'
			}
		]
	}
];

const tbody = [
	{
		name: 'Проект Высота',
		price: 25000,
		customer_company_id: 1,
		building_company_id: 2
	},
	{
		name: 'Проект Лофт',
		price: 18000,
		customer_company_id: 2,
		building_company_id: 1
	}
]

module.exports = {thead, tbody};
