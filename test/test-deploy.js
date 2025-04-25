const {ethers}=require("hardhat");
const {assert}=require("chai");

describe("SimpleStorage",function(){
    let simpleStorageFactory,simpleStorage;
    beforeEach(async function(){
        simpleStorageFactory=await ethers.getContractFactory("SimpleStorage");
        simpleStorage=await simpleStorageFactory.deploy();
    });

    it("should start with a favourite number 0",async function(){
        const curVal=await simpleStorage.retrieve();
        const expectedVal="0";
        assert.equal(curVal.toString(),expectedVal);
    });

    it("should update when we call store",async function(){
        const expectedVal="7";
        const transactionResponse=await simpleStorage.store(expectedVal);
        await transactionResponse.wait(1);

        const curVal=await simpleStorage.retrieve();
        assert.equal(curVal.toString(),expectedVal);
    })
})