# chromatix test


## Prerequisites

NPM and NodeJS should be installed.
 

## Installation

```
git clone https://github.com/lexiaoau/chromatix-test.git

cd chromatix-test

npm install

```

## Run

To run the application, use following commands:

```
npm start

```

Then, use browser to visit **http://localhost:8080/**. And the result with location name and forecast text should be displayed in browser.

## Test

When the application is running, run below command:

```
npm test

```

Then, if test run successfully, following output should be seen in terminal:

```
> chromatix-test@1.0.0 test /home/chromatix-test-master
> mocha



  Verify forecast text
    ✓ should verify 'Mount Buller' and Ballarat text are as expected (76ms)


  1 passing (81ms)


```

The test verify forecast text of two locations, Mount Buller and Ballarat.



