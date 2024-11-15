export default {
	onPageLoad: async () => {
		await storeValue("activeTab", "audio")
		await utils.updateActiveRefName("Audio1")
	},
	
	getSearch: () => {
		return utils.cleanResults(
			Object.keys(eval(utils.getRefName(WidgetSelector.selectedOptionValue)))
			.filter(key => {
				return key.toLowerCase().includes(KeySearch.text.toLowerCase())
			})
			.map(key => {
				return {
					[key]: eval(utils.getRefName(WidgetSelector.selectedOptionValue))[key]
				}
			})
		)
	},
	
	cleanResults: arr => {
		return Object.assign({}, ...arr)
	},
	
	getRefName: (name) => {
		const words = name.split(/[- ]/)
		const capped = words.map((word) => {
			return utils.capitalize(word)
		})
		if (capped[0].includes("picker")) {
			capped[0] = capped[0].replace("picker", "Picker")
		}
		if (capped[0].includes("Json")) {
			capped[0] = capped[0].replace("Json", "JSON")
		} 
 		const activeRefName = capped.join("") + "1"
		return activeRefName
	},
	
	capitalize: word => {
		const firstLetter = word[0].toUpperCase()
		const restOfWord = word.slice(1).toLowerCase()
		return firstLetter + restOfWord
	},
	
	updateActiveRefName: async (name) => {
		await storeValue('activeRefName', name)
	}
}