# yeppie_tech
A simple xml parser for high loads 

Assignment
----------

Write a Node.js script that will import XML product feed into MongoDB.

XML product feed is available at the following URL:

https://storage.googleapis.com/yippie-samples/feed.xml


Requirements
------------

0. Write the code like you'll have to maintain it for the next two years.
1. Assume the feed size is 20 GB, not 20 MB.
2. Use streaming HTTP client to download the feed.
3. Use streaming XML parser to parse the feed.
4. For each item in the feed, save the following fields into a MongoDB collection:
  * EAN (string, primary key)
  * URL (string)
  * title (string)
  * description (string)
  * price (number)
  * shipping price (number)
5. In case there are multiple products with the same EAN, cheapest candidate wins.