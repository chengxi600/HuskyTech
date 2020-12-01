use huskytech;
INSERT INTO merchandiseType (brand, model, price) VALUES
("Dell", "XPS 15", 1200),
("Dell", "XPS 13", 1000),
("Apple", "MacBook Air", 1200),
("Apple", "MacBook Pro", 1500),
("Samsung", "Galaxy Book", 1200),
("Google", "Pixelbook Go", 1200),
("Lenovo", "X1 Carbon Gen 8", 950),
("Lenovo", "X1 Carbon Gen 7", 1000),
("Alienware", "Alienware m15 R3", 1500),
("Alienware", "Alienware Area-51m r2", 1800),
("Apple", "IPhone X", 400),
("Apple", "IPhone 11", 500),
("Apple", "IPhone 8", 300),
("Samsung", "Galaxy Note 7", 500),  
("Google", "Google Pixel 5", 700),
("Google", "Google Pixel 4", 500),
("Nokia", "Nokia 3V", 300),
("Nokia", "Nokia 6.2", 400),
("HTC", "HTC U11", 500),
("HTC", "HTC 12", 600),
("Dell", "Inspiron 24 5000", 1200),
("Dell", "Inspiron 27 7000", 1500),
("Dell", "OptiPlex 7780", 1400),
("Lenovo", "IdeaCentre A540", 1000),
("Lenovo", "Yoga A940", 2300),
("Microsoft", "Surface Studio 2", 3500),
("Apple", "iMac", 1100),
("Apple", "Mac mini", 900),
("HP", "HP EliteOne 800", 1300),
("HP", "HP Z2 Mini G4", 800);

INSERT INTO Laptop (brand, model, ram, processor) VALUES
("Dell", "XPS 15", 16, "10th Generation Intel Core i7"),
("Dell", "XPS 13", 32, "11th Generation Intel Core i9"),
("Apple", "MacBook Air", 32, "10th Generation Intel Core i9"),
("Apple", "MacBook Pro", 32, "11th Generation Intel Core i9"),
("Samsung", "Galaxy Book", 16, "10th Generation Intel Core i7"),
("Google", "Pixelbook Go", 8, "11th Generation Intel Core i7"),
("Lenovo", "X1 Carbon Gen 8", 16, "11th Generation Intel Core i7"),
("Lenovo", "X1 Carbon Gen 7", 32, "10th Generation Intel Core i9"),
("Alienware", "Alienware m15 R3", 32, "10th Generation Intel Core i9"),
("Alienware", "Alienware Area-51m r2", 16, "11th Generation Intel Core i9");


INSERT INTO Phone (brand, model, operateSys, space) VALUES
("Apple", "IPhone X", "IOS 14", 128),
("Apple", "IPhone 11", "IOS 13", 64),
("Apple", "IPhone 8", "IOS 14", 32),
("Samsung", "Galaxy Note 7", "Android 10", 64),  
("Google", "Google Pixel 5", "Android 8", 32),
("Google", "Google Pixel 4", "Android 10", 64),
("Nokia", "Nokia 3V", "Symbianv2", 16),
("Nokia", "Nokia 6.2", "Symbianv3", 8),
("HTC", "HTC U11", "Android 7.1", 64),
("HTC", "HTC 12", "Android 9", 128);


INSERT INTO Desktop VALUES
("Dell", "Inspiron 24 5000", "10th Generation Intel Core i7", 16),
("Dell", "Inspiron 27 7000", "11th Generation Intel Core i9", 32),
("Dell", "OptiPlex 7780", "10th Generation Intel Core i9", 8),
("Lenovo", "IdeaCentre A540", "11th Generation Intel Core i9", 32),
("Lenovo", "Yoga A940", "10th Generation Intel Core i7", 16),
("Microsoft", "Surface Studio 2", "11th Generation Intel Core i7", 16),
("Apple", "iMac",  "10th Generation Intel Core i9", 32),
("Apple", "Mac mini",  "10th Generation Intel Core i9", 32),
("HP", "HP EliteOne 800", "11th Generation Intel Core i9", 16),
("HP", "HP Z2 Mini G4", "11th Generation Intel Core i7", 16);

