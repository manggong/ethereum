pragma solidity >= 0.5.0 < 0.7.0;

contract Sponsor {
  uint total;
  function add(uint amount) public {
    total = total+amount;
  }
  function get()  public view returns(uint){
    return total;
  }
}
