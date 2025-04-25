import {ethers} from "hardhat";
import {assert} from "chai";
import {SimpleStorage,SimpleStorage__factory} from "../typechain-types";

describe("SimpleStorage",function(){
    let simpleStorageFactory:SimpleStorage__factory;
    let simpleStorage:SimpleStorage;

    // creating the contract.
    beforeEach(async function(){
        // simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as any;
        // simpleStorage=await simpleStorageFactory.deploy();
        const [deployer]=await ethers.getSigners()//wallet for the test net or local net that we will use to deploy the contract with;
        simpleStorageFactory=new SimpleStorage__factory(deployer);
        simpleStorage=await simpleStorageFactory.deploy();
        await simpleStorage.waitForDeployment();
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