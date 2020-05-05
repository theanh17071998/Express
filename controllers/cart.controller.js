const User = require('../models/user.model')
const Session = require('../models/session.model')
const Book = require('../models/book.model')

module.exports.index = async (req, res, next) => {
    let cookie = req.signedCookies.userId;
    let user = await User.findOne({_id: cookie});
    let arrCart = [];
        for(var key in user.cart){
            let book = await Book.findOne({_id: key});
            let cart= {};
            cart.id = key
            cart.title = book.title;
           arrCart.push(cart)
        
        }
    res.render('cart/index', {
        cart: arrCart
    })
}
module.exports.addToCart = async (req, res, next) => {
    const bookId = req.params.bookId;
    const sessionId = req.signedCookies.sessionId;
    const cookie = req.signedCookies.userId;
    if(!cookie){
        if(!sessionId){
            res.redirect('/books');
            return;
        }
        // let count = db.get('sessions')
        // .find({id:sessionId})
        // .get(`cart.${bookId}`, 0)
        // .value()
    
        await Session.findOne({id: sessionId})
        .set(`cart.${bookId}`, 1)
        res.redirect('/books')
    }
    await User.findOne({_id: cookie}).set(`cart.${bookId}`, 1)
    res.redirect('/books')
  
}
module.exports.delete = async (req, res, next) =>  {
    const cookie = req.signedCookies.userId;
    const bookId = req.params.bookId;
    let user = await User.findOne({_id: cookie});
    res.redirect('/cart')
}