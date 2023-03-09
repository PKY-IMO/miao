// SPDX-License-Identifier: MIT
// pragma solidity 0.8.8; // solidity版本 0.8.7是最重要的一版 >=0.8.7 <0.9.0

// EVM, Ethereum Virtual Machine 以太坊虚拟机
// Avalanche, Fantom, Polygon

contract SimpleStorage {
    // boolean, uint, int, address, bytes
    bool hasFavoriteNumber = true;
    uint favoriteNumber = 123; // uint8, 16, 32 默认uint256
    int favoriteNumber2 = 5;
    string favoriteNumberInText = "Five";
    address myAddress = 0x111122223333444455556666777788889999aAaa; // 有位数限制
    bytes32 favoriteBytes = "cat"; // 最大 bytes32

    // 初始化为默认值 0
    uint defaultValue;

    // struct
    People public preson = People({favoriteNumber: 2, name: "pp"});
    struct People {
        uint256 favoriteNumber;
        string name;
    }

    // array
    // 视图输入检索的下标
    People[] public people; // dynamic array
    uint256[] public favoriteNumberList;
    // dynamic array VS fixed sized array 数组长度
    People[3] public fixedSizedPeopleList; // fixed sized array

    // 映射
    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
        retrieve(); // 需要支付检索费用
    }

    // view, pure
    // view and pure functions disallow modificaion of state
    // view and pure functions, when called alone, don't spend gas
    function retrieve() public view returns(uint256) {
        return favoriteNumber;
    }

    // pure functions additionally disallow you to read from blockchain state
    // pure 不允许从区块链读取
    function add() public pure returns(uint256) {
        return (1 + 1);
    }

    // EVM can access and store information in six places: Stack Memory Storage Calldata Code Logs
    // calldata: 不可修改的临时变量 temporary var
    // memory: 可修改的临时变量 temporary var   引用类型（string、struct、array 需要给出是 memory 还是 calldata）
    // storage: 可修改的永久变量 permanent var
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        People memory newPerson = People(_favoriteNumber, _name);
        // People memory newPerson = People({favoriteNumber: _favoriteNumber, name: _name});
        people.push(newPerson);
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
