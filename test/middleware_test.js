const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogpost');
const Comment = require('../src/comment');

describe('Middlware', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({title: 'JS is great', content:'It really is'});
    comment = new Comment({content: 'Congrats on great post'});

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then( () => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    joe.remove()
      .then(() => Comment.count())
      .then((count) => {
        console.log(Comment);
        console.log(count);

        assert(count === 0);
        //assert(results[1] === 0);
        done();
      });
  });

});
