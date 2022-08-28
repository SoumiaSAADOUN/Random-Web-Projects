/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var productExceptSelf = function(nums) {
    
    let n=nums.length;
    let left= new Array(n);
    let right= new Array(n);
    let results= new Array(n);
    
    right[n-1]=1; left[0]=1;
    
    for(let i=1; i<n; i++){
        left[i]=left[i-1]*nums[i-1];
    }

    for(let j= n-2; j >= 0; j--){
        right[j]= right[j+1]*nums[j+1];

    }
     
    
    for (let k=0; k<n; k++){
        results[k]= left[k]*right[k];
    }    
       
    return results;
    
};