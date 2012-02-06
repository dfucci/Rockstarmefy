var testCase;

testCase = buster.testCase('Rockstarmefy tests', {
  'artist should be set': function() {
    var a;
    a = getCurrentArtist();
    return buster.assert.equals(a, 'radiohead');
  }
});
