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
		customer_company: 0,
		building_company: 1
	},
	{
		name: 'Проект Лофт',
		price: 18000,
		customer_company: 1,
		building_company: 0
	}
]

module.exports = {thead, tbody};