INSERT INTO Colors (brand, model, color) VALUES
("Apple", "IPhone X", "Gold"),
("Apple", "IPhone 11", "Black"),
("Apple", "IPhone 8", "White"),
("Samsung", "Galaxy Note 7", "Silver"),  
("Google", "Google Pixel 5", "Gold"),
("Google", "Google Pixel 4", "Black"),
("Nokia", "Nokia 3V", "Black"),
("Nokia", "Nokia 6.2", "White"),
("HTC", "HTC U11", "Silver"),
("HTC", "HTC 12", "Blue");

INSERT INTO Carriers (brand, model, carrier) VALUES
("Apple", "IPhone X", "Verizon"),
("Apple", "IPhone 11", "AT&T"),
("Apple", "IPhone 8", "T-Mobile"),
("Samsung", "Galaxy Note 7", "Verizon"),  
("Google", "Google Pixel 5", "AT&T"),
("Google", "Google Pixel 4", "Verizon"),
("Nokia", "Nokia 3V", "Verizon"),
("Nokia", "Nokia 6.2", "AT&T"),
("HTC", "HTC U11", "T-Mobile"),
("HTC", "HTC 12", "Verizon");

INSERT INTO Customers (registrationid, firstName, lastName, userName, passKey, salt) VALUES
(29401, "Saahil", "Kumar", "saahilkumar", "i<3coding", "ab"),
(18247, "David", "Yan", "yandapanda", "waterbottle4", "3c"),
(57391, "Cheng Xi", "Tsou", "twitch_main", "smollysandwich", "9n"),
(00283, "Ningyu", "Chen", "ningyuning", "algo&data", "Ne"),
(28492, "Stanley", "Wu", "animelover23", "killuazoldyck", "02"),
(28474, "Anthony", "Mu", "chicagobornandraised", "multichatforever123", "gH"),
(58392, "Patrick", "Yoon", "californiabornchicagoraised", "enterthegungeon", "R2"),
(68492, "Vevey", "Zhan", "vvboba", "gillettecoolwave", "D2"),
(98237, "Shawn", "Spencer", "psychic123", "psychfrancisco", "c3"),
(39210, "Burton", "Guster", "plutoLover", "psych123pharma", "po");

INSERT INTO Orders (orderNum, customerId) VALUES
(32473, 29401),
(29184, 29401),
(23498, 29401),
(12394, 18247),
(12032, 18247),
(10239, 57391),
(12039, 57391),
(12372, 57391),
(03984, 57391),
(10239, 28492),
(12093, 28474),
(12302, 58392),
(48932, 58392),
(48203, 58392),
(47921, 68492),
(01923, 68492),
(23483, 98237),
(12349, 98237),
(12832, 98237),
(77623, 39210);

INSERT INTO OnlineOrder (orderNum, customerId, state, ofZip, ofCity, ofState, ofStreet) VALUES
(12093, 28474, "sent", "32281", "Madison", "Wisconsin", "123 Main Street"),
(12302, 58392, "sent", "90293", "Boston", "Massachusetts", "17 Mouse Road"),
(48932, 58392, "sent", "39021", "Boise", "Idaho", "1 Potato Lane"),
(48203, 58392, "processed", "12314", "Springfield", "Illinois", "25 Simpson Grove"),
(47921, 68492, "processed", "02115", "Boston", "Massachusetts", "40 Leon Street"),
(01923, 68492, "processed", "13474", "Seattle", "Washington", "1234 Rainy Avenue"),
(23483, 98237, "delivered", "02115", "Boston", "Massachusetts", "129 Hemenway Street"),
(12349, 98237, "delivered", "99999", "Olympia", "Washington", "402 Fake Road"),
(12832, 98237, "lost", "00000", "Chicago", "Illinois", "12 PogChamp Road"),
(77623, 39210, "lost", "29172", "Ever Grande", "Hawaii", "12 Victory Road");


