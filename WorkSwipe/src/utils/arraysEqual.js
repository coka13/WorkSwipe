export function arraysAreEqual(arr1, arr2) {
    // Check if both arrays are truthy and have the same length
    if (arr1 && arr2 && arr1.length === arr2.length) {
        // Create frequency counters for both arrays
        const counter1 = {};
        const counter2 = {};
        
        // Populate frequency counter for arr1
        for (const val of arr1) {
            counter1[val] = (counter1[val] || 0) + 1;
        }
        
        // Populate frequency counter for arr2
        for (const val of arr2) {
            counter2[val] = (counter2[val] || 0) + 1;
        }
        
        // Check if the frequency counters are equal
        for (const key in counter1) {
            if (counter1[key] !== counter2[key]) {
                return false;
            }
        }
        
        // If no discrepancies found, arrays are equal
        return true;
    }
    
    // If either array is falsy or they have different lengths, they are not equal
    return false;
}
