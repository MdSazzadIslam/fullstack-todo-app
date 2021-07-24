const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const Todo = require("../src/models/todoModel");
const server = require("../server");
let should = chai.should();

chai.use(chaiHttp);
const id = "60fc2740c40de5429c66aa62";

/*
 * Test the /GET route
 */

describe("/GET todos", () => {
  it("It should GET all the todo records", (done) => {
    chai
      .request(server)
      .get("/api/v1/todo")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

/*
 * Test the /GET/pending route
 */
describe("/GET pending todos", () => {
  it("It should GET all the pending todo records", (done) => {
    chai
      .request(server)
      .get("/api/v1/todo/pending")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

/*
 * Test the /GET/completed route
 */
describe("/GET completed todos", () => {
  it("It should GET all the completed todo records", (done) => {
    chai
      .request(server)
      .get("/api/v1/todo/completed")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

/*
 * Test the /POST route
 */
describe("/POST todo", () => {
  it("It should POST a todo record", (done) => {
    let todo = {
      text: "Please finish this task within tommorow",
      dueDate: "2021/07/24",
    };
    chai
      .request(server)
      .post("/api/v1/todo/create")
      .send(todo)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        todo.should.have.property("text");
        todo.should.have.property("dueDate");

        done();
      });
  });
});

/**
 * Test Get/:id
 */
describe("/GET/:id todo", () => {
  it("it should GET a todo record by the given id", (done) => {
    chai
      .request(server)
      .get(`/api/v1/todo/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

/*
 * Test the /PUT/:id route
 */
describe("/PUT/:id todo", () => {
  it("it should UPDATE a todo record given the id", (done) => {
    let todo = {
      text: "Please finish this task within today",
      dueDate: "2021/07/24",
    };
    chai
      .request(server)
      .put(`/api/v1/todo/update/${id}`)
      .send(todo)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

/*
 * Test the /DELETE/:id route
 */
describe("/DELETE/:id todo", () => {
  it("it should DELETE a todo record given the id", (done) => {
    chai
      .request(server)
      .delete(`/api/v1/todo/delete/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

/*
 * Test the /DELETE/ALL route
 */
describe("/DELETE todo", () => {
  it("it should DELETE all todo record", (done) => {
    chai
      .request(server)
      .delete(`/api/v1/todo/delete`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