INSERT INTO Employee (id, firstName, lastName, title, reportTo) VALUES
(38293, "Nate", "Derbinsky", "CEO", NULL),
(28012, "Jayne", "Dwonson", "COO", 38293),
(28011, "Hevin", "Kart", "CTO", 38293),
(83942, "Melissa", "Tree", "CFO", 38293),
(14732, "Samir", "Kumar", "Technology Manager", 28011),
(57239, "Jane", "Doe", "Software Developer", 14732),
(82712, "John", "Smith", "QA Analyst", 14732),
(12732, "Rodney", "Fisher", "HR Representative", 28012),
(47283, "Bill", "Bob", "Financial Manager", 83942),
(12902, "Bubba", "Kumar", "Salesman", 47283),
(79139, "Tyler", "Blevins", "Janitor", 12732),
(17231, "Clare", "Crawley", "Hiring Manager", 12732),
(89203, "Gordo", "Foodsey", "Chef", 12732),
(12348, "Peter", "Pilot", "Consulting Intern", 17231),
(02934, "Tony", "Shark", "Data Analyst Co-op", 57239),
(12342, "Naruto", "Uzumaki", "Food Manager", 12732),
(49829, "Lucina", "Kumar", "Electrical Engineer", 12902),
(02810, "Giles", "Corey", "Stonemason", 17231),
(77291, "Abby", "Yu", "Quality Manager", 38293),
(00007, "James", "Pond", "Gardener", 12732);

INSERT INTO Store (state, city, zip, manager) VALUES
("Oregon", "Portland", "17233", 38293),
("Washington", "Seattle", "12921", 28012),
("California", "San Francisco", "23712", 28011),
("Massachusetts", "Boston", "02115", 83942),
("Connecticut", "Hartford", "17232", 14732),
("California", "Los Angeles", "28102", 57239),
("Illinois", "Chicago", "11242", 82712),
("Alabama", "Alabama City", "99921", 12732),
("Florida", "Tallahassee", "12734", 47283),
("Ohio", "Cleveland", "12812", 12902),
("Pennsylvania", "Pittsburgh", "72942", 79139),
("Nevada", "Las Vegas", "12803", 17231),
("North Dakota", "Fargo", "73943", 89203),
("Alaska", "Juneau", "28192", 12348),
("North Carolina", "Raleigh", "24932", 02934),
("Hawaii", "Honolulu", "01238", 12342),
("New York", "Albany", "74923", 49829),
("Wisconsin", "Madison", "02384", 02810),
("Pennsylvania", "Philadelphia", "73102", 77291),
("Maine", "Ogunquit", "92384", 00007);


INSERT INTO OnlineStores (url, ofState, ofCity, ofZip) VALUES
("http://www.huskytech.com/portland", "Oregon", "Portland", "17233"),
("http://www.huskytech.com/seattle", "Washington", "Seattle", "12921"),
("http://www.huskytech.com/california", "California", "San Francisco", "23712"),
("http://www.huskytech.com/boston", "Massachusetts", "Boston", "02115"),
("http://www.huskytech.com/hartford", "Connecticut", "Hartford", "17232"),
("http://www.huskytech.com/la", "California", "Los Angeles", "28102"),
("http://www.huskytech.com/chicago", "Illinois", "Chicago", "11242"),
("http://www.huskytech.com/alabamacity", "Alabama", "Alabama City", "99921"),
("http://www.huskytech.com/tallahassee", "Florida", "Tallahassee", "12734"),
("http://www.huskytech.com/cleveland", "Ohio", "Cleveland", "12812");

INSERT INTO WorksAt (employeeId, ofState, ofCity, ofZip) VALUES
(83942, "California", "Los Angeles", "28102"),
(79139, "Illinois", "Chicago", "11242"),
(47283, "Alabama", "Alabama City", "99921"),
(28011, "Alabama", "Alabama City", "99921"),
(28012, "Alabama", "Alabama City", "99921"),
(89203, "Florida", "Tallahassee", "12734"),
(79139, "Ohio", "Cleveland", "12812"),
(83942, "Ohio", "Cleveland", "12812"),
(49829, "Pennsylvania", "Pittsburgh", "72942"),
(17231, "Pennsylvania", "Pittsburgh", "72942"),
(14732, "Pennsylvania", "Pittsburgh", "72942"),
(12902, "Nevada", "Las Vegas", "12803"),
(38293, "North Dakota", "Fargo", "73943"),
(57239, "North Dakota", "Fargo", "73943"),
(02810, "Alaska", "Juneau", "28192"),
(00007, "Alaska", "Juneau", "28192"),
(49829, "North Carolina", "Raleigh", "24932");


