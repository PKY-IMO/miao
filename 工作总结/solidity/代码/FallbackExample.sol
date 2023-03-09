// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract FallbackExample {
    uint256 public result;

    // send contract to ETH，CALLDATA 没有数据会被触发
    receive() external payable {
        result = 1;
    }

    // send contract to ETH，CALLDATA 有数据会被触发
    fallback() external payable {
        result = 2;
    }
}

// Ether is sent to contract
//     is msg.data empty?
//           /   \
//         yes    no
//         /        \
//     receive()?  fallback()
//       /    \
//     yes     no
//     /         \
// receive()   fallback()        