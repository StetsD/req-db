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
				content: 'Адрес'
			},
			{
				content: 'Начальник'
			}
		]
	}
];

const tbody = [
	{
		id: 0,
		name: 'Компонент индастриз',
		address: 'ул. Ворошилова 5/3',
		boss: {
			id: 0,
			name: 'Борис Бритва'
		}
	},
	{
		id: 1,
		name: 'Инвестиционная компания Развитие',
		address: 'ул. Восстания 45',
		boss: {
			id: 1,
			name: 'Аркадий Северный'
		}
	}
]

module.exports = {thead, tbody};
