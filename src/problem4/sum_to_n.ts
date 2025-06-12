/**
 * Implementation 1: Using a for loop
 * Time Complexity: O(n) - We iterate from 1 to n
 * Space Complexity: O(1) - We only use a single variable to track the sum
 */
export function sum_to_n_loop(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/**
 * Implementation 2: Using the mathematical formula n*(n+1)/2
 * Time Complexity: O(1) - Constant time regardless of input size
 * Space Complexity: O(1) - Uses a fixed amount of memory
 * This is the most efficient implementation as it uses a direct formula
 */
export function sum_to_n_formula(n: number): number {
  return (n * (n + 1)) / 2;
}

/**
 * Implementation 3: Using recursion
 * Time Complexity: O(n) - We make n recursive calls
 * Space Complexity: O(n) - The call stack grows to size n
 * Note: This implementation may cause stack overflow for very large values of n
 */
export function sum_to_n_recursion(n: number): number {
  if (n <= 0) return 0;
  return n + sum_to_n_recursion(n - 1);
}
