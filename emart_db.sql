/* auth_table */
CREATE TABLE auth_table (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(10) NOT NULL
);

/* cat_table */
CREATE TABLE cat_table (
    Cat_id INT PRIMARY KEY,
    Cat_name VARCHAR(255) NOT NULL
);

INSERT INTO cat_table VALUES (1, "Men");
INSERT INTO cat_table VALUES (2, "Women");
INSERT INTO cat_table VALUES (3, "Kids");

/* item_table */
CREATE TABLE item_table (
    Item_id INT PRIMARY KEY,
    Item_name VARCHAR(255) NOT NULL,
    Price INT NOT NULL,
    Item_desc TEXT,
    Cat_id INT NOT NULL,
    img_file VARCHAR(100),
    FOREIGN KEY (Cat_id) REFERENCES cat_table(Cat_id)
);

INSERT INTO item_table VALUES (2001, "Elegant Magenta Embroidered Anarkali Set for Festive Wear", 3990, "Step into elegance with this magenta Anarkali suit featuring intricate embroidery and a matching dupatta. Perfect for weddings, celebrations, and festive occasions.", 2, "Images/Women/w_1.png");
INSERT INTO item_table VALUES (2002, "Navy Blue Printed Cotton Kurti for Everyday Comfort", 799, "Enjoy effortless style with this navy blue cotton kurti adorned with subtle prints and a simple neckline. Ideal for daily wear, office, or casual outings.", 2, "Images/Women/w_2.png");
INSERT INTO item_table VALUES (2003, "Charcoal Grey A-Line Kurta with Minimalist Print", 1299, "This charcoal grey A-line kurta offers a relaxed fit and understated print, making it a versatile choice for work or casual gatherings.", 2, "Images/Women/w_3.png");
INSERT INTO item_table VALUES (2004, "Maroon Designer Saree with Contemporary Border Detailing", 2399, "Drape yourself in sophistication with this maroon saree featuring a modern border design. Suitable for parties, formal events, and festive celebrations.", 2, "Images/Women/w_4.png");

INSERT INTO item_table VALUES (2005, "Floral Black Short Dress with Waist Tie", 1299, "A chic black dress featuring a delicate floral print and a flattering waist tie, perfect for casual outings or brunch dates.", 2, "Images/Women/w_5.png");
INSERT INTO item_table VALUES (2006, "Pastel Pink Floral Co-ord Set for Summer Days", 1499, "This pastel pink co-ord set features a relaxed fit and charming floral patterns. Ideal for warm weather, it brings a playful yet chic vibe to your summer wardrobe.", 2, "Images/Women/w_6.png");
INSERT INTO item_table VALUES (2007, "Light Blue Denim Dungaree with Classic White Top", 1899, "Trendy light blue denim dungarees paired with a crisp white top for a youthful, casual look. Great for everyday wear, providing versatility and all-day comfort.", 2, "Images/Women/w_7.png");
INSERT INTO item_table VALUES (2008, "Black Full-Sleeve Top with Printed Maxi Skirt Set", 1599, "A timeless black full-sleeve top combined with a flowy, printed maxi skirt. Suitable for both casual and semi-formal occasions, this set offers style and sophistication in one ensemble.", 2, "Images/Women/w_8.png");

/* cart_table */
CREATE cart_table (
    Cart_id INT AUTO_INCREMENT PRIMARY KEY,
    User_id INT NOT NULL,
    Item_id INT NOT NULL,
    Quanity INT default 1,
    FOREIGN KEY (User_id) REFERENCES auth_table(ID),
    FOREIGN KEY (Item_id) REFERENCES item_table(Item_id),
    UNIQUE(User_id, Item_id)
);