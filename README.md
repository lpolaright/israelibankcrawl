# israelibankcrawl
This is a repository to crawl the banks of Israel to get a clear status of your finances - showing it in a nice and clear UI.

##The problem, and the solution##

###The problem:###
Me and my girlfriend are living together, both of us together - have two bank accounts, and two credit cards.
Keeping track of the expenses is hard, we tried doing it manually with a google doc, but loggining in 4 times a day is annoying.

###The naive solution:###
Create a joint bank account, and one credit card.

###The developer's solution:###
Create a web application + server + DB + crawling for the bank accounts and credit cards.

##Prerequesites, Installation and Support##

###Support###
Currently I only support the next banks (hopefully in the future i'll add more):
1. Discount
2. BankHapoalim

Let me know if there is a specific bank you are looking for, or better yet if you can contribute to the list!

###Prerequesites###
1. MongoDB installed
2. PhantomJS (although it should be installed as part of a nodejs module)
3. NodeJS is installed

###Installation###
(assuming you have all the prerequesites) 

1. Git clone the application to your computer
2. `cd israelibankcrawl`
3. `npm install` (you might want to `sudo` - depends on your computer)
4. `gulp watch`
5. Visit `localhost:3000` and hopefully everything works out perfecly.
6. close down the server and edit the next files (temporary, until I unite the configuration):

  `/crawlers/bhp_crawler_node.js`
  
  `/crawlers/discount_crawler_node.js`
  
##Technical Stack##
- MongoDB for DB
- NodeJS for server
- Vanilla JS for client
- SCSS for styling
- Bootstrap material design for design
- Gulp for all the compiling (ES6, SCSS)

##RoadMap##

1. Unify the configuration of the banks/credit card companies into one place
2. Support more banks, and credit card companies
3. Provide a better UI and show graph representation with D3 the progress of your expenses according to your goals
4. Unit tests
