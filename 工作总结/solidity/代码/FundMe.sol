// Get funds from users
// Withdraw funds
// Set a minimum funding value in USD

// SPDX-License-Identifier: MIT

// pragma solidity 0.8.8;

// 合约和钱包一样拥有独立地址，也可以持有虚拟币
contract FundMe {

    // 节约 gas
    // constant immutable
    uint256 public constant MINIMUM_USD = 50 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    address public immutable owner;
    address public immutable i_owner;

    constructor() {
        owner = msg.sender;
        i_owner = msg.sender;
    }

    function fund() public payable {
        // want to be able to set a minimum fund amount in USD
        // 1. How do we send ETH to this contract?
        // revert 回滚整个操作
        // undo any action before, and send remaining gas back
        // 回滚后 number 不为5
        // uint256 number = 5;
        require(msg.value >= 1e18, "Didn't send enough!"); // 单位 wei 会发生回滚
        // usd 转化为 eth
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function getPrice() public {
        // ABI
        // Address 0xA39434A63A52E749F02807ae27335515BA4b07F7
        // ETH in terms of USD
        
        // int256 price ====> because price may be negative
        // solidity 不使用小数 decimals
        // 1 ETH = 1e18 Wei = 1e9 Gwei
        
        // 类型转换
        // (,int256 price,,,) = priceFeed.latestRoundData();
        // return uint256(price * 1e10); 
        
        // 0.8.0之后的数字是checked类型的，不会溢出； 0.6.0左右是unchecked，可以溢出到最小值 
        // unchecked {bigNumber = bigNmuber + 1;} 节约计算资源 gas

    }

    function getConversionRate() public {

    }

    // 高级方法 modifier
    function withdraw() public onlyOwner {
        // 土办法
        // require(msg.sender == owner, "Sender is not owner!");

        // 循环写法
        for(uint256 i = 0; i < funders.length; i++) {
            // code
            address funder = funders[i];
            addressToAmountFunded[funder] = 0;
        }
        // reset the array
        funders = new address[](0);
        // actually withdraw the funds

        // 三种方式：
        // transfer
        // send
        // call

        // transfer: transfer(2300 gas, throws error) 失败回滚
        // msg.sender = address
        // payable(msg.sender) = payable address
        payable(msg.sender).transfer(address(this).balance);

        // send: transfer(2300 gas, returns bool) 
        bool sendSuccess = payable(msg.sender).send(address(this).balance);
        require(sendSuccess, "Send failed");

        // call: call(forward all gas or set gas, returns bool), 可以调用几乎所有方法
        // (bool callSuccess, bytes memory dataReturned) = payable(msg.sender).call{value: address(this).balance}("");
        // require(callSuccess, "Call failed");
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Send is not owner!");
        // if(msg.sender != i_owner) { revert NotOwner(); }
        _; // 执行剩余代码
    }

    // receive()
    // fallback()

}