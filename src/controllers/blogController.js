const axios = require('axios');


const search = async (req, res) => {

    let searched = req.body.search;

    let combining = /[\u0300-\u036F]/g; 

    searched = searched.normalize('NFKD').replace(combining, '');

    let paging = "";
    let activePage = 1;

    if (req.query.page) {
        paging = "page=" + req.query.page;
        activePage = req.query.page;
    }


   


    try {
        const searchedArticles = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts?search=' + searched);
       
         res.render('./articles/index',{articles: searchedArticles.data, paging:searchedArticles.headers, activePage: activePage});
     } catch (err) {
        
        res.json({
            message: 'Error: ' + err.response.data
        });
     }
     
 }

const getAllArticles = async (req, res) => {

    let paging = "";
    let activePage = 1;

    if (req.query.page) {
        paging = "page=" + req.query.page;
        activePage = req.query.page;
    }

   try {
       const allArticles = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts?per_page=20&'+paging);
        //console.log(blogAPI.headers);
        res.render('./articles/index',{articles: allArticles.data, paging:allArticles.headers, activePage: activePage});
    } catch (err) {
      
        res.json({
            message: 'Error: ' + err.response.data
        })
    }
    
}

const getSingleArticle = async (req, res) => {
    let articleID = req.params.articleID;

    try {
        const singleArticle = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts/' + articleID);

        res.render('./articles/article',{article:singleArticle.data});
    }catch (err) {
       
        res.json({
            message: 'Error ' + err.response.data
        })
    }
}


module.exports = {
    getAllArticles,
    getSingleArticle,
    search
}