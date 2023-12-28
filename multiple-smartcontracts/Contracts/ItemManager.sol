//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


abstract contract Ownable {
    address public _owner;

    // constructor () internal {
    //     _owner = msg.sender;
    // } 

    /**
    * @dev Throws if called by any account other than the owner.
    */
    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }

    /**
    * @dev Returns true if the caller is the current owner.
    */
    function isOwner() public view returns (bool) {
        return (msg.sender == _owner);
    }
}


contract Item {
    uint public priceInWei;
    uint public paidWei;
    uint public index;

    ItemManager parentContract;

    constructor(ItemManager _parentContract, uint _priceInWei, uint _index) public {
        priceInWei = _priceInWei;
        index = _index;
        parentContract = _parentContract;
    }

    receive() external payable {
        require(paidWei == 0, "Item is already paid.");
        require(msg.value == priceInWei, "We don't support partial payments");
        paidWei += msg.value;

        (bool success, ) = address(parentContract).call{value:msg.value}(abi.encodeWithSignature("triggerPayment(uint256)", index));
        require(success, "Delivery did not work");
    }

    fallback() external {

    }
}

contract ItemManager is Ownable {
    enum SupplyChainState{Created, Paid, Delivered}

    struct S_Item{
        Item _item;
        ItemManager.SupplyChainState _state;
        string _identifier;
        uint _priceInWei;
    }

    mapping (uint => S_Item) public items;
    uint index;

    event SupplyChainStep(uint _itemIndex, uint _step, address _address);

    function createItem(string memory _identifier, uint _priceInWei) public onlyOwner{
        Item item = new Item(this, _priceInWei, index);
        items[index]._item = item;
        items[index]._state = SupplyChainState.Created;
        items[index]._identifier = _identifier;
        items[index]._priceInWei = _priceInWei;
        emit SupplyChainStep(index, uint(items[index]._state), address(item));

        index ++;
    }
    function triggerPayment(uint _index) public payable {
        Item item =  items[_index]._item;

        require(address(item) == msg.sender, "Only items are allowed to update themselves");
        require(item.priceInWei() == msg.value, "Not fully paid yet");
        require(items[_index]._state == SupplyChainState.Created , "Item is further in the supply chain");
        
        items[_index]._state = SupplyChainState.Paid;
        emit SupplyChainStep(_index, uint(items[_index]._state), address(items[_index]._item));
    }
    function triggerDelivery(uint _index) public onlyOwner {
        require(items[_index]._state == SupplyChainState.Paid,  "Item is further in the supply chain");
        items[_index]._state = SupplyChainState.Delivered;
        emit SupplyChainStep(_index, uint(items[_index]._state), address(items[_index]._item));

    }
}