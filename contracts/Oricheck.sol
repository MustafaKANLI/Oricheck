// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Oricheck {
    mapping(uint => address[]) private productToOwnerHistory;

    function getProductHistory(
        string memory _productSerial
    ) public view returns (address[] memory) {
        // Get product hash
        uint productHash = _getProductHash(_productSerial);

        // Check if product has a history, otherwise product was not introduced to the contract
        require(
            productToOwnerHistory[productHash].length > 0,
            "Product doesn't exist"
        );

        return productToOwnerHistory[productHash];
    }

    function _getProductHash(
        string memory _productSerial
    ) private pure returns (uint) {
        // Hash product serial to uint
        return uint(keccak256(abi.encodePacked(_productSerial)));
    }

    function addProduct(string memory _productSerial) public {
        // Get product hash
        uint productHash = _getProductHash(_productSerial);

        // Check if this is a new product
        require(
            productToOwnerHistory[productHash].length == 0,
            "Product already exists"
        );

        // Set the caller as owner of this product
        productToOwnerHistory[productHash].push(msg.sender);
    }

    function transferProduct(
        string memory _productSerial,
        address _receiver
    ) public {
        // Get product hash
        uint productHash = _getProductHash(_productSerial);

        // Product exists
        address[] storage history = productToOwnerHistory[productHash];

        // Check if product has a history, otherwise product doesn't exist
        require(history.length > 0, "Product doesn't exist");

        // Check if the seller is the last owner of the product
        require(history[history.length - 1] == msg.sender, "Unauthorized sell");

        // Set receiver as the new owner of product
        history.push(_receiver);
    }
}
