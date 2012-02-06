testCase = buster.testCase 'Rockstarmefy tests', {
	'artist should be set': ()->
		a = getCurrentArtist()
		buster.assert.equals a, 'radiohead'
}