// SPDX-License-Identifier: MIT

// pragma solidity 0.8.8;

import "./SimpleStorage.sol";

// 继承 inherit
contract ExtraStorage is SimpleStorage {
    // + 5
    // override
    // 父 virtual 子 override
    function store(uint256 _favoriteNumber) public override {
        favoriteNumber = _favoriteNumber + 5;
    }
}