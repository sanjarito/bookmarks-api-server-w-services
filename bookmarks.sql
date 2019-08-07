-- First, remove the table if it exists
drop table if exists bookmarks;

-- Create the table anew
create table bookmarks (
  bestsellers_date text,
  published_date text,
  author text,
  description text,
  price INTEGER,
  publisher text,
  title text NOT NULL,
  rank INTEGER,
  rank_last_week INTEGER,
  weeks_on_list INTEGER,
  id VARCHAR(24) UNIQUE
);


insert INTO bookmarks (
  bestsellers_date,published_date,author, description,price,publisher,title,rank,
  rank_last_week,weeks_on_list,id
) values
  ('1211587200000','1212883200000','Dean R Koontz','Odd Thomas confronts evil forces in a California coastal town',
  21,'Bantam','ODD HOURS',1,0,1,'5b4aa4ead3089013507db18b'),
  ('1211587200000','1212883200000','Stephenie Meyer','Aliens have taken control of the minds and bodies of most humans, but one woman won’t surrender',
  22,'Little, Brown','THE HOST',2,1,3,'5b4aa4ead3089013507db18c'),
  ('1211587200000','1212883200000','Emily Giffin','A womans happy marriage is shaken when she encounters an old boyfriend.',30, 'St. Martins',
  'LOVE THE ONE YOURE WITH',3,2,2,'5b4aa4ead3089013507db18d')
  ;
