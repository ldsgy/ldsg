import { createApp } from "@ldsg/create-app";
import request from "supertest";
import { blogResourceRecords as resourceRecords } from "../../apps";
import { getResourceRecordsWithHandlerFunction } from "../../utils";

describe("blog", () => {
  test("resource records is completed", () => {
    expect(resourceRecords).toMatchSnapshot();
  });

  describe("app", () => {
    const { resourceRecordsWithHandlerFunction } =
      getResourceRecordsWithHandlerFunction({
        resourceRecords,
      });

    const app = createApp({
      resourceRecords: resourceRecordsWithHandlerFunction,
    });

    test("is health", async () => {
      const response = await request(app).get("/health");

      expect(response.statusCode).toBe(200);

      expect(response.text).toBe("ok");
    });

    describe("graphql", () => {
      test("is health", async () => {
        const response = await request(app).get("/graphql");

        expect(response.statusCode).toBe(200);

        expect(response.text).toMatchSnapshot();
      });

      describe("table", () => {
        const mockTitle = "test context";

        const mockWrongContent = "test context";

        const mockRightContent = "test content";

        let createdRecordId: string;

        test("create", async () => {
          const response = await request(app)
            .post("/graphql")
            .send({
              query: `mutation{postCreateOne(record:{title:"${mockTitle}" content:"${mockWrongContent}"}){recordId record{_id views title content}}}`,
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);

          expect(response.statusCode).toBe(200);

          expect(response.body.data.postCreateOne.record.title).toBe(mockTitle);

          expect(response.body.data.postCreateOne.record.content).toBe(
            mockWrongContent
          );

          expect(response.body.data.postCreateOne.recordId).toBeDefined();

          createdRecordId = response.body.data.postCreateOne.recordId;
        });

        test("read", async () => {
          const response = await request(app)
            .post("/graphql")
            .send({
              query: `{postCount postFindMany{_id views title content}postFindById(_id:"${createdRecordId}"){_id views title content}}`,
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);

          expect(response.statusCode).toBe(200);

          expect(response.body.data.postCount).toBeGreaterThanOrEqual(1);

          expect(response.body.data.postFindById._id).toBe(createdRecordId);

          expect(response.body.data.postFindById.title).toBe(mockTitle);

          expect(response.body.data.postFindById.content).toBe(
            mockWrongContent
          );

          expect(response.body.data.postFindMany.length).toBe(
            response.body.data.postCount
          );
        });

        test("update", async () => {
          const response = await request(app)
            .post("/graphql")
            .send({
              query: `mutation{postUpdateMany(record:{content:"${mockRightContent}"}){numAffected}}`,
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);

          expect(response.statusCode).toBe(200);

          expect(
            response.body.data.postUpdateMany.numAffected
          ).toBeGreaterThanOrEqual(1);
        });

        describe("form", () => {
          describe("add views", () => {
            describe("graphql", () => {
              test("mutation", async () => {
                const response = await request(app)
                  .post("/graphql")
                  .send({
                    query: `mutation{getPostDetail(id:"${createdRecordId}"){id content title views}}`,
                  })
                  .set("Accept", "application/json")
                  .expect("Content-Type", /json/)
                  .expect(200);

                expect(response.statusCode).toBe(200);

                expect(response.body.data.getPostDetail.views).toEqual(1);
              });

              test("query", async () => {
                const response = await request(app)
                  .post("/graphql")
                  .send({
                    query: `{getPostDetail(id:"${createdRecordId}"){id content title views}}`,
                  })
                  .set("Accept", "application/json")
                  .expect("Content-Type", /json/)
                  .expect(200);

                expect(response.statusCode).toBe(200);

                expect(response.body.data.getPostDetail.views).toEqual(2);
              });
            });

            test("http", async () => {
              const response = await request(app)
                .post("/forms/get-post-detail-form")
                .send({
                  id: createdRecordId,
                })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200);

              expect(response.statusCode).toBe(200);

              expect(response.body.views).toEqual(3);
            });
          });
        });

        test("delete", async () => {
          const response = await request(app)
            .post("/graphql")
            .send({
              query: `mutation{postRemoveMany(filter:{content:"${mockRightContent}"}){numAffected}}`,
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);

          expect(response.statusCode).toBe(200);

          expect(
            response.body.data.postRemoveMany.numAffected
          ).toBeGreaterThanOrEqual(1);
        });
      });
    });
  });
});
