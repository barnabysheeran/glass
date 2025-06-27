export default {
	options: {
		doNotFollow: ['node_modules'],

		reporterOptions: {
			dot: {
				filters: {
					includeOnly: {
						path: '^src/js',
					},

					exclude: {
						path: [
							'src/js/application/ApplicationLogger.js',
							'src/js/application/ApplicationConfiguration.js',
							'src/js/application/ApplicationDispatcher.js',
							'src/js/application/ApplicationEvent.js',

							'src/js/directable/dotmatrix/shape/fill/Fill.js',
							'src/js/directable/dotmatrix/shape/fill/FillType.js',
							'src/js/directable/dotmatrix/shape/fill/FillStrategy.js',
							'src/js/directable/dotmatrix/shape/fill/FillStrategyType.js',
						],
					},
				},
			},
		},
	},
};
