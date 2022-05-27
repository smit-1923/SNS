// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



contract Users {
    
    address payable public Owner;
    uint256 freeSpace = 5000000;    // By default assuming that 5PB size converted into GB 
    bool spaceCheck = false;

    using Counters for Counters.Counter;
    Counters.Counter private _countTotalUser;


    struct Users{
        uint256 userId;
        address userAdd;
        uint256 totalSpace;
        uint256 userFreeSpace;
    }

    mapping(uint256 => Users) users;


    constructor(){
        Owner = payable(msg.sender); 
    }

    modifier onlyOwner {
      require(msg.sender == Owner);
      _;
   }

    function paymentUser(address payable user, uint256 amount) external payable onlyOwner {
        amount*=1 ether;
        require(msg.sender.balance >= amount, "Account Balance is lower than total amount to be pay");
        payable(user).transfer(amount);
    }

    function checkSpace(uint256 fileSize) public returns(bool){
        require(freeSpace>=fileSize, "Not enough Space");
        spaceCheck = true;
        return spaceCheck;
    }

    function newuser(address _userAdd, uint256 _totalSpace) {
        _countTotalUser.increment();
        uint countTotalUser = _countTotalUser.current();
        
        users[countTotalUser].userId = countTotalUser;
        users[countTotalUser].userAdd = addUser;
        users[countTotalUser]._totalSpace = _totalSpace;
        users[countTotalUser].userFreeSpace = _totalSpace;
    }

    function countFreeUser() public returns(uint256){
        
        Counters.Counter cntFreeUser;

        for(uint i=1; i<=_countTotalUser; i++){
            if(users[countTotalUser].userFreeSpace > 0) {
                cntFreeUser.increment();
            }
        }

        return cntFreeUser.current();
    }

    function divideFile(uint256 _fileSize, 
    )




}