INSERT INTO Review (reviewId, brandType, modelType, customerId, rating, descr) VALUES
(1, "Dell", "XPS 15", 29401, 10, "Amazing product! Loved it a lot and it worked very well"),
(2, "Dell", "XPS 13", 18247, 7, "Works pretty well, I noticed a bug though whenever I try to open a web browser."),
(3, "Apple", "MacBook Air", 29401, 8, "Really easy to use and great price! I wish it was a little bigger however."),
(4, "Apple", "MacBook Air", 18247, 4, "A lot of people seem to like this product but not me. It’s hard to use and too small"),
(5, "Apple", "MacBook Air", 57391, 10, "This is the best laptop that I’ve ever used!"),
(6, "Apple", "MacBook Pro", 18247, 4, "Not nearly as good as other laptops, it’s way too expensive and super slow."),
(7, "Google", "Pixelbook Go", 57391, 2, "Sorry I thought I was getting Pokemon Go for my grandson can I get a refund?"),
(8, "Lenovo", "X1 Carbon Gen 8", 29401, 5, "Works well but it’s very expensive, so not totally worth the price in my opinion."),
(9, "Lenovo", "X1 Carbon Gen 8", 18247, 7, "Kind of expensive but definitely worth it."),
(10, "Lenovo", "X1 Carbon Gen 7", 00283, 1, "This is probably the worst product I’ve ever used."),
(11, "Alienware", "Alienware m15 R3", 00283, 3, "It’s good but not when you compare it to its competitors. Honestly, they really need to pick up their game."),
(12, "Apple", "IPhone X", 18247, 10, "Amazing phone and great price! It’s fun to use and my kids love it."),
(13, "Apple", "IPhone 11", 28492, 8, "This is a really great phone but it’s a little expensive, especially considering it’s not too different from the IPhone X"),
(14, "Apple", "IPhone 11", 29401, 6, "The camera quality is not very good, which is unfortunate since it has three of them."),
(15, "Apple", "IPhone 11", 18247, 7, "Pretty good phone, the apps are the best part to be honest."),
(16, "Apple", "IPhone 11", 58392, 9, "Best phone I’ve ever seen." ),
(17, "Apple", "IPhone 8", 00283, 1, "Would not even buy it for my dog."),
(18, "Apple", "IPhone 8", 28492, 4, "The camera quality could be better."),
(19, "Samsung", "Galaxy Note 7", 18247, 1, "Had to call 911 after the phone exploded, never buy this product."),  
(20, "Google", "Google Pixel 5", 29401, 2, "I love Google but this phone is honestly terrible."),
(21, "Google", "Google Pixel 4", 00283, 6, "Better than Google’s other phones but it’s still a little too expensive."),
(22, "Google", "Google Pixel 4", 28492, 8, "This is the best Google phone by far. Hands down."),
(23, "Google", "Google Pixel 4", 58392, 7, "Great phone! There’s room for improvement but it’s still good."),
(24, "Nokia", "Nokia 3V", 58392, 1, "Terrible quality, the only nokia i managed to break."),
(25, "HTC", "HTC U11", 00283, 9, "I love the three lense camera and the new home button feature!"),
(26, "HTC", "HTC 12", 18247, 6, "Not as good as some of HTC’s other products but I still use it a lot."),
(27, "Dell", "Inspiron 24 5000", 68492, 3, "I regret using Dell for anything other than printers"),
(28, "Dell", "Inspiron 24 5000", 29401, 5, "It’s not bad, but it’s not very good either. I wouldn’t recommend buying it."),
(29, "Dell", "Inspiron 24 5000", 28492, 4, "It’s super slow and hard to use. Dell really needs to get their act together."),
(30, "Dell", "Inspiron 27 7000", 18247, 6, "The computer lags at times but can still run most applications easily."),
(31, "Lenovo", "IdeaCentre A540", 00283, 7, "Decent, but not great."),
(32, "Lenovo", "IdeaCentre A540", 58392, 10, "Crazy fast CPU and insane GPU, this is the best product I’ve ever used."),
(33, "Lenovo", "Yoga A940", 68492, 10, "Using this makes me want to go and do yoga."),
(34, "Microsoft", "Surface Studio 2", 00283, 10, "It’s exactly the good quality that you’d expect from Microsoft"),
(35, "Microsoft", "Surface Studio 2", 29401, 1, "Thisissobadthespacedoesntevenwork"),
(36, "Microsoft", "Surface Studio 2", 18247, 5, "The keys are super sticky which is annoying but it’s a good product overall"),
(37, "Apple", "iMac", 28474, 5, "It’s good, but there are some issues that make it bothersome to use sometimes."),
(38, "Apple", "Mac mini", 18247, 5, "Not the best apple product but not the worst either."),
(39, "Apple", "Mac mini", 00283, 1, "Why is it so mini?? This product is terrible."),
(40, "Apple", "Mac mini", 28474, 4, "This product’s decent but there’s lots of room for improvement"),
(41, "Apple", "Mac mini", 68492, 5, "It’s good but not nearly as good as any of the other Apple products."),
(42, "HP", "HP Z2 Mini G4", 28474, 1, "I’ve never even heard of HP before using this desktop but now I know why it’s a no name brand");


