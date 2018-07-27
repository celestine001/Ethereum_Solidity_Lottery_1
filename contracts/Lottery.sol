pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() public {
        manager = msg.sender;

    }

    function enter() public payable {
        require(msg.value > .01 ether);

        players.push(msg.sender);

    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }
    modifier restricted() {                 //only the manager can call this
        require(msg.sender == manager);
        _;                                // this allows us to write one modifier and use it in many places
   }                                      // it specifically means run restricted and then all the rest of the funtion
        function getPlayers() public view returns(address[]) {
            return players;
        }
}
