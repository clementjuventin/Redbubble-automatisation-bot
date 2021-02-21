const { translate, detectLanguage, wordAlternatives, translateWithAlternatives } = require('deepl-translator');
 
// Translate text with explicit source and target languages
translateWithAlternatives(
    'Die Übersetzungsqualität von deepl ist erstaunlich!',
    'EN'
  )
    .then(res =>
      console.log(
        `Translation alternatives: ${res.translationAlternatives.join(', ')}`
      )
    )
    .catch(console.error);