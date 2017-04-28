const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () =>{
   let joe;

function assertRemoval(operation, done) {
  operation
  .then(() => User.findOne({name:'Joe'}))
  .then((user) => {
    assert(user === null);
    done();
  });
}

   beforeEach((done) => {
     joe = new User({name: 'Joe'});
     joe.save()
        .then(()=>done());
   });

   it('model instance remove', (done)=> {
     //remove a specific model instance
     assertRemoval(joe.remove(), done);
   });

   it('class method remove', (done)=> {
     // remove several records with some criteria
     assertRemoval(User.remove({name:'Joe'}),done);
   });

   it('class method findOneAndRemove', (done)=> {
     //remove the first one found by NAME
     assertRemoval(User.findOneAndRemove({name:'Joe'}),done);
   });

   it('class method findByIdAndRemove', (done)=> {
     assertRemoval(User.findByIdAndRemove(joe._id),done);
   });

});
