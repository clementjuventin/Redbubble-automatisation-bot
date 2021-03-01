const {
    upload, 
    setBrowser
} = require('./chromedriver.js');

oeuvre = {"title":{"FR":"Stop Asian Hate - Tweet","EN":"Stop Asian Hate - Tweet","DK":"Stop Asian Hate - Tweet","ES":"Stop Asian Hate - Tweet"},"tags":{"FR":"stop asian hate, stopasianhate, asian hat, anti asian, AAPI, asian community, asian racism, racism, aapi hate, american, tweet, #stopasianhate, stand up for asian","EN":"stop asian hate, stopasianhate, asian hat, anti asian, AAPI, asian community, asian racism, racism, aapi hate, american, tweet, #stopasianhate, stand up for asian","DK":"stop asian hate, stopasianhate, asian hat, anti asian, AAPI, asian community, asian racism, racism, aapi hate, american, tweet, #stopasianhate, stand up for asian","ES":"stop asian hate, stopasianhate, asian hat, anti asian, AAPI, asian community, asian racism, racism, aapi hate, american, tweet, #stopasianhate, stand up for asian"},"description":{"FR":"Stop Asian Hate - Tweet ","EN":"Stop Asian Hate - Tweet ","DK":"Stop Asian Hate - Tweet ","ES":"Stop Asian Hate - Tweet "},"path":"C:\\Users\\utilisateur\\Desktop\\root\\MoneyMaking\\RedBubble\\out\\asianHate\\asian1.png"}


async function as(){
    await setBrowser()
    await upload(oeuvre,'https://www.redbubble.com/fr/portfolio/images/72170122-dscsdcsqd/duplicate', 0)
}
as()