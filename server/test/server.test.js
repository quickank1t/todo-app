const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todos} = require('./../model/todos');

beforeEach((done) => {
  Todos.remove({}).then(()=> done());
});

describe('Post Todos',() => {
  it('should create new todos', (done) => {
    var text = "Test todos";

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        //console.log(res.body.text);
        expect( res.body.text).toBe(text);
      })
      .end((err, res) =>{
        if(err){
          return done(err);
        }

        Todos.find()
        .then((todos) =>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        })
        .catch((e) => done(e));
      });
  });

  it('should not save when wrong data is sent', (done) => {
    var text = '';

    request(app)
      .post('/todos')
      .send({text})
      .expect(400)
      .end((err, res) =>{
        if(err)
          return done(err);

        Todos.find().then((todos)=>{
          expect(todos.length).toBe(0);
          done();
        }).catch((e)=> done(e));
      });

  });
});
