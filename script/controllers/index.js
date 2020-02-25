
class Index {
    homePage = (req, res, next) => {
        res.render('index', { title: 'Express' });
    }
}

export default new Index();