INSERT INTO Merchandise(serial, brandType, modelType, shelfState, shelfCity, shelfZIP, orderID, customerID) VALUES
("#73917", "Dell", "XPS 15", "Oregon", "Portland", "17233", NULL, NULL),
("#37923", "Dell", "XPS 15", "Oregon", "Portland", "17233", NULL, NULL),
("#79212", "Dell", "XPS 15", "Washington", "Seattle", "12921", 77623, 39210),
("#12309", "Dell", "XPS 15", "North Dakota", "Fargo", "73943", NULL, NULL),
("#64923", "Dell", "XPS 13", "California", "San Francisco", "23712", NULL, NULL),
("#12057", "Dell", "XPS 13", "Oregon", "Portland", "17233", 12832, 98237),
("#15351", "Apple", "MacBook Air", "Washington", "Seattle", "12921", 12349, 98237),
("#75923", "Apple", "MacBook Air", "Oregon", "Portland", "17233", 12349, 98237),
("#03471", "Apple", "MacBook Air", "Oregon", "Portland", "17233", 23483, 98237),
("#93724", "Apple", "MacBook Pro", "Alaska", "Juneau", "28192", 23483, 98237),
("#78346", "Apple", "MacBook Pro", "California", "San Francisco", "23712", 23483, 98237),
("#62347", "Samsung", "Galaxy Book", "Washington", "Seattle", "12921", 32473, 29401),
("#00239", "Google", "Pixelbook Go", "California", "San Francisco", "23712", 32473, 29401),
("#42348", "Lenovo", "X1 Carbon Gen 8", "Alaska", "Juneau", "28192", 32473, 29401),
("#72349", "Lenovo", "X1 Carbon Gen 8", "Oregon", "Portland", "17233", NULL, NULL),
("#62348", "Lenovo", "X1 Carbon Gen 8", "Washington", "Seattle", "12921", NULL, NULL),
("#68234", "Lenovo", "X1 Carbon Gen 8", "California", "San Francisco", "23712", 01923, 68492),
("#92834", "Lenovo", "X1 Carbon Gen 7", "Alaska", "Juneau", "28192", 29184, 29401),
("#23493", "Alienware", "Alienware m15 R3", "Washington", "Seattle", "12921", 29184, 29401),
("#12834", "Alienware", "Alienware m15 R3", "Oregon", "Portland", "17233", 29184, 29401),
("#99912", "Alienware", "Alienware Area-51m r2", "New York", "Albany", "74923", 47921, 68492),
("#62844", "Alienware", "Alienware Area-51m r2", "New York", "Albany", "74923", 47921, 68492),
("#12353", "Alienware", "Alienware Area-51m r2", "Pennsylvania", "Philadelphia", "73102", 47921, 68492),
("#48234", "Apple", "IPhone X", "Massachusetts", "Boston", "02115", NULL, NULL),
("#73532", "Apple", "IPhone X", "Oregon", "Portland", "17233", 23498, 29401),
("#01283", "Apple", "IPhone X", "North Carolina", "Raleigh", "24932", 23498, 29401),
("#01232", "Apple", "IPhone 11", "Washington", "Seattle", "12921", NULL, NULL),
("#82348", "Apple", "IPhone 11", "New York", "Albany", "74923", 48203, 58392),
("#01239", "Apple", "IPhone 11", "Washington", "Seattle", "12921", 48203, 58392),
("#12352", "Apple", "IPhone 11", "Ohio", "Cleveland", "12812", 48932, 58392),
("#18423", "Apple", "IPhone 11", "Ohio", "Cleveland", "12812", 48932, 58392),
("#12948", "Apple", "IPhone 8", "North Carolina", "Raleigh", "24932", 48932, 58392),
("#38347", "Samsung", "Galaxy Note 7", "Washington", "Seattle", "12921", NULL, NULL),  
("#71239", "Google", "Google Pixel 5", "Massachusetts", "Boston", "02115", NULL, NULL),
("#09123", "Google", "Google Pixel 5", "Massachusetts", "Boston", "02115", NULL, NULL),
("#47832", "Google", "Google Pixel 5", "Florida", "Tallahassee", "12734", 12302, 58392),
("#45734", "Google", "Google Pixel 4", "Washington", "Seattle", "12921", 12302, 58392),
("#98982", "Nokia", "Nokia 3V", "Florida", "Tallahassee", "12734", 12394, 18247),
("#23532", "Nokia", "Nokia 6.2", "North Dakota", "Fargo", "73943", 12093, 28474),
("#98298", "HTC", "HTC U11", "Washington", "Seattle", "12921", 12093, 28474),
("#93728", "HTC", "HTC 12", "Massachusetts", "Boston", "02115", NULL, NULL),
("#09091", "HTC", "HTC 12", "Florida", "Tallahassee", "12734", 12032, 18247),
("#98912", "HTC", "HTC 12", "Wisconsin", "Madison", "02384", 10239, 28492),
("#44457", "Dell", "Inspiron 24 5000", "Washington", "Seattle", "12921", 10239, 28492),
("#90123", "Dell", "Inspiron 24 5000", "Maine", "Ogunquit", "92384", 10239, 28492),
("#78934", "Dell", "Inspiron 27 7000", "Hawaii", "Honolulu", "01238", NULL, NULL),
("#12087", "Dell", "OptiPlex 7780", "Hawaii", "Honolulu", "01238", NULL, NULL),
("#02764", "Lenovo", "IdeaCentre A540", "Maine", "Ogunquit", "92384", 12372, 57391),
("#49398", "Lenovo", "Yoga A940", "California", "Los Angeles", "28102", 12372, 57391),
("#44758", "Microsoft", "Surface Studio 2", "Washington", "Seattle", "12921", 12372, 57391),
("#33231", "Microsoft", "Surface Studio 2", "Massachusetts", "Boston", "02115", NULL, NULL),
("#54738", "Microsoft", "Surface Studio 2", "California", "Los Angeles", "28102", NULL, NULL),
("#01284", "Microsoft", "Surface Studio 2", "Connecticut", "Hartford", "17232", 12372, 57391),
("#47829", "Apple", "iMac", "Wisconsin", "Madison", "02384", 12039, 57391),
("#64949", "Apple", "iMac", "Wisconsin", "Madison", "02384", 12039, 57391),
("#63847", "Apple", "Mac mini", "Massachusetts", "Boston", "02115", 12039, 57391),
("#73827", "HP", "HP EliteOne 800", "Washington", "Seattle", "12921", 12093, 28474),
("#09124", "HP", "HP Z2 Mini G4", "Connecticut", "Hartford", "17232", 12093, 28474);
