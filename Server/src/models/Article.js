import mongoose from 'mongoose';
import mongooseHiddenFN from 'mongoose-hidden';
import shortid from 'shortid';
import mongoosePaginate from 'mongoose-paginate';

const mongooseHidden = mongooseHiddenFN();


const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true
    },
    author: {
      type: String,
      trim: true,
      default: 'null'
    },
    content: {
      type: String,
      trim: true,
      default: 'null'
    },
    description: {
      type: String,
      trim: true,
      default: 'null'
    },
    publishedAt: {
      type: String,
      trim: true
    },
    source: {
      type: Schema.Types.Mixed,
      trim: true,
      unique: true
    },
    url: {
      type: String,
      trim: true
    },
    urlToImage: {
      type: String,
      trim: true
    }

  },
  {
    timestamps: true
  }
);

ArticleSchema.plugin(mongoosePaginate);

ArticleSchema.pre('save', async function (next) {
  if (this.shortID) {
    next(); // skip it
    return; // stop this function from running
  }

  this.shortID = shortid.generate();

  next();
});

ArticleSchema.plugin(mongooseHidden, {
  hidden: {

    __v: true
  }
});

const Article = mongoose.model('Articlee', ArticleSchema);

export { Article };
