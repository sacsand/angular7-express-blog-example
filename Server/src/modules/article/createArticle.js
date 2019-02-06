import { Article } from '../../models';


export const createArticle = async (req, res) => {
  const { article } = req.body;

  console.log(444, article);


  const newArticle = new Article(article.article);

  // 2) Validate Article
  try {
    await newArticle.validate();
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error: ' validation failed!' });

    throw error;
  }

  // 3) Save the Article
  try {
    await newArticle.save();
  } catch (error) {
    res.status(500);
    res.send({ error: 'DB error!' });
    throw error;
  }


  res.send({
    article: newArticle
  });
};
