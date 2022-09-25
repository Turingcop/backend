/* global describe, it */
process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../app.js";

chai.should();

chai.use(chaiHttp);

describe('Docs', () => {
    let newId = "";

    describe('POST /docs', () => {
        it('Should insert new document', (done) => {
            chai.request(server)
                .post("/docs")
                .set("content-type", "application/json")
                .send({ title: "test-doc", body: "test-doc body" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.acknowledged.should.be.true;
                    res.body.insertedId.should.be.an("string");
                    newId = res.body.insertedId;

                    done();
                });
        });
    });

    describe('GET /docs', () => {
        it('Should have a document with body "test-doc body" and title "test-doc"', (done) => {
            chai.request(server)
                .get("/docs")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body.length.should.be.above(0);
                    res.body[0].body.should.equal("test-doc body");
                    res.body[0].title.should.equal("test-doc");

                    done();
                });
        });
    });

    describe('PUT /docs', () => {
        it('Should update the inserted document', (done) => {
            chai.request(server)
                .put("/docs")
                .set("content-type", "application/json")
                .send({ _id: newId, title: "title-update", body: "doc update" })
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });

    describe('GET /docs', () => {
        it('Document body should be "doc update" and title should be "title-update"', (done) => {
            chai.request(server)
                .get("/docs")
                .end((err, res) => {
                    res.body[0].body.should.equal("doc update");
                    res.body[0].title.should.equal("title-update");

                    done();
                });
        });
    });

    describe('DELETE /docs', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .delete("/docs")
                .set("content-type", "application/json")
                .send({ _id: newId })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('GET /docs', () => {
        it('Should have 0 documents', (done) => {
            chai.request(server)
                .get("/docs")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body.length.should.not.be.above(0);

                    done();
                });
        });
    });
});
