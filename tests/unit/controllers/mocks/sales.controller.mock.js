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

const salesMock = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 2,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
]

module.exports = {
  saleMock,
  noIdSaleMock,
  noQuantitySaleMock,
  salesMock,
};