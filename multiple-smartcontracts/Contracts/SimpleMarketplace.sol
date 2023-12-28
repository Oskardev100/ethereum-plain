// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract SimpleMarketplace {
    address public owner;
    uint256 public itemPrice;

    event ItemPurchased(address buyer, uint256 amount);
    event ItemSold(address seller, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        itemPrice = 1 ether; // Initial item price set to 1 ether
    }

    function setItemPrice(uint256 newPrice) external onlyOwner {
        require(newPrice > 0, "Price must be greater than 0");
        itemPrice = newPrice;
    }

    function buyItem() external payable {
        require(msg.value >= itemPrice, "Insufficient funds to purchase the item");

        // Transfer the item to the buyer
        payable(owner).transfer(msg.value);

        // Emit an event indicating the purchase
        emit ItemPurchased(msg.sender, msg.value);
    }

    function sellItem() external {
        // Ensure the caller is the owner
        require(msg.sender == owner, "Only the owner can sell the item");

        // Transfer the item back to the contract for sale
        payable(address(this)).transfer(itemPrice);

        // Emit an event indicating the sale
        emit ItemSold(owner, itemPrice);
    }

    // Fallback function to receive Ether
    receive() external payable {}

    // Function to withdraw Ether from the contract (onlyOwner)
    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
