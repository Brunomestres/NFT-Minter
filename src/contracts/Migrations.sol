// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
  address public owner = msg.sender;
  uint256 last_completed_migration;

  modifier restricted(){
    require(owner == msg.sender, "Essa funcao e restrita ao dono do contrato");
    _;
  }

  function setCompleted(uint256 completed) public restricted{
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }

}
