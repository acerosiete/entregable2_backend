const router = require("../routes/digimon.routes");
const digiController = require("../controller/digimon.controller");
const { json } = require("body-parser");

describe("Test Digimons", () => {

/*    test("Get all Digimons", async() => {
        var result = await digiController.getAllDigimons();
        // assert
        expect(result).toBe(Object);
    });

    test("Save new Digimon", async() => {
        var result = await digiController.saveDigimon("{'name':'123', 'img':'no','level':'alto'}");
        // assert
        expect(result).toBe("{'name':'123', 'img':'no','level':'alto'}");
        });

    test("Get Digimon by level", async() => {
        var result = await digiController.getDigimonByLevel("Fresh");
            // assert
        expect(result).toBe("");
    });*/

    test("Get Digimon by name", async() => {

        var result = await digiController.getDigimonByName("Agumon");
        // assert
        expect(result).toBe("{'name': 'Biyomon','img': 'https://digimon.shadowsmith.com/img/biyomon.jpg','level': 'Rookie'}");
});
    
});
