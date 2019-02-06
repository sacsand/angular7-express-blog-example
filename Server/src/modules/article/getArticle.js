import { Article } from '../../models';


export const getArticle = async (req, res) => {
  const articles = await Article.find({}).lean();

  res.send({
    articles
  });
};
