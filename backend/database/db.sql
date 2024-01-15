-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: grading_system
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `credentials`
--

LOCK TABLES `credentials` WRITE;
/*!40000 ALTER TABLE `credentials` DISABLE KEYS */;
INSERT INTO `credentials` VALUES (1,'admin','$2b$10$uf81JcaGONOnlL2G5Hipie9Zq8vRi9IamHJhONh7po6AuSkYJuC/K'),(2,'professor','$2b$10$oiyWq6nSnVFjaCDFx5G7a.KCKFavxIP7glDvFXIX011Ueo8tAFJ8O'),(3,'student','$2b$10$papDZm/s1a15wY97Q8ujl.qt2/AJ338MmFRQzWjKUdK39ZCO8Bbm6'),(4,'student2','$2b$10$de0nCy6gh3KIUbPsJMrrheX2sV8ftIwPGqoV3uHeLcgdrpiz3SK62'),(5,'student3','$2b$10$FqNU3e6ixsrayiNpNapcPugB6nzSp1Wthm2PtEYTf3iSSbw4oXYuS'),(6,'student4','$2b$10$KxbHn1A0mikjPWrBfvw1Y.tWAjp/pAqkYm0VeAxT8UU1upQu5J71G'),(7,'student5','$2b$10$lR52fxKC2XRmDy8qzTlzVOSkX.XCiJzv0jS2hMOHOc7eiAVmoYna.'),(8,'professor2','$2b$10$rOJg5qe2t9jMF3mptd.Dyuk4YgcBbF7wyuHIZ1VC0/Qjq/1Uvk7Ce');
/*!40000 ALTER TABLE `credentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `inputs`
--

LOCK TABLES `inputs` WRITE;
/*!40000 ALTER TABLE `inputs` DISABLE KEYS */;
INSERT INTO `inputs` VALUES (1,'hello',0,1),(2,'rAdar',0,2),(3,'17',0,3),(4,'4',0,4),(5,'blue',0,5),(6,'World',0,6),(7,'Hello',0,6),(8,'Hi',0,7),(9,'Everyone',0,7),(10,'.',0,7),(11,'3',0,8),(12,'false',0,8),(13,'-',0,8),(14,'[85, 90, 78, 92, 88]',NULL,9),(15,'[\n    { \"name\": \"John Doe\", \"age\": 20, \"grades\": [85, 90, 78, 92, 88] },\n    { \"name\": \"Jane Smith\", \"age\": 22, \"grades\": [75, 88, 95, 82, 90] },\n    { \"name\": \"Bob Johnson\", \"age\": 21, \"grades\": [90, 82, 87, 94, 78] }\n]\n',NULL,10),(16,'[\n    { \"name\": \"John Doe\", \"age\": 20, \"grades\": [85, 90, 78, 92, 88] },\n    { \"name\": \"Jane Smith\", \"age\": 22, \"grades\": [75, 88, 95, 82, 90] },\n    { \"name\": \"Bob Johnson\", \"age\": 21, \"grades\": [90, 82, 87, 94, 78] }\n]\n',NULL,11),(21,'\'{\"key\": \"value\"}\'',NULL,16),(22,'\'this is not valid JSON\'',NULL,17),(23,'\'[1, 2, 3]\'',NULL,18),(24,'\'[{\"name\": \"John\"}, {\"name\": \"Jane\"}]\'',NULL,19);
/*!40000 ALTER TABLE `inputs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `outputs`
--

LOCK TABLES `outputs` WRITE;
/*!40000 ALTER TABLE `outputs` DISABLE KEYS */;
INSERT INTO `outputs` VALUES (1,'false',1),(2,'true',2),(3,'true',3),(4,'false',4),(5,'false',5),(6,'World Hello',6),(7,'Hi.Everyone',7),(8,'3.false',8),(9,'86.6',9),(10,'86.27',10),(11,'Jane Smith',11),(16,'false',16),(17,'false',17),(18,'true',18),(19,'true',19);
/*!40000 ALTER TABLE `outputs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Palindrome','Create a function that takes a word as an input and checks if it is a palindrome or not. If it is a palindrome, it must return true, otherwise false. Your function must be named \'isPalindrome\'.','2023-12-17',1),(2,'Number is Prime','Create a function that checks if a number is prime or not. It must return true or false. Your main function should be named \'isPrime\'.','2024-12-14',1),(3,'Combine with Separator','Create a function that takes three string parameters. The first two must be concatenated into a single string and the third must be an optional separator. For example, the words \"Hello\" and \"World\" without an optional separator must output \"Hello World\" and if they have \"-\" as an optional separator \"Hello-World\". Your function must be named \'combineWithSeparator\'.','2024-12-22',1),(5,'Object Array Calculations','Description:\nCreate an array named students, where each element is an object representing a student. Each student object should have the following properties:\n\n    name: A string representing the student\'s name.\n    age: A number representing the student\'s age.\n    grades: An array representing the student\'s grades.\n\nWrite a function named calculateAverage that takes an array of grades and returns the average grade.\n\nNow, create another function named calculateTotalAverage that takes an array of student objects and calculates the average grade for each student, logging their names and respective averages. Additionally, calculate and log the total average grade for all students.\n\nLastly, add a function named findOldestStudent that takes an array of student objects and determines and logs the name of the oldest student.\n\nCreate an array of at least three student objects with different data and use these functions to find and log their individual averages, the total average for all students, and the name of the oldest student. All averages must be fixed to two decimals.','2024-03-01',2),(9,'JSON Validation Function','Create a TypeScript/JavaScript function named isValidJSONOrArray that takes a string as input and determines whether it can be successfully parsed as a valid JSON or an array.\n\nThe function should:\n\n    Use a try-catch block to handle parsing errors.\n    Return true if the parsed result is an array or a non-null object.\n    Return false if the parsing fails or if the parsed result is not an array or a non-null object.','2024-01-27',4);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'JavaScript Basics','The basics of JavaScript functions, including function declarations, variables and simple calculations.',5,2),(2,'JavaScript Objects','A deeper delve into JavaScript with asynchronous functions.',7,2),(4,'JavaScript Exceptions','Exploring the try...catch blocks of JavaScript.',5,2);
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `submissions`
--

LOCK TABLES `submissions` WRITE;
/*!40000 ALTER TABLE `submissions` DISABLE KEYS */;
INSERT INTO `submissions` VALUES (1,'student1Palindrome.js','function isPalindrome(word) {\r\n    var lowercasedWord = word.toLowerCase();\r\n    var cleanWord = lowercasedWord.replace(/[^a-z0-9]/g, \'\');\r\n    var reversedWord = cleanWord.split(\'\').reverse().join(\'\');\r\n    return cleanWord === reversedWord;\r\n}\r\n','2023-12-08',10,3,1),(2,'student2Palindrome.js','function isPalindrome(word) {\r\n    var cleanWord = word.replace(/[^a-z0-9]/g, \'\');\r\n    var reversedWord = cleanWord.split(\'\').reverse().join(\'\');\r\n    return cleanWord === reversedWord;\r\n}\r\n','2023-12-08',5,4,1),(3,'student3Palindrome.js','function main(word) {\r\n    var lowercasedWord = word.toLowerCase();\r\n    var cleanWord = lowercasedWord.replace(/[^a-z0-9]/g, \'\');\r\n    var reversedWord = cleanWord.split(\'\').reverse().join(\'\');\r\n    return cleanWord === reversedWord;\r\n}\r\n','2023-12-08',0,5,1),(4,'student3Prime.js','// Helper function 1: Check if a number is even\r\nfunction isEven(number) {\r\n    return number % 2 === 0;\r\n}\r\n\r\n// Helper function 2: Check if a number is divisible by any other number\r\nfunction isDivisibleByAny(number, divisors) {\r\n    for (var i = 0; i < divisors.length; i++)\r\n        if (number % divisors[i] === 0)\r\n            return true;\r\n\r\n    return false;\r\n}\r\n\r\n// Main function: Check if a number is a prime number\r\nfunction isPrime(number) {\r\n    if (typeof number != \'number\')\r\n        return false;\r\n    else if (number < 2)\r\n        return false;\r\n    else if (number === 2)\r\n        return true;\r\n    else if (isEven(number))\r\n        return false;\r\n\r\n\r\n    for (var i = 3; i <= Math.sqrt(number); i += 2)\r\n        if (isDivisibleByAny(number, i))\r\n            return false;\r\n\r\n    return true;\r\n}','2023-12-08',10,5,2),(5,'student2Prime.js','function isPrime(number) {\r\n    if (number % 2 === 0 || number === 2)\r\n        return false;\r\n    else\r\n        for (var i = 1; i <= number; i += 2)\r\n            if (number % i === 0)\r\n                return false;\r\n    \r\n    return true;\r\n}\r\n','2023-12-08',4,4,2),(6,'student2Combine.js','function combineWithSeparator(string1, string2, separator = undefined) {\r\n    if (!separator)\r\n        var sep = \" \"\r\n    else\r\n        var sep = separator\r\n\r\n    var result = string1 + sep + string2;\r\n\r\n    return result;\r\n}\r\n','2023-12-08',7,4,3),(7,'student3Combine.js','function combineWithSeparator(string1, string2, separator) {\r\n    if (typeof string1 !== \'string\' || typeof string2 !== \'string\')\r\n        return \"Invalid input: Both inputs must be strings.\";\r\n\r\n    var result = string1 + separator + string2;\r\n\r\n    return result;\r\n}\r\n','2023-12-08',NULL,5,3),(8,'student1Combine.js','function combineWithSeparator(separator = \" \", string1, string2) {\r\n    if (typeof string1 !== \'string\' || typeof string2 !== \'string\')\r\n        return \"Invalid input: Both inputs must be strings.\";\r\n\r\n    var result = string1 + separator + string2;\r\n\r\n    return result;\r\n}\r\n','2023-12-08',0,3,3),(9,'studentObjectArray.js','// Function to calculate average grade for a student\nconst calculateAverage = (grades) => {\n    const sum = grades.reduce((acc, grade) => acc + grade, 0);\n    return parseFloat((sum / grades.length).toFixed(2));\n  };\n  \n  // Function to calculate average for all students\n  const calculateTotalAverage = (students) => {\n    let totalSum = 0;\n    let totalStudents = 0;\n  \n    students.forEach((student) => {\n      const studentAverage = calculateAverage(student.grades);\n      totalSum += studentAverage;\n      totalStudents++;\n    });\n    const totalAverage = totalSum / totalStudents;\n    return parseFloat(totalAverage.toFixed(2));\n  };\n  \n  // Function to find the oldest student\n  const findOldestStudent = (students) => {\n    let oldestStudent = students[0];\n  \n    students.forEach((student) => {\n      if (student.age > oldestStudent.age) {\n        oldestStudent = student;\n      }\n    });\n  \n    return oldestStudent.name;\n  };','2024-01-13',NULL,5,5),(10,'studentJSONValidation.ts','function isValidJSONOrArray(str) {\n  try {\n    let parsed = JSON.parse(str);\n\n    if (Array.isArray(parsed)) {\n      return true\n    } else {\n      return false\n    }\n  } catch (error) {\n    return false\n  }\n}','2024-01-13',10,5,9),(11,'student2JSONValidation.js','function isValidJSONOrArray(str) {\n  try {\n    let parsed = JSON.parse(str);\n\n    if (Array.isArray(parsed))\n      return true\n  } catch (error) {\n    return false\n  }\n}','2024-01-13',8,6,9);
/*!40000 ALTER TABLE `submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tests`
--

LOCK TABLES `tests` WRITE;
/*!40000 ALTER TABLE `tests` DISABLE KEYS */;
INSERT INTO `tests` VALUES (1,'isPalindrome',1,NULL),(2,'isPalindrome',1,NULL),(3,'isPrime',2,NULL),(4,'isPrime',2,NULL),(5,'isPrime',2,NULL),(6,'combineWithSeparator',3,NULL),(7,'combineWithSeparator',3,NULL),(8,'combineWithSeparator',3,NULL),(9,'calculateAverage',5,NULL),(10,'calculateTotalAverage',5,NULL),(11,'findOldestStudent',5,NULL),(16,'isValidJSONOrArray',9,NULL),(17,'isValidJSONOrArray',9,NULL),(18,'isValidJSONOrArray',9,NULL),(19,'isValidJSONOrArray',9,NULL);
/*!40000 ALTER TABLE `tests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_subject`
--

LOCK TABLES `user_subject` WRITE;
/*!40000 ALTER TABLE `user_subject` DISABLE KEYS */;
INSERT INTO `user_subject` VALUES (1,3,1),(3,4,1),(4,4,2),(5,5,1),(6,6,2),(7,5,2),(8,5,4),(9,6,4),(11,3,2),(12,3,4);
/*!40000 ALTER TABLE `user_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','Konstantinos','Kapnias',0,1),(2,'professor','Dr. Taylor','Adams',1,2),(3,'student','Jordan','Lee',2,3),(4,'student2','Morgan','Patel',2,4),(5,'student3','Riley','Chen',2,5),(6,'student4','Casey','Rodriguez',2,6),(7,'student5','Jamie','Nguyen',2,7),(8,'professor2','Dr. Brandon','Williams',1,8);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-15 22:36:31
