INSERT INTO `credentials` VALUES (1,'admin','123'),(2,'professor','456'),(3,'student','789'),(4,'student2','000');
INSERT INTO `projects` VALUES (1,'Babysteps in JavasScript','How to print something to the console?','2023-10-31',1),(2,'JavaScript Project 2','How to alert \"Hello World\" on screen?','2023-10-31',1);
INSERT INTO `subjects` VALUES (1,'JavaScript Basics','The best programming language',5,2),(2,'JavaScript for Experts','The best programming language, but now with a little more pain and caffeine overdose.',7,2);
INSERT INTO `user_subject` VALUES (1,1,1),(2,1,2),(3,2,1),(4,2,2),(5,3,1),(6,3,2);
INSERT INTO `users` VALUES (1,'Admin','Admin','admin',1),(2,'The','Professor','professor',2),(3,'Student','No1','student',3),(4,'Student','No2','student',4);