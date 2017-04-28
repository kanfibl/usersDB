const assert = require('assert');
const User = require('../src/user');

//first we call a function called describe. Describe containts "it"
// functions.
describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({name: 'Joe'}); //joe is an
                                          //instant of the User
     joe.save()
        .then(() => {
          // has joe been saved?
          assert(!joe.isNew);
          done();
        });
  });
});
