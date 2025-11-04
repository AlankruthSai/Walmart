/*
1. get with
*/

SELECT 
  p.id AS post_id,
  p.title,
  COUNT(c.id) AS comment_count
FROM posts p
JOIN comments c ON p.id = c.post_id
GROUP BY p.id, p.title
HAVING COUNT(c.id) > 0;


/*
Top 5 posts with highest comment count
*/

SELECT 
  p.id AS post_id,
  p.title,
  COUNT(c.id) AS comment_count
FROM posts p
JOIN comments c ON p.id = c.post_id
GROUP BY p.id, p.title
ORDER BY COUNT(c.id) DESC
LIMIT 5;