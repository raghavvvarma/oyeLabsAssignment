/*
6. Imagine you have array of integer from 1 to 100 , the numbers are randomly ordered
, one number from 1 to 100 is missing , Please write the code for finding the missing
number
*/

function findMissingNumber(arr) {
    const n = 100; // Range of numbers
    const totalSum = (n * (n + 1)) / 2; // Calculate sum of all integers from 1 to 100
  
    const arraySum = arr.reduce((sum, num) => sum + num, 0); // Calculate sum of the given array
  
    const missingNumber = totalSum - arraySum; // Calculate the missing number
  
    return missingNumber;
  }
  
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 
    19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 
    39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 
    58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 
    77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 
    96, 97, 98, 99, 100];
  
  const missingNumber = findMissingNumber(array);
  console.log("Missing number:", missingNumber);
  