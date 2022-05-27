pragma solidity ^0.8.0;

contract Model {
    uint256 space;
    uint256 public price = 1 ether;
    uint256 totalAmount;

    address payable public Owner;
    event smith (string,address,string);
    event smith1 (string,address,uint256);
    
    constructor () { 
        Owner = payable(msg.sender); 
    }

    function diskSpace(uint _space) public {
        space = _space;
    }

    function getPrice() public view returns(uint256){
        return price;
    }

    function calCost() external returns(uint256){
        totalAmount = space*price;
        return totalAmount;
    }

    function payment() external payable {
        // address user = msg.sender;
        uint256 amount = this.calCost();
        emit smith("before required",Owner, "done");
        emit smith1("after transer",Owner,totalAmount);
        require(msg.sender.balance >= amount, "Account Balance is lower than total amount to be pay");
        emit smith("after required",Owner, "done");
        (Owner).transfer(amount);
        emit smith("after required",Owner, "done");
        emit smith1("after transer",Owner,totalAmount);
    }

    function checkContractBal() public view returns(uint256){
        return address(this).balance;
    }

    

}