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
		id: 0,
		name: 'Проект Высота',
		price: 25000,
		customer_company: {
			id: 0,
			name: 'Строительная компания НОРД'
		},
		building_company: {
			id: 1,
			name: 'Бетон и арматура'
		}
	},
	{
		id: 1,
		name: 'Проект Лофт',
		price: 18000,
		customer_company: {
			id: 1,
			name: 'Инвестиционная компания Развитие'
		},
		building_company: {
			id: 0,
			name: 'Компонент индастриз'
		}
	}
]

module.exports = {thead, tbody};
