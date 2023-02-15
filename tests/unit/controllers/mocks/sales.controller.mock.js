const saleMock = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const noIdSaleMock = [
  {
    "productId": null,
    "quantity": 1
  },
  {
    "productId": null,
    "quantity": 5
  }
];

const noQuantitySaleMock = [
  {
    "productId": 1,
    "quantity": null
  },
  {
    "productId": 2,
    "quantity": null
  }
];

module.exports = {
  saleMock,
  noIdSaleMock,
  noQuantitySaleMock,
};