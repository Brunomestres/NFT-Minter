//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MetadevsContract is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokensIds;

    constructor() ERC721("MetadevsToken", "MDTKN") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokensIds.increment();
        uint256 newItemId = _tokensIds.current();

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
