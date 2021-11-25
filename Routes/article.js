const express = require('express')
const Article = require('./../models/articlesdb')
const router = express.Router()

router.get('/new', (req,res) => {
    res.render('articles/new', {article: new Article() })
})
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article})
})
router.get('/:id', async(req,res) => { 
const article = await Article.findById(req.params.id)
if (article==null) {
    res.redirect('/')
}
res.render('articles/show' , {article:article})
// res.send(article._id);
}) 

router.post('/', async(req,res) => {

    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
    article = await article.save()
    // res.send("blog saved");
    // console.log(article);
    res.status(201).redirect(`/articles/${article.id}`)
} catch (e) { 
    // console.log(e);
   res.render('articles/new', {article: article})
//    res.status(400).send(error) 

}
})
router.put('/:id', async(req,res) => {
let article = await Article.findById(req.params.id);
article.title = req.body.title;
article.description = req.body.description;
article.markdown = req.body.markdown;
//     let article = new Article({
//         title: req.body.title,
//         description: req.body.description,
//         markdown: req.body.markdown
//     })
    try {
    article = await article.save()
    // console.log("blog edited");
    // console.log(article);
    res.status(201).redirect(`/articles/${article.id}`)
} catch (e) { 
    console.log(e);
   res.render('articles/edit', {article: article})
//    res.status(400).send(error) 

}
})



router.delete('/:id', async  (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router