// SPDX-License-Identifier: MIT
// pragma solidity 0.8.8;

import "./SimpleStorage.sol";

contract StorageFactory {
    // 初始化为 0x0000000000 0000000000 0000000000 0000000000
    SimpleStorage[] public simpleStorageArray;

    function createSimpleStorageContract() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage);
    }

    function sfStore(uint256 _simpleStorageIndex, uint256 __simpleStorageNumber) public {
        // Address
        // ABI - Application Binary Interface
        SimpleStorage simpleStorage = simpleStorageArray[_simpleStorageIndex];
        simpleStorage.store(__simpleStorageNumber);
    }

    function sfGet(uint256 _simpleStorageIndex) public view returns(uint256){
        // SimpleStorage simpleStorage = simpleStorageArray[_simpleStorageIndex];
        // return simpleStorage.retrieve();
        return simpleStorageArray[_simpleStorageIndex].retrieve();
    }